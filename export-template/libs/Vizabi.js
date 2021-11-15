// http://vizabi.org v1.21.2 Copyright 2021 Jasper Heeffer and others at Gapminder Foundation
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mobx')) :
  typeof define === 'function' && define.amd ? define(['mobx'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vizabi = factory(global.mobx));
})(this, (function (mobx) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var mobx__namespace = /*#__PURE__*/_interopNamespace(mobx);

  function fail$1(message) {
      throw new Error("[mobx-utils] " + message);
  }
  function invariant(cond, message) {
      if (message === void 0) { message = "Illegal state"; }
      if (!cond)
          fail$1(message);
  }
  var deepFields = function (x) {
      return (x &&
          x !== Object.prototype &&
          Object.getOwnPropertyNames(x).concat(deepFields(Object.getPrototypeOf(x)) || []));
  };
  var distinctDeepFields = function (x) {
      var deepFieldsIndistinct = deepFields(x);
      var deepFieldsDistinct = deepFieldsIndistinct.filter(function (item, index) { return deepFieldsIndistinct.indexOf(item) === index; });
      return deepFieldsDistinct;
  };
  var getAllMethodsAndProperties = function (x) {
      return distinctDeepFields(x).filter(function (name) { return name !== "constructor" && !~name.indexOf("__"); });
  };

  var PENDING = "pending";
  var FULFILLED = "fulfilled";
  var REJECTED = "rejected";
  function caseImpl(handlers) {
      switch (this.state) {
          case PENDING:
              return handlers.pending && handlers.pending(this.value);
          case REJECTED:
              return handlers.rejected && handlers.rejected(this.value);
          case FULFILLED:
              return handlers.fulfilled ? handlers.fulfilled(this.value) : this.value;
      }
  }
  /**
   * `fromPromise` takes a Promise, extends it with 2 observable properties that track
   * the status of the promise and returns it. The returned object has the following observable properties:
   *  - `value`: either the initial value, the value the Promise resolved to, or the value the Promise was rejected with. use `.state` if you need to be able to tell the difference.
   *  - `state`: one of `"pending"`, `"fulfilled"` or `"rejected"`
   *
   * And the following methods:
   * - `case({fulfilled, rejected, pending})`: maps over the result using the provided handlers, or returns `undefined` if a handler isn't available for the current promise state.
   * - `then((value: TValue) => TResult1 | PromiseLike<TResult1>, [(rejectReason: any) => any])`: chains additional handlers to the provided promise.
   *
   * The returned object implements `PromiseLike<TValue>`, so you can chain additional `Promise` handlers using `then`. You may also use it with `await` in `async` functions.
   *
   * Note that the status strings are available as constants:
   * `mobxUtils.PENDING`, `mobxUtils.REJECTED`, `mobxUtil.FULFILLED`
   *
   * fromPromise takes an optional second argument, a previously created `fromPromise` based observable.
   * This is useful to replace one promise based observable with another, without going back to an intermediate
   * "pending" promise state while fetching data. For example:
   *
   * @example
   * \@observer
   * class SearchResults extends React.Component {
   *   \@observable.ref searchResults
   *
   *   componentDidUpdate(nextProps) {
   *     if (nextProps.query !== this.props.query)
   *       this.searchResults = fromPromise(
   *         window.fetch("/search?q=" + nextProps.query),
   *         // by passing, we won't render a pending state if we had a successful search query before
   *         // rather, we will keep showing the previous search results, until the new promise resolves (or rejects)
   *         this.searchResults
   *       )
   *   }
   *
   *   render() {
   *     return this.searchResults.case({
   *        pending: (staleValue) => {
   *          return staleValue || "searching" // <- value might set to previous results while the promise is still pending
   *        },
   *        fulfilled: (value) => {
   *          return value // the fresh results
   *        },
   *        rejected: (error) => {
   *          return "Oops: " + error
   *        }
   *     })
   *   }
   * }
   *
   * Observable promises can be created immediately in a certain state using
   * `fromPromise.reject(reason)` or `fromPromise.resolve(value?)`.
   * The main advantage of `fromPromise.resolve(value)` over `fromPromise(Promise.resolve(value))` is that the first _synchronously_ starts in the desired state.
   *
   * It is possible to directly create a promise using a resolve, reject function:
   * `fromPromise((resolve, reject) => setTimeout(() => resolve(true), 1000))`
   *
   * @example
   * const fetchResult = fromPromise(fetch("http://someurl"))
   *
   * // combine with when..
   * when(
   *   () => fetchResult.state !== "pending",
   *   () => {
   *     console.log("Got ", fetchResult.value)
   *   }
   * )
   *
   * // or a mobx-react component..
   * const myComponent = observer(({ fetchResult }) => {
   *   switch(fetchResult.state) {
   *      case "pending": return <div>Loading...</div>
   *      case "rejected": return <div>Ooops... {fetchResult.value}</div>
   *      case "fulfilled": return <div>Gotcha: {fetchResult.value}</div>
   *   }
   * })
   *
   * // or using the case method instead of switch:
   *
   * const myComponent = observer(({ fetchResult }) =>
   *   fetchResult.case({
   *     pending:   () => <div>Loading...</div>,
   *     rejected:  error => <div>Ooops.. {error}</div>,
   *     fulfilled: value => <div>Gotcha: {value}</div>,
   *   }))
   *
   * // chain additional handler(s) to the resolve/reject:
   *
   * fetchResult.then(
   *   (result) =>  doSomeTransformation(result),
   *   (rejectReason) => console.error('fetchResult was rejected, reason: ' + rejectReason)
   * ).then(
   *   (transformedResult) => console.log('transformed fetchResult: ' + transformedResult)
   * )
   *
   * @param {IThenable<T>} promise The promise which will be observed
   * @param {IThenable<T>} oldPromise? The previously observed promise
   * @returns {IPromiseBasedObservable<T>}
   */
  function fromPromise(origPromise, oldPromise) {
      invariant(arguments.length <= 2, "fromPromise expects up to two arguments");
      invariant(typeof origPromise === "function" ||
          (typeof origPromise === "object" &&
              origPromise &&
              typeof origPromise.then === "function"), "Please pass a promise or function to fromPromise");
      if (origPromise.isPromiseBasedObservable === true)
          return origPromise;
      if (typeof origPromise === "function") {
          // If it is a (reject, resolve function, wrap it)
          origPromise = new Promise(origPromise);
      }
      var promise = origPromise;
      origPromise.then(mobx.action("observableFromPromise-resolve", function (value) {
          promise.value = value;
          promise.state = FULFILLED;
      }), mobx.action("observableFromPromise-reject", function (reason) {
          promise.value = reason;
          promise.state = REJECTED;
      }));
      promise.isPromiseBasedObservable = true;
      promise.case = caseImpl;
      var oldData = oldPromise && oldPromise.state === FULFILLED
          ? oldPromise.value
          : undefined;
      mobx.extendObservable(promise, {
          value: oldData,
          state: PENDING,
      }, {}, { deep: false });
      return promise;
  }
  (function (fromPromise) {
      fromPromise.reject = mobx.action("fromPromise.reject", function (reason) {
          var p = fromPromise(Promise.reject(reason));
          p.state = REJECTED;
          p.value = reason;
          return p;
      });
      function resolveBase(value) {
          if (value === void 0) { value = undefined; }
          var p = fromPromise(Promise.resolve(value));
          p.state = FULFILLED;
          p.value = value;
          return p;
      }
      fromPromise.resolve = mobx.action("fromPromise.resolve", resolveBase);
  })(fromPromise || (fromPromise = {}));

  var __decorate = function (decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  /** @class */ ((function () {
      function StreamListener(observable, initialValue) {
          var _this = this;
          mobx.runInAction(function () {
              _this.current = initialValue;
              _this.subscription = observable.subscribe(_this);
          });
      }
      StreamListener.prototype.dispose = function () {
          if (this.subscription) {
              this.subscription.unsubscribe();
          }
      };
      StreamListener.prototype.next = function (value) {
          this.current = value;
      };
      StreamListener.prototype.complete = function () {
          this.dispose();
      };
      StreamListener.prototype.error = function (value) {
          this.current = value;
          this.dispose();
      };
      __decorate([
          mobx.observable.ref
      ], StreamListener.prototype, "current", void 0);
      __decorate([
          mobx.action.bound
      ], StreamListener.prototype, "next", null);
      __decorate([
          mobx.action.bound
      ], StreamListener.prototype, "complete", null);
      __decorate([
          mobx.action.bound
      ], StreamListener.prototype, "error", null);
      return StreamListener;
  })());

  var __assign = function () {
      __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };
  var __decorate$1 = function (decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var RESERVED_NAMES = ["model", "reset", "submit", "isDirty", "isPropertyDirty", "resetProperty"];
  /** @class */ ((function () {
      function ViewModel(model) {
          var _this = this;
          this.model = model;
          this.localValues = mobx.observable.map({});
          this.localComputedValues = mobx.observable.map({});
          this.isPropertyDirty = function (key) {
              return _this.localValues.has(key);
          };
          invariant(mobx.isObservableObject(model), "createViewModel expects an observable object");
          // use this helper as Object.getOwnPropertyNames doesn't return getters
          getAllMethodsAndProperties(model).forEach(function (key) {
              if (key === mobx.$mobx || key === "__mobxDidRunLazyInitializers") {
                  return;
              }
              invariant(RESERVED_NAMES.indexOf(key) === -1, "The propertyname " + key + " is reserved and cannot be used with viewModels");
              if (mobx.isComputedProp(model, key)) {
                  var derivation = mobx._getAdministration(model, key).derivation; // Fixme: there is no clear api to get the derivation
                  _this.localComputedValues.set(key, mobx.computed(derivation.bind(_this)));
              }
              var descriptor = Object.getOwnPropertyDescriptor(model, key);
              var additionalDescriptor = descriptor ? { enumerable: descriptor.enumerable } : {};
              Object.defineProperty(_this, key, __assign(__assign({}, additionalDescriptor), { configurable: true, get: function () {
                      if (mobx.isComputedProp(model, key))
                          return _this.localComputedValues.get(key).get();
                      if (_this.isPropertyDirty(key))
                          return _this.localValues.get(key);
                      else
                          return _this.model[key];
                  }, set: mobx.action(function (value) {
                      if (value !== _this.model[key]) {
                          _this.localValues.set(key, value);
                      }
                      else {
                          _this.localValues.delete(key);
                      }
                  }) }));
          });
      }
      Object.defineProperty(ViewModel.prototype, "isDirty", {
          get: function () {
              return this.localValues.size > 0;
          },
          enumerable: false,
          configurable: true
      });
      Object.defineProperty(ViewModel.prototype, "changedValues", {
          get: function () {
              return this.localValues.toJS();
          },
          enumerable: false,
          configurable: true
      });
      ViewModel.prototype.submit = function () {
          var _this = this;
          mobx.keys(this.localValues).forEach(function (key) {
              var source = _this.localValues.get(key);
              var destination = _this.model[key];
              if (mobx.isObservableArray(destination)) {
                  destination.replace(source);
              }
              else if (mobx.isObservableMap(destination)) {
                  destination.clear();
                  destination.merge(source);
              }
              else if (!mobx.isComputed(source)) {
                  _this.model[key] = source;
              }
          });
          this.localValues.clear();
      };
      ViewModel.prototype.reset = function () {
          this.localValues.clear();
      };
      ViewModel.prototype.resetProperty = function (key) {
          this.localValues.delete(key);
      };
      __decorate$1([
          mobx.computed
      ], ViewModel.prototype, "isDirty", null);
      __decorate$1([
          mobx.computed
      ], ViewModel.prototype, "changedValues", null);
      __decorate$1([
          mobx.action.bound
      ], ViewModel.prototype, "submit", null);
      __decorate$1([
          mobx.action.bound
      ], ViewModel.prototype, "reset", null);
      __decorate$1([
          mobx.action.bound
      ], ViewModel.prototype, "resetProperty", null);
      return ViewModel;
  })());

  var __extends = (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  /**
   * Reactively sorts a base observable array into multiple observable arrays based on the value of a
   * `groupBy: (item: T) => G` function.
   *
   * This observes the individual computed groupBy values and only updates the source and dest arrays
   * when there is an actual change, so this is far more efficient than, for example
   * `base.filter(i => groupBy(i) === 'we')`. Call #dispose() to stop tracking.
   *
   * No guarantees are made about the order of items in the grouped arrays.
   *
   * The resulting map of arrays is read-only. clear(), set(), delete() are not supported and
   * modifying the group arrays will lead to undefined behavior.
   *
   * NB: ObservableGroupMap relies on `Symbol`s. If you are targeting a platform which doesn't
   * support these natively, you will need to provide a polyfill.
   *
   * @param {array} base The array to sort into groups.
   * @param {function} groupBy The function used for grouping.
   * @param options Object with properties:
   *  `name`: Debug name of this ObservableGroupMap.
   *  `keyToName`: Function to create the debug names of the observable group arrays.
   *
   * @example
   * const slices = observable([
   *     { day: "mo", hours: 12 },
   *     { day: "tu", hours: 2 },
   * ])
   * const slicesByDay = new ObservableGroupMap(slices, (slice) => slice.day)
   * autorun(() => console.log(
   *     slicesByDay.get("mo")?.length ?? 0,
   *     slicesByDay.get("we"))) // outputs 1, undefined
   * slices[0].day = "we" // outputs 0, [{ day: "we", hours: 12 }]
   */
  /** @class */ ((function (_super) {
      __extends(ObservableGroupMap, _super);
      function ObservableGroupMap(base, groupBy, _a) {
          var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? "ogm" + ((Math.random() * 1000) | 0) : _c, _d = _b.keyToName, keyToName = _d === void 0 ? function (x) { return "" + x; } : _d;
          var _this = _super.call(this) || this;
          _this._keyToName = keyToName;
          _this._groupBy = groupBy;
          _this._ogmInfoKey = Symbol("ogmInfo" + name);
          _this._base = base;
          for (var i = 0; i < base.length; i++) {
              _this._addItem(base[i]);
          }
          _this._disposeBaseObserver = mobx.observe(_this._base, function (change) {
              if ("splice" === change.type) {
                  mobx.transaction(function () {
                      for (var _i = 0, _a = change.removed; _i < _a.length; _i++) {
                          var removed = _a[_i];
                          _this._removeItem(removed);
                      }
                      for (var _b = 0, _c = change.added; _b < _c.length; _b++) {
                          var added = _c[_b];
                          _this._addItem(added);
                      }
                  });
              }
              else if ("update" === change.type) {
                  mobx.transaction(function () {
                      _this._removeItem(change.oldValue);
                      _this._addItem(change.newValue);
                  });
              }
              else {
                  throw new Error("illegal state");
              }
          });
          return _this;
      }
      ObservableGroupMap.prototype.clear = function () {
          throw new Error("not supported");
      };
      ObservableGroupMap.prototype.delete = function (_key) {
          throw new Error("not supported");
      };
      ObservableGroupMap.prototype.set = function (_key, _value) {
          throw new Error("not supported");
      };
      /**
       * Disposes all observers created during construction and removes state added to base array
       * items.
       */
      ObservableGroupMap.prototype.dispose = function () {
          this._disposeBaseObserver();
          for (var i = 0; i < this._base.length; i++) {
              var item = this._base[i];
              var grouperItemInfo = item[this._ogmInfoKey];
              grouperItemInfo.reaction();
              delete item[this._ogmInfoKey];
          }
      };
      ObservableGroupMap.prototype._getGroupArr = function (key) {
          var result = _super.prototype.get.call(this, key);
          if (undefined === result) {
              result = mobx.observable([], { name: "GroupArray[" + this._keyToName(key) + "]", deep: false });
              _super.prototype.set.call(this, key, result);
          }
          return result;
      };
      ObservableGroupMap.prototype._removeFromGroupArr = function (key, itemIndex) {
          var arr = _super.prototype.get.call(this, key);
          if (1 === arr.length) {
              _super.prototype.delete.call(this, key);
          }
          else if (itemIndex === arr.length - 1) {
              // last position in array
              arr.length--;
          }
          else {
              arr[itemIndex] = arr[arr.length - 1];
              arr[itemIndex][this._ogmInfoKey].groupArrIndex = itemIndex;
              arr.length--;
          }
      };
      ObservableGroupMap.prototype._addItem = function (item) {
          var _this = this;
          var groupByValue = this._groupBy(item);
          var groupArr = this._getGroupArr(groupByValue);
          var value = {
              groupByValue: groupByValue,
              groupArrIndex: groupArr.length,
              reaction: mobx.reaction(function () { return _this._groupBy(item); }, function (newGroupByValue, _r) {
                  var grouperItemInfo = item[_this._ogmInfoKey];
                  _this._removeFromGroupArr(grouperItemInfo.groupByValue, grouperItemInfo.groupArrIndex);
                  var newGroupArr = _this._getGroupArr(newGroupByValue);
                  var newGroupArrIndex = newGroupArr.length;
                  newGroupArr.push(item);
                  grouperItemInfo.groupByValue = newGroupByValue;
                  grouperItemInfo.groupArrIndex = newGroupArrIndex;
              }),
          };
          Object.defineProperty(item, this._ogmInfoKey, {
              configurable: true,
              enumerable: false,
              value: value,
          });
          groupArr.push(item);
      };
      ObservableGroupMap.prototype._removeItem = function (item) {
          var grouperItemInfo = item[this._ogmInfoKey];
          this._removeFromGroupArr(grouperItemInfo.groupByValue, grouperItemInfo.groupArrIndex);
          grouperItemInfo.reaction();
          delete item[this._ogmInfoKey];
      };
      return ObservableGroupMap;
  })(mobx.ObservableMap));
  {
      Promise.resolve();
      if (typeof queueMicrotask !== "undefined") ;
      else if (typeof process !== "undefined" && process.nextTick) ;
      else ;
  }

  const directions$1 = {
      ascending: 1,
      decending: -1
  };

  function order$1(df, order_by = []) {
      if (order_by.length == 0) return df;

      const data = Array.from(df.values());
      const orderNormalized = normalizeOrder(order_by);
      const n = orderNormalized.length;

      data.sort((a,b) => {
          for (var i = 0; i < n; i++) {
              const order = orderNormalized[i];
              if (a[order.concept] < b[order.concept])
                  return -1 * order.direction;
              else if (a[order.concept] > b[order.concept])
                  return order.direction;
          } 
          return 0;
      });

      data.key = df.key;

      return DataFrame(data);
  }

  /**    
   * Process ["geo"] or [{"geo": "asc"}] to [{ concept: "geo", direction: 1 }];
   * @param {} order 
   */
  function normalizeOrder(order_by) {
      if (typeof order_by === "string") 
          return [{ concept: order_by, direction: directions$1.ascending }];
      return order_by.map(orderPart => {
          if (typeof orderPart == "string") {
              return { concept: orderPart, direction: directions$1.ascending };
          }	else {
              const concept   = Object.keys(orderPart)[0];
              const direction = orderPart[concept] == "asc" 
                  ? directions$1.ascending 
                  : directions$1.decending;
              return { concept, direction };
          }
      });
  }

  function getIter(iter) {
      if ("values" in iter && typeof iter.values === "function")
          return iter.values();
      return iter;
  }

  function isDataFrame(data) {
      return !!(data?.type == 'DataFrame' || data?.type == 'Group')
  }

  function isGroupedDataFrame(data) {
      return !!("descendantKeys" in data && Array.isArray(data.descendantKeys));
  }

  function isIterable$1(obj) {
      return Symbol.iterator in obj;
  }

  // returns true if a and b are identical, regardless of order (i.e. like sets)
  function arrayEquals$1(a, b) {
      const overlap = intersect$1(a, b);
      return overlap.length == a.length && overlap.length == b.length;
  }

  // intersect of two arrays (representing sets)
  // i.e. everything in A which is also in B
  function intersect$1(a, b) {
      return a.filter(e => b.includes(e));
  }

  function isNonNullObject$1(value) {
      return !!value && typeof value === 'object'
  }

  function normalizeKey(key) {
      return key.slice(0).sort();
  }

  const createKeyStr = (key) => normalizeKey(key).map(esc).join(joinchar);
  const joinchar = "¬";

  const dateCache = new Map();
  function dateToCachedString(d) {
      let int = d.getTime();
      if (!dateCache.has(int)) {
          dateCache.set(int, d.toISOString());
      }
      return dateCache.get(int);
  }

  function esc (str) {  
      if (str instanceof Date) return dateToCachedString(str); // .getTime();
      //if (isNumeric(str)) return str;
      //return replace(replace(str, escapechar, dblescape), joinchar, joinescape);
      return str; 
  }

  const createKeyFn = (space) => {
      space = normalizeKey(space);
      const l = space.length;
      return (row) => {
          const parts = [];
          for (let i = 0; i < l; i++) {
              parts[i] = esc(row[space[i]]);
          }
          return parts.join(joinchar);
      }
  };

  // end micro-optimizations

  function pick(object, keys) {
      const result = {};
      for (const key of keys) {
          if (key in object)
              result[key] = object[key];
      }
      return result;
  }

  function unique$1(...arrays) {
      const uniqueSet = new Set(arrays.flat());
      return Array.from(uniqueSet);
  }

  function fullJoin(joinParams, joinKey = normalizeParam(joinParams[0]).dataFrame.key) {
      
      const normalizedParams = normalizeParams(joinParams);
      const result = normalizedParams.reduce(
              _fullJoin, 
              DataFrame([], joinKey)
          );

      // fill unjoined fields with explicit undefined
      const fields = unique$1(normalizedParams.map(param => Object.values(param.projection)).flat(2));
      for (const row of result.values()) {
          for (const field of fields) {
              if (!(field in row))
                  row[field] = undefined;
          }
      }
      return result;

  }

  /**
   * Full join. Impure: Modifies left df. Left key is join key. Right key must contain all join key fields (can't use regular fields for joining).
   * @param {DataFrame} left DataFrame used as base for join
   * @param {*} rightCfg { dataFrame: DataFrame, projection: { origField: [ projFields, ... ] } }
   */
  function _fullJoin(left, rightCfg) {
      // join or copy right rows onto result
      const joinKey = left.key;
      const dataKey = rightCfg.dataFrame.key;
      const projection = rightCfg.projection;

      if (!joinKey.every(dim => rightCfg.dataFrame.fields.includes(dim)))
          console.warn("Right dataFrame does not contain all join fields.", { left, rightCfg });

      if (arrayEquals$1(joinKey, dataKey)) { 
          for (let keyStr of rightCfg.dataFrame.keys()) {
              const rightRow = rightCfg.dataFrame.getByStr(keyStr);
              const leftRow = getOrCreateRow(left, rightRow, keyStr);  
              // project with aliases        
              for(let key in projection) {
                  for (let field of projection[key]) {
                      leftRow[field] = rightRow[key];
                  }
              }
          }
      } else {
          const keyFn = createKeyFn(joinKey);
          for (let keyStr of rightCfg.dataFrame.keys()) {
              const rightRow = rightCfg.dataFrame.getByStr(keyStr);
              const leftKeyStr = keyFn(rightRow);
              const leftRow = getOrCreateRow(left, rightRow, leftKeyStr);  
              // project with aliases        
              for(let key in projection) {
                  for (let field of projection[key]) 
                      leftRow[field] = rightRow[key];
              }
          }
      }

      return left;
  }

  // change array ["geo","year"] to { geo: [ "geo" ], year: [ "year" ] }
  function normalizeParams(params) {
      return params
          .map(normalizeParam)
          .reduce((params, param) => {
              const baseParam = params.find(baseParam => baseParam.dataFrame === param.dataFrame);
              if (baseParam)
                  mergeProjections(baseParam, param);
              else
                  params.push(param);
              return params;
          }, []);
  }

  function normalizeParam(param) {
      if (isDataFrame(param))
          param = { dataFrame: param };

      if (!("projection" in param))
          param.projection = relativeComplement(param.dataFrame.key, param.dataFrame.fields);

      if (!Array.isArray(param.projection))
          return param;
      
      param.projection = param.projection.reduce((obj, field) => {
          obj[field] = [ field ];
          return obj;
      }, {});
      return param;
  }

  function mergeProjections(destParam, sourceParam) {
      for (const [sourceField, destFields] of Object.entries(sourceParam.projection)) {
          if (sourceField in destParam.projection) 
              destParam.projection[sourceField].push(...destFields);
          else   
              destParam.projection[sourceField] = destFields;
      }
  }

  function createObj(space, row, keyStr) {
      const obj = {
          [Symbol.for('key')]: keyStr
      };
      space.forEach(dim => obj[dim] = row[dim]);
      return obj;
  }

  function getOrCreateRow(df, row, keyStr) {
      let obj;

      obj = df.getByStr(keyStr);
      if (obj === undefined) {
          obj = createObj(df.key, row, keyStr);
          df.set(obj, keyStr);
      }
      
      return obj;
  }

  function MapStorage(data = [], keyArr = data.key || []) {
      
      const storage = createEmptyMap();
      storage.key = keyArr;
      storage.batchSet(data);

      return storage;
  }

  function createEmptyMap() {
      const storage = new Map();
      let key = [];

      // local references to functions which will be decorated
      const has = storage.has.bind(storage);
      const get = storage.get.bind(storage);
      const set = storage.set.bind(storage);

      Object.defineProperty(storage, 'fields', { 
          get: function () { 
              return unique$1(storage.key, Object.keys(storage.values().next().value ?? {}) ?? [])
          }
      });  
      storage.setKey = newKey => {
          key = normalizeKey(newKey);
          storage.incrementIndex = storage.key.length === 0; 
          storage.keyFn = storage.incrementIndex ? () => storage.size : createKeyFn(storage.key);
          storage.updateIndexes();
      };
      Object.defineProperty(storage, 'key', { 
          set: storage.setKey,
          get: () => key
      });    
      storage.has = key => storage.incrementIndex || typeof key == 'string' ? has(key) : has(storage.keyFn(key));
      storage.get = key => {
          key = storage.incrementIndex || typeof key == 'string' ? key : storage.keyFn(key);
          
          //if (!has(key))
          //    throw(new Error('Key not found in dataframe: ' + JSON.stringify(keyObj)))
          return get(key);
      };
      storage.set = (row, keyStr) => {
          // passing keyStr is optimization to circumvent keyStr generation (TODO: check performance impact)
          // if keyStr set, we assume it's correct. Only use when you know keyStr fits with current key dims
          if (keyStr === undefined || storage.incrementIndex) {
              keyStr = storage.keyFn(row);
              row[Symbol.for('key')] = keyStr;
          }
          set(keyStr, row);
      };
      storage.setByStr = set;
      storage.hasByStr = has;
      storage.getByStr = get;
      storage.hasByObjOrStr = (keyObj, keyStr) => has(keyStr);
      storage.getByObjOrStr = (keyObj, keyStr) => get(keyStr);
      storage.batchSet = data => batchSet(storage, data);
      storage.rows = storage.values;
      storage.updateIndexes = () => updateIndexes(storage);

      storage.setKey(key);
      return storage;
  }

  function batchSet(storage, data) {

      const iter = getIter(data);

      if (!storage.incrementIndex) {

          let keyStr;
          const duplicates = [];
          const keyFn = Array.isArray(data.key) && arrayEquals$1(storage.key, data.key)
              ? row => row[Symbol.for('key')]
              : row => row[Symbol.for('key')] = storage.keyFn(row);

          for (let row of iter) {
              keyStr = keyFn(row);
              if (storage.hasByStr(keyStr))
                  duplicates.push({ keyStr, orig: storage.getByStr(keyStr), new: row});
              storage.setByStr(keyStr, row);
          }

          if (duplicates.length > 0)
              console.warn('Found duplicates for given key when constructing dataframe.', { key: storage.key, duplicates });

      } else {
          for (let row of iter) {
              storage.set(row);
          }
      }

  }

  function updateIndexes(storage) {
      for (let [key, row] of storage) {
          storage.delete(key);
          // set won't overwrite any not-yet-deleted keys 
          // because key dims are either different 
          // or if they're identical, we just removed the key it would overwrite
          storage.set(row); 
      }
  }

  /**
   * Virtual data frame storage based on lookups. A row is constructed on request from lookups for each dimension of requested key.
   * @param {*} concepts Map of concepts. Each concept is a map of dimensions. Each dimension is a map of values on that dimension. E.g. name=>geo=>swe=>Sweden
   */
  function LookupStorage(concepts, keyArr) {
      const storage = {};
      storage.key = keyArr = normalizeKey(keyArr);
      storage.fields = new Set([...keyArr, ...concepts.keys()]);
      storage.data = concepts;
      storage.has = (keyObj) => {
          // true if there is at least one concept which has a lookup for every dimension in key
          // i.e. a row can be returned for this key
          return true; //[...concepts.values()].some(lookups => keyArr.every(dim => dim in keyObj && lookups.has(dim)));
      };    
      /**
      * Given a key like 
      * { 
      *      geo: 'swe', 
      *      gender: 'fem' 
      * } 
      * Returns e.g. 
      * { 
      *      name: { 
      *          geo: 'Sweden', 
      *          gender: 'Female' 
      *      }, 
      *      description: { 
      *          geo: 'foo', 
      *          gender: 'bar' 
      *      }
      *  }
      */
      storage.get = (keyObj) => {
          const row = {};
          concepts.forEach((lookups, concept) => {
              const entityProps = {};
              keyArr.forEach(dim => {
                  if (lookups.has(dim))
                      entityProps[dim] = lookups.get(dim).get(keyObj[dim]) ?? keyObj[dim];
                  else
                      entityProps[dim] = keyObj[dim];
              });
              row[concept] = entityProps;
          });
          return row;
      };
      storage.hasByObjOrStr = (keyObj, keyStr) => storage.has(keyObj);
      storage.getByObjOrStr = (keyObj, keyStr) => storage.get(keyObj);
      storage.set = (keyObj, value) => { 
          console.warn("Invalid operation. Generated dataframe does not support .set().");
      };
      storage.values = () => { console.warn("Generated dataframe .values() not implemented yet");};
      storage.delete = () => { console.warn("Invalid operation. Generated dataframe does not support .delete()");};
      storage[Symbol.iterator] = function* generate() {
          console.warn("Invalid operation. Generated dataframe iterator not yet implemented.");
      }; 
      return storage;
  }

  function copyColumn(df, srcCol, newCol) {
      for (let row of df.values()) {
          row[newCol] = row[srcCol];
      }
      return df;
  }

  // TODO: add check for non-marker space dimensions to contain only one value
          // -> save first row values and all next values should be equal to first

  /**
   * Join right on left with overlapping columns of key as join columns.
   * @param {*} left 
   * @param  {...any} rights 
   */
  function leftJoin(left, rights) {
      const leftDf = left.dataFrame;
      const leftKey = leftDf.key;

      rights = normalizeParams(rights);
      rights.forEach(r => { 
          r.sameKey = arrayEquals$1(r.dataFrame.key, leftKey);
      });

      const result = DataFrame([], leftKey);

      for (let keyStr of leftDf.keys()) {
          const row = leftDf.getByStr(keyStr);
          // left row as base
          const leftRow = cloneRow(row);
          
          // join any rows in right dfs which have same key as left row
          for (let r of rights) {
              const rightRow = r.sameKey 
                  ? r.dataFrame.getByStr(keyStr) 
                  : r.dataFrame.get(row);
                  
              for(let key in r.projection) {
                  for (let field of r.projection[key]) 
                      leftRow[field] = rightRow[key];
              }
          }
          
          // set row
          result.set(leftRow, keyStr);
      }
      return result;
  }

  function joinRows(...rows) {
      return Object.assign(...rows);
  }
  function cloneRow(row) {
      return joinRows({}, row);
  }

  // use projection feature of full join
  const project = (df, projection) => fullJoin([{ dataFrame: df, projection: projection }]);

  /**
   * Adds column to df, in place
   * @param {DataFrame} df 
   * @param {string} name 
   * @param {value|function} value 
   */
  function addColumn(df, name, value) {
      if (typeof value == "function") {
          for (let row of df.values()) {
              row[name] = value(row);
          }
      }
      else {    
          for (let row of df.values()) {
              row[name] = value;
          }
      }
      return df;
  }

  /**
   * Get extent (i.e. domain) of a property in an iterable of objects or an iterable nested in a dataFrameGroup. Possibly grouped by a certain other property value, which can be limited to a subset.
   * @param {*} iter 
   * @param {String} concept 
   * @param {String} groupby 
   * @param {[String]} groupSubset 
   * @returns An `[min, max]` array or an object with groupby values as properties and `[min, max]` arrays as values.
   */
  function extent(iter, concept, groupby, groupSubset) {
      if (isGroupedDataFrame(iter))
          return extentGroups(...arguments);
      else 
          return extentIterable(...arguments);
  }

  function extentGroups(groups, concept, groupBy, groupSubset) {

      return [...getIter(groups)]
          .map(group => extent(group, concept, groupBy, groupSubset))
          .reduce(combineResults);
  }
   
  function combineResults(one, two) {
      if (Array.isArray(one))
          return [Math.min(one[0], two[0]), Math.max(one[1], two[1])];
      else {
          for (let key in two) {
              if (!(key in one))
                  one[key] = two[key];
              else
                  one[key] = combineResults(one[key], two[key]);
          }
          return one;
      }
          
  }

  // in the style of d3.extent
  function extentIterable(iter, concept, groupby, groupSubset) {
      iter = getIter(iter);
      let row;

      if (groupby) {
          groupSubset = groupSubset ? Array.from(groupSubset) : groupSubset;
          let keyFn = Array.isArray(groupby) ? createKeyFn(groupby) : undefined;
          let groups = {};
          for (row of iter) {
              const group = keyFn(row);
              if (groupSubset && !groupSubset.includes(group))
                  continue;
              if (!groups[group]) groups[group] = [];
              groups[group] = minmax(row[concept], groups[group]);
          }
          return groups
      } else {
          let minmaxArr = [];
          for (row of iter) {
              minmaxArr = minmax(row[concept], minmaxArr);
          }
          return minmaxArr;
      }
  }

  /**
   * Faster extent algorithm for specific grouped dataframes which satisfy:
   *  - grouping by `concept` you want to get extent of (e.g. frame concept)
   *  - each group has `groupBy` as its key (e.g. country-gender)
   *  - grouping is ordered by `concept`
   *  - grouping is interpolated. I.e. every group between min-max contains `groupBy` (e.g. each frame between 2000-2019 contains 'country-usa').
   *  - groupSubSet is given.
   * 
   * Can be used for finding frame-extents of specific markers in frameMap for e.g. trails or timeslider limits
   * @param {*} groups 
   * @param {*} concept 
   * @param {*} groupBy 
   * @param {*} groupSubset 
   * @returns 
   */
   function extentOfGroupKeyPerMarker(group, groupSubset, concept = group.key[0], groupBy = group.descendantKeys[0]) {
          
      if (!isGroupedDataFrame(group)) throw("iterable is not a grouped dataframe");
      const descKeys = group.descendantKeys;
      if (!arrayEquals$1(group.key, [concept])) throw("grouping is not by given concept");
      if (descKeys.length != 1) throw("grouping is more than 1 level deep");
      if (!arrayEquals$1(descKeys[0], groupBy)) throw("grouping members keys is not same as `groupBy`");
      if (!isIterable$1(groupSubset)) throw("groupSubset iterable not given.");
      // can't O(1) check ordering & interpolation requirements

      const extents = {};
      for (let groupValue of groupSubset) {
          
          let min, max, member;
          
          for (member of group.values()) { // each frame
              if (member.hasByStr(groupValue)) { // if frame contains marker
                  if (min === undefined) {
                      min = member;
                  }
                  max = member; // ordered frames, so any subsequent frame is higher
              } else if (min) {
                  break; // marker missing, interpolated & ordered frames so won't find marker later either. This is max.
              }
          }

          extents[groupValue] = [min, max].map(member => member?.getByStr(groupValue)[concept]);
      }
      return extents;
  }

  function extentOfGroupKey(group) {
      if (group.key.length > 1) throw("Can't get group key extent if key size is > 1")

      let keyConcept = group.key[0];
      let minmaxArr = [];
      group.each((member) => {
          const keyObj = group.keyObject(member);
          minmaxArr = minmax(keyObj[keyConcept], minmaxArr);
      });
      return minmaxArr;
  }

  function extentIndicesOfGroupKey(group, { filter = () => true }) {
      if (group.key.length > 1) throw("Can't get group key extent if key size is > 1")
      
      let keyConcept = group.key[0];
      let i = 0, mini, maxi;
      let min, max;
      group.each((member) => {
          if (filter(member)) {
              const value = group.keyObject(member)[keyConcept];
              if (value != null) {
                  if (min === undefined) {
                      // find first comparable values
                      if (value >= value) { min = max = value; mini = maxi = i; }                } else {
                      // compare remaining values 
                      if (min > value) { min = value; mini = i; }                    if (max < value) { max = value; maxi = i; }                }
              }
          }
          i++;
      });
      return [mini, maxi];
  }

  function minmax(value, [min, max]) {
      
      if (value != null) {
          if (min === undefined) {
              // find first comparable values
              if (value >= value) min = max = value;
          } else {
              // compare remaining values 
              if (min > value) min = value;
              if (max < value) max = value;
          }
      }
      return [min, max]
  }

  function extrapolateGroup(group, options) {
      const { fields = group.fields, sizeLimit, indexLimit, ammendNewRow = r => r } = options;
      const frameKeys = [...group.keys()];
      // limits extrapolation to certain range, used by frame to limit to future filterRequired result
      const [firstIndex, lastIndex] = indexLimit ?? [0, frameKeys.length - 1]; 

      const groupFields = group.values().next().value.fields;
      const copyFields = relativeComplement(fields, groupFields);
      copyFields.push(Symbol.for('key'));

      function copyOrCreate(member, rowKey, sourceMarker) {
          let extraRow = member.getByStr(rowKey);
          if (extraRow !== undefined) {
              if (!(Symbol.for('extrapolated') in extraRow)) { 
                  // not yet copied, so copy
                  extraRow = assign({}, extraRow); 
                  extraRow[Symbol.for('extrapolated')] = {};
                  member.setByStr(rowKey, extraRow);
              }
          } else {
              extraRow = Object.assign(pickGetters(sourceMarker, copyFields), group.keyObject(member));
              ammendNewRow(extraRow);
              extraRow[Symbol.for('extrapolated')] = {};
              member.setByStr(rowKey, extraRow);
          }
          return extraRow;
      }

      const newGroup = group.copy();

      for (const field of fields) {
          const lastIndices = new Map();
          for (let idx = firstIndex; idx < lastIndex + 1; idx++) {
              const frameKey = frameKeys[idx];
              const frame = newGroup.get(frameKey);
              for (const markerKey of frame.keys()) {
                  const marker = frame.getByStr(markerKey);
                  if (marker[field] != null) {
                      if (!lastIndices.has(markerKey) && idx > 0) {
                          // first occurence, extrapolate backwards
                          const fromIdx = Math.max(firstIndex, idx - sizeLimit);
                          const frames = getFrames(newGroup, fromIdx, idx, frameKeys);
                          doExtrapolate(frames, marker, field, copyOrCreate);
                      }
                      // keep track of last occurence
                      lastIndices.set(markerKey, idx);
                  }
              }
          }
          for (const markerKey of lastIndices.keys()) {
              const lastSeenIndex = lastIndices.get(markerKey);
              if (lastSeenIndex === lastIndex)
                  continue;
              const sourceFrame = newGroup.get(frameKeys[lastSeenIndex]);
              const fromIdx = Math.min(lastIndex + 1, lastSeenIndex + 1);
              const toIdx = Math.min(lastIndex + 1, fromIdx + sizeLimit);
              const frames = getFrames(newGroup, fromIdx, toIdx, frameKeys);
              const sourceMarker = sourceFrame.getByStr(markerKey);
              doExtrapolate(frames, sourceMarker, field, copyOrCreate);
          }
      }

      return newGroup;
  }

  function getFrames(group, fromIdx, toIdx, frameKeys) {
      const frames = [];
      for (let i = fromIdx; i < toIdx; i++) {
          frames.push(group.get(frameKeys[i]));
      }
      return frames;
  }

  function doExtrapolate(frames, sourceMarker, field, copyOrCreate) {
      const markerKey = sourceMarker[Symbol.for('key')];
      for (const extraMember of frames) {
          const extraMarker = copyOrCreate(extraMember, markerKey, sourceMarker);
          extraMarker[field] = sourceMarker[field];
          extraMarker[Symbol.for('extrapolated')][field] = sourceMarker;
      }
  }

  /**
   * Interpolate within a dataframe. Fill missing values in rows. Inplace.
   * @param {*} df 
   */
  function interpolate(df, fields = df.fields) {
      for (let field of fields) {
          interpolateField(df, field);
      }
      return df;
  }

  function interpolateField(df, field) {
      const gap = newGap();
      for (let row of df.values()) {
          evaluateGap(row, field, gap);
      }
  }

  function newGap() {
      return {
          start: undefined,
          rows: []
      }
  }

  function evaluateGap(row, field, gap) {
      const { rows, start } = gap;
      const fieldVal = row[field];
      if (fieldVal == null) { // faster for undefined/null check
          if (start !== undefined)
              rows.push(row);
      } else {
          // fill gap if it exists and is inner
          if (rows.length > 0) {
              interpolateGap(rows, start, row, field);
              rows.length = 0;
          }
          gap.start = row;
      }
  }

  function interpolateGap(gapRows, startRow, endRow, field) {
      const startVal = startRow[field];
      const endVal = endRow[field];
      const int = d3.interpolate(startVal, endVal);
      const delta = 1 / (gapRows.length+1);
      let mu = 0;
      for (let gapRow of gapRows) {
          mu += delta;
          gapRow[field] = int(mu);
          if (!(Symbol.for('interpolated') in gapRow))
              gapRow[Symbol.for('interpolated')] = {};
          gapRow[Symbol.for('interpolated')] = { [field]: [startRow, endRow] };
      }
  }


  function interpolateGroup(group, { fields = group.fields, ammendNewRow = () => {} } = {}) {
      
      // what fields to interpolate?
      const groupFields = group.values().next().value.fields;
      const copyFields = relativeComplement(fields, groupFields);
      copyFields.push(Symbol.for('key'));

      //console.time('interpolate');
      const frameKeys = [...group.keys()];
      const numFrames = frameKeys.length;
      for (const field of fields) {
          const lastIndexPerMarker = new Map();
          for (let i = 0; i < numFrames; i ++) {
              const frame = group.get(frameKeys[i]);                  
              for (const markerKey of frame.keys()) {
                  const marker = frame.getByStr(markerKey);
                  if (marker[field] != null) {
                      const lastIndex = lastIndexPerMarker.get(markerKey);
                      if (lastIndex !== undefined && (i - lastIndex) > 1) {
                          const gapRows = []; // d3.range(lastIndex + 1, i).map(i => group.get(frameKeys[i]))
                          for (let j = lastIndex + 1; j < i; j++) {
                              const gapFrame = group.get(frameKeys[j]);
                              let gapRow = gapFrame.get(markerKey);
                              if (gapRow === undefined) {
                                  gapRow = Object.assign(pickGetters(marker, copyFields), group.keyObject(gapFrame));
                                  ammendNewRow(gapRow);
                                  gapRow[Symbol.for('interpolated')] = {};
                                  gapFrame.setByStr(markerKey, gapRow);
                              } else {
                                  if (!(Symbol.for('interpolated') in gapRow)) {
                                      gapRow = assign({}, gapRow);
                                      gapRow[Symbol.for('interpolated')] = {};
                                      gapFrame.setByStr(markerKey, gapRow);
                                  }
                              }
                              gapRows.push(gapRow);
                          }
                          const startRow = group.get(frameKeys[lastIndex]).get(markerKey);
                          const endRow = group.get(frameKeys[i]).get(markerKey);
                          interpolateGap(gapRows, startRow, endRow, field);
                      }
                      lastIndexPerMarker.set(markerKey, i);
                  }
              }
          }
          //console.log('finished interpolating field', field);
          //console.timeLog('interpolate');
      }
      //console.timeEnd('interpolate');
      return group;
  }

  // TODO: add check if there are rows that are don't fit stepfn 
  // (iterate over df and match one step of stepfn with step of iteration)
  function reindex(df, index) {
      const empty = createEmptyRow(df.fields);
      const result = DataFrame([], df.key);
      const keyConcept = df.key[0]; // supports only single indexed
      for (let key of index) {
          const keyObj = { [keyConcept]: key };
          const keyStr = df.keyFn(keyObj);
          const row = df.hasByStr(keyStr)
              ? df.getByStr(keyStr)
              : Object.assign({ }, empty, keyObj);
          result.setByStr(keyStr, row);
      }
      return result;
  }

  function createEmptyRow(fields) {
      const obj = {};
      for (let field of fields) obj[field] = null;
      return obj;
  }

  function reindexGroup(group, index) {
      const newGroup = DataFrameGroup([], group.key, group.descendantKeys);
      for (let i of index) {
          const keyObj = { [newGroup.key[0]]: i };
          const keyStr = newGroup.keyFn(keyObj);
          if (group.has(keyStr)) {
              let member = group.get(keyStr);
              newGroup.set(keyObj, member);
          } else {
              newGroup.createMember(keyObj);
          }
      }
      return newGroup;
  }

  function reindexGroupToKeyDomain(group, intervalSize) {
      if (group.size > 1) {
          const domain = group.keyExtent();
          const newIndex = inclusiveRange(domain[0], domain[1], intervalSize);
          group = reindexGroup(group, newIndex);
      }
      return group;
  }

  /**
   * 
   * @param {*} df DataFrame from which to create groups
   * @param {*} key key by which is grouped
   * @param {*} descKeys keys of members and their descendants
   */
  function DataFrameGroup(data, key, descKeys = []) {

      if (!Array.isArray(descKeys)) descKeys = [[descKeys]]; // desc keys is single string (e.g. 'year')
      if (!Array.isArray(descKeys[0])) descKeys = [descKeys]; // desc keys is one key (e.g. ['year'])
      if (!Array.isArray(key)) key = [key]; // key is single string (e.g. 'year')
      if (descKeys.length === 0 && data.key) descKeys = [data.key];  // descKeys is empty
      
      return createGroup(key, descKeys)
          .batchSetRow(data);
  }

  function createGroup(key, descendantKeys) {
      const group = new Map();
      const keyObjects = new WeakMap();
      const set = group.set.bind(group);

      group.type = 'Group';
      group.key = key;
      group.keyObject = member => keyObjects.get(member);
      group.keyFn = createKeyFn(key);
      group.descendantKeys = descendantKeys;
      group.each = (fn) => each(group, fn);
      group.map = (fn) => map(group, fn);
      // group.mapCall = (fn) => mapCall(group, fn); // not exposing mapcall
      group.interpolate = mapCall(group, "interpolate");
      group.filter = mapCall(group, "filter");
      group.filterNullish = mapCall(group, "filterNullish");
      group.order = mapCall(group, "order");
      group.reindex = mapCall(group, "reindex");
      group.interpolate = mapCall(group, "interpolate");
      group.extrapolate = mapCall(group, "extrapolate");
      group.reindexGroup = index => reindexGroup(group, index);
      group.reindexToKeyDomain = intervalSize => reindexGroupToKeyDomain(group, intervalSize);
      group.interpolateOverMembers = options => interpolateGroup(group, options);
      group.extrapolateOverMembers = options => extrapolateGroup(group, options);
      group.copy = () => group.map(member => member.copy());
      group.flatten = (key) => flatten(group, key);
      group.extent = (concept, groupBy, groupSubset) => extent(group, concept, groupBy, groupSubset),
      group.keyExtent = () => extentOfGroupKey(group);
      group.keyExtentIndices = options => extentIndicesOfGroupKey(group, options);
      group.extentOfGroupKeyPerMarker = (groupSubset) => extentOfGroupKeyPerMarker(group, groupSubset),
      group.groupBy = (key) => {
          for (let [keyStr, member] of group) {
              const keyObj = group.keyObject(member);
              const newMember = member.groupBy(key);

              // groups change from DataFrame to group
              if (member.type === 'DataFrame')
                  group.set(keyObj, newMember);
          }
          group.descendantKeys.push(key);
          return group;
      };
      group.createMember = (keyObj) => createMember(group, keyObj);
      group.toJSON = () => mapToObject(group);
      group.rows = function* () {
          let member, row; 
          for (member of group.values()) {
              for (row of member.rows()) // get rows recursively
                  yield row;
          }
      };
      group.filterGroups = (filterFn, inplace = false) => {
          let result = inplace ? group : DataFrameGroup([], group.key, group.descendantKeys);
          for (let [key, member] of group) {
              const keyObj = group.keyObject(member);
              const newMember = member.filterGroups(filterFn, inplace);
              const filterApplies = filterFn(newMember);
              if (!inplace && filterApplies)
                  result.set(keyObj, newMember);
              if (inplace && !filterApplies) 
                  result.delete(key);
          }
          return result;
      };
      group.set = (keyObj, member) => {
          keyObjects.set(member, keyObj);
          const keyStr = group.keyFn(keyObj);
          return set(keyStr, member);
      };
      group.setRow = (row, key) => {
          return getDataFrame(group, row)
              .set(row, key);
      };
      group.batchSetRow = (data) => {
          const descKeys = group.descendantKeys;
          if (data.key?.length > 0 && arrayEquals$1(data.key, descKeys[descKeys.length - 1])) {
              for (let row of data.values()) {
                  getDataFrame(group, row)
                      .setByStr(row[Symbol.for('key')], row);
              }
          } else {
              for (let row of data.values()) {
                  getDataFrame(group, row)
                      .set(row);
              }
          }
          return group;
      };
      return group;
  }

  function each(group, fn) {
      for (let [keyStr, member] of group) {
          fn(member, keyStr, group);
      }
      return group;
  }

  function map(group, fn) {
      let result = DataFrameGroup([], group.key, group.descendantKeys);
      for (let [keyStr, member] of group) {
          const keyObj = group.keyObject(member);
          result.set(keyObj, fn(member, keyStr, group));
      }
      return result;
  }

  function mapCall(group, fnName) {
      return function() {
          let result = DataFrameGroup([], group.key, group.descendantKeys);
          for (let [keyStr, member] of group) {
              const keyObj = group.keyObject(member);
              result.set(keyObj, member[fnName](...arguments));
          }
          return result;
      }
  }

  /**
   * 
   * @param {*} group the group to find dataframe in
   * @param {*} row data row to find dataframe for
   */
  function getDataFrame(group, row) {
      if (group.type == 'DataFrame') return group;
      let member;
      if (!row) {
          member = group.values().next().value;
      } else {
          const keyObj = pick(row, group.key);
          const keyStr = group.keyFn(keyObj);
          if (group.has(keyStr)) {
              member = group.get(keyStr);
          } else {
              member = group.createMember(keyObj);
          }
      }
      return getDataFrame(member, row);
  }

  function createMember(group, keyObj) {
      // DataFrames have no children of their own (= leafs)
      const newMember = group.descendantKeys.length === 1
          ? DataFrame([], group.descendantKeys[0])
          : DataFrameGroup([], group.descendantKeys[0], group.descendantKeys.slice(1));
      
      group.set(keyObj, newMember);
      return newMember;
  }

  function flatten(group, result) {
      for (let member of group.values()) {
          if (member.type == 'Group') {
              result = flatten(member, result);
          } else {
              if (!result)
                  result = DataFrame(member, member.key);
              else 
                  result.batchSet(member);
          }
      } 
      return result;
  }

  function groupBy(df, groupKey, memberKey = df.key) {

      return DataFrameGroup(df, groupKey, memberKey);
      
  }

  function fillNull(df, fillValues) {
      let concept, row;
      // per concept fill
      if (isNonNullObject$1(fillValues)) {
          for (concept in fillValues) {
              const fillValue = fillValues[concept];
              // per concept function fill
              if (typeof fillValue == "function") {
                  for (row of df.values()) {
                      if (row[concept] === null)
                          row[concept] = fillValue(row);
                  }
              }
              // per concept constant fill
              else {
                  for (row of df.values()) {
                      if (row[concept] === null)
                          row[concept] = fillValue;
                  }
              }
          }
      }
      // constant fill
      else {
          for (row of df.values()) {
              for (concept in row) {
                  if (row[concept] === null)
                      row[concept] = fillValues;
              }
          }
      }
      return df;
  }

  function unique(iter, concept) {
      iter = getIter(iter);
      
      const unique = new Set();
      for (let row of iter) 
          unique.add(row[concept]); 

      return [...unique];
  }

  const copy = df => DataFrame(df);

  /*
    "Differentiate" a given field in this dataframe.
  */
  function differentiate(df, xField = 'x', yField = 'time') {
    let prevX;
    for (let row of df.values()) {
      const difference = prevX ? row[xField] - prevX : 0;
      prevX = row[xField];
      row[xField] = difference;
    }
    return df;
  }

  /**
   * Interplate between two DataFrames
   * @param {*} from 
   * @param {*} to 
   * @param {*} mu 
   */
  function interpolateBetween(from, to, mu) {
      const df = DataFrame([], from.key);
      
      let newRow, row2;
      for(const key of from.keys()) {
          const row1 = from.getByStr(key);
          row2 = to.getByStr(key);
          if (!row2) continue;
          if (row2 !== row1) { // same object, depends on trails using same object for trail markers across frames.
              newRow = Object.assign({}, row1);
              for (let field in newRow) {
                  newRow[field] = d3.interpolate(row1[field], row2[field])(mu);
              }
          } else {
              newRow = row1;
          }   
          df.set(newRow, newRow[Symbol.for('key')]);
      }
      return df;
  }

  const fromLookups = (concepts, key) => constructDataFrame(LookupStorage(concepts, key));
  const fromArray = (data = [], key = data.key || []) => constructDataFrame(MapStorage(data, key));

  const DataFrame = fromArray;
  DataFrame.fromLookups = fromLookups;
  DataFrame.fromArray = fromArray;

  function constructDataFrame(storage) {
      // https://medium.com/javascript-scene/the-hidden-treasures-of-object-composition-60cd89480381
      // compose storage and DF methods by concatenation 
      // concatenation instead of aggregation/delegation as there is no overlap in keys and 
      // we want the full storage API to be available on the DataFrame
      const df = Object.assign(storage,
          {        
              // transforms
              order: (direction) => order$1(df, direction), 
              leftJoin: (joinParams) => leftJoin({ dataFrame: df }, joinParams),
              fullJoin: (joinParams, key) => fullJoin([df, ...joinParams], key),
              copyColumn: (src, dest) => copyColumn(df, src, dest),
              filter: (filterObj) => filter$1(df, filterObj),
              filterNullish: (fields) => filterNullish(df, fields),
              project: (projection) => project(df, projection),
              addColumn: (name, value) => addColumn(df, name, value),
              groupBy: (groupKey, memberKey) => groupBy(df, groupKey, memberKey),
              interpolate: () => interpolate(df),
              interpolateTowards: (df2, mu) => interpolateBetween(df, df2, mu),
              reindex: (iterable) => reindex(df, iterable),
              fillNull: (fillValues) => fillNull(df, fillValues),
              copy: () => copy(df),
              differentiate: (xField) => differentiate(df, xField),
      
              // info
              extent: (concept, groupBy, groupSubset) => extent(df, concept, groupBy, groupSubset),
              unique: (concept) => unique(df, concept),
              type: 'DataFrame',
          
              // export
              toJSON: () => [...df.values()]
          },
          {
              filterGroups: (filterFn, inplace = false) => {
                  return inplace ? df : df.copy();
              },
              setRow: (row, keyStr) => df.set(row, keyStr)
          }
      );

      return df;
  }

  /**
   * Filters dataframe based on either filter function or DDFQL filter specification
   * @param {DataFrame} df 
   * @param {Function|FilterSpec} filter 
   */
  function filter$1(df, filter) {

      if (!validFilterArg(filter))
          return df;

      const filterFn = (typeof filter == "function") ? 
          filter : createFilterFn(filter);    

      const result = DataFrame([], df.key);
      for(let key of df.keys()) {
          const row = df.getByStr(key);
          if (filterFn(row))
              result.set(row, key);
      }

      return result;
  }

  function validFilterArg(filter) {
      return filter && (typeof filter === "function" || Object.keys(filter).length > 0)
  }

  /**
   * Create a function, given a filter spec
   * @param {Object} filterSpec Filter specification according to DDFQL WHERE spec
   * @returns {Function} Filter function, which takes an object and returns a boolean representing if the object satifies the filterSpec
   */
  function createFilterFn(filterSpec = {}) {
      let fn = 'return ';
      fn += createFilterFnString(filterSpec);
      fn += ';';
      return new Function('row', fn);
  }

  function normalizeFilter(filterSpec) {
      
      filterSpec = deepclone(filterSpec);
      filterSpec = implicitAnd(filterSpec);
      filterSpec = implicitEq(filterSpec);

      return filterSpec;

      function implicitAnd(filter) {
          const keys = Object.keys(filter);
          if (keys.length > 1) {
              return { $and: 
                  keys.map(key => ({ [key]: filter[key] }))
              };
          } else {
              return filter;
          }
      }
      
      function implicitEq(filter) {
          const key = Object.keys(filter)[0];
          if (!key.startsWith('$') && typeof filter[key] != "object") {
              filter[key] = { $eq: filter[key] };
          }
          return filter;
      }
  }

  /**
   * Returns a string function body for the given filter spec. This method was tested to be faster than walking through filterSpec "run-time".
   * @param {*} filterSpec 
   * @returns 
   */
  function createFilterFnString(filterSpec) {
      filterSpec = normalizeFilter(filterSpec);
      let key = Object.keys(filterSpec)[0];
      if (key.startsWith('$')) {
          return logicalToString[key](filterSpec[key]);
      } else {
          const operator = Object.keys(filterSpec[key])[0];
          return comparisonToString[operator](key, JSON.stringify(filterSpec[key][operator]));
      } 
      
  }

  const logicalToString = {
      '$not': (spec) => `!${createFilterFnString(spec)}`,
      '$and': (spec) => `(${spec.map(createFilterFnString).join(' && ')})`,
      '$or':  (spec) => `(${spec.map(createFilterFnString).join(' || ')})`,
      '$nor': (spec) => `!(${spec.map(createFilterFnString).join(' || ')})`,
  };
  const comparisonToString = {
      "$eq":  (field, val) => `row.${field} === ${val}`,
      "$ne":  (field, val) => `row.${field} !== ${val}`,
      "$gt":  (field, val) => `row.${field} > ${val}`,
      "$gte": (field, val) => `row.${field} >= ${val}`,
      "$lt":  (field, val) => `row.${field} < ${val}`,
      "$lte": (field, val) => `row.${field} <= ${val}`,
      "$in":  (field, val) => `${val}.includes(row.${field})`,
      "$nin": (field, val) => `!${val}.includes(row.${field})`,
  };

  //used by "filterRequired" transform
  function filterNullish(df, fields) {
      let filterParam = fields.every(isString)
          ? simpleNullishCheck(fields)
          : nullishFilterSpec(fields);
      return filter$1(df, filterParam);
  }

  // simple, fast filtering using function that checks for nullish value
  function simpleNullishCheck(fields) {
      const l = fields.length;
      return row => {
          //faster implementation with a for-loop
          for (let i = 0; i < l; i++) {
              if (row[fields[i]] == null) return false;
          }
          return true;
      }
  }

  // used for "repeat" encoding for example
  // allows defining fields with logical conditions like: [{ $or: ['x','x1'] }, 'y']
  function nullishFilterSpec(fields) {
      return { $nor: makeSpec(fields) }
      function makeSpec(fields) {
          return fields.map(predicate => {
              if (typeof predicate === 'string') {
                  return { $or: [ { [predicate]: { $eq: null } }, { [predicate]: { $eq: undefined } }] };
              } else {
                  return Object.fromEntries(Object.entries(predicate).map(([key, value]) => {
                      return [key, makeSpec(value)]
                  }))
              }
          })
      }
  }

  const isNumeric = (n) => !isNaN(n) && isFinite(n);

  function isString(value) {
      return typeof value == 'string' || value instanceof String;
  }

  function isEntityConcept(concept) {
      return ["entity_set", "entity_domain"].includes(concept.concept_type);
  }

  function isModel(model) {
      return isNonNullObject(model) && "config" in model;
  }

  function isDataSource(model) {
      return isModel(model) && model.type == "dataSource";
  }

  function isDataConfig(model) {
      return isModel(model) && model.type == "dataConfig";
  }

  function isFilter(model) {
      return isModel(model) && model.type == "filter";
  }

  function mapToObj(map) {
      const obj = {};
      map.forEach((v, k) => { obj[k] = v; });
      return obj;
  }

  function mode(arr = []) {
      return arr.reduce( ( acc, el ) => {
          acc.c[el] = acc.c[el] ? acc.c[el] + 1 : 1;
          acc.max = acc.max ? acc.max < acc.c[el] ? el : acc.max : el;
          return acc  
      }, { c:{} }).max
  }

  // intersect of two arrays (representing sets)
  // i.e. everything in A which is also in B
  function intersect(a, b) {
      return a.filter(e => b.includes(e));
  }

  /**
   * Is A a proper subset of B
   * Every A is in B, but A != B
   * @param {*} a 
   * @param {*} b 
   */
  function isProperSubset(a, b) {
      const intersection = intersect(a,b);
      return intersection.length == a.length && intersection.length != b.length;
  }

  function subsets(array) { 
      return array.reduce(
          (subsets, value) => [...subsets.map(set => [...set, value]), ...subsets],
          [[]]
      )
  }

  /**
   * Everything in B which is not in A. Relative complement (difference, B\A) of A with respect to B.
   * A=[geo,year], B=[geo,year,gender], B\A = [gender]
   * @param {Array|Set} a Array/Set representing set A
   * @param {Array|Set} b Array/Set representing set B
   */
  function relativeComplement(a, b) {
      if (a.has) {
          const result = [];
          for (let e of b) if (!a.has(e)) result.push(e);
          return result;
      }
      return b.filter(e => !a.includes(e));
  }

  function concatUnique(...arrays) {
      return Array.from(new Set(arrays.flat()));
  }

  // returns true if a and b are identical, regardless of order (i.e. like sets)
  function arrayEquals(a, b) {
      const overlap = intersect(a, b);
      return overlap.length == a.length && overlap.length == b.length;
  }

  // copies properties using property descriptors so accessors (and other meta-properties) get correctly copied
  // otherwise if you do regular Object.assign it would read directly from the object and execute getters 
  // and the return values would be what it assigns. but we want to actually copy getters and setters

  // source: https://www.webreflection.co.uk/blog/2015/10/06/how-to-copy-objects-in-javascript
  // rewrote for clarity and make sources overwrite target (mimic Object.assign)
  function assign(target, ...sources) {
      sources.forEach(source => {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      });
      return target;
  }
  function composeObj(...parts) {
      return assign({}, ...parts);
  }

  function ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // gets a getter accessor from an object and binds it to the object
  // used to overload methods when decorating objects
  function getBoundGetter(obj, prop) {
      return Object.getOwnPropertyDescriptor(obj, prop).get.bind(obj);
  }

  function moveProperty(oldObj, oldProp, newObj, newProp) {
      Object.defineProperty(newObj, newProp, Object.getOwnPropertyDescriptor(oldObj, oldProp));
  }
  function renameProperty(obj, oldProp, newProp) {
      moveProperty(obj, oldProp, obj, newProp);
  }

  function fromPromiseAll(promiseColl) {
      const promiseArray = Array.isArray(promiseColl) ? promiseColl : Object.values(promiseColl);
      if (promiseArray.every(p => p.state == "fulfilled"))
          return fromPromise.resolve(promiseColl);
      if (promiseArray.some(p => p.state == "rejected"))
          return fromPromise.reject(promiseColl);
      return fromPromise((res, rej) => { });
  }

  /**
   * Checks all states in parallel
   * @param {string[]} states 
   * @returns 
   */
  function combineStates(states) {
      if (states.some(state => state === "rejected")) return "rejected";
      if (states.every(state => state === "fulfilled")) return "fulfilled";
      return "pending";
  }

  /**
   * Checks all states sequantially (only check-trigger next state if previous is fulfilled)
   * @param {function[]} states state getters
   * @returns 
   */
  function combineStatesSequential(states) {
      if (!states.every(state => typeof state == 'function')) {
          throw new Error("Every state given to combineStatesSequential should be wrapped in a getter function.")
      }
      for (let state of states) {
          // state getter allows us to only read state (and thus trigger upstream computeds) when earlier states are fulfilled
          state = state();
          if (state == 'pending') return 'pending';
          if (state == 'rejected') return 'rejected';
      }
      return 'fulfilled';
  }

  // code from https://github.com/TehShrike/is-mergeable-object
  function isMergeableObject(value) {
      return isNonNullObject(value) &&
          !isSpecial(value)
  }

  function isNonNullObject(value) {
      return !!value && typeof value === 'object'
  }

  function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);

      return stringValue === '[object RegExp]' ||
          stringValue === '[object Date]' ||
          mobx.isObservableArray(value) ||
          isReactElement(value)
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE
  }

  // c merge and helpers
  // code from https://github.com/KyleAMathews/deepmerge
  function emptyTarget(val) {
      return Array.isArray(val) ? [] : {}
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
      return (options.clone !== false && options.isMergeableObject(value)) 
          ? deepmerge(emptyTarget(value), value, options) 
          : Object.prototype.toString.call(value) == '[object Date]'
              ? new Date(value.getTime())
              : value;
  }

  function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
          Object.keys(target).forEach(function(key) {
              destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
          });
      }
      Object.keys(source).forEach(function(key) {
          if (!options.isMergeableObject(source[key]) || !target[key]) {
              destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
          } else {
              destination[key] = deepmerge(target[key], source[key], options);
          }
      });
      return destination
  }

  const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

  function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || overwriteMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;

      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

      if (!sourceAndTargetTypesMatch) {
          return cloneUnlessOtherwiseSpecified(source, options)
      } else if (sourceIsArray) {
          return options.arrayMerge(target, source, options)
      } else {
          return mergeObject(target, source, options)
      }
  }

  deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
          throw new Error('first argument should be an array')
      }

      return array.reduce(function(prev, next) {
          return deepmerge(prev, next, options)
      }, {})
  };

  function deepclone(object) {
      return deepmerge({}, object);
  }

  function createModel(modelType, config, parent, id) {
      //suffix for debugging
      let nameSuffix = id ? '-' + id : parent?.name ? '-' + parent.name : '';
      let model = mobx.observable(
          //actual constructor
          modelType.nonObservable(config, parent, id), 
          //decorators
          modelType.decorate,
          //extra options: name of observable
          { name: (modelType.name || config.modelType || 'base') + nameSuffix }
      );
      //lifecycle function
      if (model.onCreate) model.onCreate();
      return model;
  }

  function defaultDecorator({ base, renameProperties = {}, defaultConfig = {}, functions = {} }) {
      if (Array.isArray(functions)) functions = assign({}, ...functions);
      const newType = function (config, parent, id) {
          return createModel(newType, config, parent, id)
      };
      newType.nonObservable = function(config, parent, id) {
          applyDefaults(config, defaultConfig);
          delete functions.config;
          if (!base) base = (config, parent) => ({ config, parent });
          const baseObj = base.nonObservable(config, parent, id);
          for (const prop in renameProperties) {
              renameProperty(baseObj, prop, renameProperties[prop]);
          }
          return assign(baseObj, functions);
      };
      newType.decorate = base.decorate;
      return newType;
  }

  const applyDefaults = mobx.action('applyDefaults', function applyDefaults(config, defaults) {
      const defaultProps = Object.keys(defaults);
      defaultProps.forEach(prop => {
          if (!config.hasOwnProperty(prop)) {
              if (isMergeableObject(defaults[prop]))
                  config[prop] = deepclone(defaults[prop]); // object
              else
                  config[prop] = defaults[prop]; // non object, i.e. value
          } else if (isMergeableObject(defaults[prop])) {
              if (isMergeableObject(config[prop]))
                  applyDefaults(config[prop], defaults[prop]);
          }
      });
      return config;
  });

  function equals(a,b) {
      if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime();
      }
      return a === b;
  }

  function clamp(value, min, max) {
      if (Array.isArray(min))
          [min, max] = min;
      if (value > max)
          return max;
      if (value < min)
          return min;
      return value;
  }

  function configValue(value, concept) {
      if (value instanceof Date) {
          return concept?.format ? d3.utcFormat(concept.format)(value) : formatDate(value);
      }
      return ""+value;
  }


  function range(start, stop, intervalSize) {
      return interval(intervalSize).range(start, stop);
  }

  function interval(intervalSize) {
      const nonTimeInterval = {
          offset: (n, d) => isNumeric(n) && isNumeric(d) ? n + d : console.error("Can't offset using non-numeric values", { n, d }),
          range: d3.range,
          floor: Math.floor,
          ceil: Math.ceil,
          round: Math.round
      };
      //case for quarter
      if (intervalSize === "quarter") return d3.utcMonth.every(3);
      //special case to make weeks start from monday as per ISO 8601, not sunday
      if (intervalSize === "week") intervalSize = "monday";
      return d3['utc' + ucFirst(intervalSize)] || nonTimeInterval;
  }

  function inclusiveRange(start, stop, intervalSize) {
      if (!start || !stop) return [];
      return range(start, stop, intervalSize).concat(stop);
  }

  const defaultParsers = [
      d3.utcParse('%Y'),
      d3.utcParse('%Y-%m'),
      d3.utcParse('%Y-%m-%d'),
      d3.utcParse('%Yw%V'),
      d3.utcParse('%Yq%q'),
      d3.utcParse('%Y-%m-%dT%HZ'),
      d3.utcParse('%Y-%m-%dT%H:%MZ'),
      d3.utcParse('%Y-%m-%dT%H:%M:%SZ'),
      d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ')
  ];

  function tryParse(timeString, parsers) {
      for (let i = 0; i < parsers.length; i++) {
        let dateObject = parsers[i](timeString);
        if (dateObject) return dateObject;
      }
      console.warn('Could not parse time string ' + timeString);
      return null;
  }

  /**
   * Parses string `valueStr` to different type, depending on `concept` type. 
   * Type `time` is parsed to `Date`, `measure` to `number`, any other to string. 
   * If `valueStr` is not a string, it is returned as is.
   * 
   * @param {string} valueStr String to parse
   * @param {Object} concept Concept object of which valueStr is a value
   */
  function parseConfigValue(valueStr, concept) {
      if (!isString(valueStr)) return valueStr;

      const { concept_type } = concept;

      if (concept_type === "time") {
          let parsers = concept.format 
              ? [d3.utcParse(concept.format), ...defaultParsers]
              : defaultParsers;
          return tryParse(valueStr, parsers);
      }

      if (concept_type === "measure") {
          return +valueStr;
      }

      return ""+valueStr;
  }

  function autoFormat(o) {
      if (o instanceof Date)
          return formatDate(o)
      return ""+o;
  }

  function formatDate(date) {
      var month = date.getUTCMonth(),
          day = date.getUTCDate(),
          hours = date.getUTCHours(),
          minutes = date.getUTCMinutes(),
          seconds = date.getUTCSeconds(),
          milliseconds = date.getUTCMilliseconds();
      return isNaN(date) ? "Invalid Date"
          : milliseconds ? formatFullDate(date) + "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
          : seconds ? formatFullDate(date) + "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
          : minutes || hours ? formatFullDate(date) + "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
          : day !== 1 ? formatFullDate(date)
          : month ? formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2)
          : formatYear(date.getUTCFullYear());
  }

  function formatFullDate(date) {
      return formatYear(date.getUTCFullYear()) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2);
  }

  function formatYear(year) {
      return year < 0 ? "-" + pad(-year, 6)
          : year > 9999 ? "+" + pad(year, 6)
          : pad(year, 4);
  }

  function pad(value, width) {
      var s = value + "", length = s.length;
      return length < width ? new Array(width - length + 1).join(0) + s : s;
  }
      
  const defer = setTimeout;
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function compose2(f, g) {
      return (...args) => f(g(...args));
  }
  function compose(...fns) {
      return fns.reduce(compose2);
  }
  function pipe(...fns) {
      return fns.reduceRight(compose2);
  }

  /**
   * Creates a stable, unique string representing the object, circumventing the unordered nature of object properties
   * @param {Object} obj 
   * @returns {String} Stable string representation of object
   */
  function stableStringifyObject(obj) { 
      return JSON.stringify(canonicalObject(obj));
  }

  /**
   * Recursively replace any object by an array where each element is on of the object's properties, sorted by the property name.
   * Can be used as stable input for hashing objects, circumventing the unordered nature of object properties.
   * @param {Object} where 
   * @returns {Array}
   */
  function canonicalObject(where) {
      if (!isNonNullObject(where)) 
          return where;
      const keys = Object.keys(where).sort();
      return keys.map(key => ({ [key]: canonicalObject(where[key]) }));
  }

  /**
   * Function for Array#sort which doesn't convert values to strings. Dates will be converted to integers and thus sort chronologically.
   * @param {*} a 
   * @param {*} b 
   * @returns 
   */
  const sortDateSafe = (a, b) => a > b ? 1 : a < b ? -1 : 0; 

  /**
   * Returns value for `key` in `map`. If `key` not in map, first create new value using `create` getter function and set it to `key`.
   * @param {Map} map Map to get from
   * @param {Any} key Key to map
   * @param {Function} create Function which returns new value for new keys
   */
  function getOrCreate(map, key, create) {
      let value;
      if (map.has(key))
          value = map.get(key);
      else {
          value = create();
          map.set(key, value);
      }
      return value;
  }

  /**
   * Return filtered object(shallow cloned)
   * @param {Object} obj 
   * @param {Function} filter
   */
  function filterObject(obj, filter) {
      let result = {}, key;

      for (key in obj) {
          if (obj.hasOwnProperty(key) && filter(obj[key], key)) {
              result[key] = obj[key];
          }
      }

      return result;
  }

  function createSpaceFilterFn(filterSpec = {}, dataConfig) {
      if (Object.keys(filterSpec) == 0) {
          return () => true;
      }
      const filterFn = createFilterFn(filterSpec);
      const source = dataConfig.source;
      return function filter(spaceArray) {
          return spaceArray
              .map(dim => typeof dim != 'object' ? source.getConcept(dim) : dim)
              .every(filterFn);
      }
  }

  function pickGetters(object, keys) {
      const result = {};
      for (const key of keys) {
          if (key in object)
              Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(object, key));
      }
      return result;
  }


  function getConceptsCatalog(concepts, dataConfig, maxDepth) {
      const promises = [];
      const result = {};
      const source = dataConfig.source;
      for (const conceptId of concepts) {
          const concept = source.getConcept(conceptId);
          result[conceptId] = {
              concept
          };
          if (source.isEntityConcept(conceptId)) {
              const entityQuery = dataConfig.createQuery({ 
                  space: [conceptId],  
                  concept: ["name", "rank"],
                  locale: dataConfig.locale,
                  source
              });
              promises.push(source.query(entityQuery).then(response => {
                  result[conceptId]['entities'] = response.forQueryKey();
              }));
              if (maxDepth && maxDepth > 0) {
                  const props = source.availability.keyValueLookup.get(conceptId).keys();
                  const propDetails = getConceptsCatalog(props, dataConfig, maxDepth - 1);
                  promises.push(propDetails.then(response => {
                      result[conceptId]['properties'] = response;
                  }));
              }
          }
      }
      return Promise.all(promises).then(() => result);
  }

  function removeOnce(arr, value) {
      let index = arr.indexOf(value);
      if (index > -1) {
          arr.splice(index, 1);
      }
      return arr;
  }

  function lazyAsync(asyncFn, obsObj, obsProp) {
      let lazyDisposer;
      const dispObs = mobx.onBecomeObserved(obsObj, obsProp, () => {
          lazyDisposer = mobx.autorun(asyncFn);
      });
      const dispUnobs = mobx.onBecomeUnobserved(obsObj, obsProp, () => {
          lazyDisposer();
      });
      return () => {
          dispObs();
          dispUnobs();
          lazyDisposer?.();
      }
  }

  function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  var utils$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isNumeric: isNumeric,
    isString: isString,
    isEntityConcept: isEntityConcept,
    isModel: isModel,
    isDataSource: isDataSource,
    isDataConfig: isDataConfig,
    isFilter: isFilter,
    mapToObj: mapToObj,
    mode: mode,
    intersect: intersect,
    isProperSubset: isProperSubset,
    subsets: subsets,
    relativeComplement: relativeComplement,
    concatUnique: concatUnique,
    arrayEquals: arrayEquals,
    assign: assign,
    composeObj: composeObj,
    ucFirst: ucFirst,
    getBoundGetter: getBoundGetter,
    moveProperty: moveProperty,
    renameProperty: renameProperty,
    fromPromiseAll: fromPromiseAll,
    combineStates: combineStates,
    combineStatesSequential: combineStatesSequential,
    isMergeableObject: isMergeableObject,
    isNonNullObject: isNonNullObject,
    deepmerge: deepmerge,
    deepclone: deepclone,
    createModel: createModel,
    defaultDecorator: defaultDecorator,
    applyDefaults: applyDefaults,
    equals: equals,
    clamp: clamp,
    configValue: configValue,
    range: range,
    interval: interval,
    inclusiveRange: inclusiveRange,
    parseConfigValue: parseConfigValue,
    autoFormat: autoFormat,
    defer: defer,
    sleep: sleep,
    compose: compose,
    pipe: pipe,
    stableStringifyObject: stableStringifyObject,
    sortDateSafe: sortDateSafe,
    getOrCreate: getOrCreate,
    filterObject: filterObject,
    createSpaceFilterFn: createSpaceFilterFn,
    pickGetters: pickGetters,
    getConceptsCatalog: getConceptsCatalog,
    removeOnce: removeOnce,
    lazyAsync: lazyAsync,
    isIterable: isIterable
  });

  const defaultType = config => mobx.observable({ config });
  defaultType.nonObservable = config => ({ config });

  const createStore = function(baseType = defaultType, extendedTypes = {}) {
      return mobx.observable({
          // add types on store creation
          modelTypes: {
              baseType,
              ...extendedTypes
          },
          models: {},
          // add types later during runtime
          addType: function(modelType, modelConstructor) {
              if (this.modelTypes[modelType])
                  console.warn("Adding model type " + modelType + " failed. Type already exists", this);
              this.modelTypes[modelType] = modelConstructor;
          },    
          create: mobx.action('create', function(config, parent, id) {
              //model can be of a special type, such as frame or color scale
              //otherwise it falls back to generic type: encoding or scale that would be
              const createModelOfType = this.modelTypes[config.modelType] || this.modelTypes.baseType;
              //see utils.createModel()
              const model = createModelOfType(...arguments);
              if (id) this.set(id, model);
              return model;
          }),
          //used for example when passing multiple markers in Vizabi()
          createMany: mobx.action('createMany', function(configs) {
              const models = {};
              for (let id in configs) {
                  models[id] = this.create(configs[id], null, id);
              }
              return models;
          }),
          has: function(id) {
              return id in this.models;
          },   
          get(arg, parent, name) {
              //get or create actually
              if (isString(arg)) {
                  //resolve arg as reference if it's a string - get it from the store
                  return this.models[arg] // id
              } else if (isModel(arg)) {
                  //no-op: if asking for a model - return it without change
                  return arg;
              } else {
                  //otherwise assume arg is a config for a new model to be created
                  //allows creating multiple models from the same config
                  //e.g. order.data and size.data are created from the same config
                  //see marker get encoding(), marker.encodingCache() and encodingCache.js
                  return this.create(arg, parent, name)
              }
          },
          getAll: function() {
              return Object.values(this.models);
          }, 
          set: mobx.action('set', function(id, model) { 
              return this.models[id] = model;
          }),
          dispose: mobx.action('dispose', function(id) {
              this.models[id].dispose();
              delete this.models[id];
          }),
          disposeAll: mobx.action('disposeAll', function() {
              // first dispose all then delete, so that any models build through references to these markers can be reached for disposal
              for (let id in this.models) {
                  this.models[id].dispose();
              }
              for (let id in this.models) {
                  delete this.models[id];
              }
          })
      }, {
          models: mobx.observable.shallow
      });
  };

  const configurable = {
      applyConfig: mobx.action('applyConfig', function(config) {
          this.config = deepmerge(this.config, config);
          return this;
      })
  };

  // only on base level now, should be recursive
  function dotToJoin(query) {
      const props = query.where && Object.keys(query.where);
      if (!props || props.length == 0)
          return query;

      const where = query.where,
          newq = deepmerge({}, query);

      props.forEach(p => {
          const s = p.split('.');
          if (s.length > 1) {
              const [key, value] = s;
              const filter = where[p];
              const joinid = "$" + key;

              if (!newq.join) newq.join = {};
              if (!newq.join[joinid]) {
                  newq.join[joinid] = {
                      key,
                      where: {
                          [value]: filter
                      }
                  };
                  if (newq.where[key]) {
                      newq.join[joinid].where[key] = newq.where[key];
                  }
                  newq.where[key] = joinid;
              } else {
                  newq.join[joinid].where[value] = filter;
              }
              delete newq.where[p];
          }
      });

      //console.log("Transformed query: ", query, newq);
      return newq;
  }

  // needed for WS
  function addExplicitAnd(query) {
      // return if no where or only single where
      const props = query.where && Object.keys(query.where);
      if (!props || props.length < 2)
          return query;

      const newq = deepmerge({}, query);
      newq.where = {
          "$and": []
      };
      props.forEach(prop => {
          newq.where["$and"].push({
              [prop]: query.where[prop]
          });
      });

      //console.log("Transformed query: ", query, newq);
      return newq;
  }

  /**
   * @param {*} argPromise promise resolving to object { values, keyConcepts, dtypes }
   */
  function inlineReader(argPromise) {

      argPromise = Promise.resolve(argPromise).then((args) => {
          args.keyConcepts = args.keyConcepts ?? []; 
          return args;
      });

      let dataPromise, conceptPromise;

      return {
          async read(query) {
              if (!dataPromise) {
                  dataPromise = argPromise.then(parseValues);
              }
              
              let table = await dataPromise;

              if (isConceptQuery(query)) {
                  if (!conceptPromise) {
                      conceptPromise = await dataPromise
                          .then(getConcepts)
                          .then(concepts => DataFrame(concepts, ["concept"]));
                  }
                  table = await conceptPromise;
              }

              if (isSchemaQuery(query))
                  table = DataFrame(getSchema(table, query.from), ["key","value"]);

              return applyQuery(table, query);
          },
          getAsset(assetId) {
              console.warn('Inline reader does not support assets', { assetId });
          },
          async getDefaultEncoding() {
              const { keyConcepts } = await argPromise;
              const data = await dataPromise;
              const encConfig = {};
              data.fields.forEach(concept => {
                  encConfig[concept] = {
                      concept, 
                      space: keyConcepts
                  };
              });
              return encConfig;
          }
      }
  }

  function parseValues({ values, dtypes, keyConcepts}) {
      return DataFrame(makeParser(dtypes)(values), keyConcepts);
  }

  function isConceptQuery(query) {
      return "from" in query && query.from == "concepts";
  }

  function isSchemaQuery(query) {
      return "from" in query && query.from.endsWith('.schema');
  }

  function getConcepts(data) {
      const types = getConceptTypes(data);
      return [...data.fields].map(concept => ({
          concept,
          concept_type: types.get(concept)
      }));
  }

  function getSchema(data, from) {
      if (from == "datapoints.schema") {
          const indicatorConcepts = relativeComplement(data.key, [...data.fields]);
          return indicatorConcepts.map(concept => ({
              key: [...data.key],
              value: concept
          }));        
      }
      if (from == "concepts.schema") {
          return [{ key: ["concept"], value: "concept_type"}];
      }
      if (from == "entities.schema") {
          //make the key itself always present in schema
          const conceptTpes = getConceptTypes(data);
          const entitiesSchema = data.key
              .filter(f => conceptTpes.get(f) !== "time")
              .map(m => ({key: [m], value: m}));
          
          //this only supports names for the first dimension, but it is possible to add more, i.e. with dot notation
          if (data.fields.includes("name"))
              entitiesSchema.push({ key: [data.key[0]], value: "name" }); 
         
          return entitiesSchema;
      }
      console.warn("Invalid schema query `from` clause: ", from);
  }

  function applyQuery(data, query) {
      const { select, from, where, order_by, join } = query;
      const { key, value } = select;
      const projection = [...key, ...value];

      if ("join" in query){
          console.warn('Inline reader does not handle joins as it has only one table. Sections of "where" statement that refer to joins will be ignored.', { query });
          //delete where statements that refer to joins
          for (let w in where) {
              if(Object.keys(join).includes(where[w])) delete where[w]; 
          }
      }

      if (relativeComplement([...data.fields], projection).length > 0)
          console.error('Concepts found in query.select which are not in data', { query, dataFields: data.fields});

      let result = data
          .filter(where)
          .project(projection)
          .order(order_by);

      if (!arrayEquals(result.key, select.key))
          result = DataFrame(result, select.key);
      
      return result;
  }

  /*
  {
      year: { timeFormat: "%Y", locale: "ru-RU" }
      pop: number
  }
  */
  function makeParser(dtypes) {
      const parseRow = parserFromDtypes(dtypes);
      return function parseTable(data) {
          let row;
          for (row of data) {
              parseRow(row); // in place
          }
          return data;
      }
  }

  const dtypeParsers = {
      string: d => d,
      number: d => +d,
      boolean: d => d == '1' || d.toLowerCase() == 'true',
      auto: autoParse,
      time: (d) => {
          if ((""+d).length == 4) return dtypeParsers.year(d);
          if (d.length == 7 && d[4] == "-") return dtypeParsers.month(d);
          if (d.length == 10) return dtypeParsers.day(d);
          if (d[4].toLowerCase() == "w") return dtypeParsers.week(d);
          if (d[4].toLowerCase() == "q") return dtypeParsers.quarter(d);
      }, 
      year: d3.utcParse("%Y"),
      month: d3.utcParse("%Y-%m"),
      day: d3.utcParse("%Y-%m-%d"),
      week: d3.utcParse("%Yw%V"),
      quarter: d3.utcParse("%Yq%q")
  };

  function parserFromDtypes(dtypes) {

      if (dtypes == "auto") 
          return d3.autoType;

      // create field parsers
      const parsers = {};
      let field;
      
      for (field in dtypes) {
          const dtype = dtypes[field];

          let parser;
          if (dtype in dtypeParsers) parser = dtypeParsers[dtype];
          if (isNonNullObject(dtype) && "timeFormat" in dtype) parser = d3.utcParse(dtype.timeFormat);

          if (!parser) {
              console.warn('Unknown data type given, fall back to identity parser.', dtype);
              parser = d => d;
          }
          parsers[field] = parser;
      }

      // return row parser
      return (row) => {
          let parse, field;
          for (field in row) {
              if (parse = parsers[field]) {
                  row[field] = parse(row[field]);
              }
          }
      }
  }

  /**
   * Parse string to js primitives or Date. Based on d3.autoType
   * @param {any} value Value to be parsed 
   */
  function autoParse(value) {
      var value = value.trim(), number;
      if (!value) value = null;
      else if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (value === "NaN") value = NaN;
      else if (!isNaN(number = +value)) value = number;
      else if (/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/.test(value)) value = new Date(value);
      return value;
  }

  function getConceptTypes(data) {
      const types = new Map();

      // get types from first row
      const [firstRow] = data.values();
      for (let field in firstRow) {
          types.set(field, getConceptType(firstRow[field], field, data.key));
      }
      // check if those types are consistent
      for (let [field, type] of types) {
          const checkedType = validateConceptType(data, field, type);
          if (!checkedType) {
              console.warn("Field " + field + " is not consistently typed " + type);
              types.set(field, "mixed");
          } else if (type === "null") {
              types.set(field, checkedType !== type ? checkedType : undefined);
          }
      }
      return types;
  }

  function validateConceptType(data, field, type) {
      let conceptType;
      for (let row of data.values()) {
          conceptType = getConceptType(row[field], field, data.key);
          if ( type !== conceptType ) {
              if (type === "null") {
                  type = conceptType;
              } else if (conceptType !== "null") return false;
          }
      }
      return type;
  }

  function getConceptType(value, field, datakey) {
      if (value === null) return 'null';
      if (isDate(value)) return 'time';
      if(datakey.includes(field)) return 'entity_domain';
      const type = typeof value;
      if (type == "string")  return 'string';
      if (type == "boolean") return 'boolean';
      if (type == "number" || isNumber(value))  return 'measure';
      console.warn("Couldn't decide type of value", { value, field, datakey });
  }

  const isDate = val => val instanceof Date;
  const isNumber = val => !!val && typeof val === "object" && Object.prototype.toString.call(val) === "[object Number]";

  function guessDelimiter(text, ERRORS) {
      const comma = ',',  semicolon = ';';
      const stringsToCheck = 2;
      const rows = _getRows(text.replace(/"[^\r]*?"/g, ''), stringsToCheck);

      if (rows.length !== stringsToCheck) {
          return {error: ERRORS.NOT_ENOUGH_ROWS_IN_FILE};
      }

      const [header, firstRow] = rows;
      const commasCountInHeader = _countCharsInLine(header, comma);
      const semicolonsCountInHeader = _countCharsInLine(header, semicolon);
      const commasCountInFirstRow = _countCharsInLine(firstRow, comma);
      const semicolonsCountInFirstRow = _countCharsInLine(firstRow, semicolon);

      if (
          _checkDelimiters(
              commasCountInHeader,
              commasCountInFirstRow,
              semicolonsCountInHeader,
              semicolonsCountInFirstRow
          )
      ) return comma;
      else if (
          _checkDelimiters(
              semicolonsCountInHeader,
              semicolonsCountInFirstRow,
              commasCountInHeader,
              commasCountInFirstRow
          )
      ) return semicolon;

      // failed to identify a delimiter
      return {error: ERRORS.UNDEFINED_DELIMITER};
  }

  function _checkDelimiters(
      firstDelimiterInHeader,
      firstDelimiterInFirstRow,
      secondDelimiterInHeader,
      secondDelimiterInFirstRow
  ) {
      return firstDelimiterInHeader === firstDelimiterInFirstRow
          && firstDelimiterInHeader > 1
          && (
              (secondDelimiterInHeader !== secondDelimiterInFirstRow)
              || (!secondDelimiterInHeader && !secondDelimiterInFirstRow)
              || (firstDelimiterInHeader > secondDelimiterInHeader && firstDelimiterInFirstRow > secondDelimiterInFirstRow)
          );
  }

  function  _getRows(text, count = 0) {
      const re = /([^\r\n]+)/g;
      const rows = [];

      let rowsCount = 0;
      let matches;

      do {
          matches = re.exec(text);
          if (matches && matches.length > 1) {
              ++rowsCount;
              rows.push(matches[1]);
          }
      } while (matches && rowsCount !== count);

      return rows;
  }

  function _countCharsInLine(text, char) {
      const re = new RegExp(char, 'g');
      const matches = text.match(re);
      return matches ? matches.length : 0;
  }

  const MISSED_INDICATOR_NAME = 'indicator';

  function timeInColumns({columns, rows, hasNameColumn, timeKey = "time", keySize = 1}, ERRORS, parsers) {
      let nameConcept = null;
      
      // remove column "name" as array's k+1 th element, but remember its header in a variable.
      // if it's an empty string, call it "name"
      // name column is not at its original index because it was moved by csv reader "load" method
      if (hasNameColumn) {
          nameConcept = columns.splice(keySize + 1, 1)[0] || 'name';
      }
      
      const missedIndicator = parsers && parsers[timeKey] && !!parsers[timeKey](columns[keySize]);

      if (missedIndicator) {
          console.warn('Indicator column is missed.');
      }

      const indicatorKey = missedIndicator ? MISSED_INDICATOR_NAME : columns[keySize];
      const concepts = columns.slice(0, keySize)
          .concat(timeKey)
          .concat(nameConcept || [])
          .concat(missedIndicator ? ucFirst(MISSED_INDICATOR_NAME) : rows.reduce((result, row) => {
              const concept = row[indicatorKey];
              if (!result.includes(concept) && concept) {
              result.push(concept);
              }
              return result;
      }, []));

      const indicators = concepts.slice(keySize + 1 + (nameConcept ? 1 : 0));
      const [entityDomain] = concepts;

      return {
          columns: concepts,
          rows: rows.reduce((result, row) => {
              const rowEntityDomain = row[entityDomain];
              const resultRows = result.filter(resultRow => resultRow[entityDomain] === rowEntityDomain);

              if (resultRows.length) {
              if (resultRows[0][row[indicatorKey]] !== null) {
                  throw {
                      name: ERRORS.REPEATED_KEYS,
                      message: `indicator: ${row[indicatorKey]}, key: ${row[entityDomain]}`
                  }
              }

              resultRows.forEach(resultRow => {
                  resultRow[row[indicatorKey]] = row[resultRow[timeKey]];
              });
              } else {
              Object.keys(row).forEach(key => {
                  if (![entityDomain, indicatorKey, nameConcept].includes(key)) {
                  const domainAndTime = {
                      [entityDomain]: row[entityDomain], 
                      [timeKey]: key
                  };
                  const optionalNameColumn = !nameConcept ? {} : {
                      [nameConcept]: row[nameConcept]
                  };
                  const indicatorsObject = indicators.reduce((indResult, indicator) => {
                      indResult[indicator] = missedIndicator || row[indicatorKey] === indicator ? row[key] : null;
                      return indResult;
                  }, {});

                  result.push(Object.assign(domainAndTime, optionalNameColumn, indicatorsObject));
                  }
              });
              }

              return result;
          }, [])
      };
  }

  const TIME_LIKE_CONCEPTS = ["time", "year", "month", "day", "week", "quarter"];
  const NAME_LIKE_CONCEPTS = ["name", "title"];
  const GOOGLE_DOC_PREFIX = 'https://docs.google.com/spreadsheets/';
  const ERRORS = {
      WRONG_TIME_COLUMN_OR_UNITS: 'reader/error/wrongTimeUnitsOrColumn',
      NOT_ENOUGH_ROWS_IN_FILE: 'reader/error/notEnoughRows',
      UNDEFINED_DELIMITER: 'reader/error/undefinedDelimiter',
      EMPTY_HEADERS: 'reader/error/emptyHeaders',
      DIFFERENT_SEPARATORS: 'reader/error/differentSeparators',
      FILE_NOT_FOUND: 'reader/error/fileNotFoundOrPermissionsOrEmpty',
      REPEATED_KEYS: 'reader/error/repeatedKeys'
  };

  function csvReader({ 
          path = "data.csv", 
          sheet = "", 
          externalTextReader,
          externalJsonReader,
          hasNameColumn = false,
          isTimeInColumns = false,
          assetsPath = "",
          delimiter = "",
          keyConcepts, 
          nameColumnIndex,
          dtypes 
      }) {
      
      let cache = {};
      const cacheKey = path + sheet;

      path = _googleSpreadsheetURLAdaptor(path, sheet);

      return Object.assign(inlineReader(getValues().then(({values, dtypes, keyConcepts}) => ({ 
              values,
              keyConcepts,
              dtypes
          })
      )), {
          getDatasetInfo,
          getAsset,
          getValues
      });

      function getValues(){
          return cache[cacheKey] ? cache[cacheKey] : cache[cacheKey] = loadFile()
              .then(guessDelim)
              .then(parseTextToTable)
              .then(transformNameColumn)
              .then(transformTimeInColumns)
              .then(returnValuesDtypesAndKeyConcepts);
      }
    
      function loadFile(){
          let textReader = externalTextReader || d3.text;
          return textReader(path)
              .catch(error => {
                  error.name = ERRORS.FILE_NOT_FOUND;
                  error.message = `No permissions, missing or empty file: ${path}`;
                  error.endpoint = path;
                  throw error;
              });
      }

      function guessDelim(text){
          if (!delimiter) delimiter = guessDelimiter(text, ERRORS);
          if (delimiter.error) throw makeError(delimiter.error);
          return text;
      }

      function parseTextToTable(text){

          const rows = d3.dsvFormat(delimiter)
              //parse, and exclude empty rows
              .parse(text, row => Object.values(row).every(v => !v) ? null : row);

          //remove empty columns
          const columns = rows.columns.filter(c => c !== "");

          return {rows, columns};
      }

      function transformNameColumn({rows, columns}){
          // move column "name" so it goes after "time"
          // turns [name, geo, gender, time, lex] into [geo, gender, time, name, lex]
          nameColumnIndex = nameColumnIndex ?? NAME_LIKE_CONCEPTS.map(n => columns.indexOf(n)).find(f => f > -1);
          if (hasNameColumn && nameColumnIndex != undefined){
              const nameColumn = columns.splice(nameColumnIndex, 1); //mutates columns array
              const keySize = guessKeyConcepts(columns, keyConcepts).length;
              columns = columns.slice(0, keySize).concat(nameColumn).concat(columns.slice(keySize));
          }
          return {rows, columns};
      }

      function transformTimeInColumns({rows, columns}){

          if (isTimeInColumns) {
              try {
                  return timeInColumns({rows, columns}, ERRORS);
              } catch (error) {
                  throw makeError(error);
              }
          }
          
          return {rows, columns};
      }

      function returnValuesDtypesAndKeyConcepts({rows, columns}){
          const values = autotype(rows);
          return {
              values,
              keyConcepts: guessKeyConcepts(columns, keyConcepts),
              columns,
              dtypes: columns.reduce((dtypes, column) => {
                  const lowerCaseColumn = column.toLowerCase();
                  //skip dtypes config for time column which typed to Date with d3.autoType already ('day' and 'month' timeformats for ex.)
                  if (TIME_LIKE_CONCEPTS.includes(lowerCaseColumn) && !(values[0][column] instanceof Date)) dtypes[column] = lowerCaseColumn;
                  return dtypes;
              }, {})
          }
      }

      function autotype(rows){
          return rows.map(row => d3.autoType(row));
      }

      function guessKeyConcepts(columns, keyConcepts){
          if(keyConcepts) return keyConcepts;
          const index = columns.findIndex((f) => TIME_LIKE_CONCEPTS.includes(f.toLowerCase()));
          // +1 because we want to include time itself as well
          return columns.slice(0, index + 1);
      }

      function makeError(e){
          delete cache[cacheKey];
          return e;
      }

      /**
       * This function returns info about the dataset
       * in case of CSV reader it's just the name of the file
       * @returns {object} object of info about the dataset
       */
      function getDatasetInfo() {
          return {name: sheet ? sheet : path.split('/').pop()};
      }

      function getAsset(assetName) {
          const path = assetsPath + assetName;
          const jsonReader = externalJsonReader || d3.json;

          return jsonReader()
              .catch(error => {
                  error.name = ERRORS.FILE_NOT_FOUND;
                  error.message = `No permissions, missing or empty file: ${path}`;
                  error.endpoint = path;
                  throw error;
              });
      }

      function _googleSpreadsheetURLAdaptor(path, sheet) {
        // adjust path if given a path to a google doc but without the correct export suffix. the first sheet is taken since none is specified
        if (path.includes(GOOGLE_DOC_PREFIX) && !path.includes('tqx=out:csv') && !path.includes('/pub?')) {
            const googleDocParsedUrl = path.split(GOOGLE_DOC_PREFIX)[1].split('/');
            const googleDocId = googleDocParsedUrl[googleDocParsedUrl.indexOf('d') + 1];
            return GOOGLE_DOC_PREFIX 
                + 'd/' 
                + googleDocId 
                + '/gviz/tq?tqx=out:csv' 
                + (sheet ? '&sheet=' + encodeURI(sheet.toLowerCase()) : '' );
        } else {
            return path;
        }
      }
      
  }

  function makeCache() {
      const cache = new Map();

      const makeKey = function(query) {
          if (query.select.value.length > 1) {
              //console.info('Cache can\'t handle query with more than one select value. Skipping query caching.', query);
              return undefined;
          }
          return stableStringifyObject(query);
      };
      const has = function (query) { return cache.has(makeKey(query)); };
      const get = function (query) { return cache.get(makeKey(query)); };
      const set = function(query, promise) {
          if (query.select.value.length > 1) 
              return splitQuery(query).map(q => set(q, promise));
          
          const key = makeKey(query);
          return cache.set(key, promise);
      };
      const splitQuery = function(query) {
          return query.select.value.map(concept => {
              const clone = deepclone(query);
              clone.select.value = [concept];
              return clone;
          });
      };

      return {
          has, 
          get, 
          set
      }
  }

  const defaultConfig$9 = {
      path: null,
      sheet: null,
      keyConcepts: null,
      values: null,
      transforms: []
  };

  const type$1 = "dataSource";

  function dataSource(...args) {
      return createModel(dataSource, ...args)
  }

  dataSource.nonObservable = function (config, parent, id) {
      applyDefaults(config, defaultConfig$9);


      const functions = {
          get path() { return this.config.path },
          get sheet() { return this.config.sheet },
          get keyConcepts() { return this.config.keyConcepts },
          get locale() { 
              if (this.config.locale)
                  return typeof this.config.locale == "string" ? this.config.locale : this.config.locale.id; 
          },
          get dtypes() { return this.config.dtypes },
          get reader() {
              if (this.values)
                  return inlineReader({ values: this.values, keyConcepts: this.keyConcepts, dtypes: this.dtypes });
              else if (this.path)
                  return csvReader(this.config);
              console.warn("No inline values or csv path found. Please set `values` or `path` property on dataSource.", this);
          },
          get values() { 
              // toJS: don't want insides of data to be observable (adds overhead & complexity)
              return mobx.toJS(this.config.values);
          },
          get defaultEncodingPromise() {
              if ("getDefaultEncoding" in this.reader)
                  return fromPromise(this.reader.getDefaultEncoding());
              else    
                  return fromPromise.resolve({});
          },
          get defaultEncoding() {
              const empty = {};
              return this.defaultEncodingPromise.case({
                  fulfilled: v => {
                      Object.values(v).forEach(enc => enc.source = this);
                      return v;
                  },
                  pending: () => { console.warn('Requesting default encoding before loaded. Will return empty. Recommended to await promise.'); return empty },
                  error: (e) => { console.warn('Requesting default encoding when loading errored. Will return empty. Recommended to catch exception.'); return empty }
              });
          },
          buildAvailability(responses = []) {
              const 
                  keyValueLookup = new Map(),
                  keyLookup = new Map(),
                  valueLookup = new Map(),
                  data = [];
      
              /* utility functions, probably move later */
              const getFromMap = (map, key, getNewVal) => {
                  map.has(key) || map.set(key, getNewVal());
                  return map.get(key);
              };
              const newSet = () => new Set();
              const newMap = () => new Map();
      
              /* handle availability responses */
              responses.forEach(response => {
                  response = response.forQueryKey().values(); // get dataframe iterator if there
                  for(let row of response) {
                      let keyStr;
                      row.key = Array.isArray(row.key) ? row.key : JSON.parse(row.key).sort();
                      keyStr = createKeyStr(row.key);
                      data.push(row);
                      keyLookup.set(keyStr, row.key);
                      getFromMap(keyValueLookup, keyStr, newMap)
                          .set(row.value, row);  
                      getFromMap(valueLookup, row.value, newSet)
                          .add(row.key);
                  }            });
      
              return {
                  valueLookup,
                  keyValueLookup,
                  keyLookup,
                  data
              };
          },
          get availabilityPromise() { return this.fetchAvailability(); },
          fetchAvailability() {
              //trace();
              const collections = ["concepts", "entities", "datapoints"];
              const getCollAvailPromise = (collection) => this.query({
                  select: {
                      key: ["key", "value"],
                      value: []
                  },
                  from: collection + ".schema"
              });
      
              return fromPromise(Promise.all(collections.map(getCollAvailPromise))
                  .then(this.buildAvailability));
          },
          get availabilityState() {
              if (this.availabilityPromise.state == 'rejected') 
                  throw this.availabilityPromise.value;
              return this.availabilityPromise.state;
          },
          get availability() {
              let empty = this.buildAvailability();
              return this.availabilityPromise.case({
                  fulfilled: v => v,
                  pending: () => { console.warn('Requesting availability before availability loaded. Will return empty. Recommended to await promise.'); return empty },
                  rejected: (e) => { console.warn('Requesting availability when loading errored. Will return empty. Recommended to catch exception.'); return empty }
              })
          },
          get conceptsPromise() { return this.fetchConcepts(); },
          fetchConcepts() {
              //trace();
              const locale = this.locale;
              return fromPromise(this.availabilityPromise.then(av => {
                  const conceptKeyString = createKeyStr(["concept"]);
                  const avConcepts = [...av.keyValueLookup.get(conceptKeyString).keys()];
          
                  const query = {
                      select: {
                          key: ["concept"],
                          value: avConcepts
                      },
                      from: "concepts"
                  };         
                    
                  if (locale) {
                      query.language = locale; 
                  }
      
                  return this.query(query)
              }));
          },
          get conceptsState() {
              //trace();
              if (this.conceptsPromise.state == 'rejected') 
                  throw this.conceptsPromise.value;
              return this.conceptsPromise.state;
          },
          get concepts() {
              //trace();
              const empty = new Map();
              return this.conceptsPromise.case({
                  fulfilled: v => v.forQueryKey(),
                  pending: () => { console.warn('Requesting concepts before loaded. Will return empty. Recommended to await promise.'); return empty; },
                  rejected: (e) => { console.warn('Requesting concepts when loading errored. Will return empty. Recommended to catch exception.'); return empty; }
              })
          },
          /* 
          *  separate state computed which don't become stale with new promise in same state  
          */
          get state() {
              return combineStates([this.availabilityState, this.conceptsState]);
          },
          getConcept(concept) {
              if (concept == "concept_type" || concept.indexOf('is--') === 0 || concept === "concept")
                  return { concept, name: concept }
              if (!this.concepts.has({ concept }))
                  console.warn("Could not find concept " + concept + " in data source ", this);
              return this.concepts.get({ concept }) || {};
          },
          isEntityConcept(conceptId) {
              return ["entity_set", "entity_domain"].includes(this.getConcept(conceptId).concept_type);
          },
          isTimeConcept(conceptId) {
              return this.getConcept(conceptId).concept_type === "time";
          },
          normalizeResponse(response, query) {
              const cache = {};
              if (isDataFrame(response)) {
                  cache[createKeyStr(response.key)] = response;
              } else if (response.length == 1 && Object.keys(response[0]).length == 0) {
                  // to handle faulty bw/ddfservice reader response
                  // https://github.com/Gapminder/big-waffle/issues/53
                  response.pop();
              }
              function forKey(key) {
                  //const t0 = performance.now();   
                  const keyStr = createKeyStr(key);
                  const df = cache[keyStr] ?? (cache[keyStr] = DataFrame(response, key)); 
                  //const time = performance.now() - t0;
                  //normalizingTime += time;
                  //console.log('normalized: ', time, 'total: ' + normalizingTime)
                  return df;
              }
              function forQueryKey() {
                  return forKey(query.select.key);
              }
              return {
                  //Sometimes the raw response is a dataframe (such as from CSV/inline reader)
                  //And sometimes it's a plain array (such as from ws-service reader)
                  //Some downstream code however expects "raw" to be a plain array, 
                  //for example, the for loop in entityPropertyDataConfig.js: lookups()
                  //hence, this converts response back to plain array
                  raw: isDataFrame(response) ? [...response.values()] : response,
                  forKey,
                  forQueryKey
              }
          },
          query(query) {
              query = dotToJoin(query);
              query = addExplicitAnd(query);
              //console.log('Processing query', query);
              return this.combineAndSendQueries(query);
          },
          cache: makeCache(),
          queue: new Map(),
          combineAndSendQueries(query) {
              if (this.cache.has(query)) 
                  return this.cache.get(query);

              //find out which queries can be combined (stringify all fields minus select.value)
              const queryCombineId = this.calcCombineId(query);
              if (this.queue.has(queryCombineId)) {
                  //add an extra column to a query already found in the queue
                  const { baseQuery, promise } = this.queue.get(queryCombineId);
                  baseQuery.select.value = concatUnique(baseQuery.select.value, query.select.value);
                  return promise;
              } else {
                  //create a new query in a queue
                  const baseQuery = deepclone(query);
                  const promise = fromPromise(this.sendDelayedQuery(baseQuery));
                  this.queue.set(queryCombineId, { baseQuery, promise });
                  this.cache.set(baseQuery, promise);
                  return promise;
              }
          },
          async sendDelayedQuery(query) {
              const reader = this.reader; // deref read before await so it's observed & memoized
              // sleep first so other queries can fill up baseQuery's select.value
              await sleep();
              const queryCombineId = this.calcCombineId(query);
              //after deleting from the queue nothing more can be added to the query
              this.queue.delete(queryCombineId);
              const response = await reader.read(query);
              return this.normalizeResponse(response, query);
          },
          calcCombineId(query) {
              const clone = deepclone(query);
              delete clone.select.value;
              return stableStringifyObject(clone);
          },
          disposers: [],
          onCreate() { },
          dispose() {
              let dispose;
              while (dispose = this.disposers.pop()) {
                  dispose();
              }
          }
      };

      return assign({}, functions, configurable, { config, id, type: type$1 });
  };

  dataSource.decorate = {
      // to prevent config.values from becoming observable
      // possibly paints with too broad a brush, other config might need to be deep later
      config: mobx.observable.shallow,
      // queue should be mutable by computed methods 
      // this is introducing state manipulation and makes these computed methods impure 
      // other solutions are welcome : ) 
      queue: mobx.observable.ref,
      cache: mobx.observable.ref
  };

  const dataSourceStore = createStore(dataSource);

  dataSourceStore.createAndAddType = function(type, readerObject) {
      this.addType(type, defaultDecorator({
          base: dataSource,
          functions: {
              get reader() {
                  // copy reader object (using original would only allow one datasource of this type)
                  const reader = Object.assign({}, readerObject);
                  reader.init(this.config || {});
                  return reader;
              }
          }
      }));
  };

  /**
   * 
   * @param {*} possibleRef 
   * @returns config Config object as described in reference config
   */
   function resolveRef(possibleRef, root = stores) {
      // not a ref
      if (!isReference(possibleRef))
          return { state: 'fulfilled', value: possibleRef }

      // handle config shorthand
      let ref = (isString(possibleRef.ref)) ? { path: possibleRef.ref } : possibleRef.ref;

      // invalid ref
      if (!ref.path) {
          console.warn("Invalid reference, expected string reference in ref or ref.path", possibleRef);
      }

      // model ref includes resolved defaults
      const result = resolveTreeRef(ref.path, root);
      result.value = transformModel(result.value, ref.transform);
      return result;
  }

  function isReference(possibleRef) {
      return isNonNullObject(possibleRef) && typeof possibleRef.ref != "undefined"
  }

  function resolveTreeRef(refStr, tree) {
      const ref = refStr.split('.');
      let prev;
      let node = tree;
      //walk the tree
      for (let i = 0; i < ref.length; i++) {
          let nextStep = ref[i];
          prev = node;
          //use get function where there is one, i.e. stores, otherwise assume it's an object
          node = prev.get?.(nextStep) ?? prev[nextStep];

          if (typeof node == "undefined") {
              console.warn("Couldn't resolve reference " + refStr);
              return null;
          }
      }

      return { 
          //prev state is needed for example when we get a ref to a concept
          //concept doesn't have state, so we problby want to know the state of dataConfig instead

          //and since it's a getter we don't read it immediately
          //this prevents circular computations from happening if we do it right away
          //for example between order and the size encodings
          //referring to the state of size --> getting state of size -->
          //size checks marker config resolving state --> which wants to know order state
          //fortunately we don't need to read the state when constucting the reference
          //therefore we can have it in a computed
          get state() { return node.state ?? prev.state ?? 'fulfilled' }, 
          value: node 
      }
  }

  function transformModel(model, transform) {
      switch (transform) {
          case "entityConcept":
              return mobx.observable({
                  get space() { return model.data.isConstant ? [] : [model.data.concept] },
                  get filter() {
                      return {
                          dimensions: {
                              [model.data.concept]: {
                                  [model.data.concept]: { $in: model.scale.domain }
                              }
                          }
                      }
                  },
                  get source() { return model.data.source },
                  get locale() { return model.data.locale }
              });
          case "entityConceptSkipFilter":
              return mobx.observable({
                  get space() { return model.data.isConstant ? [] : [model.data.concept] },
                  get source() { return model.data.source },
                  get locale() { return model.data.locale }
              });
          default:
              return model;
      }
  }

  /**
   * Finds a config which satisfies both marker.space and encoding.concept autoconfigs
   */
  const solveMethods = {};

  const configSolver = {
      addSolveMethod,
      configSolution,
      markerSolvingState,
      dataConfigSolvingState
  };

  function addSolveMethod(fn, name = fn.name) {
      solveMethods[name] = fn;
  }

  //configSolution can be requested by dataConfig of marker, of an encoding, or standalone
  function configSolution(dataConfig) {     
      if (dataConfig.marker) {
      // autoconfig needs to be solved on the marker level, because encoding solutions are intertwined
      // this is why we are checking for marker that is involved, both DC of enc and marker have a .marker
          if (dataConfig.hasEncodingMarker) {
              //if it's an encoding, grab the corresponding part of marker solution.
              //this would also trigger marker solution if it wasn't yet computed
              if (dataConfig.marker.data.configSolution)
                  return dataConfig.marker.data.configSolution.encodings[dataConfig.parent.name];
              else 
                  //or return undefined for no-data encoding without throwing an error
                  return { concept: undefined, space: undefined };
          } else {
              //or else: actually start solving autoconfig on a marker level
              return markerSolution(dataConfig);
          }
      } else {
          // stand-alone dataConfig, not a common case but helpful for tests
          return encodingSolution(dataConfig);
      }
  }


  function markerSolution(dataConfig) {
      const cfg = dataConfig.config;

      if (!dataConfig.parent.encoding)
          console.warn(`Can't get marker solution for a non-marker dataconfig.`);

      if (needsSpaceAutoCfg(dataConfig)) {

          if (!dataConfig.source) {
              console.warn(`Can't autoconfigure marker space without a source defined.`);
              return;
          }

          //the callback in third argument checks that whatever space candidate is suggested by autoConfigSpace,
          //it also has a solution for encodings
          return autoConfigSpace(dataConfig, undefined, space => findMarkerConfigForSpace(dataConfig, space))

      } else {
          //for whatever space is configured, find solutions for encoding
          return findMarkerConfigForSpace(dataConfig, cfg.space);
      }
  }


  // this function is used for both marker space and for encoding space
  function autoConfigSpace(dataConfig, extraOptions = {}, getFurtherResult) {
      // getFurtherResult for marker: is there also solution for encodings
      // getFurtherResult for encoding: can we find concept for this space

      const { markerSpaceCfg } = extraOptions;
      let availableSpaces;
      //get all the spaces a solution could be set to
      if (dataConfig.hasEncodingMarker && markerSpaceCfg) {
          //for encoding space under a known marker space: we need to match with marker space
          //start with getting all subsets of marker space, filter by availability
          availableSpaces = subsets(markerSpaceCfg)
              .filter(space => dataConfig.source.availability.keyLookup.has(createKeyStr(space)));
          availableSpaces = sortSpacesByPreference(availableSpaces);
          //add marker space itself too - as most preferable
          availableSpaces.unshift(markerSpaceCfg);
      } else {
          //for marker spaces: get from pure availability
          availableSpaces = Array.from(dataConfig.source.availability.keyLookup.values());
          availableSpaces = sortSpacesByPreference(availableSpaces);
      }

      //put candidates through some filters
      const solveFilterSpec = dataConfig.config.space?.filter || dataConfig.defaults.space?.filter;
      const solveFilter = createSpaceFilterFn(solveFilterSpec, dataConfig);
      const allowFilter = dataConfig.allow.space?.filter || (() => true);

      for (let space of availableSpaces) {
          let result;        
          if (!space.includes("concept") //hardcoded disallowing to have concept "concept" in space
              && solveFilter(space)
              && allowFilter(space)
              && (result = getFurtherResult(space))
          ) {
              //return the first satisfactory space because they are sorted
              return result
          }
      }
      
      console.warn("Could not autoconfig to a space which also satisfies further results for " + dataConfig.parent.id + ".", { 
          dataConfig,
          spaceCfg: dataConfig.config.space || dataConfig.defaults.space, 
          availableSpaces, 
          getFurtherResult });

      return { concept: undefined, space: undefined };
  }


  // 1-dim spaces go in back of the list, others: smallest spaces first
  function sortSpacesByPreference(spaces) {
      return spaces.sort((a, b) => a.length > 1 && b.length > 1 ? a.length - b.length : b.length - a.length); 
  }


  //this is called to try if a space candidate works or for a space that is set
  //even the explicitly configured concepts go through here because we need to know what concepts they are at
  //so we don't set other encs to the same concepts
  function findMarkerConfigForSpace(markerDataConfig, space) {
      let encodings = {};

      //track concepts used by previous encodgins so they are not used again
      let usedConcepts = new Set();
      let dataConfigResults = new Map(); 

      //every single encoding should have a compatible configuration, so that space would be good for marker
      let success = sortedEncodingEntries(markerDataConfig.parent.encoding).every(([name, enc]) => {

          // only one result per dataConfig, multiple encodings can have the same dataConfig (e.g. by reference)
          //if we already have results for a certain data config: return that from saved dataConfigResults
          let encResult = dataConfigResults.has(enc.data) 
              ? dataConfigResults.get(enc.data)
              : encodingSolution(enc.data, space, [...usedConcepts]);

          if (encResult) {
              dataConfigResults.set(enc.data, encResult);
              encodings[name] = encResult;
              usedConcepts.add(encResult.concept);
              return true;
          }
          return false;
      });

      return success ? { encodings, space } : undefined;
  }


  //sort encodings so that the autoconfig for them is stable
  function sortedEncodingEntries(encodingObject) {
      return [...Object.entries(encodingObject)]
          .sort(
              (a, b) => a[0].localeCompare(b[0])
          );
  }


  function encodingSolution(dataConfig, markerSpaceCfg, usedConcepts = []) {

      if (dataConfig.isConstant) 
          //nothing to solve
          return { concept: undefined, space: undefined };

      else if (needsSpaceAutoCfg(dataConfig)) 
          //same pattern with the callback as in markerSolution
          return autoConfigSpace(dataConfig, { usedConcepts, markerSpaceCfg }, space => {
              return findConceptForSpace(dataConfig, { usedConcepts, markerSpaceCfg }, space)
          })

      else if (needsConceptAutoCfg(dataConfig))

          return findConceptForSpace(dataConfig, { usedConcepts });

      else
          //no autoconfig needed
          //select and highlight end up in this branch becuase they are hard-configured on enc level
          return {
              space: "space" in dataConfig.config ? dataConfig.config.space : dataConfig.defaults.space,
              concept: "concept" in dataConfig.config ? dataConfig.config.concept : dataConfig.defaults.concept
          }    
  }


  // Add preconfigured often used solver methods 
  addSolveMethod(defaultConceptSolver);
  addSolveMethod(mostCommonDimensionProperty);
  addSolveMethod(selectUnusedConcept);

  /**
   * Tries to find encoding concept for a given space, encoding and partial solution which contains concepts to avoid.  
   * Should be called with encoding.data as `this`. 
   * Returns concept id which satisfies encoding definition (incl autoconfig) and does not overlap with partial solution.
   * @param {*} space 
   * @param {*} conceptCfg
   * @param {*} extraOptions.usedConcepts: array of concept ids to avoid in finding autoconfig solution
   * @returns {string} concept id
   */
  function findConceptForSpace(dataConfig, { usedConcepts = [] }, space) {
      let concept;
      const conceptCfg = dataConfig.config.concept || dataConfig.defaults.concept;
      space = space || dataConfig.config.space || dataConfig.defaults.space;

      //need to check it if we got here through autoconfig of space in encodingSolution() 
      if (needsConceptAutoCfg(dataConfig)) {
          const solveConcept = solveMethods[conceptCfg.solveMethod] || defaultConceptSolver;
          concept = solveConcept(space, dataConfig, usedConcepts);
      } else if (isReference(conceptCfg) || dataConfig.isConceptAvailableInSpace(space, conceptCfg)) {
          concept = conceptCfg;
      } 

      if (!concept) {
          // console.warn("Could not autoconfig concept for given space for " + dataConfig.parent.id  + ".", { dataConfig, space });
          return false;
      } 

      return { concept, space };
  }

  function defaultConceptSolver(space, dataConfig, usedConcepts) {

      const dataSource = dataConfig.source;
      const availability = dataSource.availability;
      const conceptCfg = dataConfig.config.concept || dataConfig.defaults.concept;

      const satisfiesFilter = conceptCfg.filter 
          ? createFilterFn(conceptCfg.filter)
          : () => true;

      //get all concepts available for a space
      const availableConcepts = availability.keyValueLookup.get(createKeyStr(space));
      if (!availableConcepts) 
          return;
      const filteredConcepts = [...availableConcepts.keys()]
          // exclude the ones such as "is--country", they won't get resolved
          .filter(concept => concept.substr(0,4) !== "is--")
          // get concept objects
          .map(dataSource.getConcept.bind(dataSource))
          // configurable filter
          .filter(satisfiesFilter);

      //select method can again be configured
      const selectMethod = solveMethods[conceptCfg.selectMethod] || selectUnusedConcept;
      return selectMethod({ concepts: filteredConcepts, dataConfig, usedConcepts, space })?.concept;
  }

  /**
   * Get the property that exists on most entity concepts in space.
   * Possibly limited by `allowedProperties` in the concept solving options.
   * Takes all properties of all entitity sets in a given space, pushes them into an array
   * then gets the mode of that array, i.e. most common value
   * Used only for labels
   * @param {*} space 
   * @param {*} dataConfig 
   * @returns 
   */
  //TODO: rename to mostCommonEntityPropertyForSpace
  function mostCommonDimensionProperty(space, dataConfig) {
      const dataSource = dataConfig.source;
      const kvLookup = dataSource.availability.keyValueLookup;
      const entitySpace = space.filter(dim => dataSource.isEntityConcept(dim));
      
      const conceptCfg = dataConfig.config.concept || dataConfig.defaults.concept;
      const allowedProperties = conceptCfg.allowedProperties;

      const occurences = [];
      for (let dim of entitySpace) {
          let concepts;
          const allProperties = kvLookup.get(createKeyStr([dim]));
          if (allProperties && allowedProperties) {
              concepts = allowedProperties.filter(c => allProperties.has(c));
          } else if (allProperties) {
              concepts = allProperties.keys();
          } else if (entitySpace.length === 1) {
              //dimension has no entity properties --> return dimension name itself if it's the only dimension
              concepts = [dim];
          } else {
              //otherwise setting concept to a single dim in a multidim situation would result
              //in ambiguity (i.e. "chn" label for "geo:chn gender:male" marker)
              //therefore we set concept to null and let the encoding be underconfigured
              //this situation can be handled later
              concepts = [null];
          }
          occurences.push(...concepts);
      }
      return mode(occurences);
  }


  function selectUnusedConcept({ concepts, usedConcepts }) {
      // first try unused concepts, otherwise, use already used concept
      return concepts.find(concept => !usedConcepts.includes(concept.concept)) || concepts[0];
  }

  function needsSpaceAutoCfg(dataConfig) {
      const cfg = dataConfig.config;
      const defaults = dataConfig.defaults;

      const explicitNoSpace = "space" in cfg && !cfg.space; //such as select, highlight encodings
      const defaultNeedsSolving = !cfg.space && needsSolving(defaults.space);

      return !dataConfig.isConstant 
          && !explicitNoSpace 
          && (needsSolving(cfg.space) || defaultNeedsSolving)
  }

  function needsConceptAutoCfg(dataConfig) {
      const cfg = dataConfig.config;
      const defaults = dataConfig.defaults;

      const isStandAloneDataConfig = !dataConfig.marker; //for tests
      const explicitNoConcept = "concept" in cfg && !cfg.concept; //such as select, highlight encodings
      const isEncodingDataConfig = dataConfig.hasEncodingMarker; //check we are on enc level
      const defaultNeedsSolving = !("concept" in cfg) && needsSolving(defaults.concept);
      
      return !dataConfig.isConstant 
          && !isReference(dataConfig.config.concept) //not even try to autoconfigure references (weird infinite loops)
          && !explicitNoConcept 
          && (needsSolving(cfg.concept)
          || ((isEncodingDataConfig || isStandAloneDataConfig) && defaultNeedsSolving));
  }

  //if it's a space then it's array, if it's object, then it's instructions to autoconfigure
  //if it's an array (for space) or a string (for concept) we know it's set by user
  function needsSolving(config) {
      return isNonNullObject(config) && !Array.isArray(config);
  }

  function needsAutoConfig(dataConfig) {
      return needsSpaceAutoCfg(dataConfig) || needsConceptAutoCfg(dataConfig);
  }

  function dataConfigSolvingState(dataConfig) {
      if (needsAutoConfig(dataConfig))
          return [dataConfig.source.conceptsState];
      else 
          return [];
  }

  function markerSolvingState(marker) {
      const dataConfigs = [marker.data];
      for (const enc of Object.values(marker.encoding)) { dataConfigs.push(enc.data); }    //if we need to autoconfigure space we need to wait concepts to be loaded first
      //which in turn will wait for availability...
      const states = dataConfigs.flatMap(dataConfigSolvingState);
      //here we combine states of all dataConfigs in marker and its encodings
      return combineStates(states);
  }

  const type = 'filter';

  function filter(...args) {
      return createModel(filter, ...args)
  }

  filter.nonObservable = function (config, parent, id) {

      if (!("markers" in config)) config.markers = [];
      if (!("dimensions" in config)) config.dimensions = {};

      return {
          id,
          config,
          parent,
          type,
          get markers() {
              const cfg = resolveRef(this.config.markers).value || {};
              const markers = (mobx.isObservableArray(cfg)) ?
                  cfg.map(m => [m, true]) :
                  Object.entries(cfg);
              return new Map(markers);
          },
          get dimensions() {
              return mobx.toJS(this.config.dimensions) || {};
          },
          has(d) {
              return this.markers.has(this.getKey(d));
          },
          any() {
              return this.markers.size !== 0;
          },
          getPayload(d) {
              return this.markers.get(this.getKey(d));
          },
          set: mobx.action("setFilter", function(marker, payload) {
              if (Array.isArray(marker)) {
                  for (const el of marker) this.set(el);
                  return;
              }
              const key = this.getKey(marker);
              this.config.markers;
              if (payload) {
                  if (Array.isArray(this.config.markers)) {
                      this.config.markers = Object.fromEntries(this.config.markers.map(m => [m,true]));
                  }
                  this.config.markers[key] = configValue(payload);
              } else {
                  if (!Array.isArray(this.config.markers)) {
                      if (Object.keys(this.config.markers).length > 0) {
                          this.config.markers[key] = true;
                      } else {
                          this.config.markers = [key];
                      }
                  } else if (!this.config.markers.includes(key)) {
                      this.config.markers.push(key);
                  }
              }
          }),
          delete: mobx.action("deleteFilter", function(marker) {
              if (Array.isArray(marker)) {
                  for (const el of marker) this.delete(el);
                  return;
              }
              const cfg = this.config.markers;
              const key = this.getKey(marker);
              if (Array.isArray(cfg)) {
                  removeOnce(cfg, key);
              } else {
                  delete cfg[key];
              }
              return !this.markers.has(key);
          }),
          clear: mobx.action("clearFilter", function() {
              this.config.markers = [];
          }),
          toggle: mobx.action("toggleFilter", function(marker) {
              if (this.has(marker))
                  return this.delete(marker);
              else 
                  return this.set(marker);
          }),
          getKey(d) {
              return isString(d) ? d : d[Symbol.for('key')];
          },
          whereClause(space) {
              let filter = {};

              // dimension filters
              const dimFilters = [];
              space.forEach(dim => {
                  if (this.dimensions[dim]) {
                      for (let prop in this.dimensions[dim]) {
                          if (prop == dim || space.length < 2) {
                              // don't include properties which are entity concepts in filter of entity query
                              // https://github.com/Gapminder/big-waffle/issues/52
                              if (space.length > 1 || !this.parent.source.isEntityConcept(prop))
                                  dimFilters.push({ [prop]: this.dimensions[dim][prop] });
                          } else { 
                              dimFilters.push({ [dim + '.' + prop]: this.dimensions[dim][prop] });
                          }
                      }
                  }
              });

              // specific marker filters
              const markerFilters = [];
              for (let [key, payload] of this.markers) {
                  const markerSpace = Object.keys(key);
                  if (arrayEquals(markerSpace, space)) {
                      markerFilters.push(key);
                  }
              }

              // combine dimension and marker filters
              if (markerFilters.length > 0) {
                  filter["$or"] = markerFilters;
                  if (dimFilters.length > 0) {
                      filter["$or"].push({ "$and": dimFilters });
                  }
              } else {
                  if (dimFilters.length > 0) {
                      // clean implicit $and
                      filter = deepmerge.all(dimFilters);
                  }
              }

              return filter;
          },
      }
  };

  const trailFilter = defaultDecorator({
      base: filter,
      renameProperties: {
          set: 'baseSet'
      },
      functions: {
          get encoding() {
              return this.parent.parent;
          },
          set: mobx.action("setTrailFilter", function(
              marker, 
              value = marker[this.encoding.groupDim] || this.encoding.frameEncoding.value, 
              limit = this.encoding.limits[this.getKey(marker)]
          ) {
              if (Array.isArray(marker)) {
                  for (let el of marker) this.set(el);
                  return;
              }
              const key = this.getKey(marker);
              if (!this.has(key) && !limit) {
                  // add unclamped to starts so limits computed gets recalculated (saves redundant one-off limit calc for this key)
                  this.baseSet(key, value);
                  limit = this.encoding.limits[key]; 
              }
              // set again if clamped is different from current
              const clamped = clamp(value, limit[0], limit[1]);
              this.baseSet(key, clamped);
          })
      }
  });

  const filterStore = createStore(filter, {
      trailFilter
  });

  function dataConfig(...args) {
      return createModel(dataConfig, ...args)
  }

  dataConfig.nonObservable = function(config, parent, id) {

      if (!('filter' in config)) config.filter = {};
      if (!('allow' in config)) config.allow = {};
      
      return {
          defaults: {
              filter: null,
              constant: null,
              concept: { filter: { concept_type: "measure" } },
              space: { /* solve from data */ },
              value: null,
              locale: null,
              source: null,
              domainDataSource: 'auto'
          },
          config,
          parent,
          id,
          type: 'dataConfig',
          get allow() {
              return mobx.observable({
                  config: this.config.allow,
                  parent: this,
                  get space() {
                      return { 
                          filter: createSpaceFilterFn(this.config.space?.filter, this.parent)
                      }
                  },
                  get concept() {
                      return this.config.concept;
                  },
                  get source() {
                      return this.config.source;
                  }
              })
          },
          // it's possible to have an encoding without a marker in case of standalone enc (tests)
          get hasEncodingMarker() {
              return this.parent && this.parent.marker;
          },
          get marker() {
              if (this.hasEncodingMarker) {
                  return this.parent.marker;
              }
              if (this.parent) {
                  if (this.parent.marker) {
                      return this.parent.marker;
                  }
                  if (this.parent.encoding) {
                      return this.parent
                  }
              }
              return undefined;
          },
          get source() {
              const source = resolveRef(this.config.source).value;
              if (source)
                  return dataSourceStore.get(source, this)
              else {
                  if (this.hasEncodingMarker)
                      return this.parent.marker.data.source;
                  else
                      return null;
              }
          },
          get configSolution() {
              return configSolver.configSolution(this);
          },
          get space() {
              return this.configSolution.space;
          },
          get spaceCatalog() {
              return getConceptsCatalog(this.space, this, 1);
          },
          get commonSpace() {
              if (this.hasEncodingMarker)
                  return intersect(this.space, this.parent.marker.data.space);
              else if (!this.marker) // dataConfig used on its own
                  return this.space;
              console.warn('Cannot get data.commonSpace of Marker.data. Only meaningful on Encoding.data.');
          },
          get concept() {
              return resolveRef(this.configSolution.concept).value;
          },
          get conceptProps() { 
              return this.concept && this.source.getConcept(this.concept) 
          },
          get constant() {
              return resolveRef(this.config.constant).value ?? this.defaults.constant;
          },
          get isConstant() {
              return this.constant != null;
          },
          get hasOwnData() {
              return !!(this.source && this.concept && !this.conceptInSpace);
          },
          get conceptInSpace() {
              return this.concept && this.space && this.space.includes(this.concept);
          },
          isConceptAvailableInSpace(space, concept) {
              const dataSource = this.source;
              const availability = dataSource.availability;
              return space.includes(concept) || availability.keyValueLookup.get(createKeyStr(space))?.has(concept);
          },
          get filter() {
              const filter = resolveRef(this.config.filter).value;
              return filterStore.get(filter, this);
          },
          get locale() {
              if (this.config.locale)
                  return typeof this.config.locale == "string" ? this.config.locale : this.config.locale.id;
              else
                  return this.hasEncodingMarker ? this.parent.marker.data.locale || this.source?.locale : this.source?.locale;              
          },
          get availability() { return this.source.availability.data.map(kv => this.source.getConcept(kv.value)) },
          get domainDataSource() {
              let source = this.config.domainDataSource || this.defaults.domainDataSource;
              if (source === 'auto') {
                  source = this.hasOwnData
                      ? 'self'
                      : this.conceptInSpace
                          ? 'filterRequired'
                          : undefined;
              }
              return source;
          },
          get domainData() {
              const source = this.domainDataSource;
              const data = source === 'self' ? this.response
                  : this.hasEncodingMarker && this.parent.marker.transformedDataMaps.has(source) ? this.parent.marker.transformedDataMaps.get(source).get()
                  : source === 'markers' ? this.parent.marker.dataMap  
                  : this.response;

              return data;
          },
          get domain() {
              //trace();
              if (this.isConstant)
                  return isNumeric(this.constant) ? [this.constant, this.constant] : [this.constant];

              return this.calcDomain(this.domainData, this.conceptProps);
          },
          calcDomain(data, { concept, concept_type } = this.conceptProps) { 
              // use rows api implemented by both group and df
              if (["measure","time"].includes(concept_type)) // continuous
                  return extent(data.rows(), concept);
              else // ordinal (entity_set, entity_domain, string)
                  return unique(data.rows(), concept); 
          },
          get configState() {
              return this.marker?.configState ?? combineStates(configSolver.dataConfigSolvingState(this));
          },
          get state() {
              const states = [ () => this.configState ];
              if (this.source) { states.push(() => this.source.conceptsState); } // conceptState needed for calcDomain()
              states.push(() => this.responseState);
              const state = combineStatesSequential(states);
              if (state == 'fulfilled' && this.domainDataSource == 'self') this.domain; 
              return state;
          },
          createQuery({ space = this.space, concept = this.concept, filter = this.filter, locale = this.locale, source = this.source } = {}) {
              const query = {};
              
              const keyStr = createKeyStr(space);
              concept = Array.isArray(concept) ? concept : [concept];
              concept = concept.filter(concept => {
                  return source.availability.keyValueLookup.get(keyStr)?.has(concept);
              });

              query.select = {
                  key: space.slice(), // slice to make sure it's a normal array (not mobx)
                  value: concept
              };
              query.from = (space.length === 1) ? "entities" : "datapoints";
              if (filter) {
                  if (Array.isArray(filter)) {
                      query.where = Object.assign(...filter.map(f => f.whereClause(query.select.key))); 
                  } else {
                      query.where = filter.whereClause(query.select.key);
                  }
              }
              if (locale) {
                  query.language = locale; 
              }
            
              return query;
          },
          get ddfQuery() {    
              return this.createQuery({ filter: [this.marker?.data?.filter, this.filter].filter(f => f != null) })
          },
          get response() {
              return this.responsePromise.value;
          },
          get responsePromise() {
              return this.fetchResponse();
          },
          get responseState() {
              if (!this.hasOwnData) {
                  return 'fulfilled';
              } else {
                  if (this.responsePromise.state == 'rejected')
                      throw this.responsePromise.value;
                  return this.responsePromise.state;
              }
          },
          fetchResponse() {
              const promise = this.source.query(this.ddfQuery)
                  .then(response => response.forKey(this.commonSpace));
              return fromPromise(promise);
          },
          disposers: [],
          onCreate() {
              this.disposers.push(
                  mobx.reaction(
                      () => this.state == 'fulfilled' ? this.configSolution : {},
                      ({ space, concept }) => {
                          if (space && space != this.config.space && !arrayEquals(space, this.marker.data.space)) {
                              this.config.space = space;
                          }
                          if (concept && concept != this.config.concept) {
                              this.config.concept = concept;
                          }
                      },
                      {
                          name: 'loopback data-config-solver ' + this.parent?.id,
                          onError: (error) => this.internalErrors.push(error)
                      }
                  )
              );
          },
          internalErrors: [],
          dispose() { 
              for (const dispose of this.disposers) {
                  dispose();
              }
          }
      };
  };

  dataConfig.decorate = {
      space: mobx.computed.struct,
      commonSpace: mobx.computed.struct,
      // response: observable.ref
  };

  function entityPropertyDataConfig(...args) {
      return createModel(entityPropertyDataConfig, ...args)
  }

  entityPropertyDataConfig.nonObservable = function (cfg, parent) {

      if (!("concept" in cfg)) cfg.concept = { 
          solveMethod: 'mostCommonDimensionProperty', 
          allowedProperties: ['name', 'title']
      };

      const base = dataConfig.nonObservable(cfg, parent);

      return composeObj(base, {
          iterableResponse: false,
          get space() {
              return base.space?.filter(dim => !this.source.isTimeConcept(dim));
          },
          get queries() {
              const kvLookup = this.source.availability.keyValueLookup;
              return this.space
                  .filter(dim => kvLookup.get(dim)?.has(this.concept))
                  .map(dim => {
                      return this.createQuery({ space: [dim] });
                  });
          },
          isConceptAvailableInSpace(space, concept) {
              return true; // could check if there's availability for some space dimensions
          },
          lookups(response, concept) {
              const lookups = new Map();
              response.forEach(dimResponse => {
                  const { dim, data } = dimResponse;
                  const lookup = new Map();
                  lookups.set(dim, lookup);
                  for (const row of data.raw) {
                      lookup.set(row[dim], row[concept]);
                  }
              });
              return new Map([[concept, lookups]]);
          },
          get domain() {
              // could be an object with domain per dimension?
              return undefined;
          },
          fetchResponse() {
              const labelPromises = this.queries.map(query => this.source.query(query)
                  .then(data => ({ dim: query.select.key[0], data }))
              );
              const promise = Promise.all(labelPromises).then(response => {
                  const lookups = this.lookups(response, this.concept);
                  return DataFrame.fromLookups(lookups, this.commonSpace)
              });
              return fromPromise(promise);
          }
      })
  };
  entityPropertyDataConfig.decorate = dataConfig.decorate;

  const dataConfigStore = createStore(dataConfig, {
      entityPropertyDataConfig,
  });

  const scales = {
      "linear": d3.scaleLinear,
      "log": d3.scaleLog,
      "genericLog": d3.scaleSymlog,
      "sqrt": d3.scaleSqrt,
      "ordinal": d3.scaleOrdinal,
      "point": d3.scalePoint,
      "band": d3.scaleBand,
      "time": d3.scaleUtc
  };

  function scale(...args) {
      return createModel(scale, ...args)
  }

  scale.nonObservable = function(config, parent) {
    
      function isArrayOneSided(array){
          if (!array) return false;
          if (array.length < 2) return true;
          return !(d3.min(array) <= 0 && d3.max(array) >= 0);
      }

      return {
          config,
          parent,
          name: 'scale',
          defaults: {
              allowedTypes: null,
              clamp: false,
              clampDomainToData: false,
              orderDomain: true,
              domain: [0, 1],
              range: [0, 1],
              type: 'linear',
              zeroBaseline: false,
          },
          get zeroBaseline() {
              return (this.config.zeroBaseline ?? this.defaults.zeroBaseline) && !this.isDiscrete(this.data.domain) && isArrayOneSided(this.data.domain);
          },
          get clamp() {
              return this.config.clamp ?? this.defaults.clamp;
          },
          get data() {
              return this.parent.data;
          },
          get orderDomain() {
              return this.config.orderDomain ?? this.defaults.orderDomain;
          },
          scaleTypeNoGenLog(domain = this.domain) {
              const concept = this.data.conceptProps;
              let scaleType = null;
              let scale;
              if (scales[this.config.type]) {
                  scaleType = this.config.type;
              } else if (concept && concept.scales && (scale = JSON.parse(concept.scales)[0]) && scales[scale]) {
                  scaleType = scale;
              } else if (
                  concept && ["entity_domain", "entity_set", "string", "boolean"].includes(concept.concept_type)
                  || domain.length == 1
              ) {
                  const range = this.calcRange(domain);
                  if (!range.every(isNumeric) || range.length != 2)
                      scaleType = "ordinal";
                  else
                      scaleType = "point";
              } else if (concept && ["time"].includes(concept.concept_type)) {
                  scaleType = "time";
              } else {
                  scaleType = this.defaults.type;
              }
              return scaleType;
          },
          get allowedTypes() {
              return this.config.allowedTypes ?? this.defaults.allowedTypes;
          },
          get type() {

              let scaleType = this.scaleTypeNoGenLog();
              let allowedTypes = this.allowedTypes;
              
              if (scaleType == "log" && !isArrayOneSided(this.domain)) {
                  scaleType = "genericLog";
              }

              if (allowedTypes && !allowedTypes.includes(scaleType)) {
                  console.warn('Scale type not in allowedTypes, please change scale type.', { scaleType, allowedTypes });
                  return;
              }
                  
              return scaleType;    
          },
          get d3Type() {
              return scales[this.type];
          },
          calcRange(domain = this.domain) {
              if (this.config.range != null)
                  return this.config.range;

              // default for constant is identity
              if (this.data.isConstant)
                  return domain;

              // default
              return this.defaults.range;
          }, 
          get range() {
              return this.calcRange();
          },
          get clampDomainToData() { return this.config.clampDomainToData ?? this.defaults.clampDomainToData },
          get domain() {
              let domain;
              if (this.config.domain) {
                  domain = this.config.domain
                      .map(v => parseConfigValue(v, this.data.conceptProps))
                      .map(v => this.clampDomainToData ? this.clampToDomain(v, this.data.domain) : v);
              } else if (this.data.isConstant && this.config.range) {
                  domain = [...this.range].sort(sortDateSafe);
              } else if (this.data.domain) {
                  domain = this.data.domain;
                  // zeroBaseline can override the domain if defined and if data domain is one-sided
                  // by replacing the value closest to zero with zero
                  // use cases: forcing zero-based bar charts and bubble size
                  if (this.zeroBaseline) {
                      domain = [...domain];
                      const closestToZeroIdx = d3.leastIndex(domain.map(Math.abs));
                      domain[closestToZeroIdx] = 0;
                  } 
              } else {
                  domain = this.defaults.domain;
              }     
              return this.isDiscrete(domain) && this.orderDomain ? [...domain].sort(sortDateSafe) : domain;
          },
          set domain(domain) {
              this.config.domain = domain;
          },
          clampToDomain(val, domain = this.domain) {
              if (this.isDiscrete(domain))
                  return domain.includes(val) ? val : undefined;
              
              if (val < domain[0]) return domain[0];
              if (val > domain[1]) return domain[1];
              return val;
          },
          d3ScaleCreate() {
              const scale = scales[this.type]();
              if (this.type === "genericLog") ;
              if(scale.clamp) scale.clamp(this.clamp);
              return scale.domain(this.domain).range(this.range);
          },
          get d3Scale() {
              return this.d3ScaleCreate();
          },
          get zoomed() {
              return this.config.zoomed ? this.config.zoomed.map(c => parseConfigValue(c, this.data.conceptProps)) : this.domain;
          },
          set zoomed(zoomed) {
              this.config.zoomed = zoomed;
          },
          isDiscrete(domain) {
              const scaleType = this.scaleTypeNoGenLog(domain);
              return scaleType == "ordinal" || scaleType == "band" || scaleType == "point";
          },
          domainIncludes(value, domain = this.domain) {
              if ([d3.scaleLinear, d3.scaleLog, d3.scaleSymlog, d3.scaleSqrt, d3.scaleUtc].includes(this.d3Type)) {
                  const [min, max] = domain;
                  return min <= value && value <= max;
              } else {
                  return domain.includes(value);
              }
          },
          disposers: [],
          onCreate() { },
          dispose() {
              for (let disposer of this.disposers) {
                  disposer();
              }
          }
      }
  };

  scale.decorate = {
      // allow setting an array to these properties, otherwise getting an infinite loop because values inside array won't be compared
      range: mobx.computed.struct,
      domain: mobx.computed.struct,
      zoomed: mobx.computed.struct,
      allowedTypes: mobx.computed.struct
  };

  const defaultConfig$8 = {
      palette: {},
  };

  const defaults$6 = {
      defaultPalettes: {
          "_continuous": {
            "_default": "#ffb600",
            "0": "#8c30e8", //"hsl(270, 80%, 55%)",
            "25": "#30a3e8", //"hsl(202.5, 80%, 55%)",
            "50": "#30e85e", //"hsl(135, 80%, 55%)",
            "75": "#e2c75a", //"hsl(48, 70%, 62%)",
            "100": "#e83030" //"hsl(0, 80%, 55%)"
          },
          "_ordinal": {
            "_default": "#ffb600",
            "0": "#4cd843",
            "1": "#e83739",
            "2": "#ff7f00",
            "3": "#c027d4",
            "4": "#d66425",
            "5": "#0ab8d8",
            "6": "#bcfa83",
            "7": "#ff8684",
            "8": "#ffb04b",
            "9": "#f599f5",
            "10": "#f4f459",
            "11": "#7fb5ed"
          },
          "_default": {
            "_default": "#ffb600"
          }
      },
  };

  function palette(config = {}, parent) {

      applyDefaults(config, defaultConfig$8);

      return {
          config,
          parent,
          get encoding() {
              return this.parent.parent;
          },
          get colorConceptProp() {
              const conceptProps = this.encoding.data.conceptProps;
              return conceptProps ? JSON.parse(this.encoding.data.conceptProps.color || "{}") : {};
          },
          get defaultPalettes() {
              return this.config.defaultPalettes || defaults$6.defaultPalettes;
          },
          get defaultPalette() {
              let palette;
              
              if (this.encoding.data.isConstant) {
                  //an explicit hex color constant #abc or #adcdef is provided
                  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/.test(this.encoding.data.constant)) {
                      palette = { "_default": this.encoding.data.constant };
                  } else {
                      palette = deepclone(this.defaultPalettes["_default"]);
                  }
              } else if (this.colorConceptProp.palette) {
                  //specific color palette from enc concept properties
                  palette = deepclone(this.colorConceptProp.palette);
              } else {
                  palette = deepclone(this.defaultPalettes[this.paletteType]);
              }
              
              return palette;
          },
          get paletteType() {
              //constant
              if (this.encoding.data.isConstant) return "_default";
              //measure
              if (["time", "measure"].includes(this.encoding.data.conceptProps.concept_type)) return "_continuous";
              
              return "_ordinal";
          },
          get paletteLabels() {
              return this.colorConceptProp.paletteLabels;
          },
          get palette() {
              const obj = Object.assign({}, this.defaultPalette, this.config.palette); 
              
              //remove null values from the result of merging
              Object.keys(obj).forEach(key => {
                  if (!obj[key]) delete obj[key];
              });

              return obj;
          },
          get defaultColor() {
              return this.getColor("_default") || this.defaultPalettes["_default"]["_default"];
          },
          get paletteDomain() {
              return Object.keys(this.palette).filter(f => f !== "_default").sort((a, b) => a - b);
          },
          get isUserSelectable() {
              return this.colorConceptProp.hasOwnProperty("selectable") ? this.colorConceptProp.selectable : true;
          },
          get shades() {
              return this.colorConceptProp.shades;
          },
          // args: {colorID, shadeID}
          getColorShade(args) {
              if (!args) return utils.warn("getColorShade() is missing arguments");

              // if colorID is not given or not found in the palette, replace it with default color
              //if (!args.colorID || !this.defaultPalette[args.colorID]) args.colorID = "_default";

              const color = this.palette[args.colorID];
              // if the resolved colr value is not an array (has only one shade) -- return it
              if (!Array.isArray(color)) return args.shadeID == "shade" ? d3.rgb(palette[args.colorID] || this.parent.d3Scale(args.colorID)).darker(0.5).toString() : color;

              return color[this.shades[args.shadeID]];
          },
          getColor(key, palette = this.palette) {
              const color = palette[key];
              return Array.isArray(color) ? color[0] : color;
          },
          getColorByIndex(index, palette = this.palette) {
              const length = Object.keys(palette).filter(f => f !== "_default").length;
              const color = palette[index % length];
              return Array.isArray(color) ? color[0] : color;
          },
          setColor: mobx.action('setColor', function (value, pointer) {
              if(!this.parent.config.palette) this.parent.config.palette = {palette: {}};
              this.parent.config.palette.palette["" + pointer] = value ? d3.color(value).hex() : value;
          }),
          removeColor: mobx.action('removeColor', function (pointer) {
              if(this.config.palette.hasOwnProperty("" + pointer))
                  delete this.config.palette["" + pointer];
          })
      }
  }

  const defaultConfig$7 = {
  };

  const colors = {
      schemeCategory10: d3.schemeCategory10
  };

  function color(...args) {
      return createModel(color, ...args)
  }

  color.nonObservable = function(config, parent) {
      
      applyDefaults(config, defaultConfig$7);

      const s = scale.nonObservable(config, parent);

      return assign(s, {
          calcRange(domain = this.domain) {
              const range = this.config.range;
              if (Array.isArray(range))
                  return range;
              
              if (isString(range) && colors[range])
                  return colors[range];

              const palette = this.palette;
              if (palette.paletteType == "_continuous") {
                  const scaleDomain = domain;
                  const singlePoint = (scaleDomain[1] - scaleDomain[0] == 0);

                  return palette.paletteDomain.map(m => palette.getColor(singlePoint ? palette.palette[palette.paletteDomain[0]] : m));
              }

              return domain.map((d, i) => {
                  return palette.getColor(d) || palette.getColorByIndex(i) || palette.defaultColor;
              });
          },

          get palette() {
              const config = resolveRef(this.config.palette).value || defaultConfig$7.palette;
              return mobx.observable(palette(config, this));
          },

          get d3Scale() {

              const scale = this.d3ScaleCreate();
              let domain = scale.domain();

              if (this.palette.paletteType == "_continuous") { 
                  domain = this.palette.paletteDomain.map(m => +domain[0] + m / 100 * (domain[1] - domain[0]));
              }
              
              if (this.isDiscrete()) {
                  scale.unknown(this.palette.defaultColor);
              } else {
                  if (this.type === "log" || this.type === "genericLog") {
                      const limits = [domain[0], domain[domain.length - 1]];
                      const s = scale.copy()
                          .domain(limits)
                          .range(limits);
                      
                      domain = domain.map(d => s.invert(d));
                  }
                  
                  scale.interpolate(d3.interpolateRgb.gamma(2.2));
              }
              
              scale.domain(domain);
              return scale;
          }
      });
  };

  const defaults$5 = {
      clamp: true,
      extent: [0, 1],
      range: [0, 20],
      zeroBaseline: true,
  };

  function size(...args) {
      return createModel(size, ...args)
  }

  size.nonObservable = function(config, parent) {

      const s = scale.nonObservable(config, parent);
      s.defaults = deepmerge(s.defaults, defaults$5);

      return assign(s, {
          get extent() {
              return this.config.extent || [this.defaults.extent[0], this.data.isConstant ? null : this.defaults.extent[1]];
          },
          set extent(extent) {
              this.config.extent = extent;
          }
      });
  };

  const scaleStore = createStore(scale, {
      color,
      size,
  });

  //import { scaleLinear, scaleSqrt, scaleLog, scalePoint, scaleOrdinal, schemeCategory10, extent, set } from 'd3'

  const defaultConfig$6 = {
      scale: {},
      data: {}
  };

  function encoding(...args) {
      return createModel(encoding, ...args);
  } 

  encoding.nonObservable = function(config, parent, id) {
      //console.warn('creating new encoding', name, config);
      applyDefaults(config, defaultConfig$6);

      let currentDataConfig;

      const functions = {
          id, 
          get marker() {
              return this.parent;
          },
          get name() {
              if (this.marker)
                  return this.marker.getEncodingName(this);
              else 
                  return 'Unnamed'
          },
          get data() {
              const config = resolveRef(this.config.data).value;
              const dataConfig = dataConfigStore.get(config, this);
              if (currentDataConfig && dataConfig != currentDataConfig) {
                  currentDataConfig.dispose();
              }
              return currentDataConfig = dataConfig;
          },
          get transformFields() {
              return [];
          },
          get scale() {
              // console.warn('recalculating scale', this.name);
              const scale = resolveRef(this.config.scale).value;
              return scaleStore.get(scale, this);
          },
          get references() {
              return Object.fromEntries(Object.entries(this.config)
                  .filter(entry => isReference(entry[1]))
                  .map(([key, ref]) => [ key , resolveRef(ref) ] )
              );
          },
          get referenceState() {
              return combineStates(Object.values(this.references).map(ref => ref.state))
          },
          get state() {
              return combineStates([this.data.state, this.referenceState]);
          },

          dataMapBeforeTransform(transformName) {
              const transformations = this.marker.transformations;
              const fullTransformName = this.name + "." + transformName;
              const transformIndex = transformations.findIndex(tObj => tObj.name == fullTransformName);
              return this.marker.getTransformedDataMap(transformations[transformIndex - 1].name);
          },
          
          setWhich: mobx.action('setWhich', function(kv) {        
              const concept = isNonNullObject(kv.value) ? kv.value.concept : kv.value;
              
              if (kv.key) {
                  //check ds
                  if (isNonNullObject(kv.value)) {
                      if (this.marker && kv.value.dataSource == this.marker.config.data.source) {
                          delete this.config.data.source;
                      } else {
                          this.config.data.source = kv.value.dataSource;
                      }
                  }
      
                  this.config.data.concept = concept;
                  this.config.data.space = kv.key;
                  delete this.config.data.constant;
              } else {
                  this.config.data.constant = kv.value.concept;
                  delete this.config.data.concept;
                  //delete this.config.data.space;
              }
      
              this.config.scale.domain = null;
              this.config.scale.type = null;
              this.config.scale.zoomed = null;
              this.config.scale.palette = {};
          }),
          internalErrors: [],
          dispose() {
              for (const dispose of this.destructers) {
                  dispose();
              }
              this.data.dispose();
              this.scale.dispose();
          },
          destructers: [],
          
      };

      return assign({}, functions, configurable, { config, parent });
  };

  const defaultConfig$5 = {
      modelType: "frame",
      value: null,
      loop: false,
      data: {
          concept: {
              selectMethod: "selectFrameConcept"
          }
      },
      scale: {
          clampDomainToData: true
      }
  };

  const POSSIBLE_INTERVALS = ["year", "month", "day", "week", "quarter"];

  const defaults$4 = {
      interpolate: true,
      extrapolate: false,
      playEmptyFrames: false,
      loop: false,
      playbackSteps: 1,
      speed: 100,
      interval: "year",
      splash: false
  };

  function frame(...args) {
      return createModel(frame, ...args);
  }

  frame.nonObservable = function(config, parent, id) {
      applyDefaults(config, defaultConfig$5);

      const functions = {
          get value() {
              let value;
      
              if (this.config.value != null) {
                  value = this.parseValue(this.config.value);
                  value = this.scale.clampToDomain(value);
              } else {
                  value = this.scale.domain[0];
              }
              return value;
          },
          parseValue(value){
              return parseConfigValue(value, this.data.conceptProps);
          },
          formatValue(value){
              return configValue(value, this.data.conceptProps);
          },
          get step() { return this.stepScale(this.value); },
          
          /**
           * Scale with frame values (e.g. years) as domain and step number (e.g. 0-15) as range.
           * Can't use 2 point linear scale as time is not completely linear (leap year/second etc)
           * @returns D3 scale
           */
          get stepScale() {
              const range = d3.range(0, this.stepCount);
              const scale = this.scale.d3Type(this.domainValues, range); 
      
              // fake clamped invert for ordinal scale
              // https://github.com/d3/d3/issues/3022#issuecomment-260254895
              if (!scale.invert) scale.invert = step => this.domainValues[step];
      
              return scale;
          },
          get playEmptyFrames() {
              return this.config.playEmptyFrames ?? defaults$4.playEmptyFrames;
          },
          /**
           * Key frame values limited to scale domain
           **/ 
          get domainValues() {
              const frameMap = this.marker.getTransformedDataMap("filterRequired");
              if (this.playEmptyFrames) {
                  const domain = frameMap.keyExtent();
                  return inclusiveRange(domain[0], domain[1], this.interval);
              } else {
                  let frameValues = [];
                  for (let frame of frameMap.values()) {
                      const frameValue = frame.values().next().value[this.name];
                      if (this.scale.domainIncludes(frameValue)) {
                          frameValues.push(frameValue);
                      } 
                  }
                  return frameValues
              }
          },
          get stepCount() {
              return this.domainValues.length;
          },
      
          // PLAYBACK
          get speed() { 
              if (this.immediate) return 0;
              return this.config.speed || defaults$4.speed 
          },
          get loop() { return this.config.loop || defaults$4.loop },
          get playbackSteps() { return this.config.playbackSteps || defaults$4.playbackSteps },
          immediate: false,
          playing: false,
          togglePlaying() {
              this.playing ?
                  this.stopPlaying() :
                  this.startPlaying();
          },
          startPlaying: mobx.action('startPlaying', function startPlaying() {
              this.setPlaying(true);
          }),
          stopPlaying: mobx.action('stopPlaying', function stopPlaying() {
              this.setPlaying(false);
          }),
          jumpToFirstFrame: mobx.action('jumpToFirstFrame', function jumpToFirstFrame() {
              this.setStep(0);
              this.immediate = this.playing;
          }),
          setPlaying: mobx.action('setPlaying', function setPlaying(playing) {
              this.playing = playing;
              if (playing) {
                  if (this.step == this.stepCount - 1) {
                      this.jumpToFirstFrame();
                  } else {
                      this.nextStep();
                  }
              }
          }),
          setExtrapolate: mobx.action('setExtrapolate', function setExtrapolate(extrapolate) {
              this.config.extrapolate = extrapolate;
          }),
          setSpeed: mobx.action('setSpeed', function setSpeed(speed) {
              speed = Math.max(0, speed);
              this.config.speed = speed;
          }),
          setValue: mobx.action('setValue', function setValue(value) {
              let concept = this.data.conceptProps;
              let parsed = this.parseValue(value);
              if (parsed != null) {
                  parsed = this.scale.clampToDomain(parsed);
              }
              this.config.value = configValue(parsed, concept);
          }),
          setStep: mobx.action('setStep', function setStep(step) {
              this.setValue(this.stepScale.invert(step));
          }),
          setValueAndStop: mobx.action('setValueAndStop', function setValueAndStop(value) {
              this.stopPlaying();
              this.setValue(value);
          }),
          setStepAndStop: mobx.action('setStepAndStop', function setStepAndStop(step) {
              this.stopPlaying();
              this.setStep(step);
          }),
          snap: mobx.action('snap', function snap() {
              this.setStep(Math.round(this.step));
          }),
          ceilKeyFrame() {
              return this.stepScale.invert(Math.ceil(this.step));
          },
          nextStep: mobx.action('update to next frame value', function nextStep() {
              if (this.playing && this.marker.state === FULFILLED) {
                  this.immediate = false;
                  let nxt = this.step + this.playbackSteps;
                  if (nxt < this.stepCount) {
                      this.setStep(nxt);
                  } else if (this.step == this.stepCount - 1) {
                      // on last frame
                      if (this.loop) {
                          this.jumpToFirstFrame();
                      } else {
                          this.stopPlaying();
                      }
                  } else {
                      // not yet on last frame, go there first
                      this.setStep(this.stepCount - 1); 
                  }
              }
          }),
      
          /**
           * Given an array of normalized marker-key strings, gives the extent/domain of each in the frameMap
           * @param {[string]} markerKeys
           * @returns 
           */
          markerLimits(markerKeys) {
              const frameMap = this.dataMapBeforeTransform("currentFrame");
              return frameMap.extentOfGroupKeyPerMarker(markerKeys)
          },
      
          // TRANSFORMS
          get transformationFns() {
              return {
                  'frameMap': this.frameMap.bind(this),
                  'interpolate': this.interpolateData.bind(this),
                  'extrapolate': this.extrapolateData.bind(this),
                  'currentFrame': this.currentFrame.bind(this)
              }
          },
          get transformFields() {
              return [this.name];
          },
      
          // FRAMEMAP TRANSFORM
          frameMap(df) {
              let frameMap = df.groupBy(this.name, this.rowKeyDims);
              // reindex framemap - add missing frames within domain
              // i.e. not a single defining encoding had data for these frame
              // reindexing also sorts frames
              return frameMap.reindexToKeyDomain(this.interval);
          },
          get rowKeyDims() {
              // remove frame concept from key if it's in there
              // e.g. <geo,year>,pop => frame over year => <year>-><geo>,year,pop 
              return relativeComplement([this.data.concept], this.data.space);
          },

          // interpolate transform
          get interpolate() { return this.config.interpolate ?? defaults$4.interpolate },
          interpolateData(frameMap) {
              if (frameMap.size == 0 || !this.interpolate) 
                  return frameMap;

              const newFrameMap = frameMap.copy();
              const encName = this.name;

              return newFrameMap.interpolateOverMembers({ 
                  fields: this.changeBetweenFramesEncodings,
                  ammendNewRow: row => row[this.data.concept] = row[encName]
              });

          },
          get changeBetweenFramesEncodings() {
              const enc = this.marker.encoding;
              const encProps = Object.keys(enc).filter(prop => enc[prop] != this);
              if (!this.data.conceptInSpace)
                  return encProps;
              else
                  return encProps.filter(prop => {
                      return enc[prop].data.hasOwnData 
                          && enc[prop].data.space.includes(this.data.concept);
                  })
          },

          get interval() { 
              const interval = this.config.interval ?? this.data.conceptProps.concept;
              return POSSIBLE_INTERVALS.includes(interval) ? interval : defaults$4.interval;
          },

          // extrapolate transform
          get extrapolate() { return this.config.extrapolate ?? defaults$4.extrapolate },
          extrapolateData(frameMap) {
              if (frameMap.size == 0 || !this.extrapolate) 
                  return frameMap;

              // find which indexes will be the first and last after marker.filterRequired transform
              // needed to limit extrapolation to eventual filterRequired (feature request by Ola)
              // can't extrapolate áfter filterRequired as some partially filled markers will already be filtered out
              const hasDataForRequiredEncodings = frame => {
                  for (const marker of frame.values()) {
                      if (this.marker.requiredEncodings.every(enc => marker[enc] != null)) {
                          return true;
                      }
                  }
                  return false;
              };
              const requiredExtentIndices = frameMap.keyExtentIndices({
                  filter: hasDataForRequiredEncodings
              });

              const encName = this.name;

              return frameMap.extrapolateOverMembers({ 
                  fields: this.changeBetweenFramesEncodings,
                  sizeLimit: this.extrapolate,
                  indexLimit: requiredExtentIndices,
                  ammendNewRow: row => row[this.data.concept] = row[encName]
              });
          },

          // CURRENTFRAME TRANSFORM
          currentFrame(data) {
              if (data.size == 0) 
                  return DataFrame([], data.descendantKeys[0]);
      
              return data.has(this.frameKey) 
                  ? data.get(this.frameKey)
                  : this.scale.domainIncludes(this.value, this.data.domain) && this.interpolate
                      ? this.getInterpolatedFrame(data, this.step, this.stepsAround)
                      : DataFrame([], data.descendantKeys[0]);
      
          },
          get frameKey() {
              return createKeyFn([this.name])({ [this.name]: this.value }) // ({ [this.name]: this.value });
          },
          getInterpolatedFrame(df, step, stepsAround) {
              const keys = Array.from(df.keys());
              const [before, after] = stepsAround.map(step => df.get(keys[step]));
              return before.interpolateTowards(after, step % 1);
          },
          get stepsAround() {
              return [Math.floor(this.step), Math.ceil(this.step)];
          },
          get framesAround() {
              return this.stepsAround.map(this.stepScale.invert);
          },
      
          /*
           * Compute the differential (stepwise differences) for the given field 
           * and return it as a new dataframe(group).
           * NOTE: this requires that the given df is interpolated.
           * USAGE: set a correct list of transformations on the __marker__
           * and then add/remove the string "differentiate" to the data of an 
           * encoding in that marker. For example:
           *   markers: {
           *      marker_destination: {
           *        encoding: {
           *           "x": {
           *             data: {
           *               concept: "displaced_population",
           *               transformations: ["differentiate"]
           *             }
           *           },
           *          ...
           *        },
           *        transformations: [
           *          "frame.frameMap",
           *          "x.differentiate",
           *          "filterRequired",
           *          "order.order",
           *          "trail.addTrails",
           *          "frame.currentFrame"
           *        ]
           * 
           */
          differentiate(df, xField) {
              let prevFrame;
              let result = DataFrameGroup([], df.key, df.descendantKeys);
              for (let [yKey, frame] of df) {
                  const newFrame = frame.copy();
                  for(let [key, row] of newFrame) {
                      const newRow = Object.assign({}, row);
                      const xValue = row[xField];
                      if (xValue !== undefined) {
                          newRow[xField] = prevFrame ? xValue - prevFrame.getByStr(key)[xField] : 0;
                      }
                      newFrame.set(newRow, key);
                  }
                  prevFrame = frame;
                  result.set(yKey, newFrame);
              }
              return result;
          },
          get state() {
              const states = [this.data.state, this.data.source.conceptsPromise.state];
              return combineStates(states);
          },
          onCreate() {
              // need reaction for timer as it has to set frame value
              // not allowed to call action (which changes state) from inside observable/computed, thus reaction needed
              const playbackDestruct = mobx.reaction(
                  // mention all observables (state & computed) which you want to be tracked
                  // if not tracked, they will always be recomputed, their values are not cached
                  () => { return { playing: this.playing, speed: this.speed } },
                  ({ playing, speed }) => {
                      clearInterval(this.playInterval);
                      if (playing) {
                          this.playInterval = setInterval(this.nextStep.bind(this), speed);
                      }
                  }, 
                  { 
                      name: "frame playback timer",
                      onError: error => this.internalErrors.push(error) 
                  }
              );
              this.destructers.push(playbackDestruct);
              const configLoopbackDestruct = mobx.reaction(
                  () => { 
                      const waitFor = this.marker || this;
                      if (waitFor.state == 'fulfilled') return this.value 
                  },
                  (value) => {
                      if (value && "value" in this.config && !equals(this.config.value, value)) {
                          this.config.value = configValue(value, this.data.conceptProps);
                      }
                  },
                  { 
                      name: "frame config loopback",
                      onError: error => this.internalErrors.push(error) 
                  }
              );
              this.destructers.push(configLoopbackDestruct);
              this.destructers.push(() => {
                  clearInterval(this.playInterval);
              });
          },
          get splash() { 
              return this.config.splash || defaults$4.splash;
          }
      };

      return assign(encoding.nonObservable(config, parent, id), functions);
  };

  frame.splashMarker = function splashMarker(marker) {
      const frame = marker.encoding.frame;
      if (frame?.splash) {
          const concept = resolveRef(frame.config.data.concept).value;
          if (typeof concept == "string") {
              let splashConfig = Vizabi.utils.deepclone(marker.config);
              const filterMerge = { data: { filter: { dimensions: { [concept]: { [concept]: 
                  frame.config.value 
              } } } } };
              splashConfig = Vizabi.utils.deepmerge(splashConfig, filterMerge);
              
              let splashMarker = Vizabi.marker(splashConfig, marker.id + '-splash');
              let proxiedMarker = markerWithFallback(marker, splashMarker);

              return { marker: proxiedMarker, splashMarker }
          } else {
              console.warn("Frame splash does not work with autoconfig concept. Please set frame.data.concept or disable splash.");
              return { marker };
          }
      } else {
          return { marker };
      }
  };
  frame.decorate = {
      changeBetweenFramesEncodings: mobx.computed.struct
  };

  function markerWithFallback(marker, fallback) {
      return new Proxy(marker, {
          get: function(target, prop, receiver) {

              if (fallback && target.state == 'fulfilled') {
                  fallback.dispose();
                  fallback = undefined;
              }

              return fallback
                  ? fallback[prop]
                  : target[prop];
          }
      })
  }

  //instead of selecting an unused concept it selects a frame concept
  //gives preference to concepts in space that are of type time and measure
  //if there is no time or measure in space then check candidate concepts given by solveMethod
  //if notheing there either, then pick the last dimension of the space
  //it woud fail if space is an empty array
  configSolver.addSolveMethod(
      function selectFrameConcept({ concepts, space, dataConfig }) {
          const spaceConcepts = space.map(dim => dataConfig.source.getConcept(dim));
          return findTimeOrMeasure(spaceConcepts) || findTimeOrMeasure(concepts) || spaceConcepts[spaceConcepts.length - 1];
          
          function findTimeOrMeasure (concepts) {
              return concepts.find(c => c.concept_type == 'time') || concepts.find(c => c.concept_type == 'measure');
          }
      }
  );

  const defaultConfig$4 = {
      modelType: "selection",
      data: {
          concept: undefined,
          space: undefined
      }
  };

  const selection = defaultDecorator({
      base: encoding,
      defaultConfig: defaultConfig$4
  });

  const directions = {
      ascending: "ascending",
      descending: "descencding"
  };
  const defaults$3 = {
      direction: directions.ascending
  };

  const order = defaultDecorator({
      base: encoding,
      functions: {
          get direction() {
              return this.config.direction || defaults$3.direction;
          },
          get transformFields() {
              return this.data.isConstant ? [] : [this.name];
          },
          order(df) {
              if (this.data.isConstant)
                  return df;
              const name = this.name;
              const direction = this.direction;
              return df.order([{ [name]: direction }]);
          },
          get transformationFns() {
              return {
                  order: this.order.bind(this)
              }
          },
      }
  });

  const defaultConfig$3 = {
      data: {
          concept: undefined,
          space: undefined,
          filter: { 
              modelType: "trailFilter",
              markers: {}, 
          } 
      }
  };

  const defaults$2 = {
      show: true,
      updateStarts: true,
      frameEncoding: "frame"
  };
  function trail(...args) {
      return createModel(trail, ...args)
  }

  trail.nonObservable = function(config, parent, id) {

      applyDefaults(config, defaultConfig$3);

      const base = encoding.nonObservable(config, parent, id);
      let oldStarts = {};

      return assign(base, {
          get show() { 
              return typeof this.config.show == 'boolean' ? this.config.show : defaults$2.show
          },
          get groupDim() {
              return this.frameEncoding.data.concept;
          },
          get frameEncoding() {
              const frameEncoding = this.config.frameEncoding || defaults$2.frameEncoding;
              return this.marker.encoding[frameEncoding];
          },
          /**
           * For each trailed marker, get the min-max of the trail. 
           */
          get limits() {
              // get datamap that's also used as input for addTrails
              const group = this.dataMapBeforeTransform("addPreviousTrailHeads");
              return group.extentOfGroupKeyPerMarker(this.data.filter.markers.keys())
          },
          /**
           * Set trail start of every bubble to `value` if value is lower than current trail start
           */
          updateTrailStart: mobx.action('update trail start', function updateTrailStart(
              value = this.frameEncoding.value, 
              limits = this.limits
          ) {
              let key, min, max;
              for (key in this.starts) {
                  [min, max] = limits[key];
                  max = d3.min([max, this.starts[key]]);
                  this.data.filter.set(key, value, [min, max]);
              }
          }),
          /**
           * Object of parsed trail starts from config
           */
          get starts() {
              if (!this.updateStarts) return oldStarts;
              const starts = {};
              for (let [key, payload] of this.data.filter.markers) {
                  // need to clamp here too because starts may be invalid in user config or when switching data
                  const limits = this.limits[key];
                  if (limits.some(n => n == undefined))
                      continue; // skip starts that aren't even in data
                  const configValue = this.frameEncoding.parseValue(payload);
                  starts[key] = clamp(configValue, ...limits);
              }
              return oldStarts = starts;
          },
          /**
           * Can be set to false if frame value is likely to decrease frequently (e.g. dragging a timeslider).
           * Will temporarily not update starts and thus not trigger expensive addTrails operation.
           */
          get updateStarts() {
              return typeof this.config.updateStarts == 'boolean' ?  this.config.updateStarts : defaults$2.updateStarts;
          },
          setShow: mobx.action(function(show) {
              this.config.show = show;
              if (show === true) {
                  for (let key of this.data.filter.markers.keys()) 
                      this.data.filter.set(key);
              }
          }),
          get transformationFns() {
              return {
                  'addPreviousTrailHeads': this.addPreviousTrailHeads.bind(this),
                  'addTrails': this.addTrails.bind(this)
              }
          },
          /**
           * Trails are all sorted together at the position of their head.
           * So we first add heads, then we can order markers and then we can add the rest of the trail
           * @param {*} group 
           * @returns 
           */
          addPreviousTrailHeads(group) {
              const trailMarkerKeys = Object.keys(this.starts);
              if (trailMarkerKeys.length == 0 || !this.show)
                  return group;

              const newGroup = DataFrameGroup([], group.key, group.descendantKeys);
              const trailHeads = new Map();
              for (let [id, frame] of group) {
                  const keyObj = group.keyObject(frame);
                  const historicalTrails = new Set();
                  for (let trailMarkerKey of trailMarkerKeys) {
                      // current group doesn't have a head for this trail that has already passed
                      if (!frame.hasByStr(trailMarkerKey)) {
                          if (trailHeads.has(trailMarkerKey)) {
                              historicalTrails.add(trailMarkerKey);
                          }
                      } else {
                          const trailMarker = frame.getByStr(trailMarkerKey);
                          trailHeads.set(trailMarkerKey, trailMarker);
                      }
                  }

                  const newFrame = frame.copy();
                  for (let trailMarkerKey of historicalTrails) {
                      const trailHead = trailHeads.get(trailMarkerKey);
                      newFrame.set(trailHead);
                  }
                  newGroup.set(keyObj, newFrame);
              }
              return newGroup;
          },
          /**
           *  Per given marker, in whatever ordered group
           *  1. get markers from groups before its group (possibly starting at given group)
           *  2. add those markers to current group, with new key including original group (so no collission)
           * @param {*} group 
           */
          addTrails(group) {

              // can't use this.groupDim because circular dep this.marker.transformedDataMap
              const groupDim = group.key[0]; // supports only 1 dimensional grouping
              const markerKeys = Object.keys(this.starts);

              if (markerKeys.length == 0 || !this.show)
                  return group;

              // create trails
              const trails = new Map();
              for (let key of markerKeys) {
                  const trail = new Map();
                  trails.set(key, trail);
                  for (let [i, frame] of group) {
                      if (frame.hasByStr(key))
                          trail.set(i, assign({}, frame.getByStr(key)));
                  }
              }

              // add trails to groups
              const prop = groupDim;
              const newGroup = DataFrameGroup([], group.key, group.descendantKeys);
              const trailKeyDims = [...group.descendantKeys[0], prop];
              const trailKeyFn = createKeyFn(trailKeyDims);
              for (let [id, frame] of group) {
                  const keyObj = group.keyObject(frame);
                  const newFrame = DataFrame([], frame.key);
                  for (let [markerKey, markerData] of frame) {
                      // insert trails before its head marker
                      if (trails.has(markerKey)) {
                          const trail = trails.get(markerKey);
                          const trailStart = this.starts[markerKey];
                          const trailEnd = markerData[prop];
                          // add trail markers in ascending order
                          for (let [keyStr, trailMarker] of trail) {
                              const idx = trailMarker[prop];
                              if (idx < trailStart) continue;
                              // idx > trailEnd includes main bubble in trail as well (as opposed to >=).
                              // This creates duplicate trail head markers in key frames but allows easy interpolation logic
                              // for interpolated frames. Trail head is source for two interpolated bubbles, current frame and (trail head-1).
                              // Another solution would be to allow multiple keys per datapoint (e.g. geo-swe-frame-2000 AND geo-swe)
                              // and make interpolation interpolate for both keys.
                              if (idx > trailEnd) break;
                              const newKey = trailKeyFn(trailMarker);
                              const newData = Object.assign(trailMarker, {
                                  [Symbol.for('key')]: newKey,
                                  [Symbol.for('trailHeadKey')]: markerKey
                              });
                              newFrame.set(newData, newKey);
                          }
                      }
                      // (head) marker
                      newFrame.set(markerData, markerKey);
                  }
                  newGroup.set(keyObj, newFrame);
              }
              return newGroup;
          },
          onCreate() {
              const updateTrailDestruct = mobx.reaction(
                  // wait for marker state, as we need transformeddatamaps for limits
                  () => this.marker.state == 'fulfilled' ? this.frameEncoding.ceilKeyFrame() : false,
                  (value) => { if (value) this.updateTrailStart(value); }, 
                  { 
                      name: "updateTrailStart on frame value change",
                      onError: e => this.internalErrors.push(e)
                  }
              );
              this.destructers.push(updateTrailDestruct);
              const configLoopbackDestruct = mobx.reaction(
                  () => this.marker.state == 'fulfilled' ? this.starts : undefined,
                  (starts) => {
                      // this.starts may have excluded configured markers because they're not
                      // available in data. This loops that data-informed exclusion back to 
                      // config.
                      if (starts) {
                          const filter = this.data.filter;
                          for (let key of filter.markers.keys()) {
                              if (!(key in starts))
                                  filter.delete(key);
                          }
                      }
                  },
                  { 
                      name: "trail config loopback",
                      onError: e => this.internalErrors.push(e)
                  }
              );
              this.destructers.push(configLoopbackDestruct);
          }
      });
  };

  trail.decorate = {
      starts: mobx.computed.struct,
      limits: mobx.computed.struct
  };

  const defaultConfig$2 = {
      data: {
          concept: undefined,
          space: undefined
      }
  };

  const defaults$1 = {
      ncolumns: 1
  };

  const repeat = defaultDecorator({
      base: encoding,
      defaultConfig: defaultConfig$2,
      functions: {
          //["y1", "y2"], this is for special case when aliases are connected across rows-columns 
          get row() {
              return this.config.row;
          },
          //["x1", "x2"], this is for special case when aliases are connected across rows-columns 
          get column() {
              return this.config.column;
          },
          //["x", "y"], this is the blueprint that indicates which encodings need to be aliased
          //must be of length 2 for "row" and "column" to work
          get allowEnc() {
              if(!this.config.allowEnc) console.warn(`Repeater encoding is missine essential bit of config "allowEnc"`);
              return this.config.allowEnc;
          },
          //{x: x, y: y}, unfolds enc array of strings into an object
          get guessAliases() {
              return this.allowEnc.reduce((obj, value) => {
                  if (!this.marker.encoding[value]) value = this.marker.requiredEncodings.at(-1);
                  obj[value] = value;
                  return obj;
              }, {})
          },
          get useConnectedRowsAndColumns(){
              const {allowEnc, row, column} = this;
              return row && row.length && column && column.length && allowEnc.length == 2;
          },
          //[{x: x1, y: y1}, {x: x2, y: y1}]
          get rowcolumn() {
              if(this.config.rowcolumn) return this.config.rowcolumn;
              
              if(this.useConnectedRowsAndColumns){
                  //flatten row and column arrays into rowcolumn
                  const {allowEnc, row, column} = this;
                  const rowcolumn = [];
                  row.forEach(r => {
                      column.forEach(c => {
                          rowcolumn.push({[allowEnc[0]]: r, [allowEnc[1]]: c});
                      });
                  });
                  return rowcolumn;
              } else {
                  //try to guess aliases as defaults
                  return [this.guessAliases];
              }
          },
          //1, generic way: number of columns for wrapping
          get ncolumns() {
              return this.config.ncolumns || this.useConnectedRowsAndColumns && this.column.length || defaults$1.ncolumns;
          },
          get nrows() {
              return this.rowcolumn.length / this.ncolumns;
          },
          getName: function(d) {
              const hash = Object.keys(d)
                  .sort(d3.ascending)
                  .map(key => key + "-" + d[key])
                  .join("--");
              return `chart-repeated--${hash}`;
          },
          getRowIndex: function(i) {
              return Math.floor(i/this.ncolumns);
          },
          getColumnIndex: function(i) {
              return i % this.ncolumns;
          },
      }
  });

  const defaultConfig$1 = {
    space: undefined,
    concept: undefined
  };

  const aggregate = defaultDecorator({
      base: encoding,
      defaultConfig: defaultConfig$1,
      functions: {
          get grouping () { 
            return this.config.grouping ?? {};
          },
          get measures() {
            return this.config.measures ?? [];
          },
          aggregate(df) {
              const groupSizes = filterObject(this.grouping, 
                  (val, key) => df.key.includes(key) && val['grouping'] > 1
              );
              const measures = this.measures;

              if (Object.keys(groupSizes).length == 0) {
                return df;
              }

              let result = DataFrame([], df.key);
              for (const row of df.rows()) {
                  // new grouped key
                  const newKeyObj = pick(row, df.key);
                  for (const dim in groupSizes) {
                      const groupSize = groupSizes[dim]['grouping'];
                      newKeyObj[dim] = Math.floor(+row[dim] / groupSize) * groupSize;
                  }
                  const keyStr = result.keyFn(newKeyObj);
                  // sum if group already exists, otherwise create
                  if (result.hasByStr(keyStr)) {
                      const newRow = result.getByStr(keyStr);
                      measures.forEach(measure => newRow[measure] += row[measure]);
                  } else {
                      const newRow = assign({}, row, newKeyObj);
                      result.setByStr(keyStr, newRow);
                  }
              }
          
              return result;
          },
          get transformationFns() {
              return {
                  aggregate: this.aggregate.bind(this)
              }
          },
      }
      

  });

  const encodingStore = createStore(encoding, {
      frame,
      selection,
      order,
      trail,
      repeat,
      aggregate
  });

  //encoding cache makes sure encodings are not recreated every time

  function encodingCache() {
      const cache = {};
      function fill(cfg, marker) {
          for (const prop in cfg) {
              if (!(prop in cache)) {
                  cache[prop] = encodingStore.get(cfg[prop], marker, prop);
              }
          }
      }
      function purge(cfg) {
          for (const prop of Object.keys(cache)) {
              if (!(prop in cfg)) {
                  cache[prop].dispose();
                  delete cache[prop];
              }
          }
      }
      return { 
          cache,
          update(cfg, marker) {
              fill(cfg, marker);
              purge(cfg);
              return cache;
          }
      }
  }

  const defaultConfig = {
      data: { },
      encoding: {},
  };

  const defaults = {
      requiredEncodings: [],
      transformations: [
          "aggregate.aggregate",
          "frame.frameMap",
          "frame.interpolate",
          "frame.extrapolate",
          "filterRequired", // after framemap so doesn't remove interpolatable rows
          "trail.addPreviousTrailHeads", // before ordering so trailheads get ordered
          "order.order", 
          "trail.addTrails", // after ordering so trails stay together
          "frame.currentFrame" // final to make it quick
      ]
  };

  function marker(...args) {
      return createModel(marker, ...args);
  }

  marker.nonObservable = function(config, parent, id) {
      applyDefaults(config, defaultConfig);
      let currentDataConfig;

      const marker = { config, id };
      const functions = {
          on: function(prop, readyFn) {
              if (this.validProp(prop) && typeof readyFn == "function") {
                  const disposer = mobx.autorun(
                      () => this.state == 'fulfilled' && readyFn.call(this, this[prop])
                  );
                  this.getEventListenersMapFor(prop).set(readyFn, disposer);
              } else {
                  console.warn('Invalid "on" call');
              }
              return this;
          },
          off: function(prop, fn) {
              if (this.eventListeners.get(prop)?.has(fn)){
                  this.getEventListenersMapFor(prop).get(fn)(); // dispose
                  this.getEventListenersMapFor(prop).delete(fn); // delete
              }
              return this;
          },
          validProp(prop) {
              return prop in this;
          },
          eventListeners: new Map(),
          getEventListenersMapFor(prop) {
              if (!this.eventListeners.has(prop))
                  this.eventListeners.set(prop, new Map());
              return this.eventListeners.get(prop);
          },
          get data() {
              const datacfg = resolveRef(this.config.data).value;
              const dataConfig = dataConfigStore.get(datacfg, this);
              if (currentDataConfig && dataConfig != currentDataConfig) {
                  currentDataConfig.dispose();
              }
              return currentDataConfig = dataConfig;
          },
          encodingCache: encodingCache(),
          get encoding() {
              const validEncoding = config => config() && Object.keys(config()).length > 0;
              const configGetters = [
                  () => this.config.encoding, 
                  () => this.data.source.defaultEncoding
              ];
              let configGetter = configGetters.find(validEncoding);
              if (!configGetter) {
                  console.warn("No encoding found and marker data source has no default encodings");
                  configGetter = () => ({});
              }
              // clone cache so computed is invalidated
              return Object.assign({}, this.encodingCache.update(configGetter(), this));
          },
          // TODO: encodings should know the property they encode to themselves; not sure how to pass generically yet 
          getEncodingName(encoding) {
              for (let [name, enc] of Object.entries(this.encoding)) {
                  if (enc == encoding) return name;
              }
          },
          get configState() {
              return configSolver.markerSolvingState(this);
          },
          get references() {
              return Object.fromEntries(Object.entries(this.config)
                  .filter(entry => isReference(entry[1]))
                  .map(([key, ref]) => [ key , resolveRef(ref) ] )
              );
          },
          get referenceState() {
              //normal combineStates works in parallel (reads-triggers all states at once)
              return combineStates(Object.values(this.references).map(ref => ref.state))
          },
          get state() {
              //checking state should not send any queries before reference state and config state are resolved
              //Checks all states sequantially (only check-trigger next state if previous is fulfilled)
              const dataConfigSolverState = combineStatesSequential([() => this.referenceState, () => this.configState]);

              // observe (part of) the pipeline as long as state is observed to keep them cached
              if (dataConfigSolverState == 'fulfilled') {
                  if (this.encoding.frame?.changeBetweenFramesEncodings?.some(enc => this.encoding[enc].data.state !== 'fulfilled')) {
                      //trigger combining encoding data responses in dataMapCache
                      this.dataMapCache;
                  } else {
                      this.dataMap;
                  }
              }

              const encodingStates = [...Object.values(this.encoding)].map(enc => () => enc.state);
              const states = [() => dataConfigSolverState, ...encodingStates];
              return combineStatesSequential(states);
          },
          get availability() {
              const items = [];
              dataSourceStore.getAll().forEach(ds => {
                  ds.availability.data.forEach(kv => {
                      items.push({ key: kv.key, value: ds.getConcept(kv.value), source: ds });
                  });
              });
              return items;
          },
          get spaceAvailability() {
              const items = [];
              dataSourceStore.getAll().forEach(ds => {
                  ds.availability.keyLookup.forEach((val, key) => {
                      items.push(val);
                  });
              });
              return items;
          },
          get transformFields() {
              return new Set(
                  this.requiredEncodings.concat(
                      Object.values(this.encoding).map(enc => enc.transformFields).flat()
                  )
              );
          },
          get encodingByType() {

              const defining = [];
              let ammendWrite = []; // ammends by writing to object. Changes to encoding trigger pipeline, but pipeline is faster with direct writing.
              let ammendGet = []; // ammends by creating a getter. Allows changing config of encoding without triggering rest of pipeline.
              
              const transformFields = this.transformFields;

              for (const name of Object.keys(this.encoding)) {
                  const fn = this.ammendFnForEncoding(name);

                  if (fn === 'defining') {
                      defining.push(name);
                  } else if (typeof fn === 'function') {
                      if (transformFields.has(name)) {
                          ammendWrite.push(name);
                      } else {
                          ammendGet.push(name);
                      }
                  } 

              }
                     
              // optimization: if ammending shares response with defining just let fullJoin handle it
              if (defining.concat(ammendWrite).every(name => this.encoding[name].data.state == 'fulfilled')) {
                  const definingResponses = defining.map(name => this.encoding[name].data.response);
                  ammendWrite = ammendWrite.filter(name => {
                      const data = this.encoding[name].data;
                      if (data.hasOwnData && definingResponses.includes(data.response)) {
                          defining.push(name);
                          return false;
                      }
                      return true;
                  });
              }

              return {
                  defining,
                  ammendGet,
                  ammendWrite
              }
          },
          ammendFnForEncoding(name) {
              const required = this.requiredEncodings;
              const data = this.encoding[name].data;
              const concept = data.concept;

              if (concept === undefined && !data.isConstant)
                  return 'no-op';
              else if (data.isConstant) {
                  return row => data.constant;
              } else if (data.conceptInSpace) {
                  return row => row[concept];
              } else if (data.commonSpace.length < this.data.space.length
                  || data.iterableResponse === false
                  ) { 
                  // proper subset
                  return row => data.response.get(row)?.[concept];
              } else if (required.length > 0 && !required.includes(name)) {
                  // superset and not a required enc when required is used (otherwise it would be a defining)
                  return (row, key) => data.response.getByStr(key)?.[concept];
              } else {
                  return 'defining'; // defining encoding
              }
          },
          get encodingState() {
              const encs = [...this.encodingByType.defining, ...this.encodingByType.ammendWrite];
              return combineStates(encs.map(enc => this.encoding[enc].data.state));
          },
          // computed to cache calculation
          get dataMapCache() {
              // trace();

              // prevent recalculating on each encoding data coming in
              if (this.encodingState !== 'fulfilled')
                  return DataFrame([], this.data.space);

              //console.time('dataMapCache ' + this.id);

              // define markers (full join encoding data)
              const { defining, ammendWrite, ammendGet } = this.encodingByType;
              const joinConfigs = defining.map(name => this.joinConfig(this.encoding[name], name));
              let dataMap = fullJoin(joinConfigs, this.data.space);

              // ammend markers with getter
              // part of the optimisation to not redo the whole data pipeline 
              //ammending encodings are split in 2 groups: ammending with getter and ammending by writing
              //the once that use the getter won't trigger pipeline (constants, concepts in space)
              //the idea with getter is to postpone calculation or reading to a later point
              //in the standard bubble chart color is through the getter too
              //calcualtions are more expensive but we can postpone them
              for (const encName of ammendGet) {
                  for (const markerKey of dataMap.keys()) {
                      const row = dataMap.get(markerKey); 
                      let fallback;
                      Object.defineProperty(row, encName, {
                          get: () => this.ammendFnForEncoding(encName)(row, markerKey) ?? fallback,
                          set(value) {
                              fallback = value;
                          },
                          enumerable: true,
                          configurable: true
                      });
                  }
              }

              // ammend markers by writing
              //this is the faster way. doesn't have to go through a getter function
              //quicker access compared to reading from a getter
              //we do this when the values are computed in trasformation pipeline anyway
              //see getEncodingByType()

              //each enc has a field. if that field is included in transformFields array of a marker (which adds its own transformfileds and those of every encoding)
              //then it's a written encoding

              //if we change something that uses getter field then the whole pipele doesn't need to rerun
              const ammendFns = Object.fromEntries(ammendWrite.map(enc => [enc, this.ammendFnForEncoding(enc)]));
              for (const markerKey of dataMap.keys()) {
                  const row = dataMap.get(markerKey);
                  for (const name in ammendFns)
                      row[name] = ammendFns[name](row, markerKey);
              }
              
              //console.timeEnd('dataMapCache ' + this.id);
              return dataMap;
          },
          joinConfig(encoding, name) {
              return { 
                  projection: { 
                      [encoding.data.concept]: [ name ]
                  },
                  dataFrame: encoding.data.response
              }
          },
          get requiredEncodings() { 
              return mobx.toJS(this.config.requiredEncodings || defaults.requiredEncodings).filter(
                  enc => this.encoding[enc].data.hasOwnData
              ); 
          },
          filterRequired(data) {            
              this.requiredEncodings;
              return data
                  .filterNullish(this.requiredEncodings)
                  .filterGroups(group => group.size > 0, true);
          },
          differentiate(xField, data) {
              const frame = this.encoding.frame;
              return frame && this.encoding[xField] ? frame.differentiate(data, xField) : data
          },
          /**
           * transformationFns is an object 
           *  whose keys are transformation strings
           *  whose values are transformation functions
           */
          get transformationFns() {
              // marker transformation
              const transformations = {
                  "filterRequired": this.filterRequired.bind(this)
              };
              // encoding transformations
              for (let [name, enc] of Object.entries(this.encoding)) {
                  if (enc.transformationFns)
                      for (let [tName, t] of Object.entries(enc.transformationFns))
                          transformations[name + '.' + tName] = t;
                  if (Array.isArray(enc?.config?.data?.transformations)) {
                      for (let tName of enc.config.data.transformations) {
                          const fn = this[tName];
                          if (fn)
                              transformations[name + '.' + tName] = fn.bind(this, name);
                      }
                  }
              }
              return transformations;
          },
          /**
           * Transformations is an array of strings, referring to transformations defined on the marker or encodings
           * The array defines the order in which data will be transformed before being served.
           * If a function reference cannot be resolved, it will be skipped. No error will be thrown.
           * Encoding transformations are formatted "<encodingName>.<functionName>". E.g. "frame.currentFrame"
           * Marker transformations are formatted "<functionName>". E.g. "filterRequired"
           * This array of strings enables configuration of transformation order in a serializable format.
           */
          get transformations() {
              const transformations = this.config.transformations || defaults.transformations;
              const transformationFns = this.transformationFns;
              return transformations
                  .filter(tStr => tStr in transformationFns)
                  .map(tStr => ({
                          fn: this.transformationFns[tStr],
                          name: tStr
                  }));
          },
          /**
           * transformedDataMaps is a ES6 Map
           *  whose keys are transformation strings or "final" and
           *  whose values are DataFrames wrapped in a boxed mobx computed. 
           *      The DataFrame is a result of the transformation function applied to the previous DataFrame.  
           */
          // currently all transformation steps are cached in computed values. Computeds are great to prevent recalculations
          // of previous steps when config of one step changes. However, it uses memory. We might want this more configurable.
          get transformedDataMaps() {
              //trace();
              // returns boxed computed, whose value can be reached by .get()
              // if we'd call .get() in here (returning the value), each change would lead to applying all transformations
              // because transformedDataMaps() would be observering all stepResults
              // would be nice to find a way for transformedDataMaps to just return the value instead of a boxed computed
              const results = new Map();
              let stepResult = mobx.observable.box(this.dataMapCache, { deep: false });
              this.transformations.forEach(({name, fn}) => {
                  let prevResult = stepResult; // local reference for closure of computed
                  stepResult = mobx.computed(
                      () => {
                          //trace();
                          const previous = prevResult.get();
                          //const t0 = performance.now();
                          const result = fn(previous);
                          //const t1 = performance.now();
                          //pipelineTime += t1 - t0;
                          //console.log('Pipeline ' + fn.name + ':', t1-t0, 'Total:', pipelineTime);
                          return result;
                      }, 
                      { name }
                  );
                  results.set(name, stepResult);
              });
              results.set('final', stepResult);
              return results;
          },
          /**
           * Helper function to get values from transformedDataMaps. Used to prevent the awkward `.get(name).get()` syntax.
           */
          getTransformedDataMap(name) {
              if (this.transformedDataMaps.has(name))
                  return this.transformedDataMaps.get(name).get();
              console.warn("Requesting unknown transformed data name: ", name);
          },
          get dataMap() {
              //compute transformations backwards (pull data through trasformations)
              return this.transformedDataMaps.get('final').get();
          },
          get dataArray() {
              return this.dataMap?.toJSON();
          },
          getDataMapByFrameValue(value) {
              const frame = this.encoding.frame;
              if (!frame) return this.dataMap;
      
              const frameKey = createKeyFn([frame.name])({ [frame.name]: value });
              const data = this.getTransformedDataMap('filterRequired');
              return data.has(frameKey) ? 
                  data.get(frameKey)
                  :
                  getInterpolatedFrame(frame, data, value);
      
              function getInterpolatedFrame(frame, data, value) {
                  const step = frame.stepScale(value);
                  const stepsAround = [Math.floor(step), Math.ceil(step)];
                  return frame.getInterpolatedFrame(data, step, stepsAround);
              }
          },
          dispose() {
              // Need to dispose because reactions may not observe only locally. Through state -> dataConfig -> resolveRef they can indirectly observe stores.
              // https://mobx.js.org/reactions.html#mem-leak-example
              this.data.dispose();
              for (let enc of Object.values(this.encoding)) {
                  enc.dispose();
              }
          }
      };

      return assign(marker, functions, configurable);
  };

  marker.decorate = {
      encodingCache: mobx.observable.ref,
      encodingByType: mobx.computed.struct,
      requiredEncodings: mobx.computed.struct
  };

  const markerStore = createStore(marker);

  const stores = {
      markers: markerStore,
      dataSources: dataSourceStore,
      encodings: encodingStore
  };

  const vizabi = function(cfg) {
      const config = mobx.observable(cfg);

      const models = {};
      for (const storeName in config) {
          if (storeName in stores) {
              models[storeName] = stores[storeName].createMany(config[storeName]);
          } else {
              console.warn('Vizabi() was given an unknown store name: ', storeName);
          }
      }
      models.config = config;
      
      return models;

  };
  vizabi.versionInfo = { version: "1.21.2", build: 1637011150548, package: {"homepage":"http://vizabi.org","name":"@vizabi/core","description":"Vizabi core (data layer)"} };
  vizabi.mobx = mobx__namespace;
  vizabi.utils = utils$1;
  vizabi.stores = stores;
  vizabi.dataSource = (cfg, id) =>{
      // shortcut giving data directly in array-object format: [{...},{...}]
      if (Array.isArray(cfg)) {
          cfg = {
              values: cfg
          };
      }

      return dataSourceStore.create(cfg, null, id);
  }; 
  vizabi.marker = (cfg, id) => {
      cfg = mobx.observable(cfg);
      return markerStore.create(cfg, null, id);
  };
  vizabi.encoding = (cfg, id) => {
      cfg = mobx.observable(cfg);
      return encodingStore.create(cfg, null, id);
  };
  vizabi.disposeAll = () => {
      for (let storeName in stores) {
          stores[storeName].disposeAll();
      }
  };
  vizabi.csvReader = csvReader;
  vizabi.inlineReader = inlineReader;

  return vizabi;

}));
//# sourceMappingURL=Vizabi.js.map
