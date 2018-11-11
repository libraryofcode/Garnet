const cooldown = new Set();
exports.run = async (client, message) => {
  if (cooldown.has(message.author.id)) {
    const cooldownMessage = await message.reply('you are being ratelimited. Chill out for a minute.');
    cooldownMessage.delete(10000);
  } else {
    const key = `${message.guild.id}-${message.author.id}`;
    //const thisUser = await client.credits.get(`${message.guild.id}-${message.member.id}`, 'credits');
    client.credits.math(key, 'add', 200, 'credits');
    const thisCredits = await client.credits.get(`${message.guild.id}-${message.member.id}`, 'credits');

    message.channel.send(`💰 You have claimed your dailies of 200 credits and you now have ${Math.round(thisCredits)} credits! 💰`);
  }

  cooldown.add(message.author.id);
  setTimeout(() => {
  // Removes the user from the set after a minute
    cooldown.delete(message.author.id);
  }, 86400000);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['dailies', 'claim'],
  permLevel: 'Standard User'
};
      
exports.help = {
  name: 'daily',
  category: 'Fun',
  description: 'Claims your daily credits.',
  usage: 'daily'
};
    