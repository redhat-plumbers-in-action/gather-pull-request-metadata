import { Commit } from './commit';
export class PullRequest {
    constructor(data) {
        this.number = data === null || data === void 0 ? void 0 : data.number;
        this.base = data === null || data === void 0 ? void 0 : data.base;
        this.ref = data === null || data === void 0 ? void 0 : data.ref;
        this.url = data === null || data === void 0 ? void 0 : data.url;
        this.labels = data === null || data === void 0 ? void 0 : data.labels;
        this.milestone = data === null || data === void 0 ? void 0 : data.milestone;
        this.commits = data === null || data === void 0 ? void 0 : data.commits;
    }
    getMetadata() {
        return {
            number: this.number,
            base: this.base,
            ref: this.base,
            url: this.url,
            labels: this.labels,
            milestone: this.milestone,
            commits: this.commits,
        };
    }
    static async getPullRequest(octokit, request) {
        var _a;
        const pull_request = (await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', request)).data;
        const commits = (await octokit.paginate('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', Object.assign({ per_page: 100 }, request))).map(commit => new Commit(commit));
        return new PullRequest({
            number: pull_request.number,
            base: pull_request.base.ref,
            ref: pull_request.head.sha,
            url: pull_request.html_url,
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