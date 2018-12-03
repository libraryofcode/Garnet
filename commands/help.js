exports.run = (client, message, args, level) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    const Discord = require('discord.js');

    const embed1 = new Discord.RichEmbed();
    //embed1.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`);
    embed1.setColor('RANDOM');
    embed1.setDescription('You can visit [Garnet Help Manual](http://garnet.libraryofcode.ml:8800) to get a full list of commands!');
    embed1.setTitle(`${client.user.username} Help Manual`);
    embed1.setFooter(client.user.username, client.user.avatarURL);
    embed1.setTimestamp();
    message.channel.send(embed1);
  //  message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      const Discord = require('discord.js');
      const embed2 = new Discord.RichEmbed();
      //embed2.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`);
      embed2.setTitle(`${client.user.username} Help Manual`);
      embed2.setColor('RANDOM');
      embed2.addField('Command', `${command.help.name}`);
      embed2.addField('Description', `${command.help.description}`);
      embed2.addField('Usage', `${command.help.usage}`);
      embed2.setFooter(client.user.username, client.user.avatarURL);
      embed2.setTimestamp();
      message.channel.send(embed2);

      // message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"});
    }
  }
};

/* This was an idea by Flatbird, making this an embed, thank him. Not me.
*/

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 'User'
};

exports.help = {
  name: 'help',
  category: 'System',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};
