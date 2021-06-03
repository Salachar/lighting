import Base from './base';
import Canvas from '../../../lib/canvas';
const { clear } = Canvas;

class ShadowCanvas extends Base {
    constructor (opts = {}) {
        super('shadow', opts);
        this.instance = opts.instance;
    }

    draw () {
        // The shadow drawn on the light layer, what the players haven't seen
        clear(this.context).rect(this.context, {
            alpha: this.instance.config.no_debug ? '1' : '0.7',
            color: 'rgba(20, 20, 20, 1)',
        });

        return this;
    }
}

export default ShadowCanvas;
