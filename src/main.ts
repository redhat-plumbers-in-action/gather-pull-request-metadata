import { getInput, setFailed } from '@actions/core';
import { z } from 'zod';

import '@total-typescript/ts-reset';

import action from './action';
import { getOctokit } from './octokit';

const octokit = getOctokit(getInput('token', { required: true }));

const prNumber = +getInput('pr-number', { required: true });
const metadataFileName = getInput('metadata-file-name', { required: true });

const owner = z
  .string()
  .min(1)
  .parse(process.env.GITHUB_REPOSITORY?.split('/')[0]);
const repo = z
  .string()
  .min(1)
  .parse(process.env.GITHUB_REPOSITORY?.split('/')[1]);

try {
  await action(octokit, { owner, repo, pull_number: prNumber });
} catch (error) {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else {
    message = JSON.stringify(error);
  }

  setFailed(message);
}
