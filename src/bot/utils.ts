import { Context } from 'telegraf';

export const messageStartFromBotName = (ctx: Context): boolean   => {
  const botName = ctx.botInfo.username;
  const messageText = 'text' in ctx.message ? ctx.message.text : '';
  return messageText.startsWith(`@${botName}`);
}

export const notFromBot = (ctx: Context): boolean => !ctx.message.from.is_bot;

export const getTextWithoutBotName = (ctx: Context): string => {
  const botName = ctx.botInfo.username;
  const messageText = 'text' in ctx.message ? ctx.message.text : '';
  return messageText.replace(`@${botName}`, '').trim();
};

export const privateChat = (ctx: Context): boolean => ctx.chat.type === 'private';
