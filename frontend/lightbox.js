/**
 * Open links to (larger) images in modal overlay/lightbox
 */

import GLightbox from 'glightbox/src/js/glightbox';
import _merge from 'lodash-es/merge';

const defaultPlyrOptions = {
    js: null,
    css: null,
    config: {
        iconUrl: null,
    },
};

export class LightboxFactory {
    constructor(plyrOptions) {
        this.plyrOptions = _merge(defaultPlyrOptions, plyrOptions);
    }

    images() {
        const selector =
            'a[href$=".gif"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"]';
        const hasImageLinks = document.querySelectorAll(selector);

        if (hasImageLinks.length > 0) {
            this.create(selector);
        }
    }

    videos() {
        const selector = '.ghwp-video a';
        const hasVideos = document.querySelectorAll(selector);

        if (hasVideos.length) {
            this.create(selector);
        }
    }

    /**
     * Creates a lightbox for every image link.
     */
    all(selector) {
        this.images();
        this.videos();

        if (selector && document.querySelectorAll(selector).length) {
            this.create(selector);
        }
    }

    /**
     * Initializes a single lightbox / modal.
     *
     * @param selector
     * @return {GLightbox}
     */
    create(selector) {
        if (this.plyrOptions) {
            return new GLightbox({
                selector,
                plyr: this.plyrOptions,
            });
        } else {
            return new GLightbox({ selector });
        }
    }
}
