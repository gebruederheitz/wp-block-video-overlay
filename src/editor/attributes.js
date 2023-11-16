export const attributes = {
    mediaURL: {
        type: 'string',
        default: null,
    },
    mediaID: {
        type: 'number',
    },
    mediaAltText: {
        type: 'string',
    },
    videoUrl: {
        type: 'string',
    },
    videoUrlInput: {
        type: 'string',
    },
    providerThumbnailUrl: {
        type: 'string',
    },
    providerType: {
        type: 'string',
        default: 'youtube',
    },
    type: {
        type: 'string',
        default: 'overlay',
    },
    videoEmbedUrl: {
        type: 'string',
        default: '',
    },
    ccLangPref: {
        type: 'string',
        default: '',
    }
};
