import { Context } from 'probot';
import { events } from './events';
import { PullRequestT } from './types';
export declare class PullRequest {
    readonly number: PullRequestT['number'];
    readonly labels: PullRequestT['labels'];
    readonly milestone: PullRequestT['milestone'];
    readonly commits: PullRequestT['commits'];
    private constructor();
    getMetadata(): PullRequestT;
    static getPullRequest(context: Context<(typeof events.pull_request)[number]>): Promise<PullRequest>;
}
