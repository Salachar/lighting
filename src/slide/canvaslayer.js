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

export default CanvasLayer;
