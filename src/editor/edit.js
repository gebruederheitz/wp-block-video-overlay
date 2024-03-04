import { components, compose as wpCompose, i18n } from 'wp';
import classnames from 'classnames';

import {
    checkForThumbnailImage,
    sideloadProviderImage,
} from './utils/videoSearchUtilities';

import { PlayCircle as PlayIcon } from './components/PlayCircle';
import {
    ImageSelect,
    SpinnerOverlay,
} from '@gebruederheitz/wp-editor-components';
import {
    getCcLangPrefOptions,
    getEmbedTypeOptions,
    showPrivacyModeOption,
} from './utils/getOptions';

import { VideoSearch } from './components/VideoSearch';
import { HelpPopoverContent } from './components/HelpPopoverContent';
import { TypeSelector } from './components/TypeSelector';
import { LazyLoadSelector } from './components/LazyLoadSelector';
import { CaptionLanguageSelector } from './components/CaptionLanguageSelector';
import { PrivacyModeSelector } from './components/PrivacyModeSelector';

const { Button, Icon, Placeholder, Popover, SelectControl } = components;
const { withState } = wpCompose;
const { __ } = i18n;

const VideoThumbnailSettings = (props) => {
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
    const ccSelectEnabled = getCcLangPrefOptions();

    return (
        <>
            <div className="ghwp-video-edit">
                {isLoading && <SpinnerOverlay />}
                {videoUrl ? (
                    <>
                        {isSelected && <VideoSearch {...props} />}
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
                        <VideoThumbnailSettings {...props} />
                        <div
                            className={classnames('ghwp-video-edit__search', {
                                'ghwp-video-edit__search--active': isSelected,
                            })}
                        >
                            {isSelected && (
                                <>
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
                                    {ccSelectEnabled && (
                                        <CaptionLanguageSelector {...props} />
                                    )}
                                    <LazyLoadSelector {...props} />
                                    {showPrivacyModeOption() && (
                                        <PrivacyModeSelector {...props} />
                                    )}
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
