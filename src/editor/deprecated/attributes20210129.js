export default {
    mediaURL: {
        type: 'string',
        default: null,
        selector: 'img',
        attribute: 'src',
    },
    mediaID: {
        type: 'number',
    },
    mediaAltText: {
        type: 'string',
    },
    videoUrl: {
        type: 'string',
        selector: 'a',
        attribute: 'href',
    },
    videoUrlInput: {
        type: 'string',
    },
};
