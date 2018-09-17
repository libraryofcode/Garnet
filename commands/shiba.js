const Discord = require("discord.js");
const superagent = require ("superagent");
const talkedRecently = new Set();

exports.run = async (client, message, args) => {
  if (talkedRecently.has(message.author.id) && !message.member.roles.has("490364533550874644")) {

    message.channel.send("You are being rate limited!" + message.author);
  } else { 
    const {body} = await superagent
    .get ('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true');

    const shibaembed = new Discord.RichEmbed()
    .setColor("#f48c42")
    .setTitle(":dog: Woof!")
    .setImage(body[0]);
  message.channel.send(shibaembed);
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    talkedRecently.delete(message.author.id);
  }, 7500);
};  
} 
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "shiba",
    category: "Fun",
    description: "Provides a random picture of a dog.",
    usage: "shiba"
  };
