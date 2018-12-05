const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Fetching invite...');
  try {
    await client.fetchInvite(args);
  } catch (err) {
    return msg.edit(err);
  }

  const inviteCode = args;
  const guildName = await client.fetchInvite(args).guild.name;
  const guildID = await client.fetchInvite(args).guild.id;
  const guildMembersOnline = await client.fetchInvite(args).presenceCount;
  const inviteUses = await client.fetchInvite(args).uses;
  const guildMemberCount = await client.fetchInvite(args).memberCount;
  //const guildIcon = client.fetchInvite(args).then(m => m.guild.icon);

  const embed = new Discord.RichEmbed();
  embed.setTitle('Server Invite Information');
  
  await embed.addField('Invite Code', inviteCode, true);
  await embed.addField('Server Name', guildName, true);
  await embed.addField('Server Member Count', `${guildMembersOnline}/${guildMemberCount}`, true);
  await embed.addField('Invite Uses', inviteUses, true);
  embed.setFooter(`${client.user.username} | Server ID: ${guildID}`, client.user.avatarURL);
  embed.setTimestamp();
  msg.edit(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fetchinvite'],
  permLevel: 'Standard User'
};
    
exports.help = {
  name: 'getinvite',
  category: 'Misc',
  description: 'Gets invite information from Discord.',
  usage: 'getinvite'
};