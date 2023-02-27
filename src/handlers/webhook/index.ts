import { handlerPath } from '@libs/handler-resolver';

export const webhook = {
  handler: `${handlerPath(__dirname)}/handler.exportWebhook`,
  events: [
    {
      http: {
        method: 'post',
        path: 'webhook',
        cors: true,
      },
    },
  ],
};

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
