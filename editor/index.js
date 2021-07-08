import { blocks, i18n } from 'wp';

import { QueuePlayNext as VideoOverlayIcon } from '@gebruederheitz/wp-editor-components/icons/material-design-icons';
import { attributes } from './attributes';
import { deprecated } from './deprecated';
import { edit } from './edit';
import { save } from './save';

const { registerBlockType } = blocks;
const { __ } = i18n;

export function register({
    attributes = attributes,
    edit = edit,
    save = save,
    styles = [],
    deprecated = deprecated,
    icon = <VideoOverlayIcon />,
    category = 'layout',
    supports = {
        anchor: true,
    },
}) {
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

export { attributes, edit, save };
