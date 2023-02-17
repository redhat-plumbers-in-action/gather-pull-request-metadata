import { Endpoints } from '@octokit/types';
import { CommitT } from './types';
export declare class Commit {
    readonly sha: CommitT['sha'];
    readonly message: CommitT['message'];
    constructor(data: Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number]);
    getTitle(message: string): string;
    getCherryPicks(message: string): CommitT['message']['cherryPick'];
}
