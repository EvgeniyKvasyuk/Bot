import fetch, { Response } from 'node-fetch';
import { Context, Telegraf } from 'telegraf';

import { chat } from './chatgpt';
import { getTextWithoutBotName, messageStartFromBotName, notFromBot, privateChat } from './utils';


export const bot = new Telegraf(process.env.BOT_TOKEN, { telegram: { webhookReply: false } });

bot.help((ctx) => {
    ctx.replyWithMarkdown('*Help will be here soon...*');
});

bot.start((ctx) => ctx.reply('Welcome, bro!'));
bot.command('whoami', (ctx) => ctx.reply('Test command'));
bot.command('context', (ctx) => {
  ctx.reply(
    JSON.stringify({ botInfo: ctx.botInfo, message: ctx.message, state: ctx.state }, null, 2)
  );
});

bot.command('getpicture', async (ctx: Context) => {
  try {
    const response: Response = await fetch('https://api.imgflip.com/get_memes');
    const data = (await response.json()) as { data: { memes: { url: string }[] } };

    const number = Math.ceil(Math.random() * 100);

    ctx.replyWithPhoto(data?.data?.memes?.[number]?.url);
  } catch (error) {
    ctx.reply(error);
  }
});

bot.on(['message'], async (ctx: Context) => {
  try {
    if((messageStartFromBotName(ctx) || privateChat(ctx)) && notFromBot(ctx)) {
      const text = getTextWithoutBotName(ctx);
      const answer = await chat(text);

      ctx.replyWithMarkdown(answer, {
        parse_mode: 'Markdown',
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } catch ({ message }) {
    ctx.reply('К сожалению сейчас я не могу ответить на ваш вопрос. Попробуйте позже.');
  }
});
