import Canvas from '../../../lib/canvas';
const { clear } = Canvas;

class Base {
    constructor (name, opts = {}) {
        const { container } = opts;

        this.canvas = document.createElement('canvas');
        this.canvas.classList.add(`${name}_canvas`);
        this.canvas.classList.add('map_canvas');
        container.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');
    }

    clear () {
        clear(this.context);
        return this;
    }

    show () {
        this.canvas.classList.remove('hidden');
        return this;
    }

    hide () {
        this.canvas.classList.add('hidden');
        return this;
    }

    draw () {
        return this;
    }

    resize (width, height) {
        if (!this.canvas) return;

        this.canvas.setAttribute('width', width);
        this.canvas.setAttribute('height', height);
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        return this;
    }
}

export default Base;
