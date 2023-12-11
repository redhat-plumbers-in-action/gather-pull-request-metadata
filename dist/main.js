var _a, _b;
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
    .parse((_a = process.env.GITHUB_REPOSITORY) === null || _a === void 0 ? void 0 : _a.split('/')[0]);
const repo = z
    .string()
    .min(1)
    .parse((_b = process.env.GITHUB_REPOSITORY) === null || _b === void 0 ? void 0 : _b.split('/')[1]);
try {
    await action(octokit, { owner, repo, pull_number: prNumber });
}
catch (error) {
    let message;
    if (error instanceof Error) {
        message = error.message;
    }
    else {
        message = JSON.stringify(error);
    }
    setFailed(message);
}
//# sourceMappingURL=main.js.map