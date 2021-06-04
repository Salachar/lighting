class CanvasLayer {
    constructor (opts = {}) {
        const { example, container } = opts;
        this.example = (example === 'canvaslayer_bad') ? 'bad' : 'good';
        this.container = container;

        this.render();

        this.timer = null;

        this.vel = 1;
        this.pos = 0;
    }

    show () {
        this.img = new Image;
        this.img.onload = () => {
            this.width = this.container.clientWidth;
            this.height = this.container.clientHeight;

            this.resize(this.canvas_lone);
            this.resize(this.canvas_bot);
            this.resize(this.canvas_top);
            if (this.example === 'good') {
                this.context_bot.drawImage(this.img, 0, 0, this.width, this.height);
            }

            this.start();
        }
        this.img.src = './assets/4k.jpg';
    }

    hide () {
        clearInterval(this.timer);
        this.timer = null;
    }

    start () {
        this.timer = setInterval(() => {
            this.update();
        }, 0);
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
            this.context_lone.drawImage(this.img, 0, 0, this.width, this.height);
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
        context.beginPath();
        context.rect(this.pos, (this.height / 2) - 50, 100, 100);
        context.fillStyle = '#FFFFFF';
        context.fill();
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

export default CanvasLayer;
