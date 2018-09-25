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
    let center = this.getCanvas().getCenterPoint();
    this.features.push([center, new Continent({
        radius: 200,
        type: Continent.TYPE.POLYGON(15)
    })]);
    this.features.push([{ x: center.x + 100, y: center.y - 100 }, new Continent({
        radius: 200,
        type: Continent.TYPE.POLYGON(15)
    })]);
    this.features.push([{ x: center.x - 100, y: center.y + 100 }, new Continent({
        radius: 200,
        type: Continent.TYPE.POLYGON(15)
    })]);
    this.features.push([{x: 80, y: 120}, new Continent({
        radius: 75,
        terrain: Terrain.DESERT,
        type: Continent.TYPE.POLYGON(4)
    })]);
    this.features.push([{x: 100, y: 100}, new Continent({
        radius: 75,
        terrain: Terrain.DESERT,
        type: Continent.TYPE.POLYGON(4, 2)
    })]);
};

Map.prototype.draw = function () {
    this.getCanvas().fill(this.mapBase.color);
    this.features.forEach(([origin, feature]) => {
        feature.drawInto(this.getContext(), origin);
    });
};


module.exports = Map;
