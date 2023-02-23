import { writeFile } from 'fs';

import { Context, Probot } from 'probot';
import { setOutput, error, debug, getInput } from '@actions/core';

import { events } from './events';
import { PullRequest } from './pull-request';

const action = (probot: Probot) => {
  probot.on(
    events.pull_request,
    async (context: Context<(typeof events.pull_request)[number]>) => {
      const pullRequest = await PullRequest.getPullRequest(context);

      const metadataJson = JSON.stringify(pullRequest.getMetadata(), null, 2);
      const metadataFile = getInput('metadata-file-name');

      setOutput('metadata', metadataJson);
      setOutput('metadata-file', metadataFile);

      writeFile(`./${metadataFile}`, metadataJson, err =>
        err
          ? error(
              `Failed to write Pull Request metadata into ${metadataFile} file ; fs.writeFile: ${err}`
            )
          : debug(
              `Successfully wrote Pull Request metadata into a ${metadataFile} file`
            )
      );
    }
  );
};

export default action;
