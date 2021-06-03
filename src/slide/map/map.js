import { sqr } from '../../lib/helpers';
import Canvas from '../../lib/canvas';
const { line } = Canvas;

import SegmentManager from './segment_manager';

import ImageCanvas from './canvases/image';
import ShroudCanvas from './canvases/shroud';
import ShadowCanvas from './canvases/shadow';
import WallCanvas from './canvases/wall';
import ControlCanvas from './canvases/control';

class Map {
    constructor (opts = {}) {
        const { config = {} } = opts;
        this.config = config;

        // LIGHT ANGLES
        this.angle_amount = config.fidelity || 720;
        this.angle_increment = (Math.PI * 2) / this.angle_amount;
        this.angle_lookup = [];
        this.createAngles();

        this.managers = {
            segment: new SegmentManager(config.walls),
        };

        this.lights = [];

        opts.instance = this;

        this.canvases = {};

        switch (config.stage) {
            case 'image':
                this.canvases = {
                    image: new ImageCanvas(opts),
                };
                break;

            case 'wall':
                this.canvases = {
                    image: new ImageCanvas(opts),
                    wall: new WallCanvas(opts),
                };
                break;

            case 'light_no_intersect':
            case 'intersection_points':
            case 'light_poly_outline':
                this.canvases = {
                    image: new ImageCanvas(opts),
                    wall: new WallCanvas(opts),
                    control: new ControlCanvas(opts),
                };
                break;

            case 'shadow':
            case 'shadow_no_debug':
                this.canvases = {
                    image: new ImageCanvas(opts),
                    shadow: new ShadowCanvas(opts),
                    wall: new WallCanvas(opts),
                    control: new ControlCanvas(opts),
                };
                break;

            default:
                this.canvases = {
                    image: new ImageCanvas(opts),
                    shroud: new ShroudCanvas(opts),
                    shadow: new ShadowCanvas(opts),
                    wall: new WallCanvas(opts),
                    control: new ControlCanvas(opts),
                };
                break;
        }

        this.canvases.image.load(config.image).then((dimensions) => {
            this.resizeCanvases(dimensions);

            this.managers.segment.updateBounds(dimensions);

            if (this.canvases.image) {
                this.canvases.image.draw();
            }
            if (this.canvases.shroud) {
                this.canvases.shroud.draw();
            }
            if (this.canvases.shadow) {
                this.canvases.shadow.draw();
            }
            if (this.canvases.wall) {
                this.canvases.wall.draw(this.managers.segment.segments);
            }
        });
    }

    addLight (pos) {
        this.lights.push({
            x: pos.x,
            y: pos.y,
            points: this.config.cache ? this.getLightPolygon({
                x: pos.x,
                y: pos.y,
            }) : null,
        });
    }

    onMouseDown (e, pos) {
        if (e.which === 1) {
            this.addLight(pos);
        }
        if (e.which === 3) {
            this.lights = [];
            if (this.canvases.shadow) this.canvases.shadow.draw();
            if (this.canvases.shroud) this.canvases.shroud.draw();
        }
    }

    onMouseMove (mouse) {
        const { stage } = this.config;

        switch (stage) {
            case 'light_no_intersect':
                this.canvases.control.drawLightRays([...this.lights, mouse], this.angle_lookup);
                break;

            case 'intersection_points':
                this.canvases.control.drawIntersectionPoints([...this.lights, mouse], this.getLightPolygon(mouse).intersects);
                break;

            case 'light_poly_outline':
                this.canvases.control.drawLightPolyOutline([...this.lights, mouse], this.getLightPolygon(mouse).intersects);
                break;

            case 'shadow':
                this.drawLight(mouse);
                this.canvases.control.drawLightPolyOutline([...this.lights, mouse], this.getLightPolygon(mouse).intersects);
                break;

            default:
                this.drawLight(mouse);
                break;
        }
    }

    drawLight (mouse) {
        // const { poly } = opts;
        window.requestAnimationFrame(() => {
            const light_polys = this.getAllLightPolygons(mouse);

            if (this.canvases.shroud) {
                // Refresh the Fog of War Canvas (full transparent gray after this)
                // The fog has to be redrawn otherwise previous areas would be completely lit up
                this.canvases.shroud.draw();
                // Cut the lights out of the shroud context (just refreshed) so we can
                // see all the way through to what is currently lit up
                this.drawLightPolygons(this.canvases.shroud.context, light_polys, 'bright_intersects');
            }
            // The light context has not been refreshed, so cutting the lights out here
            // will continue to cut out of the full opaque canvas created on light enable
            this.drawLightPolygons(this.canvases.shadow.context, light_polys, 'dim_intersects');
        });
    }

    drawLightPolygons (context, polys, set = 'intersects') {
        if (!polys.length) return;

        for (let polys_i = 0; polys_i < polys.length; ++polys_i) {
            line(context, {
                points: polys[polys_i][set],
                cutout: true
            });
        }
        // Draw new content over old content (default). This is just resetting the
        // composite operation for good measure.
        context.globalCompositeOperation = "source-over";
    }

