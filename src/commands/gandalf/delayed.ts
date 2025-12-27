import {
    ChatInputCommandInteraction,
    SlashCommandSubcommandBuilder
} from 'discord.js';

const DELAYED = 'https://tenor.com/view/gandalf-delayed-lotr-lord-of-the-rings-the-delay-gif-17042438';

export default {
    data: new SlashCommandSubcommandBuilder()
        .setName('delayed')
        .setDescription('I\'m sorry frodo, I was delayed.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Target user')
                .setRequired(false)
        ),

    async execute(interaction: ChatInputCommandInteraction) {
        const targetUser = interaction.options.getUser('user');

        if (targetUser) {
            await interaction.reply(`${targetUser}[.](${DELAYED})`);
        } else {
            await interaction.reply(DELAYED);
        }
    }
};