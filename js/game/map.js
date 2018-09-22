'use strict';

const Canvas = require('../elements/canvas');
const Terrain = require('./terrain');
const Continent = require('./continent');

let mapId = 1;

function Map(options) {
    Object.assign(this, options || {});
    this.id = mapId++;
    this.features = [];
}

Map.prototype.canvasHeight = 800;
Map.prototype.canvasWidth = 1200;

Map.prototype.mapBase = Terrain.WATER;

Map.prototype.getCanvasOptions = function () {
    return {
        width: this.canvasWidth,
        height: this.canvasHeight
    };
};

Map.prototype.getCanvas = function () {
    if (!this._canvas) {
        this._canvas = new Canvas(this.getCanvasOptions());
    }
    return this._canvas;
};

Map.prototype.getContext = function () {
    return this.getCanvas().getContext();
};

Map.prototype.getElement = function () {
    if (!this._element) {
        this._element = document.createElement('div');
        this._element.id = 'titan-map-' + this.id;
        const canvas = this.getCanvas();
        this._element.appendChild(canvas.getElement());
    }
    return this._element;
};

Map.prototype.generateFeatures = function () {
    this.features = [];
    this.features.push([this.getCanvas().getCenterPoint(), new Continent({
        radius: 200,
        type: Continent.TYPE.POLYGON(10, Math.random())
    })]);
    this.features.push([{x: 100, y: 100}, new Continent({
        radius: 75,
        terrain: Terrain.DESERT,
        type: Continent.TYPE.POLYGON(4, Math.random())
    })]);
};

Map.prototype.draw = function () {
    this.getCanvas().fill(this.mapBase.color);
    this.features.forEach(([origin, feature]) => {
        feature.drawInto(this.getContext(), origin);
    });
};


module.exports = Map;
