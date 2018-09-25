'use strict';

const Terrain = require('./terrain');
const Circle = require('../shapes/circle');
const Variagator = require('../utils/variagator');
const utils = require('../utils/general');

let continentId = 1;

function Continent(options) {
    Object.assign(this, options || {});
    this.id = continentId++;
    this.type.initialize.call(this);
    this.variagator = new Variagator(this.variagatorOptions);
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
    variagatorOptions: {},
    squiggleFactor: 50,
    terrain: Terrain.EARTH,
    type: Continent.TYPE.POLYGON(12)
};

Continent.prototype.squiggle = function (points) {
    let stretchedPoints = points.map((point) => {
        return this.variagator.slideAgainst(point, {x: 0, y: 0}, 1.5);
    });
    points = stretchedPoints;
    let i;
    let squiggledPoints = [];
    for (i = 0; i < points.length; i++) {
        let pointA = points[i];
        let pointB = points[((i + 1) % points.length)];
        let squiggled = this.variagator.squiggle(pointA, pointB, this.squiggleFactor);

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

    if (window.DEBUG) {
        squiggled.forEach((point) => {
            markPoint(point, 5);
        });
    }

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

    if (window.DEBUG) {
        originalPoints.forEach((point, i) => markPoint(point, null, i + ''));
    }

};

module.exports = Continent;

