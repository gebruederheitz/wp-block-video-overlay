import { attributes as attributes20240205 } from './attributes20240205';
import save20210129 from './save20210129';
import attributes20210129 from './attributes20210129';
import save20210310 from './save20210310';
import attributes20210310 from './attributes20210310';

import { videoProviderUtils } from '@gebruederheitz/wp-editor-components';

const {
    getVimeoVideoIdFromUrl,
    getYoutubeVideoIdFromUrl,
    isVimeoUrl,
    isYoutubeUrl,
} = videoProviderUtils;

export const deprecated = [
    /* 
        2024-02-05: Store video IDs in attributes to hand URL generation control 
                    to backend 
    */
    {
        save: () => null,
        attributes: attributes20240205,
        migrate(attributes) {
            let videoId = '';
            let videoProvider = '';

            if (isYoutubeUrl(attributes.videoUrl)) {
                videoId = getYoutubeVideoIdFromUrl(attributes.videoUrl);
                videoProvider = 'youtube';
            } else if (isVimeoUrl(attributes.videoUrl)) {
                videoId = getVimeoVideoIdFromUrl(attributes.videoUrl);
                videoProvider = 'vimeo';
            }

            return {
                ...attributes,
                videoId,
                videoProvider,
            };
        },
    },
    /* 2021-03-10: PHP-rendering and UC third-party consent / GDPR */
    {
        save: save20210310,
        attributes: attributes20210310,
    },
    /* 2021-01-29: nocookie-domains for youtube */
    {
        save: save20210129,
        attributes20210129: attributes20210129,
        migrate(attributes) {
            return attributes;
        },
    },
];
