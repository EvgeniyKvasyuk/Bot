import { bot, COMMANDS } from '@bot';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


const setHook = async (url) => {
  await bot.telegram.deleteWebhook({ drop_pending_updates: true });
  await bot.telegram.setWebhook(url);
};

const setWebhook = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const url = `https://${event.headers.Host}/${event.requestContext.stage}/webhook`;
    await setHook(url);
    await bot.telegram.setMyCommands(COMMANDS);
    return formatJSONResponse({ message: `Setting webhook to ${url}` });
  } catch (err) {
    // handle en error
    return formatJSONResponse({ message: 'Something went wrong ' });
  }
};

export const exportSetWebhook = middyfy(setWebhook);
