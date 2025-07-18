import { warning } from '@actions/core';
export function escape(str) {
    return str.replace(/\|/g, '\\|');
}
export function getMetadataFromMessage(message) {
    const regexp = new RegExp(`^<!-- (\\S+) = (.*) -->$`, 'gm');
    let result = [];
    const match = [...message.matchAll(regexp)];
    match.forEach(item => {
        if (item && Array.isArray(item) && item.length > 2) {
            try {
                const data = JSON.parse(item[2]);
                result.push({ [item[1]]: data });
            }
            catch (e) {
                warning(`Error parsing metadata from message: ${e}`);
            }
        }
    });
    return result;
}
//# sourceMappingURL=util.js.map