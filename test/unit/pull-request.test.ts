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

  it<IPullRequestTestContext>('draft is false for regular PR', context => {
    const metadata = context.pullRequests[0].getMetadata();
    expect(metadata.draft).toBe(false);
    expect(metadata.title).toBe('feat: add new feature');
  });

  it<IPullRequestTestContext>('draft is true when PR is marked as draft', context => {
    const metadata = context.pullRequests[1].getMetadata();
    expect(metadata.draft).toBe(true);
    expect(metadata.title).toBe('fix: resolve crash on startup');
  });

  it<IPullRequestTestContext>('draft is true when title contains [WIP]', context => {
    const metadata = context.pullRequests[2].getMetadata();
    expect(metadata.draft).toBe(true);
    expect(metadata.title).toBe('[WIP] refactor: restructure modules');
  });

  it<IPullRequestTestContext>('draft is true when title contains [wip] (case insensitive)', context => {
    const metadata = context.pullRequests[3].getMetadata();
    expect(metadata.draft).toBe(true);
    expect(metadata.title).toBe('[wip] ci: update pipeline');
  });

  it<IPullRequestTestContext>('draft is false for non-draft PR without [WIP]', context => {
    const metadata = context.pullRequests[4].getMetadata();
    expect(metadata.draft).toBe(false);
    expect(metadata.title).toBe('docs: update README');
  });
});
