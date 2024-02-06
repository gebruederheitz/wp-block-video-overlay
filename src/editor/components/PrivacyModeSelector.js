import { components } from 'wp';

const { ToggleControl } = components;

export const PrivacyModeSelector = ({
    attributes: { usePrivacyMode },
    setAttributes,
}) => (
    <ToggleControl
        label={'Use Youtube privacy mode (nocookie)'}
        checked={usePrivacyMode}
        onChange={(usePrivacyMode) => {
            setAttributes({ usePrivacyMode });
        }}
    />
);
