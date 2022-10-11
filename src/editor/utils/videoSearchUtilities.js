/* global editorData */
import { data } from 'wp';

import { videoProviderUtils } from '@gebruederheitz/wp-editor-components';

const {
    getVimeoThumbnailUrlByVideoId,
    getVimeoVideoIdFromUrl,
    getYoutubeThumbnailUrlByVideoId,
    getYoutubeVideoIdFromUrl,
    isVimeoUrl,
    isYoutubeUrl,
    isNocookieYoutubeUrl,
} = videoProviderUtils;

const { dispatch } = data;

/**
 * @param videoId
 * @param props
 */
export const setYoutubeThumbnailUrl = (videoId, props) => {
    const { setAttributes } = props;

    setAttributes({
        providerThumbnailUrl: getYoutubeThumbnailUrlByVideoId(videoId),
    });
};

/**
 * @param videoId
 * @param props
 */
export const setVimeoThumbnailUrl = (videoId, props) => {
    const { setAttributes, setState } = props;

    setState({ isLoading: true });
    getVimeoThumbnailUrlByVideoId(videoId).then((mediaURL) => {
        if (mediaURL) {
            setAttributes({
                providerThumbnailUrl: mediaURL,
            });
        }
        setState({ isLoading: false });
    });
};

/**
 * @param videoUrl
 * @param props
 */
export const checkForThumbnailImage = (videoUrl, props) => {
    const {
        attributes: { mediaID },
        setState,
    } = props;

    if (!mediaID) {
        setState({ isLoading: true });
        if (isYoutubeUrl(videoUrl)) {
            const videoId = getYoutubeVideoIdFromUrl(videoUrl);
            setYoutubeThumbnailUrl(videoId, props);
            setState({ isLoading: false });
        } else if (isVimeoUrl(videoUrl)) {
            const videoId = getVimeoVideoIdFromUrl(videoUrl);
            setVimeoThumbnailUrl(videoId, props);
        } else {
            setState({ isLoading: false });
        }
    }
};

/**
 * @param videoUrl
 * @param props
 */
export const onVideoUrlChanged = (videoUrl, props) => {
    const { setAttributes, setState } = props;

    setState({ isLoading: true });

    if (isYoutubeUrl(videoUrl)) {
        const videoId = getYoutubeVideoIdFromUrl(videoUrl);
        setYoutubeThumbnailUrl(videoId, props);
    } else if (isVimeoUrl(videoUrl)) {
        const videoId = getVimeoVideoIdFromUrl(videoUrl);
        setVimeoThumbnailUrl(videoId, props);
    } else {
        dispatch('core/notices').createWarningNotice(
            'Could not identify video provider. This URL might not work as expected.',
            {
                id: 'videoIdentificationFailure',
                isDismissible: true,
            }
        );
    }

    setAttributes({
        videoUrl: videoUrl,
    });
    setState({ isLoading: false });
};

export function convertYoutubeToNoCookieDomain(videoUrl) {
    if (isYoutubeUrl(videoUrl) && !isNocookieYoutubeUrl(videoUrl)) {
        const regex = /([^w.]*)((www\.)?\.?youtube\.com)(.*)/;
        videoUrl = videoUrl.replace(regex, '$1www.youtube-nocookie.com$4');
    }

    return videoUrl;
}

export function sideloadProviderImage(props) {
    const {
        attributes: { providerThumbnailUrl },
        setAttributes,
        setState,
    } = props;

    setState({ isLoading: true });
    fetch(`${editorData.restCustomUrl}/sideload`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-WP-Nonce': editorData.restApiNonce || '',
        },
        body: JSON.stringify({
            imageUrl: providerThumbnailUrl,
        }),
    })
        .then((res) => res.json())
        .then((result) => {
            if (result.mediaId && result.mediaUrl) {
                setAttributes({
                    mediaID: result.mediaId,
                    mediaURL: result.mediaUrl,
                });
            } else {
                throw 'Image sideload failed. Please check the URL is valid and links directly to a proper image file and retry.';
            }
        })
        .catch((e) => {
            dispatch('core/notices').createWarningNotice(
                e.toUpperCase ? e : JSON.stringify(e),
                {
                    id: 'videoSideloadFailure',
                    isDismissible: true,
                }
            );
        })
        .then(() => {
            setState({ isLoading: false });
        });
}
