const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (args[0] === 'activation' || args[0] === 'activate') {
    const m1 = await message.channel.send('Authenticating...');
    const info = await client.activatedServers.get(args[1]).join('\n');
    //const guild = await client.guilds.get(info).name;

    const embed1 = new Discord.RichEmbed();
    embed1.setTitle('Activated Guilds List');
    embed1.addField('User', args[2]);
    embed1.setTimestamp();
    embed1.setFooter(client.user.username, client.user.avatarURL);
    //embed.addField('Guilds', `${guild} \`(${info})\``);
    if (info > 1) {
      embed1.addField('Guilds', info);
    } else {
      embed1.addField('Guilds', 'None');
    }
    await m1.edit(embed1);
  }
  
  else if (args[0] === 'guild' || args[0] === 'server') {
    const m2 = await message.channel.send('Authenticating...');

    try {
      const thisGuild = client.guilds.get(args[1]);
      if (!thisGuild) return m2.edit('I am not on this guild.');
      const owner = client.users.get(thisGuild.ownerID);

      function checkUserPermission(thisGuild) {
        const arrayOfPerms = [];
        if (thisGuild.me.hasPermission('ADMINISTRATOR')) {
          arrayOfPerms.push('Administrator');
        }
        if (thisGuild.me.hasPermission('MANAGE_GUILD')) {
          arrayOfPerms.push('Manage Server');
        }
        if (thisGuild.me.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
          arrayOfPerms.push('Manage Roles');
        }
        if (thisGuild.me.hasPermission('MANAGE_CHANNELS')) {
          arrayOfPerms.push('Manage Channels');
        }
        if (thisGuild.me.hasPermission('VIEW_AUDIT_LOG')) {
          arrayOfPerms.push('View Audit Logs');
        }
        if (thisGuild.me.hasPermission('KICK_MEMBERS')) {
          arrayOfPerms.push('Kick Members');
        }
        if (thisGuild.me.hasPermission('BAN_MEMBERS')) {
          arrayOfPerms.push('Ban Members');
        }
        if (thisGuild.me.hasPermission('MANAGE_NICKNAMES')) {
          arrayOfPerms.push('Manage Nicknames');
        }
        if (thisGuild.me.hasPermission('MANAGE_EMOJIS')) {
          arrayOfPerms.push('Manage Emojis');
        }
        if (thisGuild.me.hasPermission('MANAGE_WEBHOOKS')) {
          arrayOfPerms.push('Manage Webhooks');
        }
        if (thisGuild.me.hasPermission('MANAGE_MESSAGES')) {
          arrayOfPerms.push('Manage Messages');
        }
        if (thisGuild.me.hasPermission('MENTION_EVERYONE')) {
          arrayOfPerms.push('Mention Everyone');
        }
    
        return arrayOfPerms;
      }
      const embed2 = new Discord.RichEmbed();
      embed2.setTitle('Guild Information');
      embed2.setTimestamp();
      embed2.setFooter(client.user.username, client.user.avatarURL);
      embed2.setThumbnail(thisGuild.iconURL);
      embed2.addField('Name', thisGuild.name, true);
      embed2.addField('Owner', owner.tag, true);

      try {
        embed2.addField('Channels', thisGuild.channels.size, true);
      } catch (err) {
        console.log(err);
      }

      try {
        embed2.addField('Users', thisGuild.users.size, true);
      } catch (err) {
        embed2.addField('Users', err, true);
      }

      try {
        embed2.addField('Roles', thisGuild.roles.size, true);
      } catch (err) {
        console.log(err);
      }
    
      if (checkUserPermission(thisGuild).length > 0) {
        embed2.addField('My Permissions', `${checkUserPermission(thisGuild).join(', ')}`, true);
      }

      m2.edit(embed2);

    } catch (err) {
      m2.edit(err);
    }




    //return m2.edit(embed2);
    


  } 
  else {
    message.channel.send('Choose an option.');
  }
}; 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Systems Alpha/Dev Tester'
};
    
exports.help = {
  name: 'data',
  category: 'System',
  description: 'Gets specified data parameters.',
  usage: 'data [..paramaters]'
};
  