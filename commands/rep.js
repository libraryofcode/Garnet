const cooldown = new Set();

exports.run = async (client, message, args) => {
  const msg = await message.channel.send('Authenticating...');
  if (cooldown.has(message.author.id)) {

    const botmessage = await msg.edit(`<@!${message.author.id}>, you are being ratelimited. Chill out for a minute.`);
    botmessage.delete(10000);
    return;
  }
  const resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : null;
  const botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : message.member;
  const thisUser = botuser.id;
  if (client.repPoints.get(thisUser) === undefined) {
    await client.repPoints.set(thisUser, 1);
    msg.edit(`***You have given a reputation point to ${botuser.user.tag}!***`);
    message.channel.send('This is also their first reputation point, congratulations!');
  } else {
    await client.repPoints.inc(thisUser);
    msg.edit(`***You have given a reputation point to ${botuser.user.tag}!***`);
  }
  cooldown.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    cooldown.delete(message.author.id);
  }, 64800000);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Standard User'
};

exports.help = {
  name: 'rep',
  category: 'Fun',
  description: 'Gives a reputation point to another person.',
  usage: 'rep [...user]'
};