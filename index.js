if (Number(process.version.slice(1).split('.')[0]) < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

const Discord = require('discord.js'); 
const sentryconfig = require('./sentry.json');
const Raven = require('raven');
Raven.config(sentryconfig.link).install();
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const EnmapLevel = require('enmap-sqlite');

const client = new Discord.Client({
  fetchAllMembers: true,
  disableEveryone: true}); 


client.config = require('./config.js');
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

client.logger = require('./modules/Logger');

require('./modules/functions.js')(client);

client.commands = new Enmap();
client.aliases = new Enmap();


client.settings = new Enmap({provider: new EnmapLevel({name: 'settings'})});

client.activatedServers = new Enmap({provider: new EnmapLevel({name: 'activatedServers', autofetch: true, fetchAll: true})});



const init = async () => {

  const { join } = require('path');
  const moderationFiles = await readdir(join(__dirname, './commands/'));
  client.logger.log(`Loading a total of ${moderationFiles.length} commands.`);
  moderationFiles.forEach(f => {
    if (!f.endsWith('.js' || '.ts')) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });



  const evtFiles = await readdir(join(__dirname, './events/'));
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  // Here we login the client.
  client.login(client.config.token);

};

init();
