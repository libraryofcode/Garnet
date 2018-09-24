exports.run = (client, message, guild, msg) => {
    const members = message.guild.members.filter(member => member.user.username && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(member.user.username));
  return message.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || "No one in this server has a Discord invite as their user name.");
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["cs"],
    permLevel: "Server Moderator"
  };
  
  exports.help = {
    name: 'checkservers',
    category: 'Moderation',
    description: 'Returns a list of members with an invite as their username.',
    usage: 'checkservers'
  };
