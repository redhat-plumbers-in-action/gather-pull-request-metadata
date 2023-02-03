export class PullRequest {
    constructor(data) {
        this.number = data === null || data === void 0 ? void 0 : data.number;
        this.labels = data === null || data === void 0 ? void 0 : data.labels;
        this.milestone = data === null || data === void 0 ? void 0 : data.milestone;
    }
    getMetadata() {
        return {
            number: this.number,
            labels: this.labels,
            milestone: this.milestone,
        };
    }
    static async getPullRequest(context) {
        var _a;
        const { pull_request } = context.payload;
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
        });
    }
}
//# sourceMappingURL=pull-request.js.map