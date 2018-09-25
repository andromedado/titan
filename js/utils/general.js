'use strict'

const general = {
    distance: function (pointA, pointB) {
        const xDelta = Math.abs(pointA.x - pointB.x);
        const yDelta = Math.abs(pointA.y - pointB.y);
        return Math.pow(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) , 0.5);
    },
    randBetween: function (n, m) {
        return (Math.random() * (n - m)) + m;
    },
    randAgainst: function (n, rangeCenteredOnN) {
        return general.randBetween(n - (rangeCenteredOnN / 2), n + (rangeCenteredOnN / 2));
    },
    isBetween : function (x, boundA, boundB) {
        if (x >= boundA) {
            return x <= boundB;
        }
        return x >= boundB;
    },
    markPoint: function (point, ctx, size, word) {
        size = size || 20;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();
        if (word) {
            ctx.font = size + 'pt serif';
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(word, point.x - (size / 3), point.y + (size / 2));//
        }
    }
};

module.exports = general;
