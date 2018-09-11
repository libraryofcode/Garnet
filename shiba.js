const Discord = require("discord.js");
const superagent = require ("superagent");

module.exports.run = async (client, message, arges) => {
    
    let {body} = await superagent
    .get ('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true');

    let shibaembed = new Discord.RichEmbed()
    .setColor("#f48c42")
    .setTitle(":dog: Woof!")
    .setImage(body[0]);

    message.channel.send(shibaembed);
}   