import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder
} from 'discord.js';

const CHOMP = 'https://tenor.com/view/cat-stare-catstare-cat-stare-sus-catglare-cat-glare-gif-14942558849944709546';

export default {
    data: new SlashCommandSubcommandBuilder()
        .setName('sideeye')
        .setDescription('That\'s sus...')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Target User')
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const targetUser = interaction.options.getUser('user');

        if (targetUser) {
            await interaction.reply(`${targetUser}[.](${CHOMP})`);
        } else {
            await interaction.reply(CHOMP);
        }
    }
};