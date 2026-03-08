# WhatsApp Bot Template

A starter template for building WhatsApp Business API bots with Node.js. Handles incoming messages, sends replies, and gives you a clean structure to build on.

This isn't a full product — it's a starting point. Fork it, customise it, ship it.

## Quick Start

```bash
git clone https://github.com/Hand-On-Web-Ltd/whatsapp-bot-template.git
cd whatsapp-bot-template
npm install
cp .env.example .env
# Fill in your WhatsApp Business API credentials
npm start
```

## What's Included

- Express server that receives WhatsApp webhooks
- Message handler with a simple routing pattern
- Webhook verification endpoint (required by Meta)
- Environment config for API keys and tokens
- Clean project structure you can actually build on

## Setup

You'll need:
1. A [Meta Developer Account](https://developers.facebook.com/)
2. A WhatsApp Business API app set up in Meta's dashboard
3. Your phone number ID, access token, and verify token

Copy `.env.example` to `.env` and fill in your credentials.

## Project Structure

```
├── index.js          # Main server + webhook handler
├── package.json
├── .env.example      # Template for environment variables
└── LICENSE
```

## How It Works

1. Meta sends incoming messages to your webhook URL
2. The server verifies the webhook (GET request) and processes messages (POST request)
3. Your handler function gets the message text and sender info
4. You send a reply back through the WhatsApp Cloud API

## Deploying

Works on any Node.js host — Railway, Render, a VPS, whatever. Just make sure your webhook URL is publicly accessible and registered in Meta's dashboard.

## About Hand On Web
We build AI chatbots, voice agents, and automation tools for businesses.
- 🌐 [handonweb.com](https://www.handonweb.com)
- 📧 outreach@handonweb.com
- 📍 Chester, UK

## Licence
MIT
