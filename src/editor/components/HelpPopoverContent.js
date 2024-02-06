import { i18n } from 'wp';
const { __ } = i18n;

const helpPopoverH6Style = {
    textTransform: 'none',
    marginBottom: '0.5em',
    fontSize: '1rem',
    marginTop: 0,
};

export const HelpPopoverContent = () => (
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
