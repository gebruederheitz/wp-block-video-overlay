import { blocks, i18n } from 'wp';

import { icons } from '@gebruederheitz/wp-editor-components';
import { attributes as defaultAttributes } from './attributes';
import { deprecated as defaultDeprecated } from './deprecated';
import { edit as defaultEdit } from './edit';
import { save as defaultSave } from './save';

const { registerBlockType } = blocks;
const { __ } = i18n;
const { QueuePlayNext: VideoOverlayIcon } = icons;

export function register(options = {}) {
    const {
        attributes = defaultAttributes,
        edit = defaultEdit,
        save = defaultSave,
        styles = [],
        deprecated = defaultDeprecated,
        icon = <VideoOverlayIcon />,
        category = 'layout',
        supports = {
            anchor: true,
        },
    } = options;

    registerBlockType('ghwp/video-overlay', {
        title: __('Video Thumbnail & Overlay', 'ghwp'),
        icon,
        description: __(
            'A video thumbnail with a play button opening a video overlay',
            'ghwp'
        ),
        styles,
        category,
        attributes,
        supports,
        edit,
        save,
        deprecated,
    });
}

export {
    defaultAttributes as attributes,
    defaultEdit as edit,
    defaultSave as save,
};
