import { ApplicationCommandType, ContextMenuCommandBuilder, MessageContextMenuCommandInteraction } from 'discord.js';
import { MessageContextMenuCommand } from '../types/Command';

const CHEESE_GIF = 'https://cdn.discordapp.com/attachments/1427240630798782514/1446510314018439271/image0.gif';

export const command: MessageContextMenuCommand = {
  data: new ContextMenuCommandBuilder()
    .setName('Cheese')
    .setType(ApplicationCommandType.Message),
  
  async execute(interaction: MessageContextMenuCommandInteraction) {
    const targetMessage = interaction.targetMessage;
    const targetUser = targetMessage.author;
    
    // Ping the message author with hidden link
    await interaction.reply(`${targetUser} [.](${CHEESE_GIF})`);
  }
};