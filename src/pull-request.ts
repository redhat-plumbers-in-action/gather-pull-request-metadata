import { Context } from 'probot';

import { events } from './events';

import { PullRequestT } from './types';

export class PullRequest {
  readonly number: PullRequestT['number'];
  readonly labels: PullRequestT['labels'];
  readonly milestone: PullRequestT['milestone'];

  private constructor(data: PullRequestT) {
    this.number = data?.number;
    this.labels = data?.labels;
    this.milestone = data?.milestone;
  }

  getMetadata(): PullRequestT {
    return {
      number: this.number,
      labels: this.labels,
      milestone: this.milestone,
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
    });
  }
}
