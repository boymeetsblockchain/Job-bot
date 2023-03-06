// Import the SlashCommandBuilder class from the discord.js library
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
     // Define the command's data using the SlashCommandBuilder
  data: new SlashCommandBuilder()
    .setName('addnewjob')
    .setDescription('adds a new job to the job section')
    .addChannelOption((option) =>
      option.setName('from_channel').setDescription('The channel to send the message from').setRequired(true)
    )
    .addChannelOption((option) =>
      option.setName('to_channel').setDescription('The channel to send the message to').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('title').setDescription('The title of the job').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('description').setDescription('The description of the job').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('color').setDescription('The color of the  message (hex code, e.g. #FF0000)')
    )
    .addStringOption((option) =>
      option.setName('links').setDescription('A comma-separated list of links to display as fields in the embedded message')
    )
    .addStringOption((option) => option.setName('type').setDescription('The type of job'))
    .addStringOption((option) => option.setName('salary').setDescription('The salary range of the job'))
    .addStringOption((option) => option.setName('location').setDescription('The location of the job')),
  
    // Define the command's execute function
    async execute(interaction) {
    
    // Retrieve the values of the command's options
    const fromChannel = interaction.options.getChannel('from_channel');
    const toChannel = interaction.options.getChannel('to_channel');
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const color = interaction.options.getString('color') || null;
    const links = interaction.options.getString('links') || '';
    const type = interaction.options.getString('type') || '';
    const salary = interaction.options.getString('salary') || '';
    const location = interaction.options.getString('location') || '';
  
    await fromChannel.messages.fetch();
    const embed = {
      title: title,
      description: description,
      color: color,
      fields: [],
    };
    if (type) {
      embed.fields.push({
        name: 'Type',
        value: type,
      });
    }
    if (salary) {
      embed.fields.push({
        name: 'Salary',
        value: salary,
      });
    }
    if (location) {
      embed.fields.push({
        name: 'Location',
        value: location,
      });
    }
    if (links) {
      const linkList = links.split(',');
      linkList.forEach((link) => {
        embed.fields.push({
          name: link.trim(),
          value: '[Click here to apply](' + link.trim() + ')',
        });
      });
    }
    const sentMessage = await toChannel.send({ embeds: [embed] });

    await interaction.reply(`Sent embedded message \`${title}\` from ${fromChannel} to ${toChannel}`);
  },
};
