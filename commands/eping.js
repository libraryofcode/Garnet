exports.run = async (client, message) => {
    const msg = await message.channel.send("Ping...");
    ping = message.channel.send(`Ping! \`${msg.createdTimestamp - message.createdTimestamp}ms\``)
    msg.edit(ping);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "eping",
    category: "Misc",
    description: "Pings the bot, without the embed.",
    usage: "eping"
  };