import { z } from 'zod';
export const singleCommitMetadataSchema = z.object({
    sha: z.string(),
    url: z.string().url(),
    message: z.object({
        title: z.string(),
        body: z.string(),
        cherryPick: z.array(z.object({
            sha: z.string(),
        })),
    }),
});
export const commitMetadataSchema = z.array(singleCommitMetadataSchema);
export const issueMetadataSchema = z.record(z.string(), z.unknown());
export const pullRequestMetadataSchema = z.object({
    number: z.number(),
    base: z.string(),
    ref: z.string(),
    url: z.string().url(),
    labels: z.array(z.object({
        id: z.number(),
        name: z.string(),
        description: z.string().nullable(),
    })),
    milestone: z
        .object({
        title: z.string().optional(),
    })
        .nullable(),
    commits: commitMetadataSchema,
    metadata: z.array(issueMetadataSchema),
});
//# sourceMappingURL=schema.js.map