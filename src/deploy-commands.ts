import { REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
import { loadCommands } from './handlers/commandHandler';

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token || !clientId) {
    console.error('Missing DISCORD_TOKEN or CLIENT_ID in .env file');
    process.exit(1);
}

async function deployCommands() {
    try {
        const commands = await loadCommands();
        const commandData = Array.from(commands.values()).map(cmd => {
            const json = cmd.data.toJSON();
            // Set integration types for user-installable app
            json.integration_types = [0, 1]; // GUILD_INSTALL (0), USER_INSTALL (1)
            json.contexts = [0, 1, 2];       // GUILD (0), BOT_DM (1), PRIVATE_CHANNEL (2)
            return json;
        });

        console.log(`Started refreshing ${commandData.length} application commands.`);

        const rest = new REST().setToken(token!);

        const data = await rest.put(
            Routes.applicationCommands(clientId!),
            { body: commandData }
        ) as any[];

        console.log(`Successfully reloaded ${data.length} application commands.`);
        console.log('ℹ️  Integration Types: GUILD_INSTALL (0), USER_INSTALL (1)');
        console.log('ℹ️  Contexts: GUILD (0), BOT_DM (1), PRIVATE_CHANNEL (2)');
    } catch (error) {
        console.error('Error deploying commands:', error);
        process.exit(1);
    }
}

deployCommands();