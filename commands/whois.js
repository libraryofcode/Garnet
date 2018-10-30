const client = require('../client.js');
/*const status = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline/Invisible'
};*/

module.exports = {
  name: 'whois',
  action: async (msg, args) => {
    const resolvedUser = (args[0] !== undefined) ? msg.channel.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
    const botuser = resolvedUser ? msg.channel.guild.members.get(resolvedUser.id) : msg.member;
    /*let bot = '';
    if (botuser.bot === true) {
      bot = 'Yes';
    } else {
      bot = 'No';
    }*/

    const millisJoined = new Date().getTime() - new Date (botuser.joinedAt).getTime();
    const dj = millisJoined / 1000 / 60 / 60 / 24;
    
    let thisPerms;
    function checkUserPermission(botuser, msg) {
      const arrayOfPerms = [];
      if (msg.channel.guild.ownerID === botuser.id) {
        arrayOfPerms.push('Owner');
      }
      if (botuser.permission.has('administrator')) {
        arrayOfPerms.push('Administrator');
      }
      if (botuser.permission.has('manageGuild')) {
        arrayOfPerms.push('Manage Server');
      }
      if (botuser.permission.has('manageRoles')) {
        arrayOfPerms.push('Manage Roles');
      }
      if (botuser.permission.has('manageChannels')) {
        arrayOfPerms.push('Manage Channels');
      }
      if (botuser.permission.has('viewAuditLogs')) {
        arrayOfPerms.push('View Audit Logs');
      }
      if (botuser.permission.has('kickMembers')) {
        arrayOfPerms.push('Kick Members');
      }
      if (botuser.permission.has('banMembers')) {
        arrayOfPerms.push('Ban Members');
      }
      if (botuser.permission.has('manageNicknames')) {
        arrayOfPerms.push('Manage Nicknames');
      }
      if (botuser.permission.has('manageEmojis')) {
        arrayOfPerms.push('Manage Emojis');
      }
      if (botuser.permission.has('manageWebhooks')) {
        arrayOfPerms.push('Manage Webhooks');
      }
      if (botuser.permission.has('manageMessages')) {
        arrayOfPerms.push('Manage Messages');
      }
      if (botuser.permission.has('mentionEveryone')) {
        arrayOfPerms.push('Mention Everyone');
      }


      return arrayOfPerms;
    }

    try { 
      if (checkUserPermission(botuser, msg).length > 0) {
        thisPerms = 'Unspecified';
      } else {
        thisPerms = checkUserPermission(botuser, msg);
      }
    } catch (err) {
      'Unspecified';
    }
    
    let staff;
    function staffFunction(botuser) {
      const staffArray = [];

      if (botuser.id === '278620217221971968') {
        staffArray.push('Moonglow Founder & Creator');
      }
      if (botuser.id === '278620217221971968' || '239261547959025665' || '282586181856657409' || '155698776512790528') {
        staffArray.push('Moonglow Developer');
      }
      if (botuser.id === '213632190557192192' || '278620217221971968' || '239261547959025665' || '282586181856657409' || '155698776512790528') {
        staffArray.push('Moonglow Community Administrator');
      }
      if (botuser.id === '213632190557192192' || '278620217221971968' || '454749660041707531' || '310092788630945793' || '282586181856657409' || '427479645395353600' || '155698776512790528') {
        staffArray.push('Moonglow Support');
      }
      if (botuser.id === '213632190557192192' || '239261547959025665' || '154497072148643840' || '282586181856657409' || '156450671338586112' || '155698776512790528') {
        staffArray.push('Moonglow Contributor');
      }

      return staffArray;
    }

    const joinPosition1 = msg.channel.guild.members.map(i => i).sort((a, b) => a.joinedAt - b.joinedAt).indexOf(botuser);
    
    try {
      if (staffFunction(botuser).length > 0) {
        return;
      } else {
        staff = staffFunction(botuser);
      }
    } catch (err) {
      return;
    }

    /*let highestRole;
    try {
      highestRole = botuser.roles.map(i => msg.channel.guild.roles.get(i)).filter(i => i.color).sort(function(a,b) { return b.position - a.position;})[0].color;
    } catch (err) {
      highestRole = 0x000000;
    }*/

    const joinPosition3 = joinPosition1 + 1;

    let gameName;
    try {
      gameName = botuser.game.name;
    } catch (err) {
      gameName = 'Unspecified';
    }

    /*
    *
    *
    * 
    * EMBED EMBED EMBED EMBED
    * */

    const embed = {
      author: {
        name: botuser.username,
        icon_url: botuser.avatarURL
      },
      thumbnail: {url: botuser.avatarURL},
      fields: [
        {
          name: 'Joined Server At',
          value: `${new Date (botuser.joinedAt).toLocaleString('en-US')} | ${dj.toFixed(0)} Days Ago`,
          inline: true
        },
        {
          name: 'Join Position',
          value: joinPosition3,
          inline: false
        },
        {
          name: 'Created Account At',
          value: new Date(botuser.createdAt).toLocaleString('en-us'),
          inline: true
        },
        {
          name: 'Playing',
          value: gameName,
          inline: true
        },
        {
          name: 'Key Permissions',
          value: thisPerms,
          inline: true
        },
        {
          name: 'Acknowledgements',
          value: 'NaN',
          inline: true
        },
        {
          name: 'Moonglow Team',
          value: staff,
          inline: true
        }
      ],
      timestamp: new Date(msg.createdAt),
      footer: {
        text: `${client.user.username} | User ID: ${botuser.id}`,
        icon_url: client.user.avatarURL
      }
    };

    msg.channel.createMesasge({embed: embed});




    
  }, options: {
    'description': 'Gets a specified user\'s information.'
  }
};