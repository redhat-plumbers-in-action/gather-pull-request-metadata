import { z } from 'zod';
export declare const singleCommitMetadataSchema: z.ZodObject<{
    sha: z.ZodString;
    url: z.ZodString;
    message: z.ZodObject<{
        title: z.ZodString;
        body: z.ZodString;
        cherryPick: z.ZodArray<z.ZodObject<{
            sha: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SingleCommitMetadata = z.infer<typeof singleCommitMetadataSchema>;
export declare const commitMetadataSchema: z.ZodArray<z.ZodObject<{
    sha: z.ZodString;
    url: z.ZodString;
    message: z.ZodObject<{
        title: z.ZodString;
        body: z.ZodString;
        cherryPick: z.ZodArray<z.ZodObject<{
            sha: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>>;
export type CommitMetadata = z.infer<typeof commitMetadataSchema>;
export declare const issueMetadataSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export type IssueMetadata = z.infer<typeof issueMetadataSchema>;
export declare const pullRequestMetadataSchema: z.ZodObject<{
    number: z.ZodNumber;
    base: z.ZodString;
    ref: z.ZodString;
    url: z.ZodString;
    labels: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    milestone: z.ZodNullable<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    commits: z.ZodArray<z.ZodObject<{
        sha: z.ZodString;
        url: z.ZodString;
        message: z.ZodObject<{
            title: z.ZodString;
            body: z.ZodString;
            cherryPick: z.ZodArray<z.ZodObject<{
                sha: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    metadata: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export type PullRequestMetadata = z.infer<typeof pullRequestMetadataSchema>;
