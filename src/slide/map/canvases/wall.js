import Base from './base';

import { copyPoint } from '../../../lib/helpers';
import Canvas from '../../../lib/canvas';
const { clear, line } = Canvas;


const DRAW_STYLES = {
    door: {
        outer_color: '#FF0000',
        outer_width: 3,
        inner_color: '#FFFFFF',
        inner_width: 1,
    },
    wall: {
        place_color: '#FF0000',
        outer_color: '#0000FF',
        outer_width: 3,
        inner_color: '#FFFFFF',
        inner_width: 1,
        highlight_outer_color: '#FF00FF',
        highlight_outer_width: 6,
        highlight_inner_color: '#FFFFFF',
        highlight_inner_width: 2,
    }
};

class WallCanvas extends Base {
    constructor (opts = {}) {
        super('wall', opts);
        this.instance = opts.instance;
    }

    draw (segments) {
        clear(this.context);
        if (this.instance.config.no_debug) return;
        this.drawSegments(segments);
        return this;
    }

    drawSegments (segments = []) {
        const c = this.context;

        segments.forEach((segment) => {
            const conf = DRAW_STYLES[segment.type || 'wall'];
            // Doors that are ajar will have temp points
            line(c, {
                points: [
                    copyPoint(segment.p1),
                    copyPoint(segment.p2),
                ],
                strokes: [{
                    color: conf.inner_color,
                    width: conf.inner_width
                }, {
                    color: conf.outer_color,
                    width: conf.outer_width
                }],
                lineCap: 'round'
            });
        });
    }
}

export default WallCanvas;