    resizeCanvases (dimensions) {
        const { width, height } = dimensions;
        for (let c in this.canvases) {
            this.canvases[c].resize(width, height);
        }
    }

    getAllLightPolygons (mouse) {
        let polys = this.lights.map((light) => {
            if (light.points) return light.points;
            return this.getLightPolygon(light);
        });
        polys.push(this.getLightPolygon(mouse));
        return polys;
    }

    getLightPolygon (light) {
        const { vision = {} } = this.config;

        let intersects = [];
        let bright_intersects = [];
        let dim_intersects = [];

        const segments_to_check = this.managers.segment.all_segments;

        for (let angle_i = 0; angle_i < this.angle_lookup.length; ++angle_i) {
            const vector = this.angle_lookup[angle_i];
            const r = {
                px : light.x,
                py : light.y,
                dx : vector.x,
                dy : vector.y
            };

            let closestPoint = {
                x : null,
                y : null,
                t1 : null
            };

            // Go through all of the segments returned for that light/angle quadrant matchup
            for (let s_index = 0; s_index < segments_to_check.length; ++s_index) {
                const s = segments_to_check[s_index];

                // Get any intersection info for this light ray and wall.
                const info = this.getIntersection(r, {
                    px : s.temp_p1 ? s.temp_p1.x : s.p1.x,
                    py : s.temp_p1 ? s.temp_p1.y : s.p1.y,
                    dx : (s.temp_p2 ? s.temp_p2.x : s.p2.x) - (s.temp_p1 ? s.temp_p1.x : s.p1.x),
                    dy : (s.temp_p2 ? s.temp_p2.y : s.p2.y) - (s.temp_p1 ? s.temp_p1.y : s.p1.y)
                });

                // Continue to the next wall if there was no intersect info.
                if (!info) continue;

                // If there was intersect info, check if the intersected wall is
                // closer than any previously found wall.
                if (info.t1 >= 0 && info.t2 >= 0 && info.t2 <= 1) {
                    if (closestPoint.t1 == null || closestPoint.t1 > info.t1) {
                        closestPoint.x = info.x;
                        closestPoint.y = info.y;
                        closestPoint.t1 = info.t1;
                    }
                }
            }

            // t1 is the distance, if there is no distance, something weird happened.
            // Either way, just ignore the wall and move on.
            if (closestPoint.t1 !== null) {
                const sqr_dist = sqr(light.x - closestPoint.x) + sqr(light.y - closestPoint.y);
                if (sqr(vision.dim) && sqr_dist > sqr(vision.dim)) {
                    // clamp the point
                    dim_intersects.push({
                        x: Math.round(light.x + (vector.x * vision.dim)),
                        y: Math.round(light.y + (vector.y * vision.dim))
                    });
                } else {
                    dim_intersects.push({
                        x: Math.round(closestPoint.x),
                        y: Math.round(closestPoint.y)
                    });
                }
                if (sqr(vision.bright) && sqr_dist > sqr(vision.bright)) {
                    bright_intersects.push({
                        x: Math.round(light.x + (vector.x * vision.bright)),
                        y: Math.round(light.y + (vector.y * vision.bright))
                    });
                } else {
                    bright_intersects.push({
                        x: Math.round(closestPoint.x),
                        y: Math.round(closestPoint.y)
                    });
                }

                intersects.push({
                    x: Math.round(closestPoint.x),
                    y: Math.round(closestPoint.y)
                });
            }
        }

        return {
            intersects,
            dim_intersects,
            bright_intersects,
        };
    }

    getIntersection (r, s) {
        if ((r.dx / r.dy) == (s.dx / s.dy)) return null;

        const t2 = (r.dx * (s.py - r.py) + r.dy * (r.px - s.px)) / (s.dx * r.dy - s.dy * r.dx);
        const t1 = (r.dx != 0) ? (s.px + s.dx * t2 - r.px) / r.dx : (s.py + s.dy * t2 - r.py) / r.dy;

        return {
            x: r.px + (t1 * r.dx),
            y: r.py + (t1 * r.dy),
            t2: t2,
            t1: t1
        };
    }

    createAngles () {
        for (let i = 0; i < this.angle_amount; ++i) {
            let angle = i * this.angle_increment;
            let vecX = Math.cos(angle);
            let vecY = Math.sin(angle);
            this.angle_lookup.push({
                x : vecX,
                y : vecY
            });
        }
        this.polishAngles();
    }

    polishAngles () {
        for (let i = 0; i < this.angle_lookup.length; ++i) {
            let angle = this.angle_lookup[i];
            if (angle.x < 0.000001 && angle.x > -0.000001) {
                angle.x = 0;
            }
            if (angle.x > 0.999999 && angle.x < 1.000001) {
                angle.x = 1;
            }
            if (angle.x < -0.999999 && angle.x > -1.000001) {
                angle.x = -1;
            }
            if (angle.y < 0.000001 && angle.y > -0.000001) {
                angle.y = 0;
            }
            if (angle.y > 0.999999 && angle.y < 1.000001) {
                angle.y = 1;
            }
            if (angle.y < -0.999999 && angle.y > -1.000001) {
                angle.y = -1;
            }
        }
    }

}

export default Map;
