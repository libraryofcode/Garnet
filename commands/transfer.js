const cooldown = new Set();
exports.run = async (client, message, args) => {
  if (cooldown.has(message.author.id)) {
    const cooldownMessage = await message.reply('you are being ratelimited. Chill out for a minute.');
    cooldownMessage.delete(10000);
  } else {
    const msg = await message.channel.send('Transferring...');
    const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
    const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : null;
    const thisUser = botuser.id;
    if (!args[1]) return msg.edit('Please specify an amount to transfer.');
    const beforeCredits = args[1];
    const transferCredits = parseInt(beforeCredits);
    const tax = transferCredits * 0.18;
    const afterTax = transferCredits - tax;
    const taxPre = transferCredits + tax;
  

    if (client.credits.get(`${message.guild.id}-${message.member.id}`, 'credits') < afterTax) return msg.edit('You do not have enough credits to complete this transfer.');
    if (!client.credits.get(`${message.guild.id}-${thisUser}`, 'credits')) return msg.edit('This doesn\'t appear to be a valid account to transfer to.');

    try {
    //const nowCredits = client.credits.get(`${message.guild.id}-${message.member.id}`, 'credits');
    //const removedCredits = nowCredits - afterTax;
      client.credits.math(`${message.guild.id}-${message.member.id}`, 'sub', taxPre, 'credits');
      client.credits.math(`${message.guild.id}-${client.user.id}`, 'add', tax, 'credits');
      client.credits.math(`${message.guild.id}-${thisUser}`, 'add', afterTax, 'credits');
      const transaction = client.credits.get(`${message.guild.id}-${message.member.id}`, 'credits');
      msg.edit(`***Successfully transferred ${afterTax} credits to ${botuser.user.tag}. You now have ${Math.round(transaction)} credits.***`);
    } catch (err) {
      msg.edit(`An error has occurred during processing. | ${err}`);
    }
  }

  cooldown.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    cooldown.delete(message.author.id);
  }, 10800000);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};
        
exports.help = {
  name: 'transfer',
  category: 'Fun',
  description: 'Transfers credits to another user.',
  usage: 'transfer [user] [amount]'
};