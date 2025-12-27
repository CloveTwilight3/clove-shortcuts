import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder
} from 'discord.js';

const MIKU67 = 'https://tenor.com/view/hatsune-miku-67-67-meme-67-kid-fortnite-gif-3262181143038603091';

export default {
    data: new SlashCommandSubcommandBuilder()
        .setName('miku67')
        .setDescription('67!')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Target User')
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const targetUser = interaction.options.getUser('user');

        if (targetUser) {
            await interaction.reply(`${targetUser}[.](${MIKU67})`);
        } else {
            await interaction.reply(MIKU67);
        }
    }
};