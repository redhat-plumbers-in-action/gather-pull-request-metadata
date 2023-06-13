import { Context } from 'probot';
import { Commit } from './commit';

import { events } from './events';
import { PullRequestMetadata } from './schema';

export class PullRequest {
  readonly number: PullRequestMetadata['number'];
  readonly labels: PullRequestMetadata['labels'];
  readonly milestone: PullRequestMetadata['milestone'];
  readonly commits: PullRequestMetadata['commits'];

  private constructor(data: PullRequestMetadata) {
    this.number = data?.number;
    this.labels = data?.labels;
    this.milestone = data?.milestone;
    this.commits = data?.commits;
  }

  getMetadata(): PullRequestMetadata {
    return {
      number: this.number,
      labels: this.labels,
      milestone: this.milestone,
      commits: this.commits,
    };
  }

  static async getPullRequest(
    context: Context<(typeof events.pull_request)[number]>
  ) {
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
      milestone: { title: pull_request.milestone?.title },
      commits: (
        await context.octokit.pulls.listCommits(context.pullRequest())
      ).data.map(commit => new Commit(commit)),
    });
  }
}
