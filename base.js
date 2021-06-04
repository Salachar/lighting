/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/lib/helpers.js
function percentage () {
    return Math.floor(Math.random() * (100 - 1) + 1);
};

function randomFromList (list) {
    let list_index = Math.floor(Math.random() * list.length);
    return list[list_index];
};

function copy (object) {
    if (!object) return null;
    return JSON.parse(JSON.stringify(object));
};

function copyPoint (point_to_copy) {
    if (!point_to_copy) return null;

    if (typeof point_to_copy.x === 'number') {
        return returnPointCopy(point_to_copy);
    } else if (point_to_copy.point) {
        return returnPointCopy(point_to_copy.point);
    } else if (point_to_copy.p1) {
        return returnPointCopy(point_to_copy.p1);
    }

    function returnPointCopy (point) {
        if (typeof point_to_copy.x !== 'number' || typeof point_to_copy.x !== 'number') return null;
        return {
            x: Math.round(point.x),
            y: Math.round(point.y)
        };
    }
};

function pointMatch (p1, p2, tolerance) {
    tolerance = tolerance || 0;
    return (Math.abs(p1.x - p2.x) <= tolerance && Math.abs(p1.y - p2.y) <= tolerance);
};

function getWindowDimensions () {
    CONFIG.window_width = window.innerWidth;
    CONFIG.window_height = window.innerHeight;
};

function randomRGBA (alpha) {
    alpha = (typeof alpha === 'number') ? alpha : 1;
    const r = Math.floor(Math.random() * 255 + 1);
    const g = Math.floor(Math.random() * 255 + 1);
    const b = Math.floor(Math.random() * 255 + 1);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
};

