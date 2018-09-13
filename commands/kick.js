exports.run = (client, message, [mention, ...reason]) => {

  if (message.mentions.members.size === 0)
    return message.reply("Please mention a user to kick");

  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.reply("I do not have the kick members permission.");

  const kickMember = message.mentions.members.first();

  kickMember.kick(reason.join(" ")).then(member => {
    message.reply(`${member.user.username} was succesfully kicked.`);
  });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Server Moderator"
};
  
  exports.help = {
    name: "kick",
    category: "Moderation",
    description: "Kick a user from the server.",
    usage: "kick [...user id]"
  };
