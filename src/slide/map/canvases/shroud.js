import Base from './base';
import Canvas from '../../../lib/canvas';
const { clear } = Canvas;

class ShroudCanvas extends Base {
    constructor (opts = {}) {
        super('shroud', opts);
        this.instance = opts.instance;
    }

    draw () {
        // The area that has been seen by the players but is no longer lit
        clear(this.context).rect(this.context, {
            alpha: this.instance.config.no_debug ? '0.9' : '0.5',
            color: 'rgba(40, 40, 40, 1)',
        });

        return this;
    }
}

export default ShroudCanvas;
