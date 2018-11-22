const thisPackage = require('../package.json');
const { version } = require('discord.js');
const utils = require('../util/utils.js');
const Discord = require('discord.js');

exports.run = async (client, message) => {
  const msg = await message.channel.send('Loading...');
  const embed = new Discord.RichEmbed();
  embed.setTitle('Version Information');
  embed.addField('Main Kernel', new utils().kernelVersion, true);
  embed.addField('Runtime Process', process.version.slice(1), true);
  embed.addField('Database', new utils().databaseVersion, true);
  embed.addField('Discord.js', `${version}`, true);
  embed.addField('Sentry Error Logging', thisPackage.dependencies.raven.slice(1), true);
  embed.addField('HTTP Request Libraries', `Axios: ${thisPackage.dependencies.axios.slice(1)} | Superagent: ${thisPackage.dependencies.superagent.slice(1)}`, true);
  embed.addField('Dashboard & Hosting Library', thisPackage.dependencies.express.slice(1), true);
  embed.addField('Linting Software', thisPackage.dependencies.eslint.slice(1));
  embed.setFooter(client.user.username, client.user.avatarURL);
  embed.setTimestamp();
  
  msg.edit(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['versions', 'dependencies', 'systems'],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'version',
  category: 'Bot Information',
  description: 'Gives information about the different versions of systems the bot is running on.',
  usage: 'version'
};