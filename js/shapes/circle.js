'use strict';

function Circle (options) {
    Object.assign(this, options || {});
}

Circle.prototype.radius = 100;

Circle.prototype.equidistantPoints = function (n, offset) {
    n = Math.max(n || 2, 2);
    offset = offset || 0;
    let i;
    let points = [];
    for (i = 0; i < n; i++) {
        let x = this.radius * Math.cos(((2 * Math.PI * i) / n) + offset);
        let y = this.radius * Math.sin(((2 * Math.PI * i) / n) + offset);
        points.push({x, y});
    }
    return points;
};

module.exports = Circle;
