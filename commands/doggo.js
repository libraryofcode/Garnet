const Discord = require("discord.js");
const superagent = require ("superagent");

module.exports.run = async (client, message, arges) => {
    
    let {body} = await superagent
    .get ('https://random.dog/woof.json');

    let dogembed = new Discord.RichEmbed()
    .setColor("#f48c42")
    .setTitle(":dog: Woof!")
    .setImage(body.url);

    message.channel.send(dogembed);
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "doggo",
    category: "Fun",
    description: "Provides a random picture of a dog.",
    usage: "doggo"
  };
