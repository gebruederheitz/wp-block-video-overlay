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
    videoId: {
        type: 'string',
        default: '',
    },
    videoProvider: {
        type: 'string',
        default: '',
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
    lazyLoadPreviewImage: {
        type: 'boolean',
        default: true,
    },
    ccLangPref: {
        type: 'string',
        default: '',
    },
    usePrivacyMode: {
        type: 'boolean',
        default: false,
    },
};
