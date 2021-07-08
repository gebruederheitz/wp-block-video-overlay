import debounce from 'lodash-es/debounce';
import { blockEditor, components, i18n } from 'wp';

import { onVideoUrlChanged } from '../utils/videoSearchUtilities';

const { URLInput } = blockEditor;
const { BaseControl } = components;
const { __ } = i18n;

export const VideoSearch = (props) => {
    const { search, setState } = props;

    const onVideoUrlChangedDebounced = debounce(onVideoUrlChanged, 1000);

    return (
        <BaseControl className="editor-url-input block-editor-url-input is-full-width has-border">
            <URLInput
                label={__('Video URL', 'ghwp')}
                value={search}
                onChange={(videoUrl) => {
                    setState({ search: videoUrl });
                    onVideoUrlChangedDebounced(videoUrl, props);
                }}
            />
        </BaseControl>
    );
};
