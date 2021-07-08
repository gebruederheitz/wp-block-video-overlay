import save20210129 from './save20210129';
import attributes20210129 from './attributes20210129';
import save20210310 from './save20210310';
import attributes20210310 from './attributes20210310';

export const deprecated = [
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
