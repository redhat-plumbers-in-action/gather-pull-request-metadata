import { setOutput, debug, getInput } from '@actions/core';
import { writeFile } from 'fs';

import { CustomOctokit } from './octokit';
import { PullRequest } from './pull-request';

async function action(
  octokit: CustomOctokit,
  request: { owner: string; repo: string; pull_number: number }
) {
  const pullRequest = await PullRequest.getPullRequest(octokit, request);

  const metadataJson = JSON.stringify(pullRequest.getMetadata(), null, 2);
  const metadataFile = getInput('metadata-file-name');

  setOutput('metadata', metadataJson);
  setOutput('metadata-file', metadataFile);

  writeFile(`./${metadataFile}`, metadataJson, err => {
    if (err) {
      throw new Error(
        `Failed to write Pull Request metadata into ${metadataFile} file ; fs.writeFile: ${err}`
      );
    }
    debug(
      `Successfully wrote Pull Request metadata into a ${metadataFile} file`
    );
  });
}

export default action;
