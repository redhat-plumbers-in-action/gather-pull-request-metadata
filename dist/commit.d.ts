import { Endpoints } from '@octokit/types';
import { CommitT } from './types';
export declare class Commit {
    readonly sha: CommitT['sha'];
    readonly url: CommitT['url'];
    readonly message: CommitT['message'];
    constructor(data: Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number]);
    /**
     * @returns Title of the commit message with max length of 70 characters + optional ` ...` suffix (4 extra characters)
     */
    getTitle(message: string): string;
    getCherryPicks(message: string): CommitT['message']['cherryPick'];
}
