import run from '@probot/adapter-github-actions';
import { setFailed } from '@actions/core';

import action from './action';

try {
  await run.run(action);
} catch (error) {
  error instanceof Error
    ? setFailed(error.message)
    : setFailed(error as string);
}
