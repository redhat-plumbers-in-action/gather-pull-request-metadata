import { PullRequest } from '../../../src/pull-request';
import { PullRequestMetadata } from '../../../src/schema';

export interface IPullRequestTestContext {
  pullRequests: PullRequest[];
  invalid: PullRequest[];
}

function createPullRequest(data: PullRequestMetadata): PullRequest {
  // @ts-expect-error: Bypass private constructor for testing
  return new PullRequest(data);
}

const basePRData: PullRequestMetadata = {
  number: 1,
  title: 'feat: add new feature',
  draft: false,
  base: 'main',
  ref: 'abc123',
  url: 'https://github.com/org/repo/pull/1',
  labels: [{ id: 1, name: 'enhancement', description: 'New feature' }],
  milestone: { title: 'v1.0' },
  commits: [],
  metadata: [],
};

export const pullRequestContextFixture: IPullRequestTestContext = {
  pullRequests: [
    createPullRequest(basePRData),
    createPullRequest({
      ...basePRData,
      number: 2,
      title: 'fix: resolve crash on startup',
      draft: true,
      url: 'https://github.com/org/repo/pull/2',
    }),
    createPullRequest({
      ...basePRData,
      number: 3,
      title: '[WIP] refactor: restructure modules',
      draft: true,
      url: 'https://github.com/org/repo/pull/3',
    }),
    createPullRequest({
      ...basePRData,
      number: 4,
      title: '[wip] ci: update pipeline',
      draft: true,
      url: 'https://github.com/org/repo/pull/4',
    }),
    createPullRequest({
      ...basePRData,
      number: 5,
      title: 'docs: update README',
      draft: false,
      labels: [],
      milestone: null,
      url: 'https://github.com/org/repo/pull/5',
    }),
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(null),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(undefined),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(''),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest({}),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest([]),
  ],
};
