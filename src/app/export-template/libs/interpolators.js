/*
 * A collection of interpolators
 * @param {Number} x1, x2, y1, y2 - boundary points
 * @param {Number} x - point of interpolation
 * @return {Number} y - interpolated value
 */
//
module.exports = {
    linear: function(x1, x2, y1, y2, x) {
      return +y1 + (x - x1) / (x2 - x1) * (y2 - y1);
    },
    exp: function(x1, x2, y1, y2, x) {
      return Math.exp((Math.log(y1) * (x2 - x) - Math.log(y2) * (x1 - x)) / (x2 - x1));
    },
    stepBefore: function(x1, x2, y1, y2, x) {
        return y2;
    },
    stepAfter: function(x1, x2, y1, y2, x) {
        return y1;
    },
    stepMiddle: function(x1, x2, y1, y2, x) {
        return (x < (x1 + x2)/2) ? y1 : y2;
    }
};
