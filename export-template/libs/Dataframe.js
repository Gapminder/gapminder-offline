// http://vizabi.org v1.18.0 Copyright 2021 Jasper Heeffer and others at Gapminder Foundation
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobx')) :
    typeof define === 'function' && define.amd ? define(['exports', 'mobx'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Dataframe = {}, global.mobx));
}(this, (function (exports, mobx) { 'use strict';

    const directions = {
        ascending: 1,
        decending: -1
    };

    function order(df, order_by = []) {
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
            return [{ concept: order_by, direction: directions.ascending }];
        return order_by.map(orderPart => {
            if (typeof orderPart == "string") {
                return { concept: orderPart, direction: directions.ascending };
            }	else {
                const concept   = Object.keys(orderPart)[0];
                const direction = orderPart[concept] == "asc" 
                    ? directions.ascending 
                    : directions.decending;
                return { concept, direction };
            }
        });
    }

    /**
     * Filters dataframe based on either filter function or DDFQL filter specification
     * @param {DataFrame} df 
     * @param {Function|FilterSpec} filter 
     */
    function filter(df, filter) {

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
        return filter(df, filterParam);
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

    function ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // code from https://github.com/TehShrike/is-mergeable-object
    function isMergeableObject(value) {
        return isNonNullObject$1(value) &&
            !isSpecial(value)
    }

    function isNonNullObject$1(value) {
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

    mobx.action('applyDefaults', function applyDefaults(config, defaults) {
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


    function range(start, stop, concept) {
        return interval(concept).range(start, stop);
    }

    function interval({ concept, concept_type }) {
        const nonTimeInterval = {
            offset: (n, d) => isNumeric(n) && isNumeric(d) ? n + d : console.error("Can't offset using non-numeric values", { n, d }),
            range: d3.range,
            floor: Math.floor,
            ceil: Math.ceil,
            round: Math.round
        };
        if (concept_type == "time") {
            if (concept == "time") concept = "year";
            return d3['utc' + ucFirst(concept)] || nonTimeInterval;
        } else {
            return nonTimeInterval;
        }
    }

    function inclusiveRange(start, stop, concept) {
        if (!start || !stop) return [];
        const result = range(start, stop, concept);
        result.push(stop);
        return result;
    }

    [
        d3.utcParse('%Y'),
        d3.utcParse('%Y-%m'),
        d3.utcParse('%Y-%m-%d'),
        d3.utcParse('%Y-%m-%dT%HZ'),
        d3.utcParse('%Y-%m-%dT%H:%MZ'),
        d3.utcParse('%Y-%m-%dT%H:%M:%SZ'),
        d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ')
    ];

    function pickGetters(object, keys) {
        const result = {};
        for (const key of keys) {
            if (key in object)
                Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(object, key));
        }
        return result;
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

    function isIterable(obj) {
        return Symbol.iterator in obj;
    }

    // returns true if a and b are identical, regardless of order (i.e. like sets)
    function arrayEquals(a, b) {
        const overlap = intersect(a, b);
        return overlap.length == a.length && overlap.length == b.length;
    }

    // intersect of two arrays (representing sets)
    // i.e. everything in A which is also in B
    function intersect(a, b) {
        return a.filter(e => b.includes(e));
    }

    function isNonNullObject(value) {
        return !!value && typeof value === 'object'
    }

    function normalizeKey(key) {
        return key.slice(0).sort();
    }
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

        if (arrayEquals(joinKey, dataKey)) { 
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
            const keyFn = Array.isArray(data.key) && arrayEquals(storage.key, data.key)
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
            r.sameKey = arrayEquals(r.dataFrame.key, leftKey);
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
        if (!arrayEquals(group.key, [concept])) throw("grouping is not by given concept");
        if (descKeys.length != 1) throw("grouping is more than 1 level deep");
        if (!arrayEquals(descKeys[0], groupBy)) throw("grouping members keys is not same as `groupBy`");
        if (!isIterable(groupSubset)) throw("groupSubset iterable not given.");
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
                        let lastIndex = lastIndexPerMarker.get(markerKey);
                        if (lastIndex && (i - lastIndex) > 1) {
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

    function reindexGroupToKeyDomain(group, keyConcept) {
        if (group.size > 1) {
            const domain = group.keyExtent();
            const newIndex = inclusiveRange(domain[0], domain[1], keyConcept);
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
        group.reindexToKeyDomain = keyConcept => reindexGroupToKeyDomain(group, keyConcept);
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
            if (data.key?.length > 0 && arrayEquals(data.key, descKeys[descKeys.length - 1])) {
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
        if (isNonNullObject(fillValues)) {
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
                order: (direction) => order(df, direction), 
                leftJoin: (joinParams) => leftJoin({ dataFrame: df }, joinParams),
                fullJoin: (joinParams, key) => fullJoin([df, ...joinParams], key),
                copyColumn: (src, dest) => copyColumn(df, src, dest),
                filter: (filterObj) => filter(df, filterObj),
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

    exports.DataFrame = DataFrame;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=Dataframe.js.map
