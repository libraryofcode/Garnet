const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const profileCardMessage = await message.channel.send(':pencil: ***Profile Card***');
  const msg = await message.channel.send('Loading...');
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
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

  const embed = new Discord.RichEmbed();

  //msg2.edit(':pencil: Profile Card');
  embed.setAuthor(botuser.user.tag, botuser.user.avatarURL);
  if (userTitle) embed.setTitle(userTitle);
  if (userBio) embed.setDescription(userBio);
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