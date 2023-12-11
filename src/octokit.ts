import { Octokit } from '@octokit/core';
import { paginateRest } from '@octokit/plugin-paginate-rest';

const CustomOctokit = Octokit.plugin(paginateRest);

export type CustomOctokit = InstanceType<typeof CustomOctokit>;

export function getOctokit(token: string) {
  return new CustomOctokit({
    auth: token,
  });
}
