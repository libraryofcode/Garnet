const Discord = require("discord.js");
exports.run = async (client, message) => {

    
const embed = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .addField("Invite Link", "https://discordapp.com/api/oauth2/authorize?client_id=460639060851949569&permissions=8&scope=bot", true)
    .addField('Activation', `Don't forget, ${client.user.username} has to be activated before you can invite it. If you want to request activation, do \`moon serverinvite\` and post your server ID anywhere and ping a staff member.`)
    .setTimestamp()
    .setFooter(`${client.user.username} | Beta - Master`);
    message.member.user.createDM().then(channel => channel.send(embed))
  
  const em1 = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`)
    .setColor(message.member.displayColor)
    .setDescription("Invite link sent, check your DMs.")
    .addField('Activation', `Don't forget, ${client.user.username} has to be activated before you can invite it. If you want to request activation, do \`moon serverinvite\` and post your server ID anywhere and ping a staff member.`)
    .setTimestamp()
    .setFooter(`${client.user.username} | Beta - Master`);
    message.channel.send(em1)
};




  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["get", "join"],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "invite",
    category: "Bot Information",
    description: "Provides the bot's invite link.",
    usage: "invite"
  };
