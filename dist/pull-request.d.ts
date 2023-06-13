import { Octokit } from '@octokit/core';
import { PullRequestMetadata } from './schema';
export declare class PullRequest {
    readonly number: PullRequestMetadata['number'];
    readonly labels: PullRequestMetadata['labels'];
    readonly milestone: PullRequestMetadata['milestone'];
    readonly commits: PullRequestMetadata['commits'];
    private constructor();
    getMetadata(): PullRequestMetadata;
    static getPullRequest(octokit: Octokit, request: {
        owner: string;
        repo: string;
        pull_number: number;
    }): Promise<PullRequest>;
}
