import { components } from 'wp';
import { getVideoEmbed } from '@gebruederheitz/wp-editor-components/utils/video-provider-utilities';

const { BaseControl, Button, ButtonGroup } = components;

export const TypeSelector = ({
    attributes: { type, videoUrl },
    setAttributes,
}) => (
    <BaseControl label={'Type'} className="ghwp-video-edit__type-select-field">
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
