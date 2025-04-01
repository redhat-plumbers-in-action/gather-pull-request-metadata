import { z } from 'zod';

export const singleCommitMetadataSchema = z.object({
  sha: z.string(),
  url: z.string().url(),
  message: z.object({
    title: z.string(),
    body: z.string(),
    cherryPick: z.array(
      z.object({
        sha: z.string(),
      })
    ),
  }),
});

export type SingleCommitMetadata = z.infer<typeof singleCommitMetadataSchema>;

export const commitMetadataSchema = z.array(singleCommitMetadataSchema);
export type CommitMetadata = z.infer<typeof commitMetadataSchema>;

export const issueMetadataSchema = z.record(z.string(), z.unknown());
export type IssueMetadata = z.infer<typeof issueMetadataSchema>;

export const pullRequestMetadataSchema = z.object({
  number: z.number(),
  base: z.string(),
  ref: z.string(),
  url: z.string().url(),
  labels: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      description: z.string().nullable(),
    })
  ),
  milestone: z
    .object({
      title: z.string().optional(),
    })
    .nullable(),
  commits: commitMetadataSchema,
  metadata: z.array(issueMetadataSchema),
});

export type PullRequestMetadata = z.infer<typeof pullRequestMetadataSchema>;
