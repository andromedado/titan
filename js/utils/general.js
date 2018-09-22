'use strict'

module.exports = {
    between : function (x, boundA, boundB) {
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

