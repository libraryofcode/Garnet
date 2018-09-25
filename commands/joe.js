exports.run = (client, message) => {
    if(!message.member.userID === '208688963936845824' || '278620217221971968') {
        return;
    }
    message.channel.send(`Joe have declared war on ${args[0]}, their anus will now be destroyed by the one and only... Virgin Slayer 69`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Standard User"
};
  
  exports.help = {
    name: "joe",
    category: "Fun",
    description: "Joe, just Joe.",
    usage: "joe [...mention]"
  };