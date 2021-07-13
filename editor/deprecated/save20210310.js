import classnames from 'classnames';

import { PlayCircle as PlayIcon } from '../components/PlayCircle';
import { convertYoutubeToNoCookieDomain } from '../utils/videoSearchUtilities';
import { videoProviderUtils } from '@gebruederheitz/wp-editor-components';

export default (props) => {
    const {
        attributes: { mediaAltText, mediaID, mediaURL, videoUrl },
    } = props;

    const isYoutube = videoProviderUtils.isYoutubeUrl(videoUrl);

    return (
        <div className="ghwp-video">
            <a
                className="ghwp-video-link"
                data-ghwp-src={
                    isYoutube
                        ? convertYoutubeToNoCookieDomain(videoUrl)
                        : videoUrl
                }
            >
                <img
                    width="480"
                    height="270"
                    src={mediaURL}
                    alt={mediaAltText}
                    className={classnames('ghwp-video__thumb', {
                        [`wp-image-${mediaID}`]: mediaID,
                    })}
                />
                <PlayIcon />
            </a>
        </div>
    );
};
