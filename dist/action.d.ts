import { Octokit } from '@octokit/core';
declare function action(octokit: Octokit, request: {
    owner: string;
    repo: string;
    pull_number: number;
}): Promise<void>;
export default action;
