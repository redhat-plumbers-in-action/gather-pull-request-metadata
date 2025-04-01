import { Commit } from './commit';
import { getMetadataFromMessage } from './util';
export class PullRequest {
    constructor(data) {
        this.number = data === null || data === void 0 ? void 0 : data.number;
        this.base = data === null || data === void 0 ? void 0 : data.base;
        this.ref = data === null || data === void 0 ? void 0 : data.ref;
        this.url = data === null || data === void 0 ? void 0 : data.url;
        this.labels = data === null || data === void 0 ? void 0 : data.labels;
        this.milestone = data === null || data === void 0 ? void 0 : data.milestone;
        this.commits = data === null || data === void 0 ? void 0 : data.commits;
        this.metadata = data === null || data === void 0 ? void 0 : data.metadata;
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
            metadata: this.metadata,
        };
    }
    static async getPullRequest(octokit, request) {
        var _a;
        const pull_request = (await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', request)).data;
        const commits = (await octokit.paginate('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', Object.assign({ per_page: 100 }, request))).map(commit => new Commit(commit));
        // all comments including the PR description, review comments are not included
        const comments = [
            (await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
                owner: request.owner,
                repo: request.repo,
                issue_number: pull_request.number,
            })).data.body || '',
            ...(await octokit.paginate('GET /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                owner: request.owner,
                repo: request.repo,
                issue_number: pull_request.number,
                per_page: 100,
            }, response => response.data.map(comment => comment.body || ''))),
        ];
        const issueMetadata = [];
        comments.forEach(comment => {
            issueMetadata.push(...getMetadataFromMessage(comment));
        });
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
            metadata: issueMetadata,
        });
    }
}
//# sourceMappingURL=pull-request.js.map