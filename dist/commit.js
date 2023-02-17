export class Commit {
    constructor(data) {
        this.sha = data.sha;
        this.message = {
            title: this.getTitle(data.commit.message),
            body: data.commit.message,
            cherryPick: this.getCherryPicks(data.commit.message),
        };
    }
    getTitle(message) {
        const TitleSize = 70;
        const slicedMsg = message.split(/\n/, 1)[0].slice(0, TitleSize);
        return slicedMsg.length < TitleSize ? slicedMsg : `${slicedMsg}...`;
    }
    getCherryPicks(message) {
        const regexp = /\n\(cherry picked from commit (\b[0-9a-f]{5,40}\b)\) *\n?/g;
        const matches = [...message.matchAll(regexp)];
        return Array.isArray(matches)
            ? matches.map(match => {
                return { sha: match[1].toString() };
            })
            : [];
    }
}
//# sourceMappingURL=commit.js.map