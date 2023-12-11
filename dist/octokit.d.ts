import { Octokit } from '@octokit/core';
declare const CustomOctokit: typeof Octokit & import("@octokit/core/dist-types/types").Constructor<{
    paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
}>;
export type CustomOctokit = InstanceType<typeof CustomOctokit>;
export declare function getOctokit(token: string): Octokit & {
    paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
};
export {};
