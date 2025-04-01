import { Commit } from './commit';
import { CustomOctokit } from './octokit';
import { IssueMetadata, PullRequestMetadata } from './schema';
import { getMetadataFromMessage } from './util';

export class PullRequest {
  readonly number: PullRequestMetadata['number'];
  readonly base: PullRequestMetadata['base'];
  readonly ref: PullRequestMetadata['ref'];
  readonly url: PullRequestMetadata['url'];
  readonly labels: PullRequestMetadata['labels'];
  readonly milestone: PullRequestMetadata['milestone'];
  readonly commits: PullRequestMetadata['commits'];
  readonly metadata: PullRequestMetadata['metadata'];

  private constructor(data: PullRequestMetadata) {
    this.number = data?.number;
    this.base = data?.base;
    this.ref = data?.ref;
    this.url = data?.url;
    this.labels = data?.labels;
    this.milestone = data?.milestone;
    this.commits = data?.commits;
    this.metadata = data?.metadata;
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
      metadata: this.metadata,
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

    // all comments including the PR description, review comments are not included
    const comments = [
      (
        await octokit.request(
          'GET /repos/{owner}/{repo}/issues/{issue_number}',
          {
            owner: request.owner,
            repo: request.repo,
            issue_number: pull_request.number,
          }
        )
      ).data.body || '',
      ...(await octokit.paginate(
        'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
        {
          owner: request.owner,
          repo: request.repo,
          issue_number: pull_request.number,
          per_page: 100,
        },
        response => response.data.map(comment => comment.body || '')
      )),
    ] as string[];

    const issueMetadata: IssueMetadata[] = [];
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
      milestone: { title: pull_request.milestone?.title },
      commits,
      metadata: issueMetadata,
    });
  }
}
