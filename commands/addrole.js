exports.run = async (client, message, args) => {
          let Member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
          if(!Member) return message.reply("That user could not be found.");
          let role = args.join(" ").slice(22);
          if(!role) return message.reply("Please specify a role name.");
          let gRole = message.guild.roles.find(`name`, role);
          if(!gRole) return message.reply("I couldn't find that role.");
        
          if(Member.roles.has(gRole.id)) return message.reply("The user specified already has that role.");
          await(rMember.addRole(gRole.id));
        
          try{
            await Member.send(`You have been given the ${gRole.name} role.`)
          }catch(e){
            message.channel.send(`${gRole.name} role given to <@${rMember.id}>.`)
          }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Server Admin"
  };
  
  exports.help = {
    name: "addrole",
    category: "Moderation",
    description: "Adds a role to the specified user.",
    usage: "addrole [...user, rolename]"
  };