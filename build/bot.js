import { Bot, InlineKeyboard, webhookCallback } from 'grammy';
import 'dotenv/config';
import express from 'express';
const bot = new Bot(process.env.BOT_TOKEN);
await bot.api.setMyCommands([
    { command: 'start', description: 'Start the bot' },
    { command: 'help', description: 'Show help text' },
    { command: 'report', description: 'Report' },
]);
bot.command('start', async (ctx) => {
    const keyboard = new InlineKeyboard()
        .url('Open Mini App', 'https://t.me/bot_nextjs_bot/start')
        .row()
        .text('Explore Guide', 'explore_guide')
        .row()
        .text('Tap to Earn', 'tap_to_earn');
    await ctx.replyWithPhoto('https://grammy.dev/images/grammY.png', {
        caption: 'Welcome to TapSwap! Tap on the buttons below to get started.',
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
