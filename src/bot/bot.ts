import fetch, { Response } from 'node-fetch';
import { Context, Telegraf } from 'telegraf';

import { COMMANDS } from './constants';

export const bot = new Telegraf(process.env.BOT_TOKEN, { telegram: { webhookReply: false } });

bot.help((ctx) => ctx.reply('Help in process'));
bot.start((ctx) => ctx.reply('Welcome, bro!'));
bot.command('whoami', (ctx) => ctx.reply('Test command'));
bot.command('context', (ctx) => {
  ctx.reply(JSON.stringify({ botInfo:ctx.botInfo, message:ctx.message, state: ctx.state }, null, 2));
});

bot.command('getpicture', async (ctx: Context) => {
  try {
    const response: Response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json() as { data: { memes: { url: string }[] } };

    const number = Math.ceil(Math.random() * 100);

    ctx.replyWithPhoto(data?.data?.memes?.[number]?.url);
  } catch (error) {
    ctx.reply(error);
  }
});

bot.telegram.setMyCommands(COMMANDS);
bot.on(['message'], (ctx: Context) => {
  if ('text' in ctx.message && ctx.message.text.startsWith('Бот!')) {
    ctx.reply(`Бот принял твое сообщение, но ему не нравится: "${ctx.message.text!}"`, {
      reply_to_message_id: ctx.message.message_id,
    });
  }
});
