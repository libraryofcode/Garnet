const Discord = require('discord.js');
const web = require('../webhooks.json');
module.exports = async (client, message) => {
  if (message.author.bot) return;


  const settings = message.settings = client.getGuildSettings(message.guild);


  if (client.stats.get(`${message.member.id} | ${message.guild.id}`) === undefined) {
    client.stats.set(`${message.member.id} | ${message.guild.id}`, 1);
  } else {
    client.stats.inc(`${message.member.id} | ${message.guild.id}`);
  }

  if (message.guild) {
    const key = `${message.guild.id}-${message.author.id}`;
    client.credits.ensure(key, {
      user: message.author.id,
      guild: message.guild.id,
      credits: 0
    });
    client.credits.math(key, 'add', 0.48, 'credits');
  }
  

 
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.channel.send(`Hi, ${message.author.tag}, my prefix on this guild is \`${settings.prefix}\``);
  }


  const thisAdminPrefix = settings.adminPrefix.toString();
  //const command = args.shift().toLowerCase();                   278620217221971968   ['278620217221971968', '239261547959025665', '282586181856657409', '155698776512790528']
  if (message.content.startsWith(thisAdminPrefix) && !message.content.startsWith(settings.prefix) && message.author.id === '278620217221971968' || message.author.id === '155698776512790528' || message.author.id === '282586181856657409' || message.author.id === '239261547959025665' || message.author.id === '213632190557192192') {
    const args = message.content.slice(thisAdminPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const level = client.permlevel(message);
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly) return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');
    while (args[0] && args[0][0] === '-') {
      message.flags.push(args.shift().slice(1));
    }

    const hook = new Discord.WebhookClient(web.commandLogID, web.commandLogToken);
    const staffHook = new Discord.WebhookClient(web.staffCommandLogID, web.staffCommandLogToken);
    const embed = new Discord.RichEmbed();
    embed.setTitle('COMMAND EXECUTED');
    embed.setDescription('**COMMAND RAN WITH ADMINISTRATIVE PRIVILEGES**');
    embed.addField('User', `${message.author.username} \`(${message.author.id})\``, true);
    embed.addField('User Permissions', client.config.permLevels.find(l => l.level === level).name, true);
    embed.addField('Command', cmd.help.name, true);
    try {
      embed.addField('Content', message.content, true);
      embed.addField('Guild', `${message.guild.name} \`(${message.guild.id})\``, true);
      embed.addField('Channel', `${message.channel.name} \`(${message.channel.id})\``, true);
    } catch (error) {
      console.log(error);
    }
    embed.setFooter(client.user.username, client.user.avatarURL);
    embed.setTimestamp();
    staffHook.send(embed);
    hook.send(embed);
    cmd.run(client, message, args, level);
  } else {

    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  

    const command = args.shift().toLowerCase();

    if (message.guild && !message.member) await message.guild.fetchMember(message.author);
    const level = client.permlevel(message);

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send('This command is unavailable via private message. Please run this command in a guild.');

    if (level < client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice === 'true') {
        return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} **(${client.config.permLevels.find(l => l.level === level).name})**
  This command requires level ${client.levelCache[cmd.conf.permLevel]} **(${cmd.conf.permLevel})**`);
      } else {
        return;
      }
    }

    message.author.permLevel = level;
  
    message.flags = [];
    while (args[0] && args[0][0] === '-') {
      message.flags.push(args.shift().slice(1));
    }
    client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  
    const hook = new Discord.WebhookClient(web.commandLogID, web.commandLogToken);
    const staffHook = new Discord.WebhookClient(web.staffCommandLogID, web.staffCommandLogToken);
    const embed = new Discord.RichEmbed();
    embed.setTitle('COMMAND EXECUTED');
    embed.addField('User', `${message.author.username} \`(${message.author.id})\``, true);
    embed.addField('User Permissions', client.config.permLevels.find(l => l.level === level).name, true);
    embed.addField('Command', cmd.help.name, true);
    try {
      embed.addField('Content', message.content, true);
      embed.addField('Guild', `${message.guild.name} \`(${message.guild.id})\``, true);
      embed.addField('Channel', `${message.channel.name} \`(${message.channel.id})\``, true);
    } catch (error) {
      console.log(error);
    }
    embed.setFooter(client.user.username, client.user.avatarURL);
    embed.setTimestamp();
    staffHook.send(embed);
    hook.send(embed);

    cmd.run(client, message, args, level);
  }
};
