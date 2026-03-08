const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const {
  WHATSAPP_TOKEN,
  WHATSAPP_PHONE_ID,
  VERIFY_TOKEN,
  PORT = 3000
} = process.env;

// Webhook verification — Meta sends a GET request to verify your endpoint
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified');
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// Incoming messages hit this endpoint
app.post('/webhook', async (req, res) => {
  try {
    const body = req.body;

    if (body.object !== 'whatsapp_business_account') {
      return res.sendStatus(404);
    }

    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const from = message.from; // sender's phone number
    const text = message.text?.body || '';

    console.log(`Message from ${from}: ${text}`);

    // Handle the message — add your own logic here
    const reply = handleMessage(text);
    await sendMessage(from, reply);

    res.sendStatus(200);
  } catch (err) {
    console.error('Error processing message:', err.message);
    res.sendStatus(500);
  }
});

// Your message handler — this is where you add your bot logic
function handleMessage(text) {
  const lower = text.toLowerCase().trim();

  if (lower === 'hi' || lower === 'hello' || lower === 'hey') {
    return "Hey! 👋 Thanks for getting in touch. How can we help?";
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
    return "We'd be happy to give you a quote. Could you tell us a bit about what you need?";
  }

  if (lower.includes('hours') || lower.includes('open')) {
    return "We're available Monday to Friday, 9am to 5pm. Drop us a message anytime though and we'll get back to you.";
  }

  // Default reply
  return "Thanks for your message! We'll get back to you shortly. If it's urgent, give us a ring.";
}

// Send a text message via WhatsApp Cloud API
async function sendMessage(to, text) {
  const url = `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_ID}/messages`;

  await axios.post(url, {
    messaging_product: 'whatsapp',
    to: to,
    type: 'text',
    text: { body: text }
  }, {
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  console.log(`Reply sent to ${to}`);
}

app.listen(PORT, () => {
  console.log(`WhatsApp bot running on port ${PORT}`);
});
