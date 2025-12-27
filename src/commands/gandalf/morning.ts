import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder
} from 'discord.js';

const MORNING = 'https://tenor.com/view/good-morning-good-morning-gandalf-morning-morning-gandalf-morn-gif-17912632';

export default {
    data: new SlashCommandSubcommandBuilder()
        .setName('morning')
        .setDescription('Do you wish to me a good morning?')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Target user')
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const targetUser = interaction.options.getUser('user');

        if (targetUser) {
            await interaction.reply(`${targetUser}[.](${MORNING})`);
        } else {
            await interaction.reply(MORNING);
        }
    }
};