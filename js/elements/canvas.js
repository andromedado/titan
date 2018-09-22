'use strict';

function Canvas(opts) {
    Object.assign(this, opts || {});
}

Canvas.prototype = {
    width: 100,
    height: 100,
    className: 'titan-canvas',
    contextType: '2d'
};

Canvas.prototype.configureElement = function (el) {
    el.width = this.width;
    el.height = this.height;
    el.className = this.className;
};


Canvas.prototype.getElement = function () {
    if (!this._element) {
        this._element = document.createElement('canvas');
        this.configureElement(this._element);
    }
    return this._element;
};

Canvas.prototype.getContext = function () {
    return this.getElement().getContext(this.contextType);
};

Canvas.prototype.fill = function (color) {
    color = color || '#000000';
    const ctx = this.getContext();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, this.width, this.height);
};

Canvas.prototype.getCenterPoint = function () {
    return {
        x: Math.floor(this.width / 2),
        y: Math.floor(this.height / 2)
    };
};

Canvas.prototype.randomPoint = function () {
    return {
        x: Math.floor(Math.random() * this.width),
        y: Math.floor(Math.random() * this.height)
    }
};

module.exports = Canvas;
