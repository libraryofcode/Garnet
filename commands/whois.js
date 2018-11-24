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
    message.channel.startTyping();
    try {
      //if (message.guild.members.size >= 250) message.guild.fetchMembers();
      //const friendly = client.config.permLevels.find(l => l.level === level).name;
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
        // It's like 1, 2, 3, just as easy as can be.

      }
      const millisJoined = new Date().getTime() - botuser.joinedAt.getTime();
      const dj = millisJoined / 1000 / 60 / 60 / 24;

      const millisJoined1 = new Date().getTime() - botuser.user.createdAt.getTime();
      const dj1 = millisJoined1 / 1000 / 60 / 60 / 24;

      function checkUserPermission(guild, botuser) {
        const arrayOfPerms = [];
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

      function staffFunction(botuser) {
        const staffArray = [];
  
        if (botuser.id === '278620217221971968') {
          staffArray.push('Founder & Creator');
        }
        if (['278620217221971968', '239261547959025665', '282586181856657409', '155698776512790528'].indexOf(botuser.id) >= 0) {
          staffArray.push('Developer');
        }
        if (['213632190557192192', '278620217221971968', '239261547959025665', '282586181856657409', '155698776512790528', '233667448887312385'].indexOf(botuser.id) > 0) {
          staffArray.push('Community Administrator');
        }
        if (['105412668122214400', '233667448887312385', '155698776512790528', '156450671338586112', '427479645395353600', '282586181856657409', '223391425302102016', '310092788630945793', '335871787453775873', '154497072148643840', '284713468790308885', '208688963936845824', '454749660041707531', '304594274182496258', '239261547959025665', '193118227348324363', '278620217221971968', '213632190557192192'].indexOf(botuser.id) > 0) {
          staffArray.push('Community Staff');
        }
        if (['213632190557192192', '278620217221971968', '454749660041707531', '310092788630945793', '282586181856657409', '427479645395353600', '155698776512790528', '233667448887312385'].indexOf(botuser.id) > 0) {
          staffArray.push('Support & Assistance');
        }
        if (['213632190557192192', '239261547959025665', '154497072148643840', '282586181856657409', '156450671338586112', '155698776512790528', '193118227348324363'].indexOf(botuser.id) > 0) {
          staffArray.push('Contributor');
        }
        if (['425023068004548618', '193118227348324363'].indexOf(botuser.id) >= 0) {
          staffArray.push('Tester & Early Adopter');
        }
  
        return staffArray;
      }
      //const joinPosition1 = message.channel.guild.members.map(i => i).sort((a, b) => a.joinedAt - b.joinedAt).indexOf(botuser);

      let aPerms;
      /*/const settings = message.settings = client.getGuildSettings(message.guild);
      const thisRole = botuser.roles.find(r => r.name === settings.modRole).id;*/

      if (botuser.permissions.has('MANAGE_MESSAGES')) {
        aPerms = 'Server Moderator';
      } 
      if (botuser.permissions.has('MANAGE_GUILD')) {
        aPerms = 'Server Manager';
      }
      if (botuser.permissions.has('ADMINISTRATOR')) {
        aPerms = 'Server Administrator';
      }
      if (botuser.id === message.guild.ownerID) {
        aPerms = 'Server Owner';
      }
      const options = {timeZone: 'America/New_York', hour12: true};
      const embed = new Discord.RichEmbed();
      embed.setAuthor(botuser.displayName, botuser.user.avatarURL);
      if (bot === 'Yes') {
        embed.setTitle('<:bot:515695746595684374>');
      }
      embed.setThumbnail(botuser.user.avatarURL);
      if (botuser.displayColor) {
        embed.setColor(botuser.displayColor);
      }
      embed.addField('Joined Server At', `${botuser.joinedAt.toLocaleString('en-US', options)} | ${dj.toFixed(0)} Days Ago`, true);
      const joinPosition3 = null; //joinPosition1 + 1;
      embed.addField('Join Position', joinPosition3, false);
      embed.addField('Created Account At', `${botuser.user.createdAt.toLocaleString('en-US', options)} | ${dj1.toFixed(0)} Days Ago`, true);
      embed.addField('Status', `${status[botuser.user.presence.status]}`, true);
      embed.addField('Playing', `${botuser.user.presence.game ? `${botuser.user.presence.game.name}` : 'Nothing'}`, true);
      if (botuser.roles.size - 1) {
        embed.addField(`Roles [${botuser.roles.size - 1}]`, `${myDick}`, true);
      }
      if (checkUserPermission(message.guild, botuser).length > 0) {
        embed.addField('Key Permissions', `${checkUserPermission(message.guild, botuser).join(', ')}`, true);
      }

      if (aPerms) {
        embed.addField('Acknowledgements', aPerms, true);
      }
      if (staffFunction(botuser).length) {
        embed.addField('Garnet Team', `${staffFunction(botuser).join(', ')}`, true);
      }
      embed.addField('System Level', `${level}`, true);
      embed.setTimestamp();
      embed.setFooter(`${client.user.username} | ID ${botuser.id}`);
      message.channel.send(embed);
      setTimeout(() => {
        // Removes the user from the set after a minute
        message.channel.stopTyping();
      }, 1000);
    } catch (err) {
      message.channel.send(`An error has happened during processing. | ${err}`);
      message.channel.stopTyping();
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