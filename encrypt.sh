#!/bin/bash

echo "🔐 DotenvX Quick Setup Script"
echo "=============================="
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file first with your secrets."
    echo ""
    echo "Example .env file:"
    echo "DISCORD_TOKEN=your_bot_token_here"
    echo "CLIENT_ID=your_client_id_here"
    echo "DOUGH_API_TOKEN=your_dough_api_token_here"
    echo "OWNER_ID=your_discord_id"
    echo "FRIEND_IDS=id1,id2,id3"
    echo "DOUGH_API_URL=https://doughmination.win"
    exit 1
fi

echo "✅ Found .env file"
echo ""

# Check if dotenvx is installed
if ! command -v dotenvx &> /dev/null; then
    echo "📦 Installing dotenvx globally..."
    npm install -g @dotenvx/dotenvx
    echo ""
fi

echo "🔒 Encrypting .env file..."
dotenvx encrypt

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Check that .env.vault was created"
echo "2. Copy your DOTENV_PRIVATE_KEY to .env.keys file"
echo "3. Run: docker compose up -d"
echo ""
echo "🔐 IMPORTANT: Keep .env.keys LOCAL - DO NOT commit it!"