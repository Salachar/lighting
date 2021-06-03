export function percentage () {
    return Math.floor(Math.random() * (100 - 1) + 1);
};

export function randomFromList (list) {
    let list_index = Math.floor(Math.random() * list.length);
    return list[list_index];
};

export function copy (object) {
    if (!object) return null;
    return JSON.parse(JSON.stringify(object));
};

export function copyPoint (point_to_copy) {
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

export function pointMatch (p1, p2, tolerance) {
    tolerance = tolerance || 0;
    return (Math.abs(p1.x - p2.x) <= tolerance && Math.abs(p1.y - p2.y) <= tolerance);
};

export function getWindowDimensions () {
    CONFIG.window_width = window.innerWidth;
    CONFIG.window_height = window.innerHeight;
};

export function randomRGBA (alpha) {
    alpha = (typeof alpha === 'number') ? alpha : 1;
    const r = Math.floor(Math.random() * 255 + 1);
    const g = Math.floor(Math.random() * 255 + 1);
    const b = Math.floor(Math.random() * 255 + 1);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
};

export function rgba (r,g,b,a) {
    a = (a || a === 0) ? a : 1;
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

export function rgb (r,g,b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

export function sqr (value) {
    return value * value;
};

export function pDistance (point, item, opts = {}) {
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

export function distanceToLine (point, item) {
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

export function getDotProduct (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};

export function getMagnitude (v) {
    return Math.sqrt(Helpers.sqr(v.x) + Helpers.sqr(v.y));
};

export function getAngleBetweenVectors (v1, v2) {
    // cos(angle) = dot(v1, v2) / (mag(v1) * mag(v2))
    const dot = Helpers.getDotProduct(v1, v2);
    const v1_mag = Helpers.getMagnitude(v1);
    const v2_mag = Helpers.getMagnitude(v2);
    const cos_angle = dot / (v1_mag * v2_mag);
    const angle = Math.acos(cos_angle);
    return angle;
};

export function getNormal (segment, reference_point) {
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

export function getSlope (p1, p2) {
    return (p2.y - p1.y) / (p2.x - p1.x);
};

export function getUnitVector (segment) {
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

export function getPerpendicularUnitVector (segment) {
    let unit_vector = Helpers.getUnitVector(segment);
    let perp = {
        x: unit_vector.y,
        y: unit_vector.x * -1
    }
    return perp;
};

export function getSegmentMiddle (segment) {
    return {
        x: segment.p1.x + ((segment.p2.x - segment.p1.x) * 0.5),
        y: segment.p1.y + ((segment.p2.y - segment.p1.y) * 0.5)
    };
};
