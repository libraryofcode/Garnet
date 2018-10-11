const Discord = require("discord.js");
const superagent = require ("superagent");

module.exports.run = async (client, message, args) => {
    
    const {body} = await superagent
    .get('http://aws.random.cat/meow');

    const catembed = new Discord.RichEmbed()
    .setColor("#f48c42")
    .setTitle(":cat: Meow")
    .setImage(body.file);

    message.channel.send(catembed);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'cat',
  category: 'Fun',
  description: 'Provides a random picture of a cat.',
  usage: 'cat'
};
