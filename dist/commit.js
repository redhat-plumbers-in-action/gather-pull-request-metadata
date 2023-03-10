import { z } from 'zod';
// subset of Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number]
const commitDataSchema = z.object({
    sha: z.string(),
    html_url: z.string(),
    commit: z.object({
        message: z.string(),
    }),
});
export class Commit {
    constructor(data) {
        const parsedData = commitDataSchema.parse(data);
        this.sha = parsedData.sha;
        this.url = parsedData.html_url;
        this.message = {
            title: this.getTitle(parsedData.commit.message),
            body: parsedData.commit.message,
            cherryPick: this.getCherryPicks(parsedData.commit.message),
        };
    }
    /**
     * @returns Title of the commit message with max length of 70 characters + optional ` ...` suffix (4 extra characters)
     */
    getTitle(message) {
        const TitleSize = 70;
        const slicedMsg = message.split(/\n/, 1)[0].slice(0, TitleSize);
        return slicedMsg.length < TitleSize ? slicedMsg : `${slicedMsg} ...`;
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