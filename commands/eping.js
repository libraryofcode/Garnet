exports.run = async (client, message) => {
    const msg = await message.channel.send("Ping...");
    message.channel.send(`Ping! \`${msg.createdTimestamp - message.createdTimestamp}ms\``)
    msg.edit(embed);
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