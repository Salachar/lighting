import {
    pDistance,
    pointMatch,
    sqr
} from '../../lib/helpers';

class SegmentManager {
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

export default SegmentManager;
