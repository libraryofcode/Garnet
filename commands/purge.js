exports.run = async (bot, msg, args) => {
    const user = (msg.mentions.users.first() || bot.users.get(args[0]) || null);
    const amount = !!user ? parseInt(msg.content.split(" ")[2], 10) : parseInt(msg.content.split(" ")[1], 10);
    if (!amount) return msg.edit("Must specify an amount to delete!").then(msg.delete(2000));
    if (!amount && !user) return msg.edit("Must specify a user and amount, or just an amount, of messages to purge!").then(msg.delete(2000));
    await msg.delete();
    let messages = await msg.channel.messages.fetch({limit: 100});
    if(user) {
      messages = messages.array().filter(m=>m.author.id === user.id);
      bot.log("log", "Purge Amount", msg.author, "Amount: " + amount);
      messages.length = amount;
    } else {
      messages = messages.array();
      messages.length = amount + 1;
    }
    messages.map(async m => await m.delete().catch(console.error));
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Server Moderator"
  };
  
  exports.help = {
    name: 'purge',
    description: 'Deletes messages from anyone in the channel',
    usage: 'purge [...number of messages]'
  };