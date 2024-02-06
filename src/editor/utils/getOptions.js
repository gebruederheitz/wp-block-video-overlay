/* global editorData */
export function getCcLangPrefOptions() {
    if (editorData?.ccLangPrefs) {
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

export function getEmbedTypeOptions() {
    if (editorData?.embedTypes) {
        return Object.keys(editorData.embedTypes).map((embedType) => {
            return {
                label:
                    editorData.embedTypes[embedType].displayName || embedType,
                value: embedType,
            };
        });
    } else {
        return null;
    }
}

/**
 * @returns {boolean}
 */
export function showPrivacyModeOption() {
    return editorData?.usePrivacyMode === 'true';
}
