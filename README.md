# 📱 WhatsApp AI Persona Bot — LM Studio Edition

> Runs a WhatsApp bot that replies **as you** — mimicking your texting style using a local AI model.
> 100% Free. No API key. No subscription. Runs entirely on your PC.

---

## 🧠 How It Works

1. Someone messages the WhatsApp account the bot is linked to
2. The bot picks it up, sends it to a local AI model (via LM Studio)
3. The AI replies in your texting style
4. Only your **allowed contacts** get a reply — everyone else is ignored

---

## ⚙️ Setup Guide

### Step 1 — Install LM Studio
1. Download from [lmstudio.ai](https://lmstudio.ai)
2. Open LM Studio → go to **My Models** tab
3. Search for **"Llama 3.1 8B Instruct"** and download it (~5 GB)
   - Want faster replies? Use **Phi-3 Mini** or **Llama 3.2 3B** instead
4. Go to **Local Server** tab (left sidebar)
5. Click **Start Server** → you'll see `Server running on port 1234`
6. Keep LM Studio open in the background while the bot runs

---

### Step 2 — Install Node.js
Download the **LTS version** from [nodejs.org](https://nodejs.org) and install it.

---

### Step 3 — Clone and Install the Bot

```bash
git clone https://github.com/P-JashvinAnand/whatsapp-ai-persona-bot.git
cd whatsapp-ai-persona-bot
npm install
```

---

### Step 4 — Create your config file

Copy the example config:
```bash
cp config.example.js config.js
```

Then open `config.js` in any text editor.

---

### Step 5 — Find your contact's ID from the terminal

> ⚠️ WhatsApp doesn't always use regular phone numbers internally.
> You need to use the **exact ID** that WhatsApp assigns to each contact.
> Here's how to find it:

1. **Temporarily allow all contacts** by commenting out the filter in `index.js`:
   ```js
   // if (!config.allowedContacts.includes(senderNumber)) return;
   ```

2. Run the bot:
   ```bash
   npm start
   ```

3. Scan the QR code in WhatsApp → **Linked Devices** → **Link a Device**

4. Ask your contact to **send a message** to the linked WhatsApp number

5. Look at the terminal — you'll see a line like:
   ```
   DEBUG number: 919876543210  | from: 919876543210@c.us
   ```
   or sometimes a longer ID like:
   ```
   DEBUG number: 28561650008192  | from: 28561650008192@lid
   ```

6. Copy that number from the terminal and paste it into `config.js`:
   ```js
   allowedContacts: [
       '919876543210',   // use the number shown in terminal, not your regular contact number
   ]
   ```

7. **Re-enable the filter** in `index.js` (remove the `//` you added earlier)

> 💡 Always use the ID shown in the terminal — not the regular phone number format.
> They may look the same or completely different depending on the contact.

---

### Step 6 — Customize the Bot Personality

In `config.js`, edit the `systemPrompt` to match your texting style:

```js
systemPrompt: `You are [Your Name]. Replicate their exact texting style.
Style rules:
- keep it very short
- mostly lowercase
- use casual language`
```

---

## 🚀 Running the Bot

```bash
npm start
```

1. QR code appears in terminal
2. Open WhatsApp → **Linked Devices** → **Link a Device** → scan the QR
3. Bot is live ✅

---

## 📌 Every Time You Use It

```
1. Open LM Studio → Local Server tab → Start Server
2. Open terminal in project folder → npm start
3. Scan QR if asked
4. Done!
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---|---|
| `fetch failed` / `ECONNREFUSED` | LM Studio server is not running — start it first |
| Replies are very slow | Switch to a smaller model like Phi-3 Mini or Llama 3.2 3B |
| `model not found` | Set the correct model name in `config.js` or just use `'default'` |
| QR code not showing | Run `npm install` again |
| Session expired | Delete the `.wwebjs_auth` folder and restart |
| Bot replies to everyone | Make sure the allowed contacts filter is not commented out in `index.js` |
| Contact ID not matching | Use the exact ID shown in the terminal `DEBUG number:` line |

---

## 📁 Project Structure

```
whatsapp-ai-persona-bot/
├── index.js          # Main bot logic
├── config.js         # Your private config (not uploaded to GitHub)
├── config.example.js # Template — copy this to create config.js
├── package.json      # Dependencies
└── README.md         # This file
```

---

## 📜 License

MIT — free to use and modify.
