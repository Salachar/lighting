import Base from './base';

import { copyPoint } from '../../../lib/helpers';
import Canvas from '../../../lib/canvas';
const { clear, line } = Canvas;

class ControlCanvas extends Base {
    constructor (opts = {}) {
        super('control', opts);

        this.instance = opts.instance;

        this.setupMouseEvents();
    }

    setupMouseEvents () {
        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const pos = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            this.instance.onMouseDown(e, pos);
        });

        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const pos = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            this.instance.onMouseDown(e, pos);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const pos = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            this.instance.onMouseMove(pos);
        });
    }

    drawLightRays (lights, rays) {
        clear(this.context);

        for (let l = 0; l < lights.length; ++l) {
            const light = lights[l];
            for (let i = 0; i < rays.length; ++i) {
                const points = [light, {
                    x: (light.x + rays[i].x * 10000),
                    y: (light.y + rays[i].y * 10000),
                }];
                line(this.context, {
                    points,
                    width: 1,
                    color: '#000000'
                });
            }
        }
    }

    drawIntersectionPoints (lights) {
        clear(this.context);

        for (let l = 0; l < lights.length; ++l) {
            const light = lights[l];

            let points = [];
            if (light.points) {
                points = light.points.intersects;
            } else {
                points = this.instance.getLightPolygon(light).intersects;
            }

            for (let i = 0; i < points.length; ++i) {
                line(this.context, {
                    points: [light, points[i]],
                    width: 1,
                    color: '#000000'
                });
            }
        }
    }

    drawLightPolyOutline (lights) {
        clear(this.context);

        for (let l = 0; l < lights.length; ++l) {
            const light = lights[l];

            let points = [];
            if (light.points) {
                points = light.points.intersects;
            } else {
                points = this.instance.getLightPolygon(light).intersects;
            }

            for (let i = 0; i < points.length; ++i) {
                line(this.context, {
                    points: [light, points[i]],
                    width: 1,
                    color: '#000000'
                });
            }
            line(this.context, {
                points: points,
                width: 4,
                color: '#FF0000',
            });
        }
    }

    draw () {
        return this;
    }
}

export default ControlCanvas;
