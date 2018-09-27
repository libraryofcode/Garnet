const Discord = require('discord.js')

exports.run = (client, message, args) => {
    try {
  if(args < 1) {message.channel.createInvite({
      maxAge: 0
  })
  .then(invite => message.channel.send(`Created an invite with a code of discord.gg/${invite.code}`))
  .catch(console.error);
}
if(args > 1) {
    message.channel.createInvite({
        maxAge: args[0]
    })
    .then(invite => message.channel.send(`Created invite with a code of discord.gg/${invite.code} with the age of ${args[0]} seconds`))
}
    } catch(err) {
        message.channel.send(err)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: 'createinvite',
    category: 'Misc',
    description: 'Creates an invite for the channel.',
    usage: 'createinvite [...# of seconds]'
  };
