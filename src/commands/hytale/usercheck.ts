import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder,
    EmbedBuilder,
    MessageFlags
} from 'discord.js';
import axios from 'axios';

const HYTALE_API_URL = 'https://accounts.hytale.com/api/account/username-reservations/availability';

export default {
    data: new SlashCommandSubcommandBuilder()
        .setName('usercheck')
        .setDescription('Check if a Hytale username is available')
        .addStringOption(option =>
            option
                .setName('username')
                .setDescription('The username to check')
                .setRequired(true)
                .setMinLength(3)
                .setMaxLength(16)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const username = interaction.options.getString('username', true);

        // Validate Hytale username restrictions: 3-16 characters, letters, numbers, and underscores only
        if (username.length < 3 || username.length > 16) {
            const errorEmbed = new EmbedBuilder()
                .setColor(0xED4245) // Red
                .setTitle('❌ Invalid Username Length')
                .setDescription(`Usernames must be between 3-16 characters. **${username}** is ${username.length} character${username.length !== 1 ? 's' : ''}.`)
                .setTimestamp();

            await interaction.editReply({ embeds: [errorEmbed] });
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            const errorEmbed = new EmbedBuilder()
                .setColor(0xED4245) // Red
                .setTitle('❌ Invalid Username Format')
                .setDescription('Usernames can only contain letters (a-z, A-Z), numbers (0-9), and underscores (_).')
                .setTimestamp();

            await interaction.editReply({ embeds: [errorEmbed] });
            return;
        }

        try {
            const response = await axios.get(HYTALE_API_URL, {
                params: { username },
                validateStatus: (status) => status === 200 || status === 400 // Accept both as valid responses
            });

            const isAvailable = response.status === 400; // 400 = not taken (available)
            const isTaken = response.status === 200;     // 200 = taken

            if (isAvailable) {
                const availableEmbed = new EmbedBuilder()
                    .setColor(0x57F287) // Green
                    .setTitle('✅ Username Available')
                    .setDescription(`The username **${username}** is available!`)
                    .addFields({
                        name: 'Next Steps',
                        value: 'You can reserve this username on [Hytale.com](https://hytale.com).'
                    })
                    .setTimestamp();

                await interaction.editReply({ embeds: [availableEmbed] });
            } else if (isTaken) {
                const takenEmbed = new EmbedBuilder()
                    .setColor(0xED4245) // Red
                    .setTitle('❌ Username Taken')
                    .setDescription(`The username **${username}** is already taken.`)
                    .addFields({
                        name: 'Try Again',
                        value: 'Consider adding numbers or underscores, or try a different username.'
                    })
                    .setTimestamp();

                await interaction.editReply({ embeds: [takenEmbed] });
            }

        } catch (error) {
            let errorMessage = 'Unknown error occurred';
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 429) {
                    errorMessage = 'Rate limited by Hytale API. Please try again later.';
                } else if (error.response?.status === 500) {
                    errorMessage = 'Hytale API is currently unavailable. Please try again later.';
                } else if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
                    errorMessage = 'Request timed out. Hytale API might be slow or unavailable.';
                } else {
                    errorMessage = `API Error: ${error.response?.status || error.message}`;
                }
            }

            const errorEmbed = new EmbedBuilder()
                .setColor(0xED4245) // Red
                .setTitle('❌ Error Checking Username')
                .setDescription(errorMessage)
                .setTimestamp();

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    }
};