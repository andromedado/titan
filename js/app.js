'use strict';

const Map = require('./game/map');
const $ = require('./thirdParty/jquery-3.3.1.min');
const Button = require('./elements/button');
const utils = require('./utils/general');
const variagator = require('./utils/variagator');

$(() => {
    const titanBody = document.getElementById('body');

    const mainMap = new Map();

    function reRender() {
        mainMap.generateFeatures();
        mainMap.draw();
    }

    const reRenderButton = new Button({
        name: 'Re-Render',
        callback: reRender
    });

    let renderInterval;

    const startIntervalButton = new Button({
        name: 'Start Interval',
        callback: () => {
            if (renderInterval) {
                clearInterval(renderInterval);
            }
            renderInterval = setInterval(reRender, 1000);
        }
    });

    const stopIntervalButton = new Button({
        name: 'Stop Interval',
        callback: () => {
            if (renderInterval) {
                clearInterval(renderInterval);
                renderInterval = null;
            }
        }
    });

    const controls = [reRenderButton, startIntervalButton, stopIntervalButton];

    titanBody.appendChild(mainMap.getElement());
    controls.forEach((control) => {
        titanBody.appendChild(control.getElement());
    });

    reRender();
    startIntervalButton.callback();
});
