const Discord = require("discord.js");

exports.run = async (client, message, args) => {
          if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry, I can't do that.");
          let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
          if(!rMember) return message.reply("I couldn't find that user.");
          let role = args.join(" ").slice(22);
          if(!role) return message.reply("Please specify a role!");
          let gRole = message.guild.roles.find(`name`, role);
          if(!gRole) return message.reply("I couldn't find that role.");
        
          if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
          await(rMember.addRole(gRole.id));
        
          try{
            await rMember.send(`You have been given the ${gRole.name} role.`)
          }catch(e){
            message.channel.send(`${gRole.name} role given to <@${rMember.id}>.`)
          }
}

exports.conf = {
    enabled: false,
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
