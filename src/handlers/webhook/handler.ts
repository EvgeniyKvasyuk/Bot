import { bot } from '@bot';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


const webhook = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    // bot handles processed data from the event body

    await bot.handleUpdate(event.body);
    return formatJSONResponse({ message: 'Webhook is working' });
    // await setHook(`https://${event.headers.Host}/${event.requestContext.stage}/webhook`);
  } catch (err) {
    // handle error
    return formatJSONResponse({ message: 'Something went wrong ' });
  }
};

export const exportWebhook = middyfy(webhook);
