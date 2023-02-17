import { Endpoints } from '@octokit/types';
import { CommitT } from './types';

export class Commit {
  readonly sha: CommitT['sha'];
  readonly message: CommitT['message'];

  constructor(
    data: Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number]
  ) {
    this.sha = data.sha;
    this.message = {
      title: this.getTitle(data.commit.message),
      body: data.commit.message,
      cherryPick: this.getCherryPicks(data.commit.message),
    };
  }

  getTitle(message: string) {
    const TitleSize = 70;
    const slicedMsg = message.split(/\n/, 1)[0].slice(0, TitleSize);

    return slicedMsg.length < TitleSize ? slicedMsg : `${slicedMsg}...`;
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
