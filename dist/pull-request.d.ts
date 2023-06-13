import { Context } from 'probot';
import { events } from './events';
import { PullRequestMetadata } from './schema';
export declare class PullRequest {
    readonly number: PullRequestMetadata['number'];
    readonly labels: PullRequestMetadata['labels'];
    readonly milestone: PullRequestMetadata['milestone'];
    readonly commits: PullRequestMetadata['commits'];
    private constructor();
    getMetadata(): PullRequestMetadata;
    static getPullRequest(context: Context<(typeof events.pull_request)[number]>): Promise<PullRequest>;
}
