# 📱 WhatsApp AI Bot — LM Studio Edition
100% Free. Runs entirely on your PC. No API key. No subscription.

---

## ⚙️ Setup

### Step 1 — Prepare LM Studio
1. Open LM Studio
2. Go to **My Models** → make sure a model is downloaded
   - Recommended: search "Llama 3.1 8B Instruct" and download it (~5 GB)
3. Go to **Local Server** tab (left sidebar)
4. Click **Start Server** → you'll see "Server running on port 1234"
5. Keep LM Studio open in the background

### Step 2 — Install Node.js
Download from https://nodejs.org (LTS version)

### Step 3 — Install bot dependencies
```bash
cd whatsapp-bot-lmstudio
npm install
```

### Step 4 — Add your contacts
Open `config.js` and add phone numbers:
```js
allowedContacts: [
    '919876543210',  // your contact's number
]
```
Format: **country code + number, no + no spaces**

### Step 5 — Set the model name (optional)
In `config.js`, set `model` to the exact model name shown in LM Studio.
Leave it as `'default'` to auto-use the currently loaded model.

---

## 🚀 Run the Bot

```bash
npm start
```

1. QR code appears in terminal
2. Open WhatsApp → **Linked Devices** → **Link a Device** → scan QR
3. Bot is live ✅

---

## 📌 Every Time You Use It

```
1. Open LM Studio → Local Server → Start Server
2. Open terminal → npm start
3. Done!
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---|---|
| "fetch failed" / "ECONNREFUSED" | LM Studio server not running — start it first |
| Replies are very slow | Use a smaller model (Phi-3 Mini or Llama 3.2 3B) |
| "model not found" | Set correct model name in config.js or use 'default' |
| QR not showing | Run `npm install` again |
| Session expired | Delete `.wwebjs_auth` folder and restart |
