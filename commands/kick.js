exports.run = async (client, message, msg, args, level) => { 
    member = message.guild.members.get(message.mentions.users.first().id)
if(!member) return;
member.kick((args[0]))
message.channel.send("User kicked.")
}

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