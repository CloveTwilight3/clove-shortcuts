import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder
} from 'discord.js';

const SPIDERJUMP = 'https://tenor.com/view/spider-hole-spiderjump-spider-jump-wolf-gif-10472879830386971992';

export default {
    data: new SlashCommandSubcommandBuilder()
        .setName('burrow')
        .setDescription('[Arachnophobia warning] Annoy the burrow.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Target User')
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const targetUser = interaction.options.getUser('user');

        if (targetUser) {
            await interaction.reply(`${targetUser}[.](${SPIDERJUMP})`);
        } else {
            await interaction.reply(SPIDERJUMP);
        }
    }
};