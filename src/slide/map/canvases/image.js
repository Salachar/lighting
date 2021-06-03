import Base from './base';

const MAX_MAP_SIZE = 3000;

// const MAP_IMAGe = ''

class ImageCanvas extends Base {
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

export default ImageCanvas;
