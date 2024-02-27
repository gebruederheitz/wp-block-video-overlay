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

/**
 * @propery {DebugHelper} debug
 */
export class LightboxFactory {
    constructor(plyrOptions = {}) {
        this.plyrOptions =
            plyrOptions === false
                ? null
                : _merge(defaultPlyrOptions, plyrOptions);
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
     * Creates a lightbox for every image link and video.
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
     * @param {string} selector
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

    /**
     * Initializes a single lightbox / modal.
     *
     * @param {HTMLElement} element
     * @return {GLightbox}
     */
    createFromElement(element) {
        let lb;

        if (this.plyrOptions) {
            const options = { ...this.plyrOptions };
            const hrefUrl = element.href ? new URL(element.href) : null;

            if (hrefUrl && hrefUrl.searchParams.has('cc_lang_pref')) {
                const language = hrefUrl.searchParams.get('cc_lang_pref');
                options.config.captions = {
                    active: true,
                    language,
                };
            }

            lb = new GLightbox({
                elements: [element],
                plyr: options,
            });
        } else {
            lb = new GLightbox({ elements: [element] });
        }

        element.addEventListener('click', (e) => {
            e.preventDefault();
            lb.open();
        });

        return lb;
    }

    /**
     * Allows you to pass your own options object to the GLightbox constructor.
     *
     * @param {object} options The GLightbox constructor argument
     * @return {GLightbox}
     */
    custom(options) {
        if (this.plyrOptions) {
            options.plyr = {
                ...this.plyrOptions,
                ...options.plyr,
            };
        }

        return new GLightbox(options);
    }
}
