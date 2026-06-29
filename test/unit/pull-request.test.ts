import { describe, it, expect, beforeEach } from 'vitest';

import {
  pullRequestContextFixture,
  IPullRequestTestContext,
} from './fixtures/pull-request.fixture';

describe('Pull Request Object', () => {
  beforeEach<IPullRequestTestContext>(context => {
    context.pullRequests = pullRequestContextFixture.pullRequests;
    context.invalid = pullRequestContextFixture.invalid;
  });

  it<IPullRequestTestContext>('can be instantiated', context =>
    context.pullRequests.map(pullRequestItem =>
      expect(pullRequestItem).toBeDefined()
    ));

  it<IPullRequestTestContext>('getMetadata()', context =>
    context.pullRequests.map(pullRequestItem =>
      expect(pullRequestItem.getMetadata()).toMatchSnapshot()
    ));
});
