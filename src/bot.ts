import 'dotenv/config';

import { Bot } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN as string);

// Handle the /start command.
bot.command('start', (ctx) =>
	ctx.reply(`Hey ${ctx.from?.first_name}. Welcome! Up and running.`)
);

bot.on('message', async (ctx) => {
	const message = ctx.message;
	console.log(message.text);
});

bot.start();
