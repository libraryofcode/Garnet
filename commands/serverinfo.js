const client = require('../client.js');
module.exports = {
  name: 'serverinfo',
  action: async (msg, message, channel) => { //eslint-disable-line
    msg.channel.sendTyping();


    function checkBots(msg, channel) { //eslint-disable-line
      let botCount = 0; 
      msg.channel.guild.members.forEach(member => { 
        if (member.user.bot) botCount++; 
      });
      return botCount; 
    }
    function checkMembers(msg, channel) { //eslint-disable-line
      let memberCount = 0;
      msg.channel.guild.members.forEach(member => {
        if (!member.user.bot) memberCount++; 
      });

      return memberCount;
    }

    const guild = msg.channel.guild;
    function checkRegion(msg, channel) { // eslint-disable-line no-unused-vars
      const server = msg.channel.guild;
      const regionArray = [];
      if (server.region === 'us-east' ) {
        regionArray.push('US East');
      }
      if (server.region === 'vip-us-east') {
        regionArray.push('US East `VIP`');
      }
      if (server.region === 'us-south') {
        regionArray.push('US South');
      }
      if (server.region === 'vip-us-south') {
        regionArray.push('US South `VIP`');
      }
      if (server.region === 'us-west') {
        regionArray.push('US West');
      }
      if (server.region === 'vip-us-west') {
        regionArray.push('US West `VIP`');
      }
      if (server.region === 'us-central') {
        regionArray.push('US Central');
      }
      if (server.region === 'vip-us-central') {
        regionArray.push('US Central `VIP`');
      }
      if (server.region === 'sydney') {
        regionArray.push('Sydney');
      }
      if (server.region === 'vip-sydney') {
        regionArray.push('Sydney `VIP`');
      }
      if (server.region === 'southafrica') {
        regionArray.push('South Africa');
      }
      if (server.region === 'vip-southafrica') {
        regionArray.push('South Africa `VIP`');
      }
      if (server.region === 'singapore') {
        regionArray.push('Singapore');
      }
      if (server.region === 'vip-singapore') {
        regionArray.push('Singapore `VIP`');
      }
      if (server.region === 'russia') {
        regionArray.push('Russia');
      }
      if (server.region === 'vip-russia') {
        regionArray.push('Russia `VIP`');
      }
      if (server.region === 'japan') {
        regionArray.push('Japan');
      }
      if (server.region === 'vip-japan') {
        regionArray.push('Japan `VIP`');
      }
      if (server.region === 'hongkong') {
        regionArray.push('Hong Kong');
      }
      if (server.region === 'vip-hongkong') {
        regionArray.push('Hong Kong `VIP`');
      }
      if (server.region === 'eu-west') {
        regionArray.push('EU West');
      }
      if (server.region === 'vip-eu-west') {
        regionArray.push('EU West `VIP`');
      }
      if (server.region === 'eu-central') {
        regionArray.push('EU Central');
      }
      if (server.region === 'vip-eu-central') {
        regionArray.push('EU Central `VIP`');
      }
      if (server.region === 'brazil') {
        regionArray.push('Brazil');
      }
      if (server.region === 'vip-brazil') {
        regionArray.push('Brazil `VIP`');
      }

      return regionArray;
    }
    const ownerUsername = msg.channel.guild.members.get(msg.channel.guild.ownerID).user.username;
    const ownerDiscrim = msg.channel.guild.members.get(msg.channel.guild.ownerID).user.discriminator;

    const thisVL = msg.channel.guild.verificationLevel;
    let mVL;
    if (thisVL === 0) {
      mVL = 'None';
    }
    if (thisVL === 1) {
      mVL = 'Low';
    }
    if (thisVL === 2) {
      mVL = 'Medium';
    }
    if (thisVL === 3) {
      mVL = 'Medium High';
    }
    if (thisVL === 4) {
      mVL = 'High';
    }

    const embed = {
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
          value: `${checkRegion(msg, guild)}`,
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
          value: checkMembers(msg),
          inline: true
        },
        {
          name: 'Bots',
          value: checkBots(msg),
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
    };

    msg.channel.createMessage({embed});

  },
  options: {
    'description': 'Provides server information.',
    'fullDescription': 'This command provides server information for the guild it was triggered in.',
    'usage': 'serverinfo'
  }
};  