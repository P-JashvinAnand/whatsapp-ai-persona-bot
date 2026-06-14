module.exports = {

    // ─── Allowed Contacts ─────────────────────────────────────────────────────
    // Format: country code + number, NO spaces, NO + sign
    // India example: +91 98765 43210  →  '919876543210'

    allowedContacts: [
        '12345678910',   // ← Replace with real numbers
        '15468454684',
        '16848468434'
    ],

    // ─── LM Studio Model ──────────────────────────────────────────────────────
    // This must match the model name shown in LM Studio
    // You can find it in LM Studio → My Models tab
    // Common examples:
    //   'lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF'
    //   'mistral-7b-instruct-v0.2'
    //   'phi-3-mini-4k-instruct'
    // Use 'default' to auto-use whatever model is currently loaded

    model: 'default',

    // ─── Bot Personality ──────────────────────────────────────────────────────
    systemPrompt: `You are a helpful and friendly assistant. Answer the user's questions as best as you can. If you don't know the answer, say you don't know. Always be polite and concise.
    User: {user_input}
    Assistant:`,
    // ─── Fallback Message ─────────────────────────────────────────────────────
    errorMessage: "Sorry, i did't get you. I will connet to you later"
};
