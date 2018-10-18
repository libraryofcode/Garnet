const Discord = require('discord.js');
const superagent = require ('superagent');
module.exports.run = async (client, message) => {
  const msg = await message.channel.send('Loading...');
    
  const {body} = await superagent
    .get('http://aws.random.cat/meow');
  const catembed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(':cat: Meow')
    .setImage(body.file);
  msg.edit(catembed);
};
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