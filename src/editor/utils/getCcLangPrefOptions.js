/* global editorData */
export function getCcLangPrefOptions() {
    if (editorData && editorData.ccLangPrefs) {
        const options = Object.keys(editorData.ccLangPrefs).map(
            (ccLangPref) => {
                return {
                    label:
                        editorData.ccLangPrefs[ccLangPref].displayName ||
                        ccLangPref,
                    value: ccLangPref,
                };
            }
        );
        options.unshift({ label: 'None', value: '' });

        return options;
    } else {
        return null;
    }
}
