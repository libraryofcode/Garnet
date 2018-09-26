exports.run = (client, msg, args, level) => {
  const members = msg.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.presence.game.name));
  return msg.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "No one in this server has a Discord invite as their game name.");
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ci"],
    permLevel: "Server Moderator"
  };
  
  exports.help = {
    name: 'checkgames',
    category: 'Moderation',
    description: 'Returns a list of members with an invite as their game.',
    usage: 'checkgames'
  };
