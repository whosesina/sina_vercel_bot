const { Telegraf } = require('telegraf');

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('BOT_TOKEN not set');

const bot = new Telegraf(token);

// دستورات نمونه
bot.start((ctx) => ctx.reply('سلام! ربات روشنه ✅'));
bot.on('text', (ctx) => ctx.reply(ctx.message.text));

// هندلر سرورلس برای Vercel
module.exports = async (req, res) => {
if (req.method === 'GET') {
res.status(200).send('OK');
return;
}
// بررسی توکن مخفی وبهوک از هدر
const secret = process.env.WEBHOOK_SECRET;
const headerToken = req.headers['x-telegram-bot-api-secret-token'];
if (secret && headerToken !== secret) {
res.status(401).send('unauthorized');
return;
}
try {
await bot.handleUpdate(req.body);
res.status(200).end();
} catch (err) {
console.error('Error handling update:', err);
res.status(500).send('error');
}
};