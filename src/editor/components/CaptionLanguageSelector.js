import { components, i18n } from 'wp';

const { TextControl } = components;
const { __ } = i18n;

export const CaptionLanguageSelector = ({
    attributes: { ccLangPref },
    setAttributes,
}) => (
    <TextControl
        label={__('Caption Language', 'ghwp')}
        value={ccLangPref}
        placeholder={'ex. "en", "en-GB", "de", "de-DE", "fr"...'}
        onChange={(ccLangPref) => {
            setAttributes({ ccLangPref });
        }}
    />
);
