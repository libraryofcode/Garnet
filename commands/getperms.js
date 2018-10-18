const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : message.member;

  function checkUserPermission(guild, botuser) {
    const arrayOfPerms = [];
    if (message.guild.ownerID === botuser.id) {
      arrayOfPerms.push('**Owner**');
    }
    if (botuser.hasPermission('ADMINISTRATOR')) {
      arrayOfPerms.push('**Administrator**');

    }
    if (botuser.hasPermission('MANAGE_GUILD')) {
      arrayOfPerms.push('**Manage Server**');
    }
    if (botuser.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
      arrayOfPerms.push('**Manage Roles**');
    }
    if (botuser.hasPermission('MANAGE_CHANNELS')) {
      arrayOfPerms.push('**Manage Channels**');
    }
    if (botuser.hasPermission('VIEW_AUDIT_LOG')) {
      arrayOfPerms.push('**View Audit Logs**');
    }
    if (botuser.hasPermission('KICK_MEMBERS')) {
      arrayOfPerms.push('**Kick Members**');
    }
    if (botuser.hasPermission('BAN_MEMBERS')) {
      arrayOfPerms.push('**Ban Members**');
    }
    if (botuser.hasPermission('CREATE_INSTANT_INVITE')) {
      arrayOfPerms.push('Create Instant Invite');
    }
    if (botuser.hasPermission('CHANGE_NICKNAME')) {
      arrayOfPerms.push('Change Nickname');
    }
    if (botuser.hasPermission('VIEW_CHANNEL')) {
      arrayOfPerms.push('Read Channels');
    }
    if (botuser.hasPermission('SEND_MESSAGES')) {
      arrayOfPerms.push('Send Messages');
    }
    if (botuser.hasPermission('SEND_TTS_MESSAGES')) {
      arrayOfPerms.push('Send TTS Messages');
    }
    if (botuser.hasPermission('EMBED_LINKS')) {
      arrayOfPerms.push('Embed Links');
    }
    if (botuser.hasPermission('ATTACH_FILES')) {
      arrayOfPerms.push('Attach Files');
    }
    if (botuser.hasPermission('READ_MESSAGE_HISTORY')) {
      arrayOfPerms.push('Read Message History');
    }
    if (botuser.hasPermission('USE_EXTERNAL_EMOJIS')) {
      arrayOfPerms.push('Use External Emojis');
    }
    if (botuser.hasPermission('ADD_REACTIONS')) {
      arrayOfPerms.push('Add Reactions');
    }
    if (botuser.hasPermission('CONNECT')) {
      arrayOfPerms.push('Connect VC');
    }
    if (botuser.hasPermission('SPEAK')) {
      arrayOfPerms.push('Speak VC');
    }
    if (botuser.hasPermission('MUTE_MEMBERS')) {
      arrayOfPerms.push('**Mute Members VC**');
    }
    if (botuser.hasPermission('DEAFEN_MEMBERS')) {
      arrayOfPerms.push('**Deafen Members VC**');
    }
    if (botuser.hasPermission('MOVE_MEMBERS')) {
      arrayOfPerms.push('**Move Members VC**');
    }
    if (botuser.hasPermission('MANAGE_NICKNAMES')) {
      arrayOfPerms.push('**Manage Nicknames**');
    }
    if (botuser.hasPermission('MANAGE_EMOJIS')) {
      arrayOfPerms.push('**Manage Emojis**');
    }
    if (botuser.hasPermission('MANAGE_WEBHOOKS')) {
      arrayOfPerms.push('**Manage Webhooks**');
    }
    if (botuser.hasPermission('MANAGE_MESSAGES')) {
      arrayOfPerms.push('**Manage Messages**');
    }
    if (botuser.hasPermission('MENTION_EVERYONE')) {
      arrayOfPerms.push('**Mention Everyone**');
    }


    return arrayOfPerms;
  }  

  const embed = new Discord.RichEmbed();
  embed.setAuthor(client.user.username, client.user.avatarURL);
  embed.setTitle('Permissions');
  embed.setColor(botuser.displayHexColor);
  embed.addField('User', `${botuser.user.tag}`);
  embed.addField('Server Permissions', `${checkUserPermission(message.guild, botuser).join(', ')}`, true);
  embed.addField('Channel Permissions', `${message.channel.rolePermissions(botuser.roles.first()).toArray().join(', ')}`, true);
  embed.setTimestamp();
  embed.setFooter(client.user.username);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['perms'],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'getperms',
  category: 'Misc',
  description: 'Provides user permissions information.',
  usage: 'getperms [...user]'
};