'use strict';

const variagator = {};
const { between, distance, randBetween, randAgainst } = require('./general');

function Variagator (options) {
    Object.assign(this, options || {});
}

Variagator.prototype.thetaRange = 2;//Radians

Variagator.prototype.slideAgainst = function (point, referencePoint, range) {
    range = range || 1;
    const xSign = point.x < referencePoint.x ? -1 : 1;
    const ySign = point.y < referencePoint.y ? -1 : 1;
    const hypoteneuse = distance(point, referencePoint);
    const newHypoteneuse = randAgainst(hypoteneuse, range * hypoteneuse);
    const theta = Math.asin(Math.abs(point.y - referencePoint.y) / hypoteneuse);
    const newX = Math.cos(theta) * newHypoteneuse;
    const newY = Math.sin(theta) * newHypoteneuse;
    const dPoint = {
        x: referencePoint.x + (newX * xSign),
        y: referencePoint.y + (newY * ySign)
    };
    console.log(`ref:(${referencePoint.x},${referencePoint.y}), oPoint:(${point.x},${point.y}), dPoint:(${dPoint.x},${dPoint.y})`);
    return dPoint;
};

/**
 * Result exclusive of pointB
 * @param pointA
 * @param pointB
 * @param resultSize
 * @returns {*[]}
 */
Variagator.prototype.squiggle = function (pointA, pointB, resultSize) {
    resultSize = Math.max(resultSize || 1, 1);
    let result = [pointA];
    let point = pointA;
    let i = 0;
    while (result.length < resultSize) {
        //let originalPoint = point;
        let xToTravel = Math.abs(pointB.x - point.x) / (resultSize - i);
        let yToTravel = Math.abs(pointB.y - point.y) / (resultSize - i);
        let xSign = pointB.x < point.x ? -1 : 1;
        let ySign = pointB.y < point.y ? -1 : 1;

        //console.log(`from (${point.x}, ${point.y}), to (${pointB.x}, ${pointB.y}), deltas ${xToTravel}, ${yToTravel}`);
        //console.log(`xSign: ${xSign}, ySign: ${ySign}`);

        let distanceToTravel = Math.pow(Math.pow(xToTravel, 2) + Math.pow(yToTravel, 2), 0.5);

        //console.log('distance to travel: ', distanceToTravel);
        let theta = Math.asin(yToTravel / distanceToTravel);
        //console.log('theta: ', theta * 57.2958);

        let deltaTheta = (Math.random() * this.thetaRange) - (this.thetaRange / 2);
        //console.log('deltaTheta', deltaTheta * 57.2958);

        let newTheta = theta + deltaTheta;
        //console.log('new theta: ', newTheta * 57.2958);

        let deltaX = Math.cos(newTheta) * distanceToTravel * xSign;
        let deltaY = Math.sin(newTheta) * distanceToTravel * ySign;
        //console.log(`deltaX: ${deltaX}, deltaY: ${deltaY}`);

        point = {
            x: deltaX + point.x,
            y: deltaY + point.y
        };

        //console.log(`point: ${point.x}, ${point.y}`);

        result.push(point);
        i++;
    }
    return result;
};


module.exports = Variagator;

