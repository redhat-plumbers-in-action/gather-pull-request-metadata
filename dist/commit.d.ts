import { Endpoints } from '@octokit/types';
import { SingleCommitMetadata } from './schema';
export declare class Commit {
    readonly sha: SingleCommitMetadata['sha'];
    readonly url: SingleCommitMetadata['url'];
    readonly message: SingleCommitMetadata['message'];
    constructor(data: Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][number]);
    /**
     * @returns Title of the commit message with max length of 70 characters + optional ` ...` suffix (4 extra characters)
     */
    getTitle(message: string): string;
    getCherryPicks(message: string): SingleCommitMetadata['message']['cherryPick'];
}
