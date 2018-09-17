const Discord = require("discord.js");




exports.run = async (client, message) => {
    const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setTitle('Channel Information')
    .addField('Name', `${message.channel.name}`, true)
    .addField('Category', `${message.channel.parent.name}`, true)
    .addField('Topic', `${message.channel.topic}`, true)
    if (message.channel.topic != true) {
        embed.addField('Topic', 'None', true)
    }
    else {
        embed.addField('Topic', `${message.channel.topic}`, true)
    }
    embed.addField('Position', `${message.channel.calculatedPosition}`, true)
    embed.addField('Overrides', `${message.channel.permissionOverwrites.size}`, true)
    if (message.channel.nsfw === true) {
        embed.addField('NSFW', 'Yes', true)
    }
    embed.setFooter(client.user.username, client.user.avatarURL)
    message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "channelinfo",
    category: "Misc",
    description: "Provides information for the channel.",
    usage: "channel info"
  };