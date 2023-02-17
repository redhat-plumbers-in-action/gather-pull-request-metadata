import { Context } from 'probot';
import { events } from '../../../src/events';

import { PullRequest } from '../../../src/pull-request';

export interface IPullRequestTestContext {
  pullRequests: PullRequest[];
  invalid: PullRequest[];
}

export const pullRequestContextFixture: IPullRequestTestContext = {
  pullRequests: [
    // TODO ...
    // await PullRequest.getPullRequest({
    //   payload: {
    //     pull_request: {
    //       number: 1,
    //       labels: [
    //         {
    //           id: 1,
    //           name: 'label-1',
    //           description: 'label-1-description',
    //         },
    //       ],
    //       milestone: {
    //         title: 'milestone-1',
    //       },
    //     },
    //   },
    // } as Context<(typeof events.pull_request)[number]>),
    // await PullRequest.getPullRequest({
    //   payload: {
    //     pull_request: {
    //       number: 2,
    //       labels: [{}],
    //       milestone: {},
    //     },
    //   },
    // } as Context<(typeof events.pull_request)[number]>),
  ],

  invalid: [
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(null),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(undefined),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest(''),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest({}),
    // @ts-expect-error: Let's ignore a type error, it's required for testing
    new PullRequest([]),
  ],
};