function rgba (r,g,b,a) {
    a = (a || a === 0) ? a : 1;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

function rgb (r,g,b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

function sqr (value) {
    return value * value;
};

function pDistance (point, item, opts = {}) {
    if (!point || !item) return;
    if (item.segment) item = item.segment;

    // The "item" can be anything, segment, light, point
    // If it's a simple point, get the distance and return
    if (item.x && item.y && !item.p1) {
        return {
            distance: Math.sqrt(Helpers.sqr(item.x - point.x) + Helpers.sqr(item.y - point.y)),
            x: item.x,
            y: item.y
        }
    }

    if (item.position) {
        return {
            distance: Math.sqrt(Helpers.sqr(item.position.x - point.x) + Helpers.sqr(item.position.y - point.y)),
            x: item.position.x,
            y: item.position.y
        }
    }

    // Now we're looking at a segment with p1 and p2, check the endpoints first
    let p1_match = Helpers.pointMatch(point, item.p1, 1);
    let p2_match = Helpers.pointMatch(point, item.p2, 1);
    if (opts.line_only && (p1_match || p2_match)) {
        return {
            distance: null,
            x: null,
            y: null
        };
    }

    return Helpers.distanceToLine(point, item);
};

function distanceToLine (point, item) {
    const A = point.x - item.p1.x;
    const B = point.y - item.p1.y;
    const C = item.p2.x - item.p1.x;
    const D = item.p2.y - item.p1.y;

    const dot = (A * C) + (B * D);
    const len_sq = (C * C) + (D * D);
    const param = (len_sq !== 0) ? (dot / len_sq) : -1;

    let xx = 0;
    let yy = 0;
    if (param < 0) {
        xx = item.p1.x;
        yy = item.p1.y;
    } else if (param > 1) {
        xx = item.p2.x;
        yy = item.p2.y;
    } else {
        xx = item.p1.x + param * C;
        yy = item.p1.y + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;
    return {
        distance: Math.sqrt(Helpers.sqr(dx) + Helpers.sqr(dy)),
        x: xx,
        y: yy
    }
};

function getDotProduct (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};

function getMagnitude (v) {
    return Math.sqrt(Helpers.sqr(v.x) + Helpers.sqr(v.y));
};

function getAngleBetweenVectors (v1, v2) {
    // cos(angle) = dot(v1, v2) / (mag(v1) * mag(v2))
    const dot = Helpers.getDotProduct(v1, v2);
    const v1_mag = Helpers.getMagnitude(v1);
    const v2_mag = Helpers.getMagnitude(v2);
    const cos_angle = dot / (v1_mag * v2_mag);
    const angle = Math.acos(cos_angle);
    return angle;
};

function getNormal (segment, reference_point) {
    reference_point = reference_point || Mouse;
    // the "open" normal will be on the side
    // of the reference point, the mouse in most cases
    if (!segment) return;
    if (segment.segment) segment = segment.segment;

    // Get a unit vector of that perpendicular
    let unit_vector = Helpers.getUnitVector(segment);

    let perp_unit_vector = {
        x: unit_vector.y,
        y: unit_vector.x * -1
    };

    // Get the middle of the origin segment
    let middle_point = Helpers.getSegmentMiddle(segment);

    // Add some distance to the unit normal (for show)
    let dist_mod = 20;
    let mod_vector = {
        x: perp_unit_vector.x * dist_mod,
        y: perp_unit_vector.y * dist_mod
    };

    let point_one = {
        x: Math.round(middle_point.x + mod_vector.x),
        y: Math.round(middle_point.y + mod_vector.y)
    };

    let point_two = {
        x: Math.round(middle_point.x - mod_vector.x),
        y: Math.round(middle_point.y - mod_vector.y)
    };

    let dist_one = Helpers.pDistance(reference_point, point_one);
    let dist_two = Helpers.pDistance(reference_point, point_two);

    if (dist_one.distance <= dist_two.distance) {
        return {
            open: point_one,
            closed: point_two
        };
    }
    return {
        open: point_two,
        closed: point_one
    };
};

function getSlope (p1, p2) {
    return (p2.y - p1.y) / (p2.x - p1.x);
};

function getUnitVector (segment) {
    let vector = {
        x: segment.p2.x - segment.p1.x,
        y: segment.p2.y - segment.p1.y
    };
    let mag = Math.sqrt(Helpers.sqr(vector.x) + Helpers.sqr(vector.y));
    return {
        x: vector.x / mag,
        y: vector.y / mag
    };
};

function getPerpendicularUnitVector (segment) {
    let unit_vector = Helpers.getUnitVector(segment);
    let perp = {
        x: unit_vector.y,
        y: unit_vector.x * -1
    }
    return perp;
};

function getSegmentMiddle (segment) {
    return {
        x: segment.p1.x + ((segment.p2.x - segment.p1.x) * 0.5),
        y: segment.p1.y + ((segment.p2.y - segment.p1.y) * 0.5)
    };
};

// CONCATENATED MODULE: ./src/lib/canvas.js


// Faster copyPoint only used in this file
function fastCopy (point = {}) {
    if (!point || typeof point.x !== 'number' || typeof point.y !== 'number') return null;
    return {
        x: point.x,
        y: point.y
    };
}

const Canvas = {
    pixelData: function (context) {
        const size_info = Canvas.size(context);
        const pixel_data = context.getImageData(0, 0, size_info.width, size_info.height);

        let pixels = pixel_data.data || [];
        const pixels_length = pixels.length;
        let transformed_pixel_data = [[]];

        let row_index = 0;
        for (let i = 0; i < pixels_length; ++i) {
            let new_data = {
                r: pixels[i + 0],
                g: pixels[i + 1],
                b: pixels[i + 2],
                a: pixels[i + 3],
                blank: false
            }
            if (!new_data.r && !new_data.g && !new_data.b && !new_data.a) {
                new_data.blank = true;
            }
            i += 3;
            transformed_pixel_data[row_index].push(new_data);
            if ((((i + 1) / (pixel_data.width * 4)) % 1) === 0) {
                transformed_pixel_data.push([]);
                row_index += 1;
            }
        }
        return transformed_pixel_data;
    },

    size: function (context) {
        return {
            width: context.canvas.width || context.canvas.clientWidth || 0,
            height: context.canvas.height || context.canvas.clientHeight || 0
        };
    },

    clear: function (context, opts = {}) {
        let {
            start,
            end
        } = opts;

        if (!start) {
            start = {
                x: 0,
                y: 0
            };
        }

        if (!end) {
            const size = Canvas.size(context);
            end = {
                x: size.width,
                y: size.height,
            }
        }

        context.clearRect(start.x, start.y, end.x, end.y);
        // Clearing of the canvas will most likely be followed by an operation
        // of sorts, so return Canvas for chaining, maybe do this for the others
        // as well
        return Canvas;
    },

    line: function (context, opts = {}) {
        const {
            points,
            alpha,
            lineCap,
            fill,
            cutout
        } = opts;

        const start_point = fastCopy(points[0]);
        if (!start_point) return;

        let strokes = opts.strokes || [];
        if (opts.width && opts.color) {
            strokes.push({
                width: opts.width,
                color: opts.color
            });
        }

        context.save();
            // Options are butt(default) | round | square
            context.lineCap = lineCap || 'butt';
            context.globalAlpha = alpha || 1;
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; ++i) {
                // Invalid points returns a bad copy
                if (!fastCopy(points[i])) return;
                context.lineTo(points[i].x, points[i].y);
            }
            // Not passing strokes will just create the lines and leave it open
            // to whatever called this function, if more outside operations are desired
            if (strokes.length) {
                strokes.forEach((stroke) => {
                    Canvas.stroke(context, {
                        width: stroke.width,
                        color: stroke.color
                    });
                });
            }
            if (cutout) {
                // "destination-out" : Draw existing content inside new content. This basically
                // cuts out the drawn shape from the canvas. This will let us see through the sections
                // we cut out of the shadow and shroud layers
                // The existing content is kept where it doesn't overlap the new shape.
                context.fillStyle = rgba(0, 0, 0, 1);
                context.globalCompositeOperation = "destination-out";
                context.fill();
            }
            if (fill) {
                context.fillStyle = fill.style || rgba(0, 0, 0, 1);
                context.globalCompositeOperation = fill.composite || "source-over";
                context.fill();
            }
        context.restore();
    },

    stroke: function (context, opts = {}) {
        const {
            width,
            color
        } = opts;

        context.strokeStyle = color;
        context.lineWidth = width;
        context.stroke();
    },

    rect: function (context, opts = {}) {
        let {
            start,
            end,
            color,
            alpha,
            point,
            width,
            height,
            angle
        } = opts;

        // start and end give the top left and bottom right of the rect, but sometimes point and width
        // are passed in, the point is the center and the width is the width of the square (this will
        // only happen for squares), in which case we can determine top left and bottom right
        // NOTE: "end" is width and height, not x and y
        if (!start) {
            start = {
                x: 0,
                y: 0
            };
            // if (point) {
            //     start = {
            //         x: point.x,
            //         y: point.y
            //     };
            // }
            if (point) {
                // Init the start point to the point passed in
                start.x = point.x;
                start.y = point.y;
                // If there is a width, offset so the point is in the center
                if (width) {
                    start.x -= (width / 2);
                    start.y -= (width / 2);
                }
                // If there is a height, change the y to be based off the height
                if (height) {
                    start.y = point.y - (height / 2);
                }
            }
        }

        if (!end) {
            end = {
                x: context.canvas.width || context.canvas.clientWidth || 0,
                y: context.canvas.height || context.canvas.clientHeight || 0,
            }
            if (width) {
                end.x = width;
                end.y = width;
            }
            if (height) {
                end.y = height;
            }
        }

        context.save();
            if (typeof angle === 'number') {
                context.translate(point.x, point.y);
                context.rotate(angle);
                context.translate(-point.x, -point.y);
            }
            context.globalAlpha = alpha || 1;
            context.beginPath();
            context.rect(start.x, start.y, end.x, end.y);
            context.fillStyle = color || '#000000';
            context.fill();
        context.restore();
    },

    arc: function (context, opts = {}) {

    },

    cone: function (context, opts = {}) {
        const {
            point,
            length,
            color,
            alpha,
            angle
        } = opts;

        const half_length = length / 2;

        context.save();
            if (typeof angle === 'number') {
                context.translate(point.x, point.y);
                context.rotate(angle);
                context.translate(-point.x, -point.y);
            }
            context.globalAlpha = alpha || 1;
            context.beginPath();

            // The origin point of the cone, now we need the two edge points
            let point_1 = copyPoint(point);
            // point 2 will be the top point
            let point_2 = copyPoint(point_1);
            point_2.x += length;
            point_2.y -= half_length
            // point 3 will be the bottom point
            let point_3 = copyPoint(point_1);
            point_3.x += length;
            point_3.y += half_length;

            Canvas.line(context, {
                points: [
                    point_1,
                    point_2,
                    point_3,
                    point_1
                ],
                // color: color,
                fill: {
                    style: color
                },
                width: 5,
                alpha: alpha
            });
        context.restore();
    },

    circle: function (context, opts = {}) {
        const {
            point,
            radius,
            color,
            alpha
        } = opts;

        context.save();
            context.globalAlpha = alpha || 1;
            context.beginPath();
            context.arc(
                point.x,
                point.y,
                radius,
                0,          // start at angle 0
                Math.PI * 2 // go to angle 2PI, making a complete circle
            );
            context.fillStyle = color;
            context.fill();
            context.strokeStyle = color;
            context.stroke();
        context.restore();
    }
};

/* harmony default export */ var canvas = (Canvas);

// CONCATENATED MODULE: ./src/slide/map/segment_manager.js


class segment_manager_SegmentManager {
    constructor (walls) {
        this.segments = null;
        this.all_segments = null;
        this.segments_map = {};

        this.loadSegments(walls);
        this.generateSegmentMap();

    	this.bounds = {
    		width: window.innerWidth,
    		height: window.innerHeight
    	};
    }

    loadSegments (walls) {
        const segments_array = walls.segments || [];
        const timestamp = (new Date()).getTime();
        this.segments = segments_array.map((s) => {
            let segment = s;
            segment.id = this.createSegmentId(segment, timestamp);
            segment.type = segment.type || 'wall';
            return segment;
        });
    }

    createSegmentId (segment, timestamp) {
        if (!segment) {
            console.error('Could not create a valid segment ID');
            return null;
        }
        timestamp = timestamp || (new Date()).getTime();
        return `${segment.p1.x}${segment.p1.y}${segment.p2.x}${segment.p2.y}${timestamp}`;
    }

    generateSegmentMap () {
        this.segments.forEach((segment) => {
            this.segments_map[segment.id] = segment;
        });
    }

	segmentLength (segment) {
        // Currently only doors use this for the purpose of the door dragging
	    const seg_x = segment.p1.x - segment.p2.x;
	    const seg_y = segment.p1.y - segment.p2.y;
	    const seg_l = Math.sqrt(sqr(seg_x) + sqr(seg_y));
	    return seg_l;
	}

    findSegmentsWithPoint (point, opts = {}) {
        if (!point) return [];

        return this.segments.filter((segment) => {
            const dist_info = pDistance(point, segment, {
                line_only: opts.line_only || false
            });

            if (!dist_info.distance) return false;
            return (dist_info.distance < 1);
        });
    }

    segmentExists (segment) {
        for (let i = 0; i < this.segments.length; ++i) {
            if (this.checkSegmentsMatch(segment, this.segments[i])) return true;
        }
        return false;
    }

    getClosestPointOnSegment (opts = {}) {
        let closest_segment = null;
        let closest_segment_info = null;
        let distance = null;
        const exclude = opts.exclude;

        this.segments.forEach((segment) => {
            if (exclude) {
                if (pointMatch(exclude, segment.p1, 1)) return;
                if (pointMatch(exclude, segment.p2, 1)) return;
            }

            const segment_info = pDistance(Mouse, segment);
            if (!distance || segment_info.distance < distance) {
                distance = segment_info.distance;
                closest_segment = segment;
                closest_segment_info = segment_info;
            }
        });

        if (closest_segment_info && closest_segment_info.distance < (opts.distance || 10)) {
            return {
                dist: closest_segment_info.distance,
                point: {
                    x: Math.round(closest_segment_info.x),
                    y: Math.round(closest_segment_info.y)
                },
                segment: closest_segment
            };
        }

        return null;
    }

	updateBounds (opts = {}) {
		const { width, height } = opts;
		this.bounds.width = width;
		this.bounds.height = height;

        const w = this.bounds.width;
        const h = this.bounds.height;
        // Add in the four bounding segments of the map
        this.all_segments = this.segments.concat([
            {
                p1: { x: 0, y: 0 },
                p2: { x: w, y: 0 }
            },
            {
                p1: { x: w, y: 0 },
                p2: { x: w, y: h }
            },
            {
                p1: { x: w, y: h },
                p2: { x: 0, y: h }
            },
            {
                p1: { x: 0, y: h },
                p2: { x: 0, y: 0 }
            }
        ]);
	}
};

/* harmony default export */ var segment_manager = (segment_manager_SegmentManager);

// CONCATENATED MODULE: ./src/slide/map/canvases/base.js

const { clear } = canvas;

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

/* harmony default export */ var base = (Base);

// CONCATENATED MODULE: ./src/slide/map/canvases/image.js


const MAX_MAP_SIZE = 3000;

// const MAP_IMAGe = ''

class image_ImageCanvas extends base {
    constructor (opts = {}) {
        super('image', opts);

        this.image = null;

        // this.width = CONFIG.window_width;
        // this.height = CONFIG.window_height;
        this.width = 0;
        this.height = 0;

        this.ratio = null;
    }

    load (image_src) {
        return new Promise((resolve, reject) => {
            this.image = new Image;
            this.image.onload = () => {
                this.width = this.image.naturalWidth;
                this.height = this.image.naturalHeight;
                this.ratio = this.width / this.height;

                this.confine();

                resolve({
                    width: this.width,
                    height: this.height,
                });
            }

            this.image.src = `./assets/${image_src}`;
        });
    }

    confine () {
        if (this.width > MAX_MAP_SIZE || this.height > MAX_MAP_SIZE) {
            if (this.ratio > 1) {
                // Image is wider than it is taller
                this.width = MAX_MAP_SIZE;
                this.height = this.width / this.ratio;
            } else if (this.ratio < 1) {
                // Image is taller than it is wider
                this.height = MAX_MAP_SIZE;
                this.width = this.height * this.ratio;
            } else {
                // Image is a square or something
                this.width = MAX_MAP_SIZE;
                this.height = MAX_MAP_SIZE;
            }
        }
    }

    draw () {
        this.context.drawImage(this.image, 0, 0, this.width, this.height);
        return this;
    }
}

/* harmony default export */ var canvases_image = (image_ImageCanvas);

// CONCATENATED MODULE: ./src/slide/map/canvases/shroud.js


const { clear: shroud_clear } = canvas;

class shroud_ShroudCanvas extends base {
    constructor (opts = {}) {
        super('shroud', opts);
        this.instance = opts.instance;
    }

    draw () {
        // The area that has been seen by the players but is no longer lit
        shroud_clear(this.context).rect(this.context, {
            alpha: this.instance.config.no_debug ? '0.9' : '0.5',
            color: 'rgba(40, 40, 40, 1)',
        });

        return this;
    }
}

/* harmony default export */ var shroud = (shroud_ShroudCanvas);

// CONCATENATED MODULE: ./src/slide/map/canvases/shadow.js


const { clear: shadow_clear } = canvas;

class shadow_ShadowCanvas extends base {
    constructor (opts = {}) {
        super('shadow', opts);
        this.instance = opts.instance;
    }

    draw () {
        // The shadow drawn on the light layer, what the players haven't seen
        shadow_clear(this.context).rect(this.context, {
            alpha: this.instance.config.no_debug ? '1' : '0.7',
            color: 'rgba(20, 20, 20, 1)',
        });

        return this;
    }
}

/* harmony default export */ var shadow = (shadow_ShadowCanvas);

// CONCATENATED MODULE: ./src/slide/map/canvases/wall.js




const { clear: wall_clear, line } = canvas;


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

class wall_WallCanvas extends base {
    constructor (opts = {}) {
        super('wall', opts);
        this.instance = opts.instance;
    }

    draw (segments) {
        wall_clear(this.context);
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

/* harmony default export */ var wall = (wall_WallCanvas);

// CONCATENATED MODULE: ./src/slide/map/canvases/control.js




const { clear: control_clear, line: control_line } = canvas;

class control_ControlCanvas extends base {
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
        control_clear(this.context);

        for (let l = 0; l < lights.length; ++l) {
            const light = lights[l];
            for (let i = 0; i < rays.length; ++i) {
                const points = [light, {
                    x: (light.x + rays[i].x * 10000),
                    y: (light.y + rays[i].y * 10000),
                }];
                control_line(this.context, {
                    points,
                    width: 1,
                    color: '#000000'
                });
            }
        }
    }

    drawIntersectionPoints (lights) {
        control_clear(this.context);

        for (let l = 0; l < lights.length; ++l) {
            const light = lights[l];

            let points = [];
            if (light.points) {
                points = light.points.intersects;
            } else {
                points = this.instance.getLightPolygon(light).intersects;
            }

            for (let i = 0; i < points.length; ++i) {
                control_line(this.context, {
                    points: [light, points[i]],
                    width: 1,
                    color: '#000000'
                });
            }
        }
    }

    drawLightPolyOutline (lights) {
        control_clear(this.context);

        for (let l = 0; l < lights.length; ++l) {
            const light = lights[l];

            let points = [];
            if (light.points) {
                points = light.points.intersects;
            } else {
                points = this.instance.getLightPolygon(light).intersects;
            }

            for (let i = 0; i < points.length; ++i) {
                control_line(this.context, {
                    points: [light, points[i]],
                    width: 1,
                    color: '#000000'
                });
            }
            control_line(this.context, {
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

/* harmony default export */ var control = (control_ControlCanvas);

// CONCATENATED MODULE: ./src/slide/map/map.js


const { line: map_line } = canvas;









class map_Map {
    constructor (opts = {}) {
        const { config = {} } = opts;
        this.config = config;

        // LIGHT ANGLES
        this.angle_amount = config.fidelity || 720;
        this.angle_increment = (Math.PI * 2) / this.angle_amount;
        this.angle_lookup = [];
        this.createAngles();

        this.managers = {
            segment: new segment_manager(config.walls),
        };

        this.lights = [];

        opts.instance = this;

        this.canvases = {};

        switch (config.stage) {
            case 'image':
                this.canvases = {
                    image: new canvases_image(opts),
                };
                break;

            case 'wall':
                this.canvases = {
                    image: new canvases_image(opts),
                    wall: new wall(opts),
                };
                break;

            case 'light_no_intersect':
            case 'intersection_points':
            case 'light_poly_outline':
                this.canvases = {
                    image: new canvases_image(opts),
                    wall: new wall(opts),
                    control: new control(opts),
                };
                break;

            case 'shadow':
            case 'shadow_no_debug':
                this.canvases = {
                    image: new canvases_image(opts),
                    shadow: new shadow(opts),
                    wall: new wall(opts),
                    control: new control(opts),
                };
                break;

            default:
                this.canvases = {
                    image: new canvases_image(opts),
                    shroud: new shroud(opts),
                    shadow: new shadow(opts),
                    wall: new wall(opts),
                    control: new control(opts),
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
            map_line(context, {
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

/* harmony default export */ var map_map = (map_Map);

// CONCATENATED MODULE: ./src/slide/canvaslayer.js
class CanvasLayer {
    constructor (opts = {}) {
        const { example, container } = opts;
        this.example = (example === 'canvaslayer_bad') ? 'bad' : 'good';
        this.container = container;

        this.render();

        this.timer = null;
        this.vel = 1;
        this.pos = 0;
        this.loaded = 0;
    }

    show () {
        clearInterval(this.timer);
        this.timer = null;
        this.vel = 1;
        this.pos = 0;
        this.loaded = 0;

        this.img1 = new Image;
        this.img1.onload = () => {
            this.loaded += 1;
            this.allLoaded();
        }
        this.img1.src = './assets/4k.jpg';

        this.img2 = new Image;
        this.img2.onload = () => {
            this.loaded += 1;
            this.allLoaded();
        }
        this.img2.src = './assets/4k2.jpg';

        this.img3 = new Image;
        this.img3.onload = () => {
            this.loaded += 1;
            this.allLoaded();
        }
        this.img3.src = './assets/4k3.jpg';

        this.img4 = new Image;
        this.img4.onload = () => {
            this.loaded += 1;
            this.allLoaded();
        }
        this.img4.src = './assets/4k4.jpg';
    }

    allLoaded () {
        if (this.loaded < 4) return;
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.resize(this.canvas_lone);
        this.resize(this.canvas_bot);
        this.resize(this.canvas_top);

        if (this.example === 'good') {
            this.context_bot.drawImage(this.img1, 0, 0, this.width / 2, this.height / 2);
            this.context_bot.drawImage(this.img2, this.width / 2, 0, this.width / 2, this.height / 2);
            this.context_bot.drawImage(this.img3, 0, this.height / 2, this.width / 2, this.height / 2);
            this.context_bot.drawImage(this.img4, this.width / 2, this.height / 2, this.width / 2, this.height / 2);
        }

        this.start();
    }

    hide () {
        clearInterval(this.timer);
        this.timer = null;
    }

    start () {
        this.timer = setInterval(() => {
            this.update();
        }, 1);
    }

    resize (canvas) {
        if (!canvas) return;
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';
    }

    update () {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.pos += (5 * this.vel);
        if (this.pos >= this.width) {
            this.vel = -1;
        }
        if (this.pos <= 0) {
            this.vel = 1;
        }

        if (this.example === 'bad') this.drawBad();
        if (this.example === 'good') this.drawGood();
    }

    drawBad () {
        window.requestAnimationFrame(() => {
            this.context_lone.clearRect(0, 0, this.width, this.height);
            this.context_lone.drawImage(this.img1, 0, 0, this.width / 2, this.height / 2);
            this.context_lone.drawImage(this.img2, this.width / 2, 0, this.width / 2, this.height / 2);
            this.context_lone.drawImage(this.img3, 0, this.height / 2, this.width / 2, this.height / 2);
            this.context_lone.drawImage(this.img4, this.width / 2, this.height / 2, this.width / 2, this.height / 2);
            this.drawSpot(this.context_lone);
        });
    }

    drawGood () {
        window.requestAnimationFrame(() => {
            this.context_top.clearRect(0, 0, this.width, this.height);
            this.drawSpot(this.context_top);
        });
    }

    drawSpot (context) {
        context.save();
            context.globalAlpha = 0.5;
            context.beginPath();
            context.rect(this.pos, (this.height / 2) - 50, 100, 100);
            context.fillStyle = '#FFFFFF';
            context.fill();
        context.restore();
    }

    render () {
        if (this.example === 'bad') {
            this.canvas_lone = document.createElement('canvas');
            this.canvas_lone.classList.add('canvaslayer_canvas_lone');
            this.context_lone = this.canvas_lone.getContext('2d');
            this.container.appendChild(this.canvas_lone);
        }

        if (this.example === 'good') {
            this.canvas_bot = document.createElement('canvas');
            this.canvas_bot.classList.add('canvaslayer_canvas_bot');
            this.context_bot = this.canvas_bot.getContext('2d');
            this.canvas_top = document.createElement('canvas');
            this.canvas_top.classList.add('canvaslayer_canvas_top');
            this.context_top = this.canvas_top.getContext('2d');

            const wrapper = document.createElement('div');
            wrapper.classList.add('canvaslayer_wrapper');
            wrapper.appendChild(this.canvas_bot);
            wrapper.appendChild(this.canvas_top);
            this.container.appendChild(wrapper);
        }
    }
}

/* harmony default export */ var canvaslayer = (CanvasLayer);

// CONCATENATED MODULE: ./src/slide/slide.js



class slide_Slide {
    constructor (opts = {}) {
        const { map, example } = opts;
        this.render(opts);

        if (map) {
            this.map = new map_map({
                config: map,
                container: this.el_slide_example,
            });
        }

        if (example && example.match(/canvaslayer/)) {
            this.example = new canvaslayer({
                example: example,
                container: this.el_slide_example,
            });
        }
    }

    show () {
        this.el_slide.classList.remove('hidden');
        if (this.example && this.example.show) {
            this.example.show();
        }
    }

    hide () {
        this.el_slide.classList.add('hidden');
        if (this.example && this.example.hide) {
            this.example.hide();
        }
    }

    render (opts) {
        const parent_node = document.getElementById('slides');

        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (!opts.map && !opts.example) slide.classList.add('no_example');
        if (!opts.template && opts.example) slide.classList.add('only_example');
        slide.classList.add('hidden');
        this.el_slide = slide;

        if (opts.template) {
            const slide_information = document.createElement('div');
            slide_information.classList.add('slide_information');

            const template = document.getElementById(opts.template);
            const clone = template.content.cloneNode(true);
            slide_information.appendChild(clone);

            slide.appendChild(slide_information);
            this.el_slide_information = slide_information;
        }

        if (opts.map || opts.example) {
            const slide_example = document.createElement('div');
            slide_example.classList.add('slide_example');
            slide.appendChild(slide_example);
            this.el_slide_example = slide_example;
        }

        parent_node.appendChild(slide);
    }
}

/* harmony default export */ var slide = (slide_Slide);

// CONCATENATED MODULE: ./assets/graph.js
/* harmony default export */ var graph = ({
    "grid": {
        "offset": {
            "x": 3,
            "y": 15
        },
        "show": true,
        "size": 48
    },
    "segments": [
        {
            "p1": {
                "x": 217,
                "y": 138
            },
            "p2": {
                "x": 217,
                "y": 430
            }
        },
        {
            "p1": {
                "x": 217,
                "y": 430
            },
            "p2": {
                "x": 460,
                "y": 429
            }
        },
        {
            "p1": {
                "x": 460,
                "y": 429
            },
            "p2": {
                "x": 460,
                "y": 146
            }
        },
        {
            "p1": {
                "x": 460,
                "y": 146
            },
            "p2": {
                "x": 217,
                "y": 138
            }
        },
        {
            "p1": {
                "x": 800,
                "y": 148
            },
            "p2": {
                "x": 798,
                "y": 423
            }
        },
        {
            "p1": {
                "x": 798,
                "y": 423
            },
            "p2": {
                "x": 1075,
                "y": 422
            }
        },
        {
            "p1": {
                "x": 1075,
                "y": 422
            },
            "p2": {
                "x": 1074,
                "y": 142
            }
        },
        {
            "p1": {
                "x": 1074,
                "y": 142
            },
            "p2": {
                "x": 800,
                "y": 148
            }
        },
        {
            "p1": {
                "x": 226,
                "y": 560
            },
            "p2": {
                "x": 226,
                "y": 622
            }
        },
        {
            "p1": {
                "x": 226,
                "y": 622
            },
            "p2": {
                "x": 1079,
                "y": 618
            }
        },
        {
            "p1": {
                "x": 1079,
                "y": 618
            },
            "p2": {
                "x": 1078,
                "y": 564
            }
        },
        {
            "p1": {
                "x": 1078,
                "y": 564
            },
            "p2": {
                "x": 226,
                "y": 560
            }
        }
    ],
    "text": {}
});

// CONCATENATED MODULE: ./assets/graph2.js
/* harmony default export */ var graph2 = ({
    "grid": {
        "offset": {
            "x": 3,
            "y": 15
        },
        "show": true,
        "size": 48
    },
    "segments": [
        {
            "p1": {
                "x": 217,
                "y": 138
            },
            "p2": {
                "x": 217,
                "y": 430
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 217,
                "y": 430
            },
            "p2": {
                "x": 460,
                "y": 429
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 460,
                "y": 429
            },
            "p2": {
                "x": 460,
                "y": 146
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 460,
                "y": 146
            },
            "p2": {
                "x": 217,
                "y": 138
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 800,
                "y": 148
            },
            "p2": {
                "x": 798,
                "y": 423
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 798,
                "y": 423
            },
            "p2": {
                "x": 1075,
                "y": 422
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1075,
                "y": 422
            },
            "p2": {
                "x": 1074,
                "y": 142
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1074,
                "y": 142
            },
            "p2": {
                "x": 800,
                "y": 148
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 226,
                "y": 560
            },
            "p2": {
                "x": 226,
                "y": 622
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 226,
                "y": 622
            },
            "p2": {
                "x": 1079,
                "y": 618
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1079,
                "y": 618
            },
            "p2": {
                "x": 1078,
                "y": 564
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 581,
                "y": 562
            },
            "p2": {
                "x": 581,
                "y": 326
            }
        },
        {
            "p1": {
                "x": 581,
                "y": 326
            },
            "p2": {
                "x": 689,
                "y": 327
            }
        },
        {
            "p1": {
                "x": 1078,
                "y": 564
            },
            "p2": {
                "x": 688,
                "y": 562
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 226,
                "y": 560
            },
            "p2": {
                "x": 688,
                "y": 562
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 689,
                "y": 327
            },
            "p2": {
                "x": 688,
                "y": 562
            }
        },
        {
            "p1": {
                "x": 514,
                "y": 732
            },
            "p2": {
                "x": 613,
                "y": 941
            }
        },
        {
            "p1": {
                "x": 613,
                "y": 941
            },
            "p2": {
                "x": 735,
                "y": 727
            }
        },
        {
            "p1": {
                "x": 735,
                "y": 727
            },
            "p2": {
                "x": 514,
                "y": 732
            }
        },
        {
            "p1": {
                "x": 708,
                "y": 158
            },
            "p2": {
                "x": 899,
                "y": 52
            }
        },
        {
            "p1": {
                "x": 899,
                "y": 52
            },
            "p2": {
                "x": 862,
                "y": 25
            }
        },
        {
            "p1": {
                "x": 862,
                "y": 25
            },
            "p2": {
                "x": 708,
                "y": 158
            }
        },
        {
            "p1": {
                "x": 299,
                "y": 78
            },
            "p2": {
                "x": 530,
                "y": 139
            }
        },
        {
            "p1": {
                "x": 530,
                "y": 139
            },
            "p2": {
                "x": 366,
                "y": 40
            }
        },
        {
            "p1": {
                "x": 366,
                "y": 40
            },
            "p2": {
                "x": 299,
                "y": 78
            }
        },
        {
            "p1": {
                "x": 340,
                "y": 387
            },
            "p2": {
                "x": 419,
                "y": 385
            }
        },
        {
            "p1": {
                "x": 419,
                "y": 385
            },
            "p2": {
                "x": 408,
                "y": 297
            }
        },
        {
            "p1": {
                "x": 341,
                "y": 292
            },
            "p2": {
                "x": 341,
                "y": 297
            }
        },
        {
            "p1": {
                "x": 340,
                "y": 387
            },
            "p2": {
                "x": 341,
                "y": 297
            }
        },
        {
            "p1": {
                "x": 851,
                "y": 311
            },
            "p2": {
                "x": 842,
                "y": 389
            }
        },
        {
            "p1": {
                "x": 842,
                "y": 389
            },
            "p2": {
                "x": 899,
                "y": 396
            }
        },
        {
            "p1": {
                "x": 899,
                "y": 396
            },
            "p2": {
                "x": 911,
                "y": 301
            }
        },
        {
            "p1": {
                "x": 911,
                "y": 301
            },
            "p2": {
                "x": 851,
                "y": 311
            }
        },
        {
            "p1": {
                "x": 408,
                "y": 297
            },
            "p2": {
                "x": 341,
                "y": 292
            }
        },
        {
            "p1": {
                "x": 47,
                "y": 766
            },
            "p2": {
                "x": 49,
                "y": 1024
            }
        },
        {
            "p1": {
                "x": 49,
                "y": 1024
            },
            "p2": {
                "x": 555,
                "y": 1031
            }
        },
        {
            "p1": {
                "x": 555,
                "y": 1031
            },
            "p2": {
                "x": 419,
                "y": 810
            }
        },
        {
            "p1": {
                "x": 419,
                "y": 810
            },
            "p2": {
                "x": 47,
                "y": 766
            }
        },
        {
            "p1": {
                "x": 700,
                "y": 1019
            },
            "p2": {
                "x": 774,
                "y": 848
            }
        },
        {
            "p1": {
                "x": 774,
                "y": 848
            },
            "p2": {
                "x": 1207,
                "y": 757
            }
        },
        {
            "p1": {
                "x": 1207,
                "y": 757
            },
            "p2": {
                "x": 1172,
                "y": 1031
            }
        },
        {
            "p1": {
                "x": 1172,
                "y": 1031
            },
            "p2": {
                "x": 700,
                "y": 1019
            }
        }
    ],
    "text": {}
});

// CONCATENATED MODULE: ./assets/waveecho.js
/* harmony default export */ var waveecho = ({
    "grid": {
        "offset": {
            "x": 0,
            "y": 0
        },
        "show": false,
        "size": 50
    },
    "segments": [
        {
            "p1": {
                "x": 277,
                "y": 2671
            },
            "p2": {
                "x": 306,
                "y": 2605
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 306,
                "y": 2605
            },
            "p2": {
                "x": 364,
                "y": 2552
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 364,
                "y": 2552
            },
            "p2": {
                "x": 388,
                "y": 2556
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 388,
                "y": 2556
            },
            "p2": {
                "x": 432,
                "y": 2494
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 432,
                "y": 2494
            },
            "p2": {
                "x": 432,
                "y": 2464
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 432,
                "y": 2464
            },
            "p2": {
                "x": 451,
                "y": 2452
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 574,
                "y": 2488
            },
            "p2": {
                "x": 650,
                "y": 2489
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 650,
                "y": 2489
            },
            "p2": {
                "x": 661,
                "y": 2459
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 661,
                "y": 2459
            },
            "p2": {
                "x": 629,
                "y": 2414
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 679,
                "y": 2387
            },
            "p2": {
                "x": 697,
                "y": 2362
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 697,
                "y": 2362
            },
            "p2": {
                "x": 657,
                "y": 2293
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 657,
                "y": 2293
            },
            "p2": {
                "x": 725,
                "y": 2288
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 725,
                "y": 2288
            },
            "p2": {
                "x": 741,
                "y": 2273
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 741,
                "y": 2273
            },
            "p2": {
                "x": 753,
                "y": 2265
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 839,
                "y": 2293
            },
            "p2": {
                "x": 918,
                "y": 2296
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1015,
                "y": 2363
            },
            "p2": {
                "x": 1059,
                "y": 2376
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1059,
                "y": 2376
            },
            "p2": {
                "x": 1106,
                "y": 2374
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1106,
                "y": 2374
            },
            "p2": {
                "x": 1120,
                "y": 2403
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1120,
                "y": 2403
            },
            "p2": {
                "x": 1121,
                "y": 2478
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1072,
                "y": 2419
            },
            "p2": {
                "x": 905,
                "y": 2420
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 905,
                "y": 2420
            },
            "p2": {
                "x": 903,
                "y": 2361
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 903,
                "y": 2361
            },
            "p2": {
                "x": 769,
                "y": 2361
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 769,
                "y": 2361
            },
            "p2": {
                "x": 767,
                "y": 2559
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 767,
                "y": 2559
            },
            "p2": {
                "x": 826,
                "y": 2560
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 826,
                "y": 2560
            },
            "p2": {
                "x": 825,
                "y": 2616
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 825,
                "y": 2616
            },
            "p2": {
                "x": 1071,
                "y": 2616
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1121,
                "y": 2557
            },
            "p2": {
                "x": 1121,
                "y": 2697
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1121,
                "y": 2697
            },
            "p2": {
                "x": 1200,
                "y": 2699
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1200,
                "y": 2699
            },
            "p2": {
                "x": 1200,
                "y": 2559
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1249,
                "y": 2618
            },
            "p2": {
                "x": 1375,
                "y": 2615
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1375,
                "y": 2615
            },
            "p2": {
                "x": 1375,
                "y": 2361
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1375,
                "y": 2361
            },
            "p2": {
                "x": 1246,
                "y": 2364
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1200,
                "y": 2480
            },
            "p2": {
                "x": 1199,
                "y": 2321
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1199,
                "y": 2321
            },
            "p2": {
                "x": 1241,
                "y": 2311
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1982,
                "y": 1977
            },
            "p2": {
                "x": 1958,
                "y": 1953
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1849,
                "y": 1905
            },
            "p2": {
                "x": 1863,
                "y": 1843
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1863,
                "y": 1843
            },
            "p2": {
                "x": 1848,
                "y": 1812
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1895,
                "y": 1778
            },
            "p2": {
                "x": 2015,
                "y": 1779
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2050,
                "y": 1778
            },
            "p2": {
                "x": 2083,
                "y": 1779
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2083,
                "y": 1779
            },
            "p2": {
                "x": 2080,
                "y": 1847
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2080,
                "y": 1847
            },
            "p2": {
                "x": 1951,
                "y": 1847
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1951,
                "y": 1847
            },
            "p2": {
                "x": 1951,
                "y": 1780
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2102,
                "y": 1441
            },
            "p2": {
                "x": 2077,
                "y": 1309
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2034,
                "y": 834
            },
            "p2": {
                "x": 2012,
                "y": 764
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2022,
                "y": 482
            },
            "p2": {
                "x": 2117,
                "y": 506
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2117,
                "y": 506
            },
            "p2": {
                "x": 2115,
                "y": 434
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2115,
                "y": 434
            },
            "p2": {
                "x": 1796,
                "y": 89
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1796,
                "y": 89
            },
            "p2": {
                "x": 1570,
                "y": 83
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1570,
                "y": 83
            },
            "p2": {
                "x": 1589,
                "y": 157
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1589,
                "y": 157
            },
            "p2": {
                "x": 1630,
                "y": 192
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1515,
                "y": 367
            },
            "p2": {
                "x": 1456,
                "y": 393
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1456,
                "y": 393
            },
            "p2": {
                "x": 1390,
                "y": 375
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1261,
                "y": 205
            },
            "p2": {
                "x": 1170,
                "y": 201
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1170,
                "y": 201
            },
            "p2": {
                "x": 1124,
                "y": 221
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 922,
                "y": 170
            },
            "p2": {
                "x": 902,
                "y": 208
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 902,
                "y": 208
            },
            "p2": {
                "x": 857,
                "y": 214
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 812,
                "y": 294
            },
            "p2": {
                "x": 602,
                "y": 293
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 74,
                "y": 2830
            },
            "p2": {
                "x": 73,
                "y": 2739
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 170,
                "y": 2674
            },
            "p2": {
                "x": 174,
                "y": 2632
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 339,
                "y": 2411
            },
            "p2": {
                "x": 286,
                "y": 2362
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 286,
                "y": 2362
            },
            "p2": {
                "x": 287,
                "y": 2310
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 445,
                "y": 2142
            },
            "p2": {
                "x": 436,
                "y": 2044
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 436,
                "y": 2044
            },
            "p2": {
                "x": 386,
                "y": 1967
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 386,
                "y": 1967
            },
            "p2": {
                "x": 254,
                "y": 1966
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 254,
                "y": 1966
            },
            "p2": {
                "x": 252,
                "y": 2049
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 252,
                "y": 2049
            },
            "p2": {
                "x": 218,
                "y": 2063
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 218,
                "y": 2063
            },
            "p2": {
                "x": 180,
                "y": 2049
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 180,
                "y": 2049
            },
            "p2": {
                "x": 179,
                "y": 1907
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 179,
                "y": 1907
            },
            "p2": {
                "x": 92,
                "y": 1906
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 92,
                "y": 1906
            },
            "p2": {
                "x": 77,
                "y": 1826
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 77,
                "y": 1826
            },
            "p2": {
                "x": 256,
                "y": 1828
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 256,
                "y": 1828
            },
            "p2": {
                "x": 256,
                "y": 1888
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 256,
                "y": 1888
            },
            "p2": {
                "x": 314,
                "y": 1888
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 264,
                "y": 1732
            },
            "p2": {
                "x": 119,
                "y": 1729
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 119,
                "y": 1729
            },
            "p2": {
                "x": 119,
                "y": 1657
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 119,
                "y": 1657
            },
            "p2": {
                "x": 232,
                "y": 1652
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 232,
                "y": 1652
            },
            "p2": {
                "x": 214,
                "y": 1622
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 231,
                "y": 1553
            },
            "p2": {
                "x": 117,
                "y": 1553
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 117,
                "y": 1553
            },
            "p2": {
                "x": 119,
                "y": 1253
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 119,
                "y": 1253
            },
            "p2": {
                "x": 197,
                "y": 1253
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 197,
                "y": 1253
            },
            "p2": {
                "x": 195,
                "y": 1477
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 195,
                "y": 1477
            },
            "p2": {
                "x": 266,
                "y": 1476
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 266,
                "y": 1476
            },
            "p2": {
                "x": 275,
                "y": 1449
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 137,
                "y": 979
            },
            "p2": {
                "x": 168,
                "y": 932
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 168,
                "y": 932
            },
            "p2": {
                "x": 154,
                "y": 904
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 154,
                "y": 904
            },
            "p2": {
                "x": 169,
                "y": 874
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 188,
                "y": 772
            },
            "p2": {
                "x": 184,
                "y": 742
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 184,
                "y": 742
            },
            "p2": {
                "x": 191,
                "y": 721
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 343,
                "y": 693
            },
            "p2": {
                "x": 374,
                "y": 714
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 491,
                "y": 889
            },
            "p2": {
                "x": 534,
                "y": 888
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 534,
                "y": 888
            },
            "p2": {
                "x": 533,
                "y": 664
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 491,
                "y": 889
            },
            "p2": {
                "x": 507,
                "y": 827
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 507,
                "y": 827
            },
            "p2": {
                "x": 476,
                "y": 795
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 476,
                "y": 795
            },
            "p2": {
                "x": 471,
                "y": 773
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 449,
                "y": 748
            },
            "p2": {
                "x": 481,
                "y": 727
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 374,
                "y": 714
            },
            "p2": {
                "x": 387,
                "y": 709
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 214,
                "y": 1622
            },
            "p2": {
                "x": 221,
                "y": 1595
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 231,
                "y": 1553
            },
            "p2": {
                "x": 224,
                "y": 1570
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 221,
                "y": 1595
            },
            "p2": {
                "x": 224,
                "y": 1570
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 242,
                "y": 1382
            },
            "p2": {
                "x": 259,
                "y": 1406
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 258,
                "y": 1424
            },
            "p2": {
                "x": 259,
                "y": 1406
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 261,
                "y": 1279
            },
            "p2": {
                "x": 259,
                "y": 1308
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 243,
                "y": 1337
            },
            "p2": {
                "x": 259,
                "y": 1308
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 275,
                "y": 1449
            },
            "p2": {
                "x": 258,
                "y": 1424
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 242,
                "y": 1382
            },
            "p2": {
                "x": 246,
                "y": 1358
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 243,
                "y": 1337
            },
            "p2": {
                "x": 246,
                "y": 1358
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 261,
                "y": 1279
            },
            "p2": {
                "x": 270,
                "y": 1272
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 270,
                "y": 1272
            },
            "p2": {
                "x": 263,
                "y": 1253
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 253,
                "y": 1209
            },
            "p2": {
                "x": 255,
                "y": 1239
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 263,
                "y": 1253
            },
            "p2": {
                "x": 255,
                "y": 1239
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 253,
                "y": 1209
            },
            "p2": {
                "x": 234,
                "y": 1202
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 223,
                "y": 1186
            },
            "p2": {
                "x": 234,
                "y": 1202
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 174,
                "y": 1147
            },
            "p2": {
                "x": 194,
                "y": 1181
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 223,
                "y": 1186
            },
            "p2": {
                "x": 194,
                "y": 1181
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 174,
                "y": 1147
            },
            "p2": {
                "x": 188,
                "y": 1129
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 162,
                "y": 1074
            },
            "p2": {
                "x": 177,
                "y": 1120
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 188,
                "y": 1129
            },
            "p2": {
                "x": 177,
                "y": 1120
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 162,
                "y": 1074
            },
            "p2": {
                "x": 166,
                "y": 1050
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 137,
                "y": 979
            },
            "p2": {
                "x": 137,
                "y": 1022
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 137,
                "y": 1022
            },
            "p2": {
                "x": 153,
                "y": 1048
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 153,
                "y": 1048
            },
            "p2": {
                "x": 166,
                "y": 1050
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 169,
                "y": 874
            },
            "p2": {
                "x": 198,
                "y": 848
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 231,
                "y": 849
            },
            "p2": {
                "x": 198,
                "y": 848
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 231,
                "y": 849
            },
            "p2": {
                "x": 257,
                "y": 841
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 252,
                "y": 814
            },
            "p2": {
                "x": 257,
                "y": 841
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 252,
                "y": 814
            },
            "p2": {
                "x": 202,
                "y": 792
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 188,
                "y": 772
            },
            "p2": {
                "x": 202,
                "y": 792
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 191,
                "y": 721
            },
            "p2": {
                "x": 225,
                "y": 691
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 343,
                "y": 693
            },
            "p2": {
                "x": 225,
                "y": 691
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 387,
                "y": 709
            },
            "p2": {
                "x": 402,
                "y": 714
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 402,
                "y": 714
            },
            "p2": {
                "x": 407,
                "y": 695
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 407,
                "y": 695
            },
            "p2": {
                "x": 433,
                "y": 680
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 471,
                "y": 773
            },
            "p2": {
                "x": 447,
                "y": 760
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 449,
                "y": 748
            },
            "p2": {
                "x": 447,
                "y": 760
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 264,
                "y": 1732
            },
            "p2": {
                "x": 273,
                "y": 1779
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 314,
                "y": 1888
            },
            "p2": {
                "x": 297,
                "y": 1833
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 282,
                "y": 1818
            },
            "p2": {
                "x": 297,
                "y": 1833
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 282,
                "y": 1818
            },
            "p2": {
                "x": 273,
                "y": 1779
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 445,
                "y": 2142
            },
            "p2": {
                "x": 425,
                "y": 2123
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 360,
                "y": 2081
            },
            "p2": {
                "x": 407,
                "y": 2121
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 425,
                "y": 2123
            },
            "p2": {
                "x": 407,
                "y": 2121
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 149,
                "y": 2158
            },
            "p2": {
                "x": 169,
                "y": 2143
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 169,
                "y": 2143
            },
            "p2": {
                "x": 222,
                "y": 2147
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 360,
                "y": 2081
            },
            "p2": {
                "x": 265,
                "y": 2107
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 222,
                "y": 2147
            },
            "p2": {
                "x": 255,
                "y": 2134
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 265,
                "y": 2107
            },
            "p2": {
                "x": 255,
                "y": 2134
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 177,
                "y": 2197
            },
            "p2": {
                "x": 156,
                "y": 2190
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 149,
                "y": 2158
            },
            "p2": {
                "x": 156,
                "y": 2190
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 177,
                "y": 2197
            },
            "p2": {
                "x": 192,
                "y": 2225
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 192,
                "y": 2225
            },
            "p2": {
                "x": 228,
                "y": 2235
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 287,
                "y": 2310
            },
            "p2": {
                "x": 256,
                "y": 2281
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 228,
                "y": 2235
            },
            "p2": {
                "x": 256,
                "y": 2281
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 325,
                "y": 2476
            },
            "p2": {
                "x": 328,
                "y": 2431
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 339,
                "y": 2423
            },
            "p2": {
                "x": 328,
                "y": 2431
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 339,
                "y": 2423
            },
            "p2": {
                "x": 339,
                "y": 2411
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 325,
                "y": 2476
            },
            "p2": {
                "x": 264,
                "y": 2520
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 174,
                "y": 2632
            },
            "p2": {
                "x": 229,
                "y": 2578
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 264,
                "y": 2520
            },
            "p2": {
                "x": 229,
                "y": 2578
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 73,
                "y": 2739
            },
            "p2": {
                "x": 147,
                "y": 2707
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 170,
                "y": 2674
            },
            "p2": {
                "x": 147,
                "y": 2707
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 74,
                "y": 2830
            },
            "p2": {
                "x": 139,
                "y": 2805
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 187,
                "y": 2766
            },
            "p2": {
                "x": 139,
                "y": 2805
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 187,
                "y": 2766
            },
            "p2": {
                "x": 230,
                "y": 2738
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 230,
                "y": 2738
            },
            "p2": {
                "x": 247,
                "y": 2718
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 277,
                "y": 2671
            },
            "p2": {
                "x": 253,
                "y": 2684
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 247,
                "y": 2718
            },
            "p2": {
                "x": 253,
                "y": 2684
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 451,
                "y": 2452
            },
            "p2": {
                "x": 478,
                "y": 2464
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 502,
                "y": 2490
            },
            "p2": {
                "x": 478,
                "y": 2464
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 629,
                "y": 2414
            },
            "p2": {
                "x": 634,
                "y": 2400
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 679,
                "y": 2387
            },
            "p2": {
                "x": 634,
                "y": 2400
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 753,
                "y": 2265
            },
            "p2": {
                "x": 807,
                "y": 2272
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 839,
                "y": 2293
            },
            "p2": {
                "x": 807,
                "y": 2272
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1015,
                "y": 2363
            },
            "p2": {
                "x": 983,
                "y": 2327
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 918,
                "y": 2296
            },
            "p2": {
                "x": 946,
                "y": 2318
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 983,
                "y": 2327
            },
            "p2": {
                "x": 946,
                "y": 2318
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1241,
                "y": 2311
            },
            "p2": {
                "x": 1274,
                "y": 2281
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1297,
                "y": 2240
            },
            "p2": {
                "x": 1274,
                "y": 2281
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1297,
                "y": 2240
            },
            "p2": {
                "x": 1358,
                "y": 2235
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1415,
                "y": 2251
            },
            "p2": {
                "x": 1358,
                "y": 2235
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1415,
                "y": 2251
            },
            "p2": {
                "x": 1468,
                "y": 2236
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1517,
                "y": 2150
            },
            "p2": {
                "x": 1499,
                "y": 2159
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1468,
                "y": 2236
            },
            "p2": {
                "x": 1495,
                "y": 2188
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1499,
                "y": 2159
            },
            "p2": {
                "x": 1495,
                "y": 2188
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1517,
                "y": 2150
            },
            "p2": {
                "x": 1562,
                "y": 2160
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1673,
                "y": 2143
            },
            "p2": {
                "x": 1623,
                "y": 2140
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1562,
                "y": 2160
            },
            "p2": {
                "x": 1623,
                "y": 2140
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1673,
                "y": 2143
            },
            "p2": {
                "x": 1679,
                "y": 2182
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1733,
                "y": 2230
            },
            "p2": {
                "x": 1679,
                "y": 2182
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1733,
                "y": 2230
            },
            "p2": {
                "x": 1752,
                "y": 2229
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1752,
                "y": 2229
            },
            "p2": {
                "x": 1766,
                "y": 2199
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1766,
                "y": 2199
            },
            "p2": {
                "x": 1782,
                "y": 2193
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1812,
                "y": 2223
            },
            "p2": {
                "x": 1811,
                "y": 2203
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1782,
                "y": 2193
            },
            "p2": {
                "x": 1811,
                "y": 2203
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1812,
                "y": 2223
            },
            "p2": {
                "x": 1843,
                "y": 2247
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1905,
                "y": 2284
            },
            "p2": {
                "x": 1881,
                "y": 2274
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1843,
                "y": 2247
            },
            "p2": {
                "x": 1858,
                "y": 2245
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1881,
                "y": 2274
            },
            "p2": {
                "x": 1875,
                "y": 2254
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1858,
                "y": 2245
            },
            "p2": {
                "x": 1875,
                "y": 2254
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2038,
                "y": 2257
            },
            "p2": {
                "x": 2010,
                "y": 2278
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1974,
                "y": 2283
            },
            "p2": {
                "x": 2010,
                "y": 2278
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1905,
                "y": 2284
            },
            "p2": {
                "x": 1934,
                "y": 2277
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1974,
                "y": 2283
            },
            "p2": {
                "x": 1952,
                "y": 2265
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1934,
                "y": 2277
            },
            "p2": {
                "x": 1952,
                "y": 2265
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2038,
                "y": 2257
            },
            "p2": {
                "x": 2046,
                "y": 2223
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2068,
                "y": 2145
            },
            "p2": {
                "x": 1982,
                "y": 2142
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2046,
                "y": 2223
            },
            "p2": {
                "x": 2014,
                "y": 2177
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1969,
                "y": 2153
            },
            "p2": {
                "x": 2014,
                "y": 2177
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1982,
                "y": 2142
            },
            "p2": {
                "x": 1969,
                "y": 2153
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2005,
                "y": 2062
            },
            "p2": {
                "x": 2064,
                "y": 2084
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2068,
                "y": 2145
            },
            "p2": {
                "x": 2077,
                "y": 2115
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2064,
                "y": 2084
            },
            "p2": {
                "x": 2077,
                "y": 2115
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1959,
                "y": 2061
            },
            "p2": {
                "x": 1958,
                "y": 2021
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 108,
                "y": 664
            },
            "p2": {
                "x": 110,
                "y": 588
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 110,
                "y": 588
            },
            "p2": {
                "x": 238,
                "y": 591
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 238,
                "y": 591
            },
            "p2": {
                "x": 238,
                "y": 543
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 238,
                "y": 543
            },
            "p2": {
                "x": 121,
                "y": 543
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 121,
                "y": 543
            },
            "p2": {
                "x": 123,
                "y": 177
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 123,
                "y": 177
            },
            "p2": {
                "x": 422,
                "y": 179
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 422,
                "y": 179
            },
            "p2": {
                "x": 423,
                "y": 360
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 423,
                "y": 360
            },
            "p2": {
                "x": 508,
                "y": 362
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 422,
                "y": 179
            },
            "p2": {
                "x": 547,
                "y": 180
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 547,
                "y": 180
            },
            "p2": {
                "x": 549,
                "y": 238
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 549,
                "y": 238
            },
            "p2": {
                "x": 601,
                "y": 238
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 599,
                "y": 360
            },
            "p2": {
                "x": 541,
                "y": 361
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 599,
                "y": 360
            },
            "p2": {
                "x": 602,
                "y": 293
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 602,
                "y": 293
            },
            "p2": {
                "x": 601,
                "y": 238
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 746,
                "y": 371
            },
            "p2": {
                "x": 662,
                "y": 476
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 746,
                "y": 371
            },
            "p2": {
                "x": 667,
                "y": 372
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 667,
                "y": 372
            },
            "p2": {
                "x": 666,
                "y": 426
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 666,
                "y": 426
            },
            "p2": {
                "x": 425,
                "y": 426
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 425,
                "y": 426
            },
            "p2": {
                "x": 425,
                "y": 545
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 425,
                "y": 545
            },
            "p2": {
                "x": 312,
                "y": 544
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 312,
                "y": 544
            },
            "p2": {
                "x": 313,
                "y": 592
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 685,
                "y": 594
            },
            "p2": {
                "x": 651,
                "y": 532
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 651,
                "y": 532
            },
            "p2": {
                "x": 592,
                "y": 509
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 592,
                "y": 509
            },
            "p2": {
                "x": 547,
                "y": 533
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 662,
                "y": 476
            },
            "p2": {
                "x": 605,
                "y": 450
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 605,
                "y": 450
            },
            "p2": {
                "x": 533,
                "y": 464
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 533,
                "y": 464
            },
            "p2": {
                "x": 483,
                "y": 498
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 483,
                "y": 498
            },
            "p2": {
                "x": 468,
                "y": 561
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 547,
                "y": 533
            },
            "p2": {
                "x": 537,
                "y": 572
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 324,
                "y": 1671
            },
            "p2": {
                "x": 415,
                "y": 1671
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 415,
                "y": 1671
            },
            "p2": {
                "x": 415,
                "y": 1866
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 415,
                "y": 1866
            },
            "p2": {
                "x": 493,
                "y": 1863
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 493,
                "y": 1863
            },
            "p2": {
                "x": 491,
                "y": 1729
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 491,
                "y": 1729
            },
            "p2": {
                "x": 532,
                "y": 1729
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 532,
                "y": 1729
            },
            "p2": {
                "x": 531,
                "y": 1887
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 531,
                "y": 1887
            },
            "p2": {
                "x": 396,
                "y": 1888
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 503,
                "y": 2015
            },
            "p2": {
                "x": 473,
                "y": 1965
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 473,
                "y": 1965
            },
            "p2": {
                "x": 846,
                "y": 1965
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 846,
                "y": 1965
            },
            "p2": {
                "x": 846,
                "y": 1849
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 846,
                "y": 1849
            },
            "p2": {
                "x": 886,
                "y": 1848
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 886,
                "y": 1848
            },
            "p2": {
                "x": 886,
                "y": 2010
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 886,
                "y": 2010
            },
            "p2": {
                "x": 643,
                "y": 2010
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 643,
                "y": 2010
            },
            "p2": {
                "x": 698,
                "y": 2085
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 698,
                "y": 2085
            },
            "p2": {
                "x": 828,
                "y": 2085
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 828,
                "y": 2085
            },
            "p2": {
                "x": 829,
                "y": 2205
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 829,
                "y": 2205
            },
            "p2": {
                "x": 774,
                "y": 2183
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 774,
                "y": 2183
            },
            "p2": {
                "x": 717,
                "y": 2195
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 717,
                "y": 2195
            },
            "p2": {
                "x": 707,
                "y": 2196
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 707,
                "y": 2196
            },
            "p2": {
                "x": 686,
                "y": 2107
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 686,
                "y": 2107
            },
            "p2": {
                "x": 613,
                "y": 2034
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 613,
                "y": 2034
            },
            "p2": {
                "x": 556,
                "y": 2018
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 556,
                "y": 2018
            },
            "p2": {
                "x": 503,
                "y": 2015
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 503,
                "y": 2015
            },
            "p2": {
                "x": 436,
                "y": 2044
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 741,
                "y": 2273
            },
            "p2": {
                "x": 717,
                "y": 2195
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 904,
                "y": 2217
            },
            "p2": {
                "x": 904,
                "y": 2084
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 904,
                "y": 2084
            },
            "p2": {
                "x": 1061,
                "y": 2085
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1061,
                "y": 2085
            },
            "p2": {
                "x": 1058,
                "y": 2108
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1058,
                "y": 2108
            },
            "p2": {
                "x": 1053,
                "y": 2136
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1053,
                "y": 2136
            },
            "p2": {
                "x": 1054,
                "y": 2180
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1054,
                "y": 2180
            },
            "p2": {
                "x": 962,
                "y": 2200
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 962,
                "y": 2200
            },
            "p2": {
                "x": 959,
                "y": 2215
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 959,
                "y": 2215
            },
            "p2": {
                "x": 933,
                "y": 2224
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 933,
                "y": 2224
            },
            "p2": {
                "x": 904,
                "y": 2217
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1141,
                "y": 2084
            },
            "p2": {
                "x": 1141,
                "y": 2110
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1141,
                "y": 2110
            },
            "p2": {
                "x": 1154,
                "y": 2146
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1154,
                "y": 2146
            },
            "p2": {
                "x": 1145,
                "y": 2162
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1145,
                "y": 2162
            },
            "p2": {
                "x": 1145,
                "y": 2172
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1145,
                "y": 2172
            },
            "p2": {
                "x": 1185,
                "y": 2204
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1185,
                "y": 2204
            },
            "p2": {
                "x": 1191,
                "y": 2189
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1191,
                "y": 2189
            },
            "p2": {
                "x": 1218,
                "y": 2183
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1218,
                "y": 2183
            },
            "p2": {
                "x": 1258,
                "y": 2196
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1258,
                "y": 2196
            },
            "p2": {
                "x": 1282,
                "y": 2180
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1282,
                "y": 2180
            },
            "p2": {
                "x": 1300,
                "y": 2155
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1300,
                "y": 2155
            },
            "p2": {
                "x": 1359,
                "y": 2156
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1359,
                "y": 2156
            },
            "p2": {
                "x": 1405,
                "y": 2142
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1405,
                "y": 2142
            },
            "p2": {
                "x": 1417,
                "y": 2118
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1417,
                "y": 2118
            },
            "p2": {
                "x": 1454,
                "y": 2087
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1454,
                "y": 2087
            },
            "p2": {
                "x": 1501,
                "y": 2092
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1501,
                "y": 2092
            },
            "p2": {
                "x": 1530,
                "y": 2087
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1530,
                "y": 2087
            },
            "p2": {
                "x": 1566,
                "y": 2071
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1566,
                "y": 2071
            },
            "p2": {
                "x": 1556,
                "y": 2050
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1556,
                "y": 2050
            },
            "p2": {
                "x": 1558,
                "y": 2005
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1558,
                "y": 2005
            },
            "p2": {
                "x": 1614,
                "y": 1982
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1614,
                "y": 1982
            },
            "p2": {
                "x": 1615,
                "y": 1959
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1615,
                "y": 1959
            },
            "p2": {
                "x": 1625,
                "y": 1942
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1625,
                "y": 1942
            },
            "p2": {
                "x": 1617,
                "y": 1932
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1617,
                "y": 1932
            },
            "p2": {
                "x": 1616,
                "y": 1908
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1616,
                "y": 1908
            },
            "p2": {
                "x": 1603,
                "y": 1906
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1603,
                "y": 1906
            },
            "p2": {
                "x": 1586,
                "y": 1869
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1586,
                "y": 1869
            },
            "p2": {
                "x": 1581,
                "y": 1832
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1141,
                "y": 2084
            },
            "p2": {
                "x": 1402,
                "y": 2083
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1402,
                "y": 2083
            },
            "p2": {
                "x": 1436,
                "y": 2029
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1436,
                "y": 2029
            },
            "p2": {
                "x": 1428,
                "y": 2007
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1428,
                "y": 2007
            },
            "p2": {
                "x": 1317,
                "y": 2009
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1317,
                "y": 2009
            },
            "p2": {
                "x": 1318,
                "y": 1908
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1318,
                "y": 1908
            },
            "p2": {
                "x": 1359,
                "y": 1907
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1359,
                "y": 1907
            },
            "p2": {
                "x": 1360,
                "y": 1961
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1360,
                "y": 1961
            },
            "p2": {
                "x": 1464,
                "y": 1964
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1464,
                "y": 1964
            },
            "p2": {
                "x": 1473,
                "y": 1952
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1473,
                "y": 1952
            },
            "p2": {
                "x": 1458,
                "y": 1928
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1458,
                "y": 1928
            },
            "p2": {
                "x": 1460,
                "y": 1912
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1460,
                "y": 1912
            },
            "p2": {
                "x": 1489,
                "y": 1899
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1489,
                "y": 1899
            },
            "p2": {
                "x": 1498,
                "y": 1886
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1498,
                "y": 1886
            },
            "p2": {
                "x": 1517,
                "y": 1887
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1517,
                "y": 1887
            },
            "p2": {
                "x": 1523,
                "y": 1863
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1523,
                "y": 1863
            },
            "p2": {
                "x": 1508,
                "y": 1846
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1508,
                "y": 1846
            },
            "p2": {
                "x": 1510,
                "y": 1824
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1510,
                "y": 1824
            },
            "p2": {
                "x": 1536,
                "y": 1809
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1536,
                "y": 1809
            },
            "p2": {
                "x": 1546,
                "y": 1783
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1546,
                "y": 1783
            },
            "p2": {
                "x": 1553,
                "y": 1781
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1581,
                "y": 1832
            },
            "p2": {
                "x": 1597,
                "y": 1809
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1597,
                "y": 1809
            },
            "p2": {
                "x": 1615,
                "y": 1808
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1615,
                "y": 1808
            },
            "p2": {
                "x": 1674,
                "y": 1847
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1674,
                "y": 1847
            },
            "p2": {
                "x": 1684,
                "y": 1878
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1684,
                "y": 1878
            },
            "p2": {
                "x": 1692,
                "y": 1892
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1692,
                "y": 1892
            },
            "p2": {
                "x": 1712,
                "y": 1894
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1712,
                "y": 1894
            },
            "p2": {
                "x": 1723,
                "y": 1907
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1723,
                "y": 1907
            },
            "p2": {
                "x": 1731,
                "y": 1904
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1731,
                "y": 1904
            },
            "p2": {
                "x": 1747,
                "y": 1874
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1747,
                "y": 1874
            },
            "p2": {
                "x": 1774,
                "y": 1872
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1774,
                "y": 1872
            },
            "p2": {
                "x": 1779,
                "y": 1861
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1779,
                "y": 1861
            },
            "p2": {
                "x": 1765,
                "y": 1816
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1765,
                "y": 1816
            },
            "p2": {
                "x": 1774,
                "y": 1775
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1774,
                "y": 1775
            },
            "p2": {
                "x": 1788,
                "y": 1758
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1788,
                "y": 1758
            },
            "p2": {
                "x": 1783,
                "y": 1741
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1783,
                "y": 1741
            },
            "p2": {
                "x": 1766,
                "y": 1742
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1766,
                "y": 1742
            },
            "p2": {
                "x": 1745,
                "y": 1765
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1745,
                "y": 1765
            },
            "p2": {
                "x": 1698,
                "y": 1777
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1698,
                "y": 1777
            },
            "p2": {
                "x": 1673,
                "y": 1773
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1673,
                "y": 1773
            },
            "p2": {
                "x": 1656,
                "y": 1751
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1656,
                "y": 1751
            },
            "p2": {
                "x": 1661,
                "y": 1718
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1661,
                "y": 1718
            },
            "p2": {
                "x": 1633,
                "y": 1684
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1633,
                "y": 1684
            },
            "p2": {
                "x": 1598,
                "y": 1682
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1598,
                "y": 1682
            },
            "p2": {
                "x": 1589,
                "y": 1662
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1589,
                "y": 1662
            },
            "p2": {
                "x": 1586,
                "y": 1595
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1586,
                "y": 1595
            },
            "p2": {
                "x": 1608,
                "y": 1568
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1608,
                "y": 1568
            },
            "p2": {
                "x": 1605,
                "y": 1520
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1605,
                "y": 1520
            },
            "p2": {
                "x": 1618,
                "y": 1493
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1618,
                "y": 1493
            },
            "p2": {
                "x": 1659,
                "y": 1462
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1659,
                "y": 1462
            },
            "p2": {
                "x": 1689,
                "y": 1463
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1689,
                "y": 1463
            },
            "p2": {
                "x": 1697,
                "y": 1487
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1697,
                "y": 1487
            },
            "p2": {
                "x": 1711,
                "y": 1478
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1711,
                "y": 1478
            },
            "p2": {
                "x": 1723,
                "y": 1440
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1723,
                "y": 1440
            },
            "p2": {
                "x": 1744,
                "y": 1419
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1744,
                "y": 1419
            },
            "p2": {
                "x": 1732,
                "y": 1398
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1732,
                "y": 1398
            },
            "p2": {
                "x": 1730,
                "y": 1383
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1730,
                "y": 1383
            },
            "p2": {
                "x": 1692,
                "y": 1374
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1692,
                "y": 1374
            },
            "p2": {
                "x": 1671,
                "y": 1331
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1671,
                "y": 1331
            },
            "p2": {
                "x": 1676,
                "y": 1288
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1676,
                "y": 1288
            },
            "p2": {
                "x": 1691,
                "y": 1264
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1691,
                "y": 1264
            },
            "p2": {
                "x": 1712,
                "y": 1257
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1712,
                "y": 1257
            },
            "p2": {
                "x": 1707,
                "y": 1224
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1707,
                "y": 1224
            },
            "p2": {
                "x": 1691,
                "y": 1214
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1691,
                "y": 1214
            },
            "p2": {
                "x": 1693,
                "y": 1183
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1693,
                "y": 1183
            },
            "p2": {
                "x": 1703,
                "y": 1169
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1703,
                "y": 1169
            },
            "p2": {
                "x": 1704,
                "y": 1154
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1704,
                "y": 1154
            },
            "p2": {
                "x": 1693,
                "y": 1141
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1693,
                "y": 1141
            },
            "p2": {
                "x": 1596,
                "y": 1140
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1596,
                "y": 1140
            },
            "p2": {
                "x": 1593,
                "y": 1082
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1593,
                "y": 1082
            },
            "p2": {
                "x": 1494,
                "y": 1080
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1494,
                "y": 1080
            },
            "p2": {
                "x": 1494,
                "y": 1140
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1494,
                "y": 1140
            },
            "p2": {
                "x": 1436,
                "y": 1140
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1436,
                "y": 1140
            },
            "p2": {
                "x": 1437,
                "y": 1283
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1437,
                "y": 1283
            },
            "p2": {
                "x": 1470,
                "y": 1300
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1470,
                "y": 1300
            },
            "p2": {
                "x": 1487,
                "y": 1318
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1487,
                "y": 1318
            },
            "p2": {
                "x": 1501,
                "y": 1306
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1501,
                "y": 1306
            },
            "p2": {
                "x": 1517,
                "y": 1310
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1517,
                "y": 1310
            },
            "p2": {
                "x": 1535,
                "y": 1321
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1535,
                "y": 1321
            },
            "p2": {
                "x": 1541,
                "y": 1352
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1541,
                "y": 1352
            },
            "p2": {
                "x": 1531,
                "y": 1366
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1531,
                "y": 1366
            },
            "p2": {
                "x": 1570,
                "y": 1389
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1570,
                "y": 1389
            },
            "p2": {
                "x": 1569,
                "y": 1414
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1569,
                "y": 1414
            },
            "p2": {
                "x": 1539,
                "y": 1443
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1539,
                "y": 1443
            },
            "p2": {
                "x": 1516,
                "y": 1482
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1516,
                "y": 1482
            },
            "p2": {
                "x": 1502,
                "y": 1489
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1502,
                "y": 1489
            },
            "p2": {
                "x": 1503,
                "y": 1520
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1503,
                "y": 1520
            },
            "p2": {
                "x": 1422,
                "y": 1561
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1422,
                "y": 1561
            },
            "p2": {
                "x": 1384,
                "y": 1551
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1384,
                "y": 1551
            },
            "p2": {
                "x": 1343,
                "y": 1566
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1343,
                "y": 1566
            },
            "p2": {
                "x": 1318,
                "y": 1596
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1426,
                "y": 1780
            },
            "p2": {
                "x": 1360,
                "y": 1780
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1458,
                "y": 1779
            },
            "p2": {
                "x": 1546,
                "y": 1783
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1553,
                "y": 1781
            },
            "p2": {
                "x": 1553,
                "y": 1593
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1553,
                "y": 1593
            },
            "p2": {
                "x": 1357,
                "y": 1595
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1357,
                "y": 1595
            },
            "p2": {
                "x": 1360,
                "y": 1780
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1359,
                "y": 1831
            },
            "p2": {
                "x": 1360,
                "y": 1780
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1317,
                "y": 1829
            },
            "p2": {
                "x": 1359,
                "y": 1831
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1317,
                "y": 1829
            },
            "p2": {
                "x": 1318,
                "y": 1596
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1138,
                "y": 1958
            },
            "p2": {
                "x": 1139,
                "y": 2008
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1139,
                "y": 2008
            },
            "p2": {
                "x": 1240,
                "y": 2008
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1240,
                "y": 2008
            },
            "p2": {
                "x": 1242,
                "y": 1600
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1242,
                "y": 1600
            },
            "p2": {
                "x": 1216,
                "y": 1590
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1216,
                "y": 1590
            },
            "p2": {
                "x": 1183,
                "y": 1607
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1183,
                "y": 1607
            },
            "p2": {
                "x": 1138,
                "y": 1598
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1138,
                "y": 1598
            },
            "p2": {
                "x": 1130,
                "y": 1580
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1130,
                "y": 1580
            },
            "p2": {
                "x": 1070,
                "y": 1572
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1070,
                "y": 1572
            },
            "p2": {
                "x": 1060,
                "y": 1557
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1060,
                "y": 1557
            },
            "p2": {
                "x": 1060,
                "y": 1542
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1060,
                "y": 1542
            },
            "p2": {
                "x": 1026,
                "y": 1519
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1026,
                "y": 1519
            },
            "p2": {
                "x": 1021,
                "y": 1508
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1021,
                "y": 1508
            },
            "p2": {
                "x": 1002,
                "y": 1492
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1002,
                "y": 1492
            },
            "p2": {
                "x": 973,
                "y": 1502
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1138,
                "y": 1958
            },
            "p2": {
                "x": 1197,
                "y": 1959
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1197,
                "y": 1959
            },
            "p2": {
                "x": 1198,
                "y": 1652
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1198,
                "y": 1652
            },
            "p2": {
                "x": 1084,
                "y": 1653
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1084,
                "y": 1653
            },
            "p2": {
                "x": 1082,
                "y": 1594
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1082,
                "y": 1594
            },
            "p2": {
                "x": 1012,
                "y": 1595
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1065,
                "y": 1958
            },
            "p2": {
                "x": 1062,
                "y": 2008
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1096,
                "y": 1958
            },
            "p2": {
                "x": 1065,
                "y": 1958
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1065,
                "y": 1958
            },
            "p2": {
                "x": 1012,
                "y": 1958
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1062,
                "y": 2008
            },
            "p2": {
                "x": 964,
                "y": 2008
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 964,
                "y": 2008
            },
            "p2": {
                "x": 963,
                "y": 1789
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 963,
                "y": 1789
            },
            "p2": {
                "x": 1012,
                "y": 1789
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1012,
                "y": 1789
            },
            "p2": {
                "x": 1012,
                "y": 1757
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1012,
                "y": 1789
            },
            "p2": {
                "x": 1012,
                "y": 1958
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 611,
                "y": 1848
            },
            "p2": {
                "x": 767,
                "y": 1848
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 767,
                "y": 1848
            },
            "p2": {
                "x": 767,
                "y": 1888
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 767,
                "y": 1888
            },
            "p2": {
                "x": 610,
                "y": 1890
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 610,
                "y": 1890
            },
            "p2": {
                "x": 611,
                "y": 1848
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 608,
                "y": 1728
            },
            "p2": {
                "x": 652,
                "y": 1728
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 652,
                "y": 1728
            },
            "p2": {
                "x": 652,
                "y": 1769
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 652,
                "y": 1769
            },
            "p2": {
                "x": 610,
                "y": 1770
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 610,
                "y": 1770
            },
            "p2": {
                "x": 608,
                "y": 1728
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 727,
                "y": 1728
            },
            "p2": {
                "x": 727,
                "y": 1772
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 727,
                "y": 1772
            },
            "p2": {
                "x": 887,
                "y": 1772
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 887,
                "y": 1772
            },
            "p2": {
                "x": 887,
                "y": 1731
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 727,
                "y": 1728
            },
            "p2": {
                "x": 887,
                "y": 1731
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 491,
                "y": 1551
            },
            "p2": {
                "x": 491,
                "y": 1652
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 491,
                "y": 1652
            },
            "p2": {
                "x": 590,
                "y": 1653
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 590,
                "y": 1653
            },
            "p2": {
                "x": 591,
                "y": 1552
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 491,
                "y": 1551
            },
            "p2": {
                "x": 591,
                "y": 1552
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1012,
                "y": 1711
            },
            "p2": {
                "x": 963,
                "y": 1712
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1013,
                "y": 1724
            },
            "p2": {
                "x": 1012,
                "y": 1711
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1012,
                "y": 1711
            },
            "p2": {
                "x": 1012,
                "y": 1595
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 963,
                "y": 1712
            },
            "p2": {
                "x": 965,
                "y": 1650
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 965,
                "y": 1650
            },
            "p2": {
                "x": 906,
                "y": 1652
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 906,
                "y": 1652
            },
            "p2": {
                "x": 905,
                "y": 1518
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 905,
                "y": 1518
            },
            "p2": {
                "x": 827,
                "y": 1547
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 827,
                "y": 1547
            },
            "p2": {
                "x": 827,
                "y": 1654
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 827,
                "y": 1654
            },
            "p2": {
                "x": 786,
                "y": 1654
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 786,
                "y": 1654
            },
            "p2": {
                "x": 785,
                "y": 1466
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 785,
                "y": 1466
            },
            "p2": {
                "x": 817,
                "y": 1455
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 817,
                "y": 1455
            },
            "p2": {
                "x": 845,
                "y": 1460
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 845,
                "y": 1460
            },
            "p2": {
                "x": 889,
                "y": 1486
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 889,
                "y": 1486
            },
            "p2": {
                "x": 916,
                "y": 1482
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 916,
                "y": 1482
            },
            "p2": {
                "x": 973,
                "y": 1502
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 708,
                "y": 1653
            },
            "p2": {
                "x": 707,
                "y": 1439
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 707,
                "y": 1439
            },
            "p2": {
                "x": 674,
                "y": 1435
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 674,
                "y": 1435
            },
            "p2": {
                "x": 657,
                "y": 1426
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 657,
                "y": 1426
            },
            "p2": {
                "x": 635,
                "y": 1438
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 635,
                "y": 1438
            },
            "p2": {
                "x": 626,
                "y": 1435
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 626,
                "y": 1435
            },
            "p2": {
                "x": 616,
                "y": 1414
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 616,
                "y": 1414
            },
            "p2": {
                "x": 589,
                "y": 1403
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 589,
                "y": 1403
            },
            "p2": {
                "x": 584,
                "y": 1380
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 584,
                "y": 1380
            },
            "p2": {
                "x": 559,
                "y": 1365
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 559,
                "y": 1365
            },
            "p2": {
                "x": 551,
                "y": 1317
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 551,
                "y": 1317
            },
            "p2": {
                "x": 535,
                "y": 1261
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 535,
                "y": 1261
            },
            "p2": {
                "x": 553,
                "y": 1227
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 553,
                "y": 1227
            },
            "p2": {
                "x": 577,
                "y": 1221
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 577,
                "y": 1221
            },
            "p2": {
                "x": 595,
                "y": 1228
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 595,
                "y": 1228
            },
            "p2": {
                "x": 614,
                "y": 1210
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 614,
                "y": 1210
            },
            "p2": {
                "x": 654,
                "y": 1218
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 654,
                "y": 1218
            },
            "p2": {
                "x": 651,
                "y": 1182
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 651,
                "y": 1182
            },
            "p2": {
                "x": 668,
                "y": 1162
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 668,
                "y": 1162
            },
            "p2": {
                "x": 672,
                "y": 1133
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 672,
                "y": 1133
            },
            "p2": {
                "x": 691,
                "y": 1127
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 691,
                "y": 1127
            },
            "p2": {
                "x": 715,
                "y": 1108
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 715,
                "y": 1108
            },
            "p2": {
                "x": 719,
                "y": 1086
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 719,
                "y": 1086
            },
            "p2": {
                "x": 768,
                "y": 1073
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 768,
                "y": 1073
            },
            "p2": {
                "x": 786,
                "y": 1097
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 786,
                "y": 1097
            },
            "p2": {
                "x": 792,
                "y": 1092
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 792,
                "y": 1092
            },
            "p2": {
                "x": 831,
                "y": 1074
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 831,
                "y": 1074
            },
            "p2": {
                "x": 915,
                "y": 1084
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 915,
                "y": 1084
            },
            "p2": {
                "x": 930,
                "y": 1104
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 930,
                "y": 1104
            },
            "p2": {
                "x": 919,
                "y": 1120
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 919,
                "y": 1120
            },
            "p2": {
                "x": 955,
                "y": 1152
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 955,
                "y": 1152
            },
            "p2": {
                "x": 1005,
                "y": 1125
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1005,
                "y": 1125
            },
            "p2": {
                "x": 1005,
                "y": 963
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1005,
                "y": 963
            },
            "p2": {
                "x": 955,
                "y": 963
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 954,
                "y": 928
            },
            "p2": {
                "x": 955,
                "y": 963
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 955,
                "y": 963
            },
            "p2": {
                "x": 956,
                "y": 1021
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 956,
                "y": 1021
            },
            "p2": {
                "x": 657,
                "y": 1022
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 607,
                "y": 962
            },
            "p2": {
                "x": 656,
                "y": 962
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 656,
                "y": 962
            },
            "p2": {
                "x": 657,
                "y": 1022
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 657,
                "y": 928
            },
            "p2": {
                "x": 656,
                "y": 962
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 607,
                "y": 962
            },
            "p2": {
                "x": 606,
                "y": 1122
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 606,
                "y": 1122
            },
            "p2": {
                "x": 529,
                "y": 1121
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 529,
                "y": 1121
            },
            "p2": {
                "x": 533,
                "y": 963
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 533,
                "y": 963
            },
            "p2": {
                "x": 485,
                "y": 963
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 485,
                "y": 963
            },
            "p2": {
                "x": 481,
                "y": 970
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 481,
                "y": 970
            },
            "p2": {
                "x": 493,
                "y": 983
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 493,
                "y": 983
            },
            "p2": {
                "x": 494,
                "y": 1062
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 494,
                "y": 1062
            },
            "p2": {
                "x": 444,
                "y": 1119
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 444,
                "y": 1119
            },
            "p2": {
                "x": 398,
                "y": 1117
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 398,
                "y": 1117
            },
            "p2": {
                "x": 392,
                "y": 1140
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 392,
                "y": 1140
            },
            "p2": {
                "x": 348,
                "y": 1156
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 348,
                "y": 1156
            },
            "p2": {
                "x": 348,
                "y": 1171
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 348,
                "y": 1171
            },
            "p2": {
                "x": 338,
                "y": 1199
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 338,
                "y": 1199
            },
            "p2": {
                "x": 353,
                "y": 1230
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 353,
                "y": 1230
            },
            "p2": {
                "x": 347,
                "y": 1261
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 347,
                "y": 1261
            },
            "p2": {
                "x": 332,
                "y": 1273
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 332,
                "y": 1273
            },
            "p2": {
                "x": 338,
                "y": 1285
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 338,
                "y": 1285
            },
            "p2": {
                "x": 326,
                "y": 1323
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 326,
                "y": 1323
            },
            "p2": {
                "x": 325,
                "y": 1352
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 325,
                "y": 1352
            },
            "p2": {
                "x": 337,
                "y": 1367
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 340,
                "y": 1405
            },
            "p2": {
                "x": 337,
                "y": 1367
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 340,
                "y": 1405
            },
            "p2": {
                "x": 350,
                "y": 1421
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 350,
                "y": 1421
            },
            "p2": {
                "x": 351,
                "y": 1471
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 351,
                "y": 1471
            },
            "p2": {
                "x": 340,
                "y": 1483
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 340,
                "y": 1483
            },
            "p2": {
                "x": 317,
                "y": 1548
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 317,
                "y": 1548
            },
            "p2": {
                "x": 317,
                "y": 1592
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 317,
                "y": 1592
            },
            "p2": {
                "x": 413,
                "y": 1595
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 413,
                "y": 1595
            },
            "p2": {
                "x": 412,
                "y": 1437
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 412,
                "y": 1437
            },
            "p2": {
                "x": 374,
                "y": 1429
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 374,
                "y": 1429
            },
            "p2": {
                "x": 373,
                "y": 1370
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 373,
                "y": 1370
            },
            "p2": {
                "x": 415,
                "y": 1360
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 415,
                "y": 1360
            },
            "p2": {
                "x": 415,
                "y": 1262
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 415,
                "y": 1262
            },
            "p2": {
                "x": 491,
                "y": 1264
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 491,
                "y": 1264
            },
            "p2": {
                "x": 492,
                "y": 1476
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 492,
                "y": 1476
            },
            "p2": {
                "x": 667,
                "y": 1477
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 669,
                "y": 1653
            },
            "p2": {
                "x": 708,
                "y": 1653
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 669,
                "y": 1653
            },
            "p2": {
                "x": 667,
                "y": 1477
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 609,
                "y": 886
            },
            "p2": {
                "x": 609,
                "y": 668
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 609,
                "y": 668
            },
            "p2": {
                "x": 719,
                "y": 669
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 719,
                "y": 669
            },
            "p2": {
                "x": 722,
                "y": 696
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 722,
                "y": 696
            },
            "p2": {
                "x": 756,
                "y": 717
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 756,
                "y": 717
            },
            "p2": {
                "x": 774,
                "y": 704
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 774,
                "y": 704
            },
            "p2": {
                "x": 804,
                "y": 731
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 804,
                "y": 731
            },
            "p2": {
                "x": 853,
                "y": 723
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 853,
                "y": 723
            },
            "p2": {
                "x": 867,
                "y": 751
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 867,
                "y": 751
            },
            "p2": {
                "x": 903,
                "y": 771
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 903,
                "y": 771
            },
            "p2": {
                "x": 939,
                "y": 762
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 939,
                "y": 762
            },
            "p2": {
                "x": 974,
                "y": 713
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 974,
                "y": 713
            },
            "p2": {
                "x": 998,
                "y": 683
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 998,
                "y": 683
            },
            "p2": {
                "x": 991,
                "y": 651
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 991,
                "y": 651
            },
            "p2": {
                "x": 1010,
                "y": 625
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1010,
                "y": 625
            },
            "p2": {
                "x": 1010,
                "y": 607
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1010,
                "y": 607
            },
            "p2": {
                "x": 1056,
                "y": 579
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1056,
                "y": 579
            },
            "p2": {
                "x": 1073,
                "y": 549
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1073,
                "y": 549
            },
            "p2": {
                "x": 1181,
                "y": 549
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1181,
                "y": 549
            },
            "p2": {
                "x": 1181,
                "y": 589
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1181,
                "y": 589
            },
            "p2": {
                "x": 1165,
                "y": 590
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1165,
                "y": 590
            },
            "p2": {
                "x": 1129,
                "y": 613
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1129,
                "y": 613
            },
            "p2": {
                "x": 1128,
                "y": 634
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1128,
                "y": 634
            },
            "p2": {
                "x": 1106,
                "y": 637
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1106,
                "y": 637
            },
            "p2": {
                "x": 1092,
                "y": 659
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1092,
                "y": 659
            },
            "p2": {
                "x": 1100,
                "y": 682
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1100,
                "y": 682
            },
            "p2": {
                "x": 1081,
                "y": 689
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1081,
                "y": 689
            },
            "p2": {
                "x": 1068,
                "y": 714
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1068,
                "y": 714
            },
            "p2": {
                "x": 1086,
                "y": 738
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1086,
                "y": 738
            },
            "p2": {
                "x": 1085,
                "y": 751
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1085,
                "y": 751
            },
            "p2": {
                "x": 1057,
                "y": 777
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1057,
                "y": 777
            },
            "p2": {
                "x": 1036,
                "y": 821
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1036,
                "y": 821
            },
            "p2": {
                "x": 1044,
                "y": 845
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1044,
                "y": 845
            },
            "p2": {
                "x": 1090,
                "y": 848
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1090,
                "y": 848
            },
            "p2": {
                "x": 1109,
                "y": 828
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1109,
                "y": 828
            },
            "p2": {
                "x": 1125,
                "y": 829
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1125,
                "y": 829
            },
            "p2": {
                "x": 1132,
                "y": 841
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1132,
                "y": 841
            },
            "p2": {
                "x": 1119,
                "y": 857
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1119,
                "y": 857
            },
            "p2": {
                "x": 1122,
                "y": 885
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 954,
                "y": 896
            },
            "p2": {
                "x": 954,
                "y": 883
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 954,
                "y": 883
            },
            "p2": {
                "x": 1122,
                "y": 885
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 954,
                "y": 883
            },
            "p2": {
                "x": 955,
                "y": 827
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 955,
                "y": 827
            },
            "p2": {
                "x": 726,
                "y": 827
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 726,
                "y": 827
            },
            "p2": {
                "x": 725,
                "y": 766
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 725,
                "y": 766
            },
            "p2": {
                "x": 657,
                "y": 770
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 657,
                "y": 770
            },
            "p2": {
                "x": 656,
                "y": 890
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 656,
                "y": 890
            },
            "p2": {
                "x": 609,
                "y": 886
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 772,
                "y": 1244
            },
            "p2": {
                "x": 784,
                "y": 1230
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 784,
                "y": 1230
            },
            "p2": {
                "x": 780,
                "y": 1209
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 780,
                "y": 1209
            },
            "p2": {
                "x": 784,
                "y": 1200
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 784,
                "y": 1200
            },
            "p2": {
                "x": 803,
                "y": 1196
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 803,
                "y": 1196
            },
            "p2": {
                "x": 809,
                "y": 1188
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 809,
                "y": 1188
            },
            "p2": {
                "x": 834,
                "y": 1199
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 834,
                "y": 1199
            },
            "p2": {
                "x": 828,
                "y": 1217
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 828,
                "y": 1217
            },
            "p2": {
                "x": 835,
                "y": 1228
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 835,
                "y": 1228
            },
            "p2": {
                "x": 815,
                "y": 1244
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 815,
                "y": 1244
            },
            "p2": {
                "x": 772,
                "y": 1244
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1081,
                "y": 962
            },
            "p2": {
                "x": 1122,
                "y": 964
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1122,
                "y": 964
            },
            "p2": {
                "x": 1120,
                "y": 1135
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1120,
                "y": 1135
            },
            "p2": {
                "x": 1147,
                "y": 1155
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1147,
                "y": 1155
            },
            "p2": {
                "x": 1178,
                "y": 1148
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1178,
                "y": 1148
            },
            "p2": {
                "x": 1181,
                "y": 1174
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1181,
                "y": 1174
            },
            "p2": {
                "x": 1216,
                "y": 1194
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1216,
                "y": 1194
            },
            "p2": {
                "x": 1233,
                "y": 1177
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1233,
                "y": 1177
            },
            "p2": {
                "x": 1252,
                "y": 1182
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1252,
                "y": 1182
            },
            "p2": {
                "x": 1269,
                "y": 1210
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1269,
                "y": 1210
            },
            "p2": {
                "x": 1295,
                "y": 1211
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1295,
                "y": 1211
            },
            "p2": {
                "x": 1338,
                "y": 1197
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1338,
                "y": 1197
            },
            "p2": {
                "x": 1342,
                "y": 1132
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1342,
                "y": 1132
            },
            "p2": {
                "x": 1357,
                "y": 1132
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1357,
                "y": 1132
            },
            "p2": {
                "x": 1358,
                "y": 1263
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1358,
                "y": 1263
            },
            "p2": {
                "x": 1296,
                "y": 1253
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1296,
                "y": 1253
            },
            "p2": {
                "x": 1274,
                "y": 1269
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1274,
                "y": 1269
            },
            "p2": {
                "x": 1245,
                "y": 1256
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1245,
                "y": 1256
            },
            "p2": {
                "x": 1220,
                "y": 1256
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1220,
                "y": 1256
            },
            "p2": {
                "x": 1204,
                "y": 1265
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1204,
                "y": 1265
            },
            "p2": {
                "x": 1158,
                "y": 1239
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1158,
                "y": 1239
            },
            "p2": {
                "x": 1147,
                "y": 1218
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1147,
                "y": 1218
            },
            "p2": {
                "x": 1117,
                "y": 1221
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1117,
                "y": 1221
            },
            "p2": {
                "x": 1082,
                "y": 1191
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1082,
                "y": 1191
            },
            "p2": {
                "x": 1081,
                "y": 962
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1040,
                "y": 365
            },
            "p2": {
                "x": 1020,
                "y": 394
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1020,
                "y": 394
            },
            "p2": {
                "x": 1031,
                "y": 446
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1031,
                "y": 446
            },
            "p2": {
                "x": 1048,
                "y": 452
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1048,
                "y": 452
            },
            "p2": {
                "x": 1069,
                "y": 435
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1069,
                "y": 435
            },
            "p2": {
                "x": 1108,
                "y": 434
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1108,
                "y": 434
            },
            "p2": {
                "x": 1113,
                "y": 472
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1113,
                "y": 472
            },
            "p2": {
                "x": 1257,
                "y": 472
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1257,
                "y": 472
            },
            "p2": {
                "x": 1259,
                "y": 608
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1259,
                "y": 608
            },
            "p2": {
                "x": 1272,
                "y": 617
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1272,
                "y": 617
            },
            "p2": {
                "x": 1305,
                "y": 611
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1305,
                "y": 611
            },
            "p2": {
                "x": 1336,
                "y": 623
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1336,
                "y": 623
            },
            "p2": {
                "x": 1376,
                "y": 655
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1376,
                "y": 655
            },
            "p2": {
                "x": 1374,
                "y": 673
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1374,
                "y": 673
            },
            "p2": {
                "x": 1354,
                "y": 697
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1354,
                "y": 697
            },
            "p2": {
                "x": 1357,
                "y": 713
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1357,
                "y": 713
            },
            "p2": {
                "x": 1331,
                "y": 736
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1331,
                "y": 736
            },
            "p2": {
                "x": 1334,
                "y": 743
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1334,
                "y": 743
            },
            "p2": {
                "x": 1366,
                "y": 754
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1366,
                "y": 754
            },
            "p2": {
                "x": 1379,
                "y": 775
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1379,
                "y": 775
            },
            "p2": {
                "x": 1371,
                "y": 803
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1371,
                "y": 803
            },
            "p2": {
                "x": 1390,
                "y": 826
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1390,
                "y": 826
            },
            "p2": {
                "x": 1495,
                "y": 829
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1540,
                "y": 886
            },
            "p2": {
                "x": 1495,
                "y": 887
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1495,
                "y": 887
            },
            "p2": {
                "x": 1495,
                "y": 829
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1577,
                "y": 965
            },
            "p2": {
                "x": 1496,
                "y": 965
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1496,
                "y": 965
            },
            "p2": {
                "x": 1495,
                "y": 887
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1496,
                "y": 1004
            },
            "p2": {
                "x": 1496,
                "y": 965
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1540,
                "y": 886
            },
            "p2": {
                "x": 1628,
                "y": 796
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1628,
                "y": 796
            },
            "p2": {
                "x": 1608,
                "y": 765
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1608,
                "y": 765
            },
            "p2": {
                "x": 1571,
                "y": 751
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1571,
                "y": 751
            },
            "p2": {
                "x": 1533,
                "y": 705
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1533,
                "y": 705
            },
            "p2": {
                "x": 1536,
                "y": 689
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1536,
                "y": 689
            },
            "p2": {
                "x": 1493,
                "y": 659
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1493,
                "y": 659
            },
            "p2": {
                "x": 1486,
                "y": 617
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1486,
                "y": 617
            },
            "p2": {
                "x": 1509,
                "y": 571
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1509,
                "y": 571
            },
            "p2": {
                "x": 1502,
                "y": 558
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1502,
                "y": 558
            },
            "p2": {
                "x": 1474,
                "y": 552
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1474,
                "y": 552
            },
            "p2": {
                "x": 1455,
                "y": 521
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1455,
                "y": 521
            },
            "p2": {
                "x": 1429,
                "y": 509
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1429,
                "y": 509
            },
            "p2": {
                "x": 1420,
                "y": 482
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1420,
                "y": 482
            },
            "p2": {
                "x": 1422,
                "y": 468
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1422,
                "y": 468
            },
            "p2": {
                "x": 1420,
                "y": 456
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1420,
                "y": 456
            },
            "p2": {
                "x": 1389,
                "y": 456
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1389,
                "y": 456
            },
            "p2": {
                "x": 1377,
                "y": 445
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1377,
                "y": 445
            },
            "p2": {
                "x": 1332,
                "y": 440
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1332,
                "y": 440
            },
            "p2": {
                "x": 1308,
                "y": 409
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1308,
                "y": 409
            },
            "p2": {
                "x": 1306,
                "y": 381
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1306,
                "y": 381
            },
            "p2": {
                "x": 1271,
                "y": 306
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1271,
                "y": 306
            },
            "p2": {
                "x": 1247,
                "y": 293
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1247,
                "y": 293
            },
            "p2": {
                "x": 1230,
                "y": 278
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1230,
                "y": 278
            },
            "p2": {
                "x": 1191,
                "y": 284
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1191,
                "y": 284
            },
            "p2": {
                "x": 1177,
                "y": 279
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1177,
                "y": 279
            },
            "p2": {
                "x": 1147,
                "y": 291
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1147,
                "y": 291
            },
            "p2": {
                "x": 1140,
                "y": 324
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1140,
                "y": 324
            },
            "p2": {
                "x": 1105,
                "y": 358
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1105,
                "y": 358
            },
            "p2": {
                "x": 1064,
                "y": 371
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1064,
                "y": 371
            },
            "p2": {
                "x": 1040,
                "y": 365
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1496,
                "y": 1004
            },
            "p2": {
                "x": 1670,
                "y": 1006
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1670,
                "y": 1006
            },
            "p2": {
                "x": 1671,
                "y": 1062
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1671,
                "y": 1062
            },
            "p2": {
                "x": 1686,
                "y": 1061
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1686,
                "y": 1061
            },
            "p2": {
                "x": 1706,
                "y": 1029
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1706,
                "y": 1029
            },
            "p2": {
                "x": 1747,
                "y": 1003
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1747,
                "y": 1003
            },
            "p2": {
                "x": 1739,
                "y": 984
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1739,
                "y": 984
            },
            "p2": {
                "x": 1749,
                "y": 945
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1749,
                "y": 945
            },
            "p2": {
                "x": 1797,
                "y": 906
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1797,
                "y": 906
            },
            "p2": {
                "x": 1824,
                "y": 909
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1824,
                "y": 909
            },
            "p2": {
                "x": 1827,
                "y": 955
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1827,
                "y": 955
            },
            "p2": {
                "x": 1838,
                "y": 963
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1838,
                "y": 963
            },
            "p2": {
                "x": 1844,
                "y": 949
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1844,
                "y": 949
            },
            "p2": {
                "x": 1880,
                "y": 931
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1880,
                "y": 931
            },
            "p2": {
                "x": 1900,
                "y": 931
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1900,
                "y": 931
            },
            "p2": {
                "x": 1920,
                "y": 894
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1920,
                "y": 894
            },
            "p2": {
                "x": 1939,
                "y": 885
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1939,
                "y": 885
            },
            "p2": {
                "x": 1943,
                "y": 851
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1943,
                "y": 851
            },
            "p2": {
                "x": 1953,
                "y": 834
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1953,
                "y": 834
            },
            "p2": {
                "x": 1940,
                "y": 821
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1940,
                "y": 821
            },
            "p2": {
                "x": 1906,
                "y": 826
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1906,
                "y": 826
            },
            "p2": {
                "x": 1880,
                "y": 818
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1880,
                "y": 818
            },
            "p2": {
                "x": 1853,
                "y": 826
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1853,
                "y": 826
            },
            "p2": {
                "x": 1814,
                "y": 802
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1814,
                "y": 802
            },
            "p2": {
                "x": 1794,
                "y": 811
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1794,
                "y": 811
            },
            "p2": {
                "x": 1766,
                "y": 797
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1766,
                "y": 797
            },
            "p2": {
                "x": 1724,
                "y": 816
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1577,
                "y": 965
            },
            "p2": {
                "x": 1724,
                "y": 816
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1841,
                "y": 1308
            },
            "p2": {
                "x": 2077,
                "y": 1309
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1841,
                "y": 1308
            },
            "p2": {
                "x": 1840,
                "y": 1249
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1840,
                "y": 1190
            },
            "p2": {
                "x": 1840,
                "y": 1072
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1958,
                "y": 1071
            },
            "p2": {
                "x": 1840,
                "y": 1072
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1959,
                "y": 1129
            },
            "p2": {
                "x": 1958,
                "y": 1071
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2017,
                "y": 1129
            },
            "p2": {
                "x": 1959,
                "y": 1129
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2050,
                "y": 1128
            },
            "p2": {
                "x": 2075,
                "y": 1130
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2075,
                "y": 1130
            },
            "p2": {
                "x": 2077,
                "y": 1309
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2075,
                "y": 1130
            },
            "p2": {
                "x": 2075,
                "y": 1011
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1958,
                "y": 1012
            },
            "p2": {
                "x": 1958,
                "y": 1033
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2075,
                "y": 1011
            },
            "p2": {
                "x": 2050,
                "y": 1012
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2050,
                "y": 1012
            },
            "p2": {
                "x": 1958,
                "y": 1012
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2050,
                "y": 1012
            },
            "p2": {
                "x": 2045,
                "y": 946
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2102,
                "y": 1441
            },
            "p2": {
                "x": 2080,
                "y": 1543
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2080,
                "y": 1543
            },
            "p2": {
                "x": 1899,
                "y": 1543
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1899,
                "y": 1543
            },
            "p2": {
                "x": 1898,
                "y": 1605
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2083,
                "y": 1779
            },
            "p2": {
                "x": 2080,
                "y": 1661
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2080,
                "y": 1543
            },
            "p2": {
                "x": 2080,
                "y": 1661
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2021,
                "y": 1662
            },
            "p2": {
                "x": 2080,
                "y": 1661
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1897,
                "y": 1777
            },
            "p2": {
                "x": 1897,
                "y": 1664
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1855,
                "y": 1778
            },
            "p2": {
                "x": 1897,
                "y": 1777
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1848,
                "y": 1812
            },
            "p2": {
                "x": 1855,
                "y": 1778
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1849,
                "y": 1905
            },
            "p2": {
                "x": 1880,
                "y": 1934
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1880,
                "y": 1934
            },
            "p2": {
                "x": 1905,
                "y": 1936
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1905,
                "y": 1936
            },
            "p2": {
                "x": 1927,
                "y": 1962
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1958,
                "y": 1953
            },
            "p2": {
                "x": 1941,
                "y": 1964
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1927,
                "y": 1962
            },
            "p2": {
                "x": 1941,
                "y": 1964
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1982,
                "y": 1977
            },
            "p2": {
                "x": 1973,
                "y": 2011
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1958,
                "y": 2021
            },
            "p2": {
                "x": 1973,
                "y": 2011
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2005,
                "y": 2062
            },
            "p2": {
                "x": 1989,
                "y": 2072
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1959,
                "y": 2061
            },
            "p2": {
                "x": 1989,
                "y": 2072
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1071,
                "y": 2546
            },
            "p2": {
                "x": 1072,
                "y": 2557
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1071,
                "y": 2616
            },
            "p2": {
                "x": 1072,
                "y": 2557
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1249,
                "y": 2546
            },
            "p2": {
                "x": 1250,
                "y": 2559
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1249,
                "y": 2618
            },
            "p2": {
                "x": 1250,
                "y": 2559
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1246,
                "y": 2364
            },
            "p2": {
                "x": 1248,
                "y": 2482
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1249,
                "y": 2513
            },
            "p2": {
                "x": 1248,
                "y": 2482
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1071,
                "y": 2511
            },
            "p2": {
                "x": 1073,
                "y": 2480
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1072,
                "y": 2419
            },
            "p2": {
                "x": 1073,
                "y": 2480
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1121,
                "y": 2478
            },
            "p2": {
                "x": 1073,
                "y": 2480
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1121,
                "y": 2557
            },
            "p2": {
                "x": 1072,
                "y": 2557
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1200,
                "y": 2559
            },
            "p2": {
                "x": 1250,
                "y": 2559
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1200,
                "y": 2480
            },
            "p2": {
                "x": 1248,
                "y": 2482
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 533,
                "y": 664
            },
            "p2": {
                "x": 493,
                "y": 664
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 108,
                "y": 664
            },
            "p2": {
                "x": 437,
                "y": 665
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 493,
                "y": 664
            },
            "p2": {
                "x": 437,
                "y": 665
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 437,
                "y": 665
            },
            "p2": {
                "x": 433,
                "y": 680
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 481,
                "y": 727
            },
            "p2": {
                "x": 493,
                "y": 664
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 685,
                "y": 594
            },
            "p2": {
                "x": 527,
                "y": 594
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 313,
                "y": 592
            },
            "p2": {
                "x": 468,
                "y": 594
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 527,
                "y": 594
            },
            "p2": {
                "x": 468,
                "y": 594
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 527,
                "y": 594
            },
            "p2": {
                "x": 537,
                "y": 572
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 468,
                "y": 594
            },
            "p2": {
                "x": 468,
                "y": 561
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1695,
                "y": 1610
            },
            "p2": {
                "x": 1725,
                "y": 1649
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1725,
                "y": 1649
            },
            "p2": {
                "x": 1739,
                "y": 1645
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1739,
                "y": 1645
            },
            "p2": {
                "x": 1765,
                "y": 1623
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1765,
                "y": 1623
            },
            "p2": {
                "x": 1769,
                "y": 1599
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1769,
                "y": 1599
            },
            "p2": {
                "x": 1756,
                "y": 1563
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1756,
                "y": 1563
            },
            "p2": {
                "x": 1705,
                "y": 1584
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1705,
                "y": 1584
            },
            "p2": {
                "x": 1695,
                "y": 1610
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 396,
                "y": 1888
            },
            "p2": {
                "x": 384,
                "y": 1862
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 384,
                "y": 1862
            },
            "p2": {
                "x": 370,
                "y": 1859
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 370,
                "y": 1859
            },
            "p2": {
                "x": 361,
                "y": 1763
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 361,
                "y": 1763
            },
            "p2": {
                "x": 344,
                "y": 1755
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 324,
                "y": 1671
            },
            "p2": {
                "x": 328,
                "y": 1685
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 344,
                "y": 1755
            },
            "p2": {
                "x": 343,
                "y": 1687
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 328,
                "y": 1685
            },
            "p2": {
                "x": 343,
                "y": 1687
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 355,
                "y": 2269
            },
            "p2": {
                "x": 380,
                "y": 2262
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 380,
                "y": 2262
            },
            "p2": {
                "x": 427,
                "y": 2311
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 427,
                "y": 2311
            },
            "p2": {
                "x": 392,
                "y": 2303
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 392,
                "y": 2303
            },
            "p2": {
                "x": 371,
                "y": 2306
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 371,
                "y": 2306
            },
            "p2": {
                "x": 355,
                "y": 2269
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 857,
                "y": 214
            },
            "p2": {
                "x": 839,
                "y": 268
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 812,
                "y": 294
            },
            "p2": {
                "x": 839,
                "y": 268
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1049,
                "y": 144
            },
            "p2": {
                "x": 979,
                "y": 144
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 922,
                "y": 170
            },
            "p2": {
                "x": 979,
                "y": 144
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1086,
                "y": 255
            },
            "p2": {
                "x": 1055,
                "y": 202
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1049,
                "y": 144
            },
            "p2": {
                "x": 1055,
                "y": 202
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1124,
                "y": 221
            },
            "p2": {
                "x": 1115,
                "y": 246
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1086,
                "y": 255
            },
            "p2": {
                "x": 1115,
                "y": 246
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1352,
                "y": 302
            },
            "p2": {
                "x": 1326,
                "y": 286
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1322,
                "y": 254
            },
            "p2": {
                "x": 1326,
                "y": 286
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1390,
                "y": 375
            },
            "p2": {
                "x": 1362,
                "y": 342
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1352,
                "y": 302
            },
            "p2": {
                "x": 1362,
                "y": 342
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1515,
                "y": 367
            },
            "p2": {
                "x": 1550,
                "y": 388
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1630,
                "y": 372
            },
            "p2": {
                "x": 1580,
                "y": 369
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1550,
                "y": 388
            },
            "p2": {
                "x": 1580,
                "y": 369
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1630,
                "y": 372
            },
            "p2": {
                "x": 1646,
                "y": 350
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1690,
                "y": 307
            },
            "p2": {
                "x": 1682,
                "y": 341
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1646,
                "y": 350
            },
            "p2": {
                "x": 1682,
                "y": 341
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1630,
                "y": 192
            },
            "p2": {
                "x": 1676,
                "y": 196
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1741,
                "y": 262
            },
            "p2": {
                "x": 1745,
                "y": 241
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1741,
                "y": 262
            },
            "p2": {
                "x": 1715,
                "y": 277
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1690,
                "y": 307
            },
            "p2": {
                "x": 1715,
                "y": 277
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1676,
                "y": 196
            },
            "p2": {
                "x": 1710,
                "y": 228
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1745,
                "y": 241
            },
            "p2": {
                "x": 1710,
                "y": 228
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1960,
                "y": 379
            },
            "p2": {
                "x": 1969,
                "y": 418
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2022,
                "y": 482
            },
            "p2": {
                "x": 1969,
                "y": 418
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1938,
                "y": 492
            },
            "p2": {
                "x": 1926,
                "y": 438
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1960,
                "y": 379
            },
            "p2": {
                "x": 1926,
                "y": 438
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1865,
                "y": 648
            },
            "p2": {
                "x": 1866,
                "y": 596
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1938,
                "y": 492
            },
            "p2": {
                "x": 1902,
                "y": 583
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1866,
                "y": 596
            },
            "p2": {
                "x": 1902,
                "y": 583
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1891,
                "y": 718
            },
            "p2": {
                "x": 1886,
                "y": 679
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1865,
                "y": 648
            },
            "p2": {
                "x": 1886,
                "y": 679
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1891,
                "y": 718
            },
            "p2": {
                "x": 1926,
                "y": 749
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2012,
                "y": 764
            },
            "p2": {
                "x": 1948,
                "y": 732
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1926,
                "y": 749
            },
            "p2": {
                "x": 1948,
                "y": 732
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2034,
                "y": 834
            },
            "p2": {
                "x": 2020,
                "y": 860
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2020,
                "y": 860
            },
            "p2": {
                "x": 2026,
                "y": 887
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1997,
                "y": 956
            },
            "p2": {
                "x": 2000,
                "y": 927
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2026,
                "y": 887
            },
            "p2": {
                "x": 2000,
                "y": 927
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 2045,
                "y": 946
            },
            "p2": {
                "x": 2018,
                "y": 942
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1997,
                "y": 956
            },
            "p2": {
                "x": 2018,
                "y": 942
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 574,
                "y": 2488
            },
            "p2": {
                "x": 502,
                "y": 2490
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1261,
                "y": 205
            },
            "p2": {
                "x": 1322,
                "y": 254
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 222,
                "y": 905
            },
            "p2": {
                "x": 232,
                "y": 901
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 232,
                "y": 901
            },
            "p2": {
                "x": 242,
                "y": 904
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 242,
                "y": 904
            },
            "p2": {
                "x": 243,
                "y": 915
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 243,
                "y": 915
            },
            "p2": {
                "x": 251,
                "y": 922
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 251,
                "y": 922
            },
            "p2": {
                "x": 242,
                "y": 929
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 242,
                "y": 929
            },
            "p2": {
                "x": 224,
                "y": 918
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 224,
                "y": 918
            },
            "p2": {
                "x": 222,
                "y": 905
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1794,
                "y": 479
            },
            "p2": {
                "x": 1811,
                "y": 495
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1811,
                "y": 495
            },
            "p2": {
                "x": 1824,
                "y": 478
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1824,
                "y": 478
            },
            "p2": {
                "x": 1846,
                "y": 464
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1846,
                "y": 464
            },
            "p2": {
                "x": 1843,
                "y": 412
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1843,
                "y": 412
            },
            "p2": {
                "x": 1880,
                "y": 371
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1880,
                "y": 371
            },
            "p2": {
                "x": 1890,
                "y": 334
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1890,
                "y": 334
            },
            "p2": {
                "x": 1937,
                "y": 308
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1937,
                "y": 308
            },
            "p2": {
                "x": 1932,
                "y": 298
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1932,
                "y": 298
            },
            "p2": {
                "x": 1888,
                "y": 292
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1888,
                "y": 292
            },
            "p2": {
                "x": 1854,
                "y": 321
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1854,
                "y": 321
            },
            "p2": {
                "x": 1812,
                "y": 330
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1812,
                "y": 330
            },
            "p2": {
                "x": 1807,
                "y": 349
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1807,
                "y": 349
            },
            "p2": {
                "x": 1789,
                "y": 360
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1789,
                "y": 360
            },
            "p2": {
                "x": 1804,
                "y": 393
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1794,
                "y": 479
            },
            "p2": {
                "x": 1804,
                "y": 393
            },
            "type": "wall"
        },
        {
            "p1": {
                "x": 1840,
                "y": 1249
            },
            "p2": {
                "x": 1840,
                "y": 1190
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 2017,
                "y": 1129
            },
            "p2": {
                "x": 2050,
                "y": 1128
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 1958,
                "y": 1071
            },
            "p2": {
                "x": 1958,
                "y": 1033
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 2015,
                "y": 1779
            },
            "p2": {
                "x": 2050,
                "y": 1778
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 1897,
                "y": 1664
            },
            "p2": {
                "x": 1898,
                "y": 1605
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 1426,
                "y": 1780
            },
            "p2": {
                "x": 1458,
                "y": 1779
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 1249,
                "y": 2546
            },
            "p2": {
                "x": 1249,
                "y": 2513
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 1071,
                "y": 2546
            },
            "p2": {
                "x": 1071,
                "y": 2511
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 1096,
                "y": 1958
            },
            "p2": {
                "x": 1138,
                "y": 1958
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 1012,
                "y": 1757
            },
            "p2": {
                "x": 1013,
                "y": 1724
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 954,
                "y": 928
            },
            "p2": {
                "x": 954,
                "y": 896
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 657,
                "y": 928
            },
            "p2": {
                "x": 656,
                "y": 890
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 312,
                "y": 544
            },
            "p2": {
                "x": 238,
                "y": 543
            },
            "type": "door"
        },
        {
            "p1": {
                "x": 508,
                "y": 362
            },
            "p2": {
                "x": 541,
                "y": 361
            },
            "type": "door"
        }
    ],
    "text": {}
});

// CONCATENATED MODULE: ./src/main.js








class main_LightingApp {
    constructor () {
        this.slides = [];

        this.current_slide_index = 0;

        this.loadSlides();
        this.setEvents();
        this.showSlide();
    }

    loadSlides () {
        this.slides = [
            {
                title: 'welcome!',
                template: 'welcome',
            },
            {
                title: 'image drawing',
                template: 1,
                map: {
                    image: 'graph.png',
                    walls: graph,
                    stage: 'image',
                },
            },
            {
                title: 'layers',
                template: 'layers',
                // example: 'canvaslayer',
            },
            {
                title: 'layers example (bad)',
                example: 'canvaslayer_bad',
            },
            {
                title: 'layers example (good)',
                example: 'canvaslayer_good',
            },
            {
                title: 'walls',
                template: 'walls',
                map: {
                    image: 'graph.png',
                    walls: graph,
                    stage: 'wall',
                },
            },
            {
                title: 'preparing for lights',
                template: 3,
            },
            {
                title: 'adding light',
                template: 5,
                map: {
                    image: 'graph.png',
                    walls: graph,
                    stage: 'light_no_intersect',
                    fidelity: 90,
                },
            },
            {
                title: 'calculating light intersection',
                template: 6,
            },
            {
                title: 'drawing light intersection',
                template: 7,
                map: {
                    image: 'graph.png',
                    walls: graph,
                    stage: 'intersection_points',
                    fidelity: 90,
                },
            },
            {
                title: 'creating light polygon',
                template: 8,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    stage: 'light_poly_outline',
                    fidelity: 90,
                },
            },
            {
                title: 'adding shadow layer',
                template: 9,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    stage: 'shadow',
                    fidelity: 90,
                },
            },
            {
                title: 'increasing light fidelity (720)',
                template: 10,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    stage: 'shadow',
                },
            },
            {
                title: 'increasing light fidelity (1440)',
                template: 11,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    stage: 'shadow',
                    fidelity: 1440,
                },
            },
            {
                title: 'increasing light fidelity (2880)',
                template: 12,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    stage: 'shadow',
                    fidelity: 2880,
                },
            },
            {
                title: 'Removing debug drawing',
                template: 13,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    stage: 'shadow_no_debug',
                },
            },
            {
                title: 'adding shroud layer',
                template: 14,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                },
            },
            {
                title: 'limiting light distance',
                template: 15,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    stage: 'limited',
                    vision: {
                        bright: 150,
                        dim: 150,
                    }
                },
            },
            {
                title: 'adding falloff',
                template: 16,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    // no_debug: true,
                    vision: {
                        bright: 150,
                        dim: 450,
                    }
                },
            },
            {
                title: 'adding falloff (2880)',
                template: 17,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    // no_debug: true,
                    fidelity: 2880,
                    vision: {
                        bright: 150,
                        dim: 450,
                    }
                },
            },
            {
                title: 'adding falloff (360)',
                template: 18,
                map: {
                    image: 'graph.png',
                    walls: graph2,
                    // no_debug: true,
                    fidelity: 360,
                    vision: {
                        bright: 150,
                        dim: 450,
                    }
                },
            },
            {
                title: 'a real map',
                template: 19,
                map: {
                    // cache: true,
                    image: 'waveecho.jpg',
                    walls: waveecho,
                    no_debug: true,
                    vision: {
                        bright: 150,
                        dim: 450,
                    }
                },
            },
            {
                title: 'with cached light data',
                template: 20,
                map: {
                    cache: true,
                    image: 'waveecho.jpg',
                    walls: waveecho,
                    no_debug: true,
                    vision: {
                        bright: 150,
                        dim: 450,
                    }
                },
            },
            {
                title: 'additional improvements',
                template: 21,
            },
        ].map((slide_options) => {
            return {
                ...slide_options,
                ref: new slide(slide_options)
            };
        });
    }

    setEvents () {
        document.getElementById('slides_back').addEventListener('click', (e) => {
            this.showSlide(this.current_slide_index - 1);
        });

        document.getElementById('slides_forward').addEventListener('click', (e) => {
            this.showSlide(this.current_slide_index + 1);
        });
    }

    showSlide (index = 0) {
        if (index < 0) index = this.slides.length - 1;
        if (index >= this.slides.length) index = 0;

        this.slides[this.current_slide_index].ref.hide();
        this.current_slide_index = index;
        document.getElementById('slides_title').innerHTML = `${this.slides[this.current_slide_index].title} <span>(${this.current_slide_index + 1}/${this.slides.length})</span>`;
        this.slides[this.current_slide_index].ref.show();
    }
}

window.onload = () => {
    window.LightingApp = new main_LightingApp();
}


/***/ })
/******/ ]);