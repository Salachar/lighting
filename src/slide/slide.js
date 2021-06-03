import Map from './map/map';

class Slide {
    constructor (opts = {}) {
        const { map } = opts;
        this.render(opts);

        if (map) {
            this.map = new Map({
                config: map,
                container: this.el_slide_example,
            });
        }
    }

    show () {
        this.el_slide.classList.remove('hidden');
    }

    hide () {
        this.el_slide.classList.add('hidden');
    }

    render (opts) {
        const parent_node = document.getElementById('slides');

        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (!opts.map) slide.classList.add('no_example');
        slide.classList.add('hidden');
        this.el_slide = slide;

        const slide_information = document.createElement('div');
        slide_information.classList.add('slide_information');

        if (opts.template) {
            const template = document.getElementById(opts.template);
            const clone = template.content.cloneNode(true);
            slide_information.appendChild(clone);
        }

        slide.appendChild(slide_information);
        this.el_slide_information = slide_information;

        if (opts.map) {
            const slide_example = document.createElement('div');
            slide_example.classList.add('slide_example');
            slide.appendChild(slide_example);
            this.el_slide_example = slide_example;
        }

        parent_node.appendChild(slide);
    }
}

export default Slide;
