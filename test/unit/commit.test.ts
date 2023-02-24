import { describe, it, expect, beforeEach } from 'vitest';

import {
  ICommitTestContext,
  commitContextFixture,
} from './fixtures/commit.fixture';

describe('Commit Object', () => {
  beforeEach<ICommitTestContext>(context => {
    context.commits = commitContextFixture.commits;
  });

  it<ICommitTestContext>('can be instantiated', context =>
    context.commits.map(commitItem => expect(commitItem).toBeDefined()));

  it<ICommitTestContext>('getTitle()', context =>
    context.commits.map(commitItem => {
      expect(
        commitItem.getTitle(commitItem.message.body)
      ).length.lessThanOrEqual(74);

      expect(commitItem.getTitle(commitItem.message.body)).toMatchSnapshot();
    }));

  it<ICommitTestContext>('getCherryPicks()', context =>
    context.commits.map(commitItem => {
      expect(
        commitItem.getCherryPicks(commitItem.message.body)
      ).toMatchSnapshot();
    }));
});
