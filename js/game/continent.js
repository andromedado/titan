'use strict';

const Terrain = require('./terrain');
const Circle = require('../shapes/circle');
const variagator = require('../utils/variagator');
const utils = require('../utils/general');

let continentId = 1;

function Continent(options) {
    Object.assign(this, options || {});
    this.id = continentId++;
    this.type.initialize.call(this);
}

Continent.TYPE = {
    POLYGON: function (sides, offset) {
        return {
            initialize: function () {
                this.radius = this.radius || 100;
            },
            generateBasePoints: function (scale) {
                scale = scale || 1;
                const radius = this.radius * scale;
                const circle = new Circle({radius});
                let points = circle.equidistantPoints(sides, offset);
                return points;
            }
        };
    },
    CIRCLE: {
        initialize: function () {
            this.radius = this.radius || 100;
        },
        generateBasePoints: function (scale) {
            scale = scale || 1;
            const radius = this.radius * scale;
            const circle = new Circle({radius});
            let points = circle.equidistantPoints(10);
            return points;
        }
    }
};

Continent.prototype = {
    squiggleFactor: 50,
    terrain: Terrain.EARTH,
    type: Continent.TYPE.POLYGON(12)
};

Continent.prototype.squiggle = function (points) {
    let i = 0;
    let squiggledPoints = [];
    for (i = 0; i < points.length; i++) {
        let pointA = points[i];
        let pointB = points[((i + 1) % points.length)];
        let squiggled = variagator.squiggle(pointA, pointB, this.squiggleFactor);

        squiggledPoints = squiggledPoints.concat(squiggled);
    }
    return squiggledPoints;
};

Continent.prototype.drawInto = function (ctx, origin, scale) {
    let points = this.type.generateBasePoints.call(this, scale);
    let originalPoints = points;

    function markPoint (point, size, word) {
        utils.markPoint({
            x: point.x + origin.x,
            y: point.y + origin.y
        }, ctx, size, word);
    }

    let squiggled = this.squiggle(points);

    // squiggled.forEach((point) => {
    //     markPoint(point, 5);
    // });

    points = squiggled.map(point => {
        return {
            x: point.x + origin.x,
            y: point.y + origin.y
        };
    });
    let startingPoint = points.shift();
    ctx.beginPath();
    ctx.moveTo(startingPoint.x, startingPoint.y);
    do {
        let point = points.shift() || startingPoint;
        ctx.lineTo(point.x, point.y);
    } while (points.length);
    ctx.lineTo(startingPoint.x, startingPoint.y);
    ctx.fillStyle = this.terrain.color;
    ctx.fill();

    //originalPoints.forEach((point, i) => markPoint(point, null, i + ''));

};

module.exports = Continent;

