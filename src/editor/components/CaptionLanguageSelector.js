import { components, i18n } from 'wp';

const { SelectControl } = components;
const { __ } = i18n;

export const CaptionLanguageSelector = ({
    options,
    attributes: { ccLangPref },
    setAttributes,
}) => (
    <SelectControl
        label={__('Caption Language', 'ghwp')}
        value={ccLangPref}
        options={options}
        onChange={(ccLangPref) => {
            setAttributes({ ccLangPref });
        }}
    />
);
