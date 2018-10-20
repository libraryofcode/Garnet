const Discord = require('discord.js');
const talkedRecently = new Set();
const status = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline/Invisible'
};
exports.run = async (client, message, args, level) => {
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  if (talkedRecently.has(message.author.id) && !message.member.roles.has('490364533550874644')) {

    const botmessage = await message.channel.send('You are being rate limited!' + message.author);
    botmessage.delete(10000);
  } else {
    if (resolvedUser)
      try {
        level = client.permlevel(resolvedUser.lastMessage);
      } catch (e) {
        level = 0;
      }
    const msg = await message.channel.send('Loading...');
    try {
      const friendly = client.config.permLevels.find(l => l.level === level).name;
      const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : message.member;
      const matt = resolvedUser ? message.guild.members.get(resolvedUser.id).roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1) : message.member.roles.sort((a, b) => b.position - a.position).map(i => i.id).slice(0, -1);
      let bot = '';
      let myDick = '';
      for (let i = 0; i < matt.length; i++) {
        myDick += '<@&' + matt[i] + '>';
        if (matt.length != (i + 1)) myDick += ', ';
      }
      if (botuser.user.bot === true) {
        bot = 'Yes';
      } else {
        bot = 'No';
      }
      const millisJoined = new Date().getTime() - botuser.joinedAt.getTime();
      const dj = millisJoined / 1000 / 60 / 60 / 24;

      //const joinPos = message.guild.members.sort((a,b) =>(a.joinedAt < b.joinedAt) ? -1 : ((a.joinedAt > b.joinedAt) ? 1 : 0)).map(m => m).findIndex(m => m.id == botuser.id);
      function checkUserPermission(guild, botuser) {
        const arrayOfPerms = [];
        if (message.guild.ownerID === botuser.id) {
          arrayOfPerms.push('Owner');
        }
        if (botuser.hasPermission('ADMINISTRATOR')) {
          arrayOfPerms.push('Administrator');

        }
        if (botuser.hasPermission('MANAGE_GUILD')) {
          arrayOfPerms.push('Manage Server');
        }
        if (botuser.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
          arrayOfPerms.push('Manage Roles');
        }
        if (botuser.hasPermission('MANAGE_CHANNELS')) {
          arrayOfPerms.push('Manage Channels');
        }
        if (botuser.hasPermission('VIEW_AUDIT_LOG')) {
          arrayOfPerms.push('View Audit Logs');
        }
        if (botuser.hasPermission('KICK_MEMBERS')) {
          arrayOfPerms.push('Kick Members');
        }
        if (botuser.hasPermission('BAN_MEMBERS')) {
          arrayOfPerms.push('Ban Members');
        }
        if (botuser.hasPermission('MANAGE_NICKNAMES')) {
          arrayOfPerms.push('Manage Nicknames');
        }
        if (botuser.hasPermission('MANAGE_EMOJIS')) {
          arrayOfPerms.push('Manage Emojis');
        }
        if (botuser.hasPermission('MANAGE_WEBHOOKS')) {
          arrayOfPerms.push('Manage Webhooks');
        }
        if (botuser.hasPermission('MANAGE_MESSAGES')) {
          arrayOfPerms.push('Manage Messages');
        }
        if (botuser.hasPermission('MENTION_EVERYONE')) {
          arrayOfPerms.push('Mention Everyone');
        }


        return arrayOfPerms;
      }
      const joinPosition1 = message.channel.guild.members.map(i => i).sort((a, b) => a.joinedAt - b.joinedAt).indexOf(botuser);
      /*function checkBots(guild) {
        let botCount = 0; 
        guild.members.forEach(member => { 
          if (member.user.bot) botCount++; 
        });
        return botCount; 
      }*/
      //const joinPosition2 = joinPosition1 - checkBots(message.guild);
      const options = {timeZone: 'America/New_York', hour12: true};
      const embed = new Discord.RichEmbed();
      embed.setAuthor(botuser.displayName, botuser.user.avatarURL);
      embed.setThumbnail(botuser.user.avatarURL);
      if (botuser.displayColor) {
        embed.setColor(botuser.displayColor);
      }
      embed.addField('Joined Server At', `${botuser.joinedAt.toLocaleString('en-US', options)} | ${dj.toFixed(0)} Days Ago`, true);
      /*if (joinPosition2 <= 10) {
        embed.addField('Join Position', joinPosition2, true);
      } else {
        embed.addField('Join Position', joinPosition1, true);
      }*/
      const joinPosition3 = joinPosition1 + 1;
      embed.addField('Join Position', joinPosition3, false);
      embed.addField('Created Account At', `${botuser.user.createdAt.toLocaleString('en-US')}`, true);
      embed.addField('Status', `${status[botuser.user.presence.status]}`, true);
      embed.addField('Playing', `${botuser.user.presence.game ? `${botuser.user.presence.game.name}` : 'Nothing'}`, true);
      if (botuser.roles.size - 1) {
        embed.addField(`Roles [${botuser.roles.size - 1}]`, `${myDick}`, true);
      }
      if (checkUserPermission(message.guild, botuser).length > 0) {
        embed.addField('Key Permissions', `${checkUserPermission(message.guild, botuser).join(', ')}`, true);
      }
      embed.addField('Acknowledgements', `${friendly}`, true);
      embed.addField('System Level', `${level}`, true);
      embed.setTimestamp();
      embed.setFooter(`${client.user.username} | ID ${botuser.id} |  Beta - Master`);
      if (bot == 'Yes') {
        embed.addField('Bot', `${bot}`, true);
      }
      msg.edit(embed);
    } catch (err) {
      msg.edit('EXCPT*- ' +
      err);
    }
    talkedRecently.add(message.author.id);
    setTimeout(() => {
    // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 2000);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['userinfo'],
  permLevel: 'Standard User'
};

exports.help = {
  name: 'whois',
  category: 'Misc',
  description: 'Provides user information.',
  usage: 'whois [...user]'
};