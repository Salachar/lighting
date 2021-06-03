import { sqr } from './lib/helpers';

import Slide from './slide/slide.js';

import walls_graph from '../assets/graph';
import walls_graph2 from '../assets/graph2';
import wavescho_walls from '../assets/waveecho';

class LightingApp {
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
                    walls: walls_graph,
                    stage: 'image',
                },
            },
            {
                title: 'canvas layers',
                template: 4,
            },
            {
                title: 'adding walls',
                template: 2,
                map: {
                    image: 'graph.png',
                    walls: walls_graph,
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
                    walls: walls_graph,
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
                    walls: walls_graph,
                    stage: 'intersection_points',
                    fidelity: 90,
                },
            },
            {
                title: 'creating light polygon',
                template: 8,
                map: {
                    image: 'graph.png',
                    walls: walls_graph2,
                    stage: 'light_poly_outline',
                    fidelity: 90,
                },
            },
            {
                title: 'adding shadow layer',
                template: 9,
                map: {
                    image: 'graph.png',
                    walls: walls_graph2,
                    stage: 'shadow',
                    fidelity: 90,
                },
            },
            {
                title: 'increasing light fidelity (720)',
                template: 10,
                map: {
                    image: 'graph.png',
                    walls: walls_graph2,
                    stage: 'shadow',
                },
            },
            {
                title: 'increasing light fidelity (1440)',
                template: 11,
                map: {
                    image: 'graph.png',
                    walls: walls_graph2,
                    stage: 'shadow',
                    fidelity: 1440,
                },
            },
            {
                title: 'increasing light fidelity (2880)',
                template: 12,
                map: {
                    image: 'graph.png',
                    walls: walls_graph2,
                    stage: 'shadow',
                    fidelity: 2880,
                },
            },
            {
                title: 'Removing debug drawing',
                template: 13,
                map: {
                    image: 'graph.png',
                    walls: walls_graph2,
                    stage: 'shadow_no_debug',
                },
            },
            {
                title: 'adding shroud layer',
                template: 14,
                map: {
                    image: 'graph.png',
                    walls: walls_graph2,
                },
            },
            {
                title: 'limiting light distance',
                template: 15,
                map: {
                    image: 'graph.png',
                    walls: walls_graph2,
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
                    walls: walls_graph2,
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
                    walls: walls_graph2,
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
                    walls: walls_graph2,
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
                    walls: wavescho_walls,
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
                    walls: wavescho_walls,
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
                ref: new Slide(slide_options)
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
    window.LightingApp = new LightingApp();
}
