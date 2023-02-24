import { Endpoints } from '@octokit/types';
import { z } from 'zod';

import { CommitT } from './types';

// subset of Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number]
const commitDataSchema = z.object({
  sha: z.string(),
  commit: z.object({
    message: z.string(),
  }),
});

export class Commit {
  readonly sha: CommitT['sha'];
  readonly message: CommitT['message'];

  constructor(
    data: Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number]
  ) {
    commitDataSchema.parse(data);

    this.sha = data.sha;
    this.message = {
      title: this.getTitle(data.commit.message),
      body: data.commit.message,
      cherryPick: this.getCherryPicks(data.commit.message),
    };
  }

  /**
   * @returns Title of the commit message with max length of 70 characters + optional ` ...` suffix (4 extra characters)
   */
  getTitle(message: string) {
    const TitleSize = 70;
    const slicedMsg = message.split(/\n/, 1)[0].slice(0, TitleSize);

    return slicedMsg.length < TitleSize ? slicedMsg : `${slicedMsg} ...`;
  }

  getCherryPicks(message: string): CommitT['message']['cherryPick'] {
    const regexp = /\n\(cherry picked from commit (\b[0-9a-f]{5,40}\b)\) *\n?/g;

    const matches = [...message.matchAll(regexp)];
    return Array.isArray(matches)
      ? matches.map(match => {
          return { sha: match[1].toString() };
        })
      : [];
  }
}
