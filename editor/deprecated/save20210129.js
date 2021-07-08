import classnames from 'classnames';
import { PlayCircle as PlayIcon } from '../components/PlayCircle';

export default function (props) {
    const {
        attributes: { mediaAltText, mediaID, mediaURL, videoUrl },
    } = props;

    return (
        <div className="ghwp-video">
            <a className="ghwp-video-link" href={videoUrl}>
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
}
