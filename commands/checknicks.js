exports.run = (client, message) => {
  const members = message.guild.members.filter(member => member.displayName && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.displayName));
  return message.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join('\n') || 'No one in this server has a Discord invite as their nick name.');
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['cn'],
  permLevel: 'Server Moderator'
};
    
exports.help = {
  name: 'checknicks',
  category: 'Moderation',
  description: 'Returns a list of members with an invite as their nick name.',
  usage: 'checknicks'
};
  