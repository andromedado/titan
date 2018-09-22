'use strict';

function Button(options) {
    Object.assign(this, options || {});
}

Button.prototype = {
    name: 'Button',
    callback: () => {}
};

Button.prototype.getElement = function () {
    if (!this._element) {
        this._element = document.createElement('button');
        this._element.innerText = this.name;
        this._element.addEventListener('click', () => {
            this.callback();
        });
    }
    return this._element;
};

module.exports = Button;

