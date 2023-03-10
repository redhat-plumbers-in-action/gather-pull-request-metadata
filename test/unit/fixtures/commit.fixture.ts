import { Commit } from '../../../src/commit';

import { Endpoints } from '@octokit/types';

export interface ICommitTestContext {
  commits: Commit[];
  invalid: Commit[];
}

export const commitContextFixture: ICommitTestContext = {
  commits: [
    new Commit({
      sha: 'sha-1',
      html_url: 'url-1',
      commit: { message: 'message-1' },
    } as Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number]),
    new Commit({
      sha: 'sha-2',
      html_url: 'url-2',
      commit: {
        message: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa_70

some description ...
multiple lines of 
description ...

(cherry picked from commit 12345)

(cherry picked from commit 1234567890123456789012345678901234567890)`,
      },
    } as Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number]),
  ],
  invalid: [],
};
