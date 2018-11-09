const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  const profileCardMessage = await message.channel.send(':pencil: ***Profile Card***');
  const msg = await message.channel.send('Loading...');
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  if (resolvedUser)
    try {
      level = client.permlevel(resolvedUser.lastMessage);
    } catch (e) {
      level = 0;
    }
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : message.member;
  const thisUser = botuser.id;

  if (botuser.user.bot) {
    profileCardMessage.delete();
    return msg.edit('***Bots do not have personalized profiles, please try again.***');
  }

  const myMessages = await client.stats.get(`${thisUser} | ${message.guild.id}`);
  const repPoints = await client.repPoints.get(thisUser);
  const userTitle = await client.userTitle.get(thisUser);
  const userBio = await client.userBio.get(thisUser);
  const credits = await client.credits.get(`${message.guild.id}-${thisUser}`, 'credits');

  const embed = new Discord.RichEmbed();

  //msg2.edit(':pencil: Profile Card');
  embed.setAuthor(botuser.user.tag, botuser.user.avatarURL);
  if (userTitle) embed.setTitle(userTitle);
  if (userBio) {
    embed.setDescription(userBio);
  } else {
    embed.setDescription('I don\'t have a bio because I\'m too lazy to set one.');
  }
  
  embed.setColor(botuser.displayHexColor);
  embed.setThumbnail(botuser.user.avatarURL);
  if (myMessages === undefined) {
    embed.addField('Messages', 'Unknown', true);
  } else {
    embed.addField('Messages', myMessages, true);
  }
  if (repPoints === undefined) {
    embed.addField('Reputation Points', '0', true);
  } else {
    embed.addField('Reputation Points', repPoints, true);
  }
  if (credits === undefined) {
    embed.addField('Credits', '0', true);
  } else {
    embed.addField('Credits', Math.round(credits), true);
  }
  embed.addField('Acknowledgements', `${friendly}`, true);
  try {
    embed.addField('Last Seen', botuser.lastMessage.createdAt.toLocaleString('en-US'));
  } catch (err) {
    embed.addField('Last Seen', 'Unknown', true);
  }
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();
  
  await msg.edit(embed);
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
    
exports.help = {
  name: 'profile',
  category: 'Fun',
  description: 'Displays your profile.',
  usage: 'profile'
};