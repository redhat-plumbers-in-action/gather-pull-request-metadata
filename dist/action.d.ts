import { CustomOctokit } from './octokit';
declare function action(octokit: CustomOctokit, request: {
    owner: string;
    repo: string;
    pull_number: number;
}): Promise<void>;
export default action;
