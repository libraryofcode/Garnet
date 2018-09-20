const Discord = require('discord.js')


exports.run = async (client, message, args) => {
    message.channel.createWebhook('Moonglow Activation System',
    'https://cdn.discordapp.com/avatars/460639060851949569/4f545d7d0ee4fb31a411035793c4aef8.png?size=256')

   let webID = message.guild.fetchWebhooks(args[3])
   webID.token


}
