'use strict';

const variagator = {};
const { between } = require('./general');

const maxThetaDelta = 2;//radians

/**
 * Result exclusive of pointB
 * @param pointA
 * @param pointB
 * @param resultSize
 * @returns {*[]}
 */
variagator.squiggle = function (pointA, pointB, resultSize) {
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

        let deltaTheta = (Math.random() * maxThetaDelta) - (maxThetaDelta / 2);
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

module.exports = variagator;

