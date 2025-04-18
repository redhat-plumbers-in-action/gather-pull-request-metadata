import { z } from 'zod';
export declare const singleCommitMetadataSchema: z.ZodObject<{
    sha: z.ZodString;
    url: z.ZodString;
    message: z.ZodObject<{
        title: z.ZodString;
        body: z.ZodString;
        cherryPick: z.ZodArray<z.ZodObject<{
            sha: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            sha: string;
        }, {
            sha: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        title: string;
        body: string;
        cherryPick: {
            sha: string;
        }[];
    }, {
        title: string;
        body: string;
        cherryPick: {
            sha: string;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    url: string;
    sha: string;
    message: {
        title: string;
        body: string;
        cherryPick: {
            sha: string;
        }[];
    };
}, {
    url: string;
    sha: string;
    message: {
        title: string;
        body: string;
        cherryPick: {
            sha: string;
        }[];
    };
}>;
export type SingleCommitMetadata = z.infer<typeof singleCommitMetadataSchema>;
export declare const commitMetadataSchema: z.ZodArray<z.ZodObject<{
    sha: z.ZodString;
    url: z.ZodString;
    message: z.ZodObject<{
        title: z.ZodString;
        body: z.ZodString;
        cherryPick: z.ZodArray<z.ZodObject<{
            sha: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            sha: string;
        }, {
            sha: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        title: string;
        body: string;
        cherryPick: {
            sha: string;
        }[];
    }, {
        title: string;
        body: string;
        cherryPick: {
            sha: string;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    url: string;
    sha: string;
    message: {
        title: string;
        body: string;
        cherryPick: {
            sha: string;
        }[];
    };
}, {
    url: string;
    sha: string;
    message: {
        title: string;
        body: string;
        cherryPick: {
            sha: string;
        }[];
    };
}>, "many">;
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
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        description: string | null;
    }, {
        id: number;
        name: string;
        description: string | null;
    }>, "many">;
    milestone: z.ZodNullable<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
    }, {
        title?: string | undefined;
    }>>;
    commits: z.ZodArray<z.ZodObject<{
        sha: z.ZodString;
        url: z.ZodString;
        message: z.ZodObject<{
            title: z.ZodString;
            body: z.ZodString;
            cherryPick: z.ZodArray<z.ZodObject<{
                sha: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                sha: string;
            }, {
                sha: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            title: string;
            body: string;
            cherryPick: {
                sha: string;
            }[];
        }, {
            title: string;
            body: string;
            cherryPick: {
                sha: string;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        sha: string;
        message: {
            title: string;
            body: string;
            cherryPick: {
                sha: string;
            }[];
        };
    }, {
        url: string;
        sha: string;
        message: {
            title: string;
            body: string;
            cherryPick: {
                sha: string;
            }[];
        };
    }>, "many">;
    metadata: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">;
}, "strip", z.ZodTypeAny, {
    number: number;
    url: string;
    base: string;
    ref: string;
    labels: {
        id: number;
        name: string;
        description: string | null;
    }[];
    milestone: {
        title?: string | undefined;
    } | null;
    commits: {
        url: string;
        sha: string;
        message: {
            title: string;
            body: string;
            cherryPick: {
                sha: string;
            }[];
        };
    }[];
    metadata: Record<string, unknown>[];
}, {
    number: number;
    url: string;
    base: string;
    ref: string;
    labels: {
        id: number;
        name: string;
        description: string | null;
    }[];
    milestone: {
        title?: string | undefined;
    } | null;
    commits: {
        url: string;
        sha: string;
        message: {
            title: string;
            body: string;
            cherryPick: {
                sha: string;
            }[];
        };
    }[];
    metadata: Record<string, unknown>[];
}>;
export type PullRequestMetadata = z.infer<typeof pullRequestMetadataSchema>;
