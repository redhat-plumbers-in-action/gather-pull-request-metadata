export type PullRequestT = {
  number: number;
  labels: {
    id: number;
    name: string;
    description: string | null;
  }[];
  milestone: {
    title: string | undefined;
  } | null;
  commits: CommitT[];
};

export type CommitT = {
  sha: string;
  url: string;
  message: {
    title: string;
    body: string;
    cherryPick: {
      sha: string;
    }[];
  };
};
