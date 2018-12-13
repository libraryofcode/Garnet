const Discord = require('discord.js');
const talkedRecently = new Set();
const checkPrem = require('../db/functions/checkPrem.js');
exports.run = async (client, message) => {
  if (talkedRecently.has(message.author.id) && !message.member.roles.has('490364533550874644')) {

    message.channel.send('You are being rate limited!' + message.author);
  } else { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send('Loading...');
    function checkBots(guild) {
      let botCount = 0; 
      guild.members.forEach(member => { 
        if (member.user.bot) botCount++; 
      });
      return botCount; 
    }
    function checkMembers(guild) {
      let memberCount = 0;
      guild.members.forEach(member => {
        if (!member.user.bot) memberCount++; 
      });
      return memberCount;
    }

    const guild = message.guild;
    function checkRegion(message, guild) { // eslint-disable-line no-unused-vars
      const regionArray = [];
      if (message.guild.region === 'us-east' ) {
        regionArray.push('US East');
      }
      if (message.guild.region === 'vip-us-east') {
        regionArray.push('US East `VIP`');
      }
      if (message.guild.region === 'us-south') {
        regionArray.push('US South');
      }
      if (message.guild.region === 'vip-us-south') {
        regionArray.push('US South `VIP`');
      }
      if (message.guild.region === 'us-west') {
        regionArray.push('US West');
      }
      if (message.guild.region === 'vip-us-west') {
        regionArray.push('US West `VIP`');
      }
      if (message.guild.region === 'us-central') {
        regionArray.push('US Central');
      }
      if (message.guild.region === 'vip-us-central') {
        regionArray.push('US Central `VIP`');
      }
      if (message.guild.region === 'sydney') {
        regionArray.push('Sydney');
      }
      if (message.guild.region === 'vip-sydney') {
        regionArray.push('Sydney `VIP`');
      }
      if (message.guild.region === 'southafrica') {
        regionArray.push('South Africa');
      }
      if (message.guild.region === 'vip-southafrica') {
        regionArray.push('South Africa `VIP`');
      }
      if (message.guild.region === 'singapore') {
        regionArray.push('Singapore');
      }
      if (message.guild.region === 'vip-singapore') {
        regionArray.push('Singapore `VIP`');
      }
      if (message.guild.region === 'russia') {
        regionArray.push('Russia');
      }
      if (message.guild.region === 'vip-russia') {
        regionArray.push('Russia `VIP`');
      }
      if (message.guild.region === 'japan') {
        regionArray.push('Japan');
      }
      if (message.guild.region === 'vip-japan') {
        regionArray.push('Japan `VIP`');
      }
      if (message.guild.region === 'hongkong') {
        regionArray.push('Hong Kong');
      }
      if (message.guild.region === 'vip-hongkong') {
        regionArray.push('Hong Kong `VIP`');
      }
      if (message.guild.region === 'eu-west') {
        regionArray.push('EU West');
      }
      if (message.guild.region === 'vip-eu-west') {
        regionArray.push('EU West `VIP`');
      }
      if (message.guild.region === 'eu-central') {
        regionArray.push('EU Central');
      }
      if (message.guild.region === 'vip-eu-central') {
        regionArray.push('EU Central `VIP`');
      }
      if (message.guild.region === 'brazil') {
        regionArray.push('Brazil');
      }
      if (message.guild.region === 'vip-brazil') {
        regionArray.push('Brazil `VIP`');
      }

      return regionArray;
    }
    const ownerUsername = message.guild.members.get(message.guild.owner.id).user.username;
    const ownerDiscrim = message.guild.members.get(message.guild.owner.id).user.discriminator;
    const embed = new Discord.RichEmbed()
      //.setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setTitle('Server Information')
      .setThumbnail(message.guild.iconURL)
      //.setColor(message.member.displayColor)
      .addField('Server Owner', `${ownerUsername}#${ownerDiscrim}`, true)
      .addField('Server Region', `${checkRegion(message, guild)}`, true)
      .addField('Created', `${message.guild.createdAt.toLocaleString('en-US')}`, true)
      .addField('Roles', `${message.guild.roles.size}`, true)
      .addField('Emojis', message.guild.emojis.size, true)
      .addField('Members', message.guild.memberCount, true)
      .addField('Humans', checkMembers(message.guild), true)
      .addField('Bots', checkBots(message.guild), true);
    if (message.guild.verificationLevel === 0) {
      embed.addField('Verification Level', 'None',true);
    }
    if (message.guild.verificationLevel === 1) {
      embed.addField('Verification Level', 'Low',true );
    }
    if (message.guild.verificationLevel === 2) {
      embed.addField('Verification Level', 'Medium', true);
    }
    if (message.guild.verificationLevel === 3) {
      embed.addField('Verification Level', 'Medium-High', true);
    }
    if (message.guild.verificationLevel === 4) {
      embed.addField('Verification Level', 'High', true);
    }
    //embed.setTimestamp();
    const thisCheck = await checkPrem(message.guild.id);
    if (thisCheck === true) {
      embed.setColor('#FFD700');
      embed.setFooter(`${client.user.username} | Server ID: ${message.guild.id} | Premium Server`, client.user.avatarURL);
    } else {
      embed.setFooter(`${client.user.username} | Server ID: ${message.guild.id}`, client.user.avatarURL);
    }
    msg.edit(embed);
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
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'serverinfo',
  category: 'Misc',
  description: 'Provides information for the server.',
  usage: 'serverinfo'
};

