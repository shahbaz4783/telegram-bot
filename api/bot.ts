import 'dotenv/config';

// import { Bot } from 'grammy';

// const bot = new Bot(process.env.BOT_TOKEN as string);

// // Handle the /start command.
// bot.command('start', (ctx) =>
// 	ctx.reply(`Hey ${ctx.from?.first_name}. Welcome! Up and running.`)
// );

// bot.on('message', async (ctx) => {
// 	const message = ctx.message;
// 	console.log(message.text);
// });

// bot.start();

import { Bot, webhookCallback } from 'grammy';
import express from 'express';

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command('start', (ctx) => ctx.reply(`Welcome ${ctx.from?.first_name}`));
bot.command('help', (ctx) => ctx.reply('Send /start to start the bot.'));

const app = express();
app.use(express.json());

// Set up the webhook
const secretPath = `/webhook/${bot.token}`;
app.use(secretPath, webhookCallback(bot, 'express'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);
  await bot.api.setWebhook(process.env.URL + secretPath);
});

