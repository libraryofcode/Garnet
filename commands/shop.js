const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  const shopMessage = await message.channel.send(':gem: Garnet Shop :gem:');
  const msg = await message.channel.send('Loading...');

  const credits = client.credits.get(message.member.id);
  const garnets = client.credits.get(message.member.id);

  if (args[0] === 'exchange') {
    if (args[1] === 'credits') {
      const creditEmbed = new Discord.RichEmbed();
      creditEmbed.setTitle('Credits => Garnets Exchange');
      creditEmbed.setDescription('You cannot exchange more than 2200 credits (5 garnets) at one transaction.');
      creditEmbed.addField('1 Garnet', '500 credits; pass `1` to the exchange parameter for one garnet', true);
      creditEmbed.addField('2 Garnets', '800 credits; pass `2` to the exchange parameter for two garnets.', true);
      creditEmbed.addField('3 Garnets', '1400 credits; pass `3` to the exchange parameter for three garnets.', true);
      creditEmbed.addField('4 Garnets', '1800 credits; pass `4` to the exchange parameter for four garnets.', true);
      creditEmbed.addField('5 Garnets', '2200 credits; pass `5` to the exchange parameter for five garnets.', true);
      creditEmbed.setFooter(client.user.username, client.user.avatarURL);
      creditEmbed.setTimestamp();
      if (!args[2]) return msg.edit(creditEmbed);
      const exchangeCredits = parseInt(args[2]);
      if (exchangeCredits <= 0) return msg.edit('You can\'t transfer a negative or 0 amount.');
      if (isNaN(exchangeCredits)) return msg.edit('Please enter an actual integer amount.');
      //const exchangeRate = 500;
      if (args[2] >= 6) return msg.edit('You cannot exchange more then 2200 credits, or 6 garnets at a time.');
      try {
        if (args[2] === 1) {
          if (credits <= 499) return msg.edit('You do not have enough credits for this transaction, come back later broke ass.');
          client.credits.math(message.member.id, 'sub', 500);
          client.garnets.math(message.member.id, 'add', 1);
          msg.edit(`Success! You've exchanged 500 credits and got one of my precious garnets in return. Isn't that lucky? | You now have ${Math.round(client.credits.get(message.member.id))} credits left.`);
        }
        else if (args[2] === 2) {
          if (credits <= 799) return msg.edit('You do not have enough credits for this transaction, come back later broke ass.');
          client.credits.math(message.member.id, 'sub', 800);
          client.garnets.math(message.member.id, 'add', 2);
          msg.edit(`Success! You've exchanged 800 credits and got two of my precious garnets in return. Isn't that lucky? | You now have ${Math.round(client.credits.get(message.member.id))} credits left.`);
        }
        else if (args[2] === 3) {
          if (credits <= 1399) return msg.edit('You do not have enough credits for this transaction, come back later broke ass.');
          client.credits.math(message.member.id, 'sub', 1400);
          client.garnets.math(message.member.id, 'add', 3);
          msg.edit(`Success! You've exchanged 1400 credits and got three of my precious garnets in return. Isn't that lucky? | You now have ${Math.round(client.credits.get(message.member.id))} credits left.`);
        }
        else if (args[2] === 4) {
          if (credits <= 1799) return msg.edit('You do not have enough credits for this transaction, come back later broke ass.');
          client.credits.math(message.member.id, 'sub', 1800);
          client.garnets.math(message.member.id, 'add', 4);
          msg.edit(`Success! You've exchanged 1800 credits and got four of my precious garnets in return. Isn't that lucky? | You now have ${Math.round(client.credits.get(message.member.id))} credits left.`);
        }
        else if (args[2] === 5) {
          if (credits <= 2199) return msg.edit('You do not have enough credits for this transaction, come back later broke ass.');
          client.credits.math(message.member.id, 'sub', 2200);
          client.garnets.math(message.member.id, 'add', 5);
          msg.edit(`Success! You've exchanged 2200 credits and got four of my precious garnets in return. Isn't that lucky? | You now have ${Math.round(client.credits.get(message.member.id))} credits left.`);
        } 
        else {
          return msg.edit('This wasn\'t even a number I can recognize. Are you an idiot?');
        }
      } catch (err) {
        shopMessage.delete();
        msg.edit(`An error has occured during processing | ${err}`);
      }
    }
  }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
          
exports.help = {
  name: 'shop',
  category: 'Fun',
  description: 'Shop system.',
  usage: 'undefined |exchange [credits] **OR** change [garnets]'
};