const client = require('../client.js');
const regions = {
  'us-east': 'US East',
  'vip-us-east': 'US East `VIP`',
  'us-south': 'US South',
  'vip-us-south': 'US South `VIP`', 
  'vip-us-west': 'US West `VIP`',
  'us-west': 'US West',
  'us-central': 'US Central',
  'vip-us-central': 'US Central `VIP`',
  'sydney': 'Sydney',
  'vip-sydney': 'Sydney `VIP`',
  'southafrica': 'South Africa',
  'vip-southafrica': 'South Africa `VIP`',
  'singapore': 'Singapore',
  'vip-singapore': 'Singapore `VIP`',
  'russia': 'Russia',
  'vip-russia': 'Russia `VIP`',
  'japan': 'Japan',
  'vip-japan': 'Japan `VIP`',
  'hongkong': 'Hong Kong',
  'vip-hongkong': 'Hong Kong `VIP`',
  'eu-west': 'EU West',
  'vip-eu-west': 'EU West `VIP`',
  'eu-central': 'EU Central',
  'vip-eu-central': 'EU Central `VIP`',
  'brazil': 'Brazil',
  'vip-brazil': 'Brazil `VIP`',
};

module.exports = {
  name: 'serverinfo',
  action: (msg) => { //eslint-disable-line
    msg.channel.sendTyping();
    
    const ownerUsername = msg.channel.guild.members.get(msg.channel.guild.ownerID).user.username;
    const ownerDiscrim = msg.channel.guild.members.get(msg.channel.guild.ownerID).user.discriminator;
    const thisVL = msg.channel.guild.verificationLevel;
    let mVL;

    switch (thisVL) {
      default:
      case 0: {
        mVL = 'None';
        break;
      }
      case 1: {
        mVL = 'Low';
        break;
      }
      case 2: {
        mVL = 'Medium';
        break;
      }
      case 3: {
        mVL = 'Medium High';
        break;
      }
      case 4: {
        mVL = 'High';
        break;
      }
    }

    return msg.channel.createMessage({
      title: 'Server Info',
      author: {
        name: msg.channel.guild.name,
        icon_url: msg.channel.guild.iconURL
      },
      //thumbnail: {url: msg.channel.guild.iconURL}, 
      fields: [
        {
          name: 'Server Owner',
          value: `${ownerUsername}#${ownerDiscrim}`,
          inline: true
        }, 
        {
          name: 'Server Region',
          value: regions[msg.channel.guild.region],
          inline: true
        },
        {
          name: 'Created',
          value: new Date(msg.channel.guild.createdAt).toLocaleString('en-US'),
          inline: true 
        }, 
        {
          name: 'Roles',
          value: msg.channel.guild.roles.size,
          inline: true
        },
        {
          name: 'Emojis',
          value: msg.channel.guild.emojis.length,
          inline: true
        },
        {
          name: 'Members',
          value: msg.channel.guild.memberCount,
          inline: true
        },
        {
          name: 'Humans',
          value: msg.channel.guild.members.filter(m => !m.bot).length,
          inline: true
        },
        {
          name: 'Bots',
          value: msg.channel.guild.members.filter(m => m.bot).length,
          inline: true
        },
        {
          name: 'Verification Level',
          value: mVL,
          inline: true
        }
      ],
      timestamp: new Date(msg.createdAt),
      footer: {
        text: client.user.username,
        icon_url: client.user.avatarURL
      }
    });
  },
  options: {
    'description': 'Provides server information.',
    'fullDescription': 'This command provides server information for the guild it was triggered in.',
    'usage': 'serverinfo'
  }
};  