exports.run = async (client, message, msg, args, level) => { 
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("Error: Forbidden, user is not kickable.");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
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