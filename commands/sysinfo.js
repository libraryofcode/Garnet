const Discord = require('discord.js');
const os = require('os')




exports.run = async (client, message) => {
    const gbU =  os.totalmem / 1000000000
    const gbR = Math.round(gbU)
    const hours = os.uptime / 1440
    const sysuptime = Math.floor(hours)

    const msg = await message.channel.send("Loading...");
    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTitle('System Information')
    
    if (os.platform == 'win32') {
        embed.addField('Operating System', `Windows`, true)
        embed.setThumbnail('https://cdn.discordapp.com/attachments/491024501971222538/491024518761021460/Windows-Logo.png')
    }
    if (os.platform == 'linux') {
        embed.addField('Operating System', `Linux`, true)
        embed.setThumbnail('https://cdn.discordapp.com/attachments/491024501971222538/491024720733536277/LINUX-LOGO.png')
    }
    if (os.platform == 'darwin') {
        embed.addField('Operating System', `Mac OS`, true)
        embed.setThumbnail('https://cdn.discordapp.com/attachments/491024501971222538/491024928028491779/2000px-OS_X_El_Capitan_logo.png')
    }

    embed.addField('OS Release', `${os.release()}`, true)
    embed.addField('Memory', `${gbR}GB`, true)
    embed.addField('Architecture', `${os.arch}`, true)
    embed.addField('Directory', `${os.homedir()}`, true)
    embed.addField('Process File', `${process.mainModule.filename}` ,true)
    embed.addField('System Uptime', `${sysuptime} hours`, true)
    msg.edit(embed)
}



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Standard User"
  };
  
  exports.help = {
    name: "sysinfo",
    category: "Bot Information",
    description: "Provides information about the computer the process is running on.",
    usage: "sysinfo"
  };