import { setFailed } from '@actions/core';
import run from '@probot/adapter-github-actions';

import '@total-typescript/ts-reset';

import action from './action';

import type {
  CommitMetadata,
  PullRequestMetadata,
  SingleCommitMetadata,
} from './schema';
import {
  commitMetadataSchema,
  pullRequestMetadataSchema,
  singleCommitMetadataSchema,
} from './schema';

export type { CommitMetadata, PullRequestMetadata, SingleCommitMetadata };
export {
  commitMetadataSchema,
  pullRequestMetadataSchema,
  singleCommitMetadataSchema,
};

try {
  await run.run(action);
} catch (error) {
  error instanceof Error
    ? setFailed(error.message)
    : setFailed(error as string);
}
