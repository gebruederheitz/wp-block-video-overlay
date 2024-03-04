/* global editorData */
export function getCcLangPrefOptions() {
    if (editorData?.ccLangPrefs) {
        return true;
    } else {
        return false;
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
