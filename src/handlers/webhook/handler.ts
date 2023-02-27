import { Telegraf } from 'telegraf';

import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


export const bot = new Telegraf(process.env.BOT_TOKEN, { telegram: { webhookReply: false } });

bot.help((ctx) => ctx.reply('Help in process'));
bot.start((ctx) => ctx.reply('Welcome!'));
bot.on(['text'], (ctx) => {
  if (ctx.message.text.startsWith('Бот!')) {
    ctx.reply(`Бот принял твое сообщение: "${ctx.message.text}"`, {
      reply_to_message_id: ctx.message.message_id,
    });
  }
});

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
