import { Commit } from './commit';
import { CustomOctokit } from './octokit';
import { PullRequestMetadata } from './schema';

export class PullRequest {
  readonly number: PullRequestMetadata['number'];
  readonly base: PullRequestMetadata['base'];
  readonly ref: PullRequestMetadata['ref'];
  readonly url: PullRequestMetadata['url'];
  readonly labels: PullRequestMetadata['labels'];
  readonly milestone: PullRequestMetadata['milestone'];
  readonly commits: PullRequestMetadata['commits'];

  private constructor(data: PullRequestMetadata) {
    this.number = data?.number;
    this.base = data?.base;
    this.ref = data?.ref;
    this.url = data?.url;
    this.labels = data?.labels;
    this.milestone = data?.milestone;
    this.commits = data?.commits;
  }

  getMetadata(): PullRequestMetadata {
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

  static async getPullRequest(
    octokit: CustomOctokit,
    request: { owner: string; repo: string; pull_number: number }
  ) {
    const pull_request = (
      await octokit.request(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}',
        request
      )
    ).data;
    const commits = (
      await octokit.paginate(
        'GET /repos/{owner}/{repo}/pulls/{pull_number}/commits',
        {
          per_page: 100,
          ...request,
        }
      )
    ).map(commit => new Commit(commit));

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
      milestone: { title: pull_request.milestone?.title },
      commits,
    });
  }
}
