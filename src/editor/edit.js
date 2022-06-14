import { components, compose as wpCompose, i18n } from 'wp';
import classnames from 'classnames';

import {
    checkForThumbnailImage,
    sideloadProviderImage,
} from './utils/videoSearchUtilities';
import { getEmbedTypeOptions } from './utils/getEmbedTypeOptions';

import { PlayCircle as PlayIcon } from './components/PlayCircle';
import {
    ImageSelect,
    SpinnerOverlay,
} from '@gebruederheitz/wp-editor-components';
import { VideoSearch } from './components/VideoSearch';
import { getVideoEmbed } from '@gebruederheitz/wp-editor-components/utils/video-provider-utilities';

const {
    BaseControl,
    Button,
    ButtonGroup,
    Icon,
    Placeholder,
    Popover,
    SelectControl,
} = components;
const { withState } = wpCompose;
const { __ } = i18n;

const helpPopoverH6Style = {
    textTransform: 'none',
    marginBottom: '0.5em',
    fontSize: '1rem',
    marginTop: 0,
};

const HelpPopoverContent = () => (
    <div
        className="ghwp-editor-help"
        style={{ padding: '0.75rem 1.5rem', minWidth: '320px' }}
    >
        <ul style={{ listStyle: 'disc' }}>
            <li>
                <h6 style={helpPopoverH6Style}>
                    {__('Retry getting original thumbnail', 'ghwp')} /{' '}
                    {__('Try to get the original thumbnail', 'ghwp')}
                </h6>
                <p>
                    Attempts to retrieve the thumbnail image from the Video
                    provider (Youtube / Vimeo). You will see a preview of that
                    image above the button.
                </p>
            </li>
            <li>
                <h6 style={helpPopoverH6Style}>
                    {__('Sideload the provider image', 'ghwp')}
                </h6>
                <p>
                    Will save the thumbnail retrieved from the video provider to
                    the local media library and set it as the video block&apos;s
                    thumbnail image.
                </p>
            </li>
            <li>
                <h6 style={helpPopoverH6Style}>
                    {__('Change thumbnail image', 'ghwp')}
                </h6>
                <p>
                    Allows you to pick an existing image or upload an image to
                    use as the thumbnail picture for the video block.
                </p>
            </li>
        </ul>
    </div>
);

const VideoEditSettings = (props) => {
    const {
        attributes: { providerThumbnailUrl, videoUrl },
        helpVisible,
        isSelected,
        setState,
    } = props;

    return (
        <div
            className={classnames('ghwp-video-edit__settings', {
                'ghwp-video-edit__settings--active': isSelected,
            })}
        >
            {isSelected && (
                <>
                    {providerThumbnailUrl && (
                        <img
                            width="120"
                            height="auto"
                            src={providerThumbnailUrl}
                            alt="Provider Thumbnail"
                            className="ghwp-video-edit__provider-thumb"
                        />
                    )}
                    <Button
                        isPrimary
                        onClick={() => {
                            videoUrl && checkForThumbnailImage(videoUrl, props);
                        }}
                    >
                        {__(
                            providerThumbnailUrl
                                ? 'Retry getting original thumbnail'
                                : 'Try to get the original thumbnail',
                            'ghwp'
                        )}
                    </Button>
                    {providerThumbnailUrl && (
                        <>
                            <Button
                                isPrimary
                                onClick={() => sideloadProviderImage(props)}
                            >
                                {__('Sideload the provider image', 'ghwp')}
                            </Button>
                        </>
                    )}
                    <ImageSelect
                        buttonLabel="Select thumbnail"
                        buttonChangeLabel="Change thumbnail image"
                        {...props}
                    />
                    <span className="help">
                        <Button
                            isSecondary
                            onClick={() => {
                                setState({ helpVisible: true });
                            }}
                        >
                            <Icon icon="editor-help" />
                        </Button>
                        {helpVisible && (
                            <Popover
                                onClose={() => {
                                    setState({ helpVisible: false });
                                }}
                            >
                                <HelpPopoverContent />
                            </Popover>
                        )}
                    </span>
                </>
            )}
        </div>
    );
};

const TypeSelector = ({ attributes: { type, videoUrl }, setAttributes }) => (
    <BaseControl label={'Type'}>
        <ButtonGroup>
            <Button
                isPrimary
                isPressed={type === 'overlay'}
                onClick={() => {
                    setAttributes({
                        type: 'overlay',
                    });
                }}
            >
                Overlay
            </Button>
            <Button
                isPrimary
                isPressed={type === 'inline'}
                onClick={() => {
                    setAttributes({
                        type: 'inline',
                        videoEmbedUrl: getVideoEmbed(videoUrl),
                    });
                }}
            >
                Inline
            </Button>
        </ButtonGroup>
    </BaseControl>
);

const Edit = (props) => {
    const {
        attributes: { mediaAltText, mediaURL, providerType, videoUrl },
        children,
        isLoading,
        isSelected,
        search,
        setAttributes,
        setState,
    } = props;

    if (!search && videoUrl) {
        setState({ search: videoUrl });
    }

    const embedTypeOptions = getEmbedTypeOptions();

    return (
        <>
            <div className="ghwp-video-edit">
                {isLoading && <SpinnerOverlay />}
                {videoUrl ? (
                    <>
                        <div className="ghwp-video">
                            <div className="ghwp-video-link">
                                <img
                                    width="480"
                                    height="270"
                                    src={mediaURL}
                                    alt={mediaAltText}
                                />
                                <PlayIcon />
                            </div>
                        </div>
                        <VideoEditSettings {...props} />
                        <div
                            className={classnames('ghwp-video-edit__search', {
                                'ghwp-video-edit__search--active': isSelected,
                            })}
                        >
                            {isSelected && (
                                <>
                                    <VideoSearch {...props} />
                                    {embedTypeOptions && (
                                        <SelectControl
                                            label={__('Consent Typ')}
                                            value={providerType}
                                            options={embedTypeOptions}
                                            onChange={(providerType) => {
                                                setAttributes({ providerType });
                                            }}
                                        />
                                    )}
                                    <TypeSelector {...props} />
                                    {children}
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <Placeholder>
                        <VideoSearch {...props} />
                        {embedTypeOptions && (
                            <SelectControl
                                label={__('Consent Typ')}
                                value={providerType}
                                options={embedTypeOptions}
                                onChange={(providerType) => {
                                    setAttributes({ providerType });
                                }}
                            />
                        )}
                    </Placeholder>
                )}
            </div>
        </>
    );
};

export const edit = withState({
    search: '',
    isLoading: false,
    helpVisible: false,
})(Edit);
