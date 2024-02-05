/* global editorData */
export function getCcLangPrefOptions() {
    if (editorData && editorData.ccLangPrefs) {
        return Object.keys(editorData.ccLangPrefs).map((ccLangPref) => {
            return {
                label:
                    editorData.ccLangPrefs[ccLangPref].displayName ||
                    ccLangPref,
                value: ccLangPref,
            };
        });
    } else {
        return null;
    }
}
