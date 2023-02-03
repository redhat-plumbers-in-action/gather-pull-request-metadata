//? DOC: https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads

export const events = {
  pull_request: [
    'pull_request.opened' as const,
    'pull_request.reopened' as const,
    'pull_request.synchronize' as const,
  ],
};
