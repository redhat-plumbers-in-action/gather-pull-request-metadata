import { Octokit } from '@octokit/core';
import { paginateRest } from '@octokit/plugin-paginate-rest';
const CustomOctokit = Octokit.plugin(paginateRest);
export function getOctokit(token) {
    return new CustomOctokit({
        auth: token,
    });
}
//# sourceMappingURL=octokit.js.map