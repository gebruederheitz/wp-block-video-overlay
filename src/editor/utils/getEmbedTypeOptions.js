/* global editorData */
export function getEmbedTypeOptions() {
    if (editorData && editorData.embedTypes) {
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
