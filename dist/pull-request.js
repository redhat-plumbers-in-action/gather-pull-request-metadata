import { Commit } from './commit';
export class PullRequest {
    constructor(data) {
        this.number = data === null || data === void 0 ? void 0 : data.number;
        this.labels = data === null || data === void 0 ? void 0 : data.labels;
        this.milestone = data === null || data === void 0 ? void 0 : data.milestone;
        this.commits = data === null || data === void 0 ? void 0 : data.commits;
    }
    getMetadata() {
        return {
            number: this.number,
            labels: this.labels,
            milestone: this.milestone,
            commits: this.commits,
        };
    }
    static async getPullRequest(octokit, request) {
        var _a;
        const pull_request = (await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', request)).data;
        const commits = (await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', request)).data.map(commit => new Commit(commit));
        return new PullRequest({
            number: pull_request.number,
            labels: pull_request.labels.map(label => {
                return {
                    id: label.id,
                    name: label.name,
                    description: label.description,
                };
            }),
            milestone: { title: (_a = pull_request.milestone) === null || _a === void 0 ? void 0 : _a.title },
            commits,
        });
    }
}
//# sourceMappingURL=pull-request.js.map