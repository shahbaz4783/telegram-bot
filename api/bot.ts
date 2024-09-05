import { Bot, InlineKeyboard, webhookCallback } from 'grammy';
import 'dotenv/config';
import express from 'express';

const bot = new Bot(process.env.BOT_TOKEN!);

await bot.api.setMyCommands([
	{ command: 'start', description: 'Start the bot' },
	{ command: 'help', description: 'Help options' },
]);

bot.command('start', async (ctx) => {
	const keyboard = new InlineKeyboard()
		.url('Open Mini App', 'https://t.me/twa_development_bot/start')

	await ctx.replyWithPhoto('https://extassisnetwork.com/tutoriales/wp-content/uploads/localhost.jpg', {
		caption: 'This bot is used for development of telegram mini',
		reply_markup: keyboard,
	});
});

bot.command('help', (ctx) => {
	console.log('Received /help command');
	ctx.reply('Send /start to start the bot.');
});

const app = express();
app.use(express.json());

app.use(webhookCallback(bot, 'express'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
