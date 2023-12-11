import { CustomOctokit } from './octokit';
import { PullRequestMetadata } from './schema';
export declare class PullRequest {
    readonly number: PullRequestMetadata['number'];
    readonly base: PullRequestMetadata['base'];
    readonly url: PullRequestMetadata['url'];
    readonly labels: PullRequestMetadata['labels'];
    readonly milestone: PullRequestMetadata['milestone'];
    readonly commits: PullRequestMetadata['commits'];
    private constructor();
    getMetadata(): PullRequestMetadata;
    static getPullRequest(octokit: CustomOctokit, request: {
        owner: string;
        repo: string;
        pull_number: number;
    }): Promise<PullRequest>;
}
