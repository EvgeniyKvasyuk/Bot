import { handlerPath } from '@libs/handler-resolver';

export const setWebhook = {
  handler: `${handlerPath(__dirname)}/handler.exportSetWebhook`,
  events: [
    {
      http: {
        method: 'get',
        path: 'setWebhook',
        cors: true,
      },
    },
  ],
};
