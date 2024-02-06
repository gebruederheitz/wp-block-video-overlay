import { components } from 'wp';

const { ToggleControl } = components;

export const LazyLoadSelector = ({
    attributes: { lazyLoadPreviewImage },
    setAttributes,
}) => (
    <ToggleControl
        label={'LazyLoad preview image'}
        checked={lazyLoadPreviewImage}
        onChange={(lazyLoadPreviewImage) => {
            setAttributes({ lazyLoadPreviewImage });
        }}
    />
);
