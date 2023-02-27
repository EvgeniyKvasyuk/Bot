import { Telegraf } from 'telegraf';

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
