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
};
