import { Octokit } from '@octokit/core';

import { Commit } from './commit';
import { PullRequestMetadata } from './schema';

export class PullRequest {
  readonly number: PullRequestMetadata['number'];
  readonly base: PullRequestMetadata['base'];
  readonly url: PullRequestMetadata['url'];
  readonly labels: PullRequestMetadata['labels'];
  readonly milestone: PullRequestMetadata['milestone'];
  readonly commits: PullRequestMetadata['commits'];

  private constructor(data: PullRequestMetadata) {
    this.number = data?.number;
    this.base = data?.base;
    this.url = data?.url;
    this.labels = data?.labels;
    this.milestone = data?.milestone;
    this.commits = data?.commits;
  }

  getMetadata(): PullRequestMetadata {
    return {
      number: this.number,
      base: this.base,
      url: this.url,
      labels: this.labels,
      milestone: this.milestone,
      commits: this.commits,
    };
  }

  static async getPullRequest(
    octokit: Octokit,
    request: { owner: string; repo: string; pull_number: number }
  ) {
    const pull_request = (
      await octokit.request(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}',
        request
      )
    ).data;
    const commits = (
      await octokit.request(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/commits',
        request
      )
    ).data.map(commit => new Commit(commit));

    return new PullRequest({
      number: pull_request.number,
      base: pull_request.base.ref,
      url: pull_request.html_url,
      labels: pull_request.labels.map(label => {
        return {
          id: label.id,
          name: label.name,
          description: label.description,
        };
      }),
      milestone: { title: pull_request.milestone?.title },
      commits,
    });
  }
}
