const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const config = require('./config');

// ─── Per-contact conversation memory ──────────────────────────────────────────
const conversationHistory = {};

// ─── Call LM Studio Local Server ──────────────────────────────────────────────
// LM Studio runs an OpenAI-compatible API at http://localhost:1234
async function getAIReply(senderNumber, userMessage) {

    // Build message history for this contact
    const messages = [
        { role: 'system', content: config.systemPrompt },
        ...conversationHistory[senderNumber]
    ];

    const response = await fetch('http://localhost:1234/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: config.model,   // any model loaded in LM Studio
            messages: messages,
            max_tokens: 300,
            temperature: 0.7,
            stream: false
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`LM Studio error: ${err}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

// ─── WhatsApp Client ───────────────────────────────────────────────────────────
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    }
});

// ─── QR Code ───────────────────────────────────────────────────────────────────
client.on('qr', (qr) => {
    console.log('\n📱 Scan this QR in WhatsApp → Linked Devices → Link a Device\n');
    qrcode.generate(qr, { small: true });
});

// ─── Ready ─────────────────────────────────────────────────────────────────────
client.on('ready', () => {
    console.log('\n✅ WhatsApp Bot is live!\n');
    console.log('🤖 Using LM Studio model:', config.model);
    console.log('👥 Allowed contacts:', config.allowedContacts.join(', '));
    console.log('─'.repeat(50));
    console.log('⚠️  Make sure LM Studio Local Server is running on port 1234\n');
});

// ─── Incoming Message ──────────────────────────────────────────────────────────
client.on('message', async (message) => {

    // 1. Skip group message
    if (message.from.includes('@g.us')) return;

    // 2. Extract phone number
const senderNumber = message.from.replace('@c.us', '').replace('@lid', '');
console.log('DEBUG number:', senderNumber, '| from:', message.from);

    // 3. Only reply to allowed contacts
    if (!config.allowedContacts.includes(senderNumber)) {
        console.log(`⏭️  Ignored message from ${senderNumber}`);
        return;
    }

    //console.log(`\n📩 [${senderNumber}]: ${message.body}`);

    // 4. Init history for this contact
    if (!conversationHistory[senderNumber]) {
        conversationHistory[senderNumber] = [];
    }

    // 5. Add incoming message to history
    conversationHistory[senderNumber].push({
        role: 'user',
        content: message.body
    });

    // 6. Keep last 10 messages to avoid slow responses
    if (conversationHistory[senderNumber].length > 10) {
        conversationHistory[senderNumber] = conversationHistory[senderNumber].slice(-10);
    }

    try {
        // 7. Show typing indicator
        const chat = await message.getChat();
        await chat.sendStateTyping();

        // 8. Get reply from LM Studio
        const reply = await getAIReply(senderNumber, message.body);

        // 9. Save reply to history
        conversationHistory[senderNumber].push({
            role: 'assistant',
            content: reply
        });

        // 10. Send reply
        await chat.sendMessage(reply);
        console.log(`✅ Replied: ${reply}`);


    } catch (error) {
        console.error('❌ Error:', error.message);

        // Check if LM Studio server is not running
        if (error.message.includes('fetch failed') || error.message.includes('ECONNREFUSED')) {
            console.error('💡 Is LM Studio Local Server running? Start it in LM Studio → Local Server tab → Start Server');
            await message.reply("Sorry, I'm offline right now. Try again later! 🙏");
        } else {
            await message.reply(config.errorMessage);
        }
    }
});

// ─── Disconnected ──────────────────────────────────────────────────────────────
client.on('disconnected', (reason) => {
    console.log('❌ WhatsApp disconnected:', reason);
    console.log('🔄 Restart the bot to reconnect.');
});

// ─── Start ─────────────────────────────────────────────────────────────────────
console.log('🚀 Starting WhatsApp AI Bot (LM Studio)...');
client.initialize();
