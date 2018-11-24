if (Number(process.version.slice(1).split('.')[0]) < 8) throw new RangeError('Node 8.0.0 or higher is required. Update Node on your system.');

const Discord = require('discord.js'); 
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');

const client = new Discord.Client({
  fetchAllMembers: true,
  disableEveryone: true,
  //shardId: process.argv[1],
  //shardCount: process.argv0[2],
}); 


client.config = require('./config.js');
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix
//k

client.logger = require('./modules/Logger.ts');

require('./modules/functions.ts')(client);

client.commands = new Enmap();
client.aliases = new Enmap();


client.settings = new Enmap({
  name: 'settings', 
  autoFetch: true});

client.blackList = new Enmap({
  name: 'blackList',
  autofetch: true,
  fetchAll:true
});

client.alerts = new Enmap({
  name: 'alerts',
  autofetch: true,
  fetchAll: true
});

client.stats = new Enmap({
  name: 'stats', 
  autoFetch: true, 
  fetchAll: true});

client.activatedServers = new Enmap({
  name: 'activatedServers', 
  autofetch: true, 
  fetchAll: true});

client.credits = new Enmap({
  name: 'credits',
  autoFetch: true,
  fetchAll: true
});

client.repPoints = new Enmap({
  name: 'reputation',
  autoFetch: true,
  fetchAll: true
});

client.userTitle = new Enmap({
  name: 'title',
  autoFetch: true,
  fetchAll: true
});

client.userBio = new Enmap({
  name: 'bio',
  autoFetch: true,
  fetchAll: true
});

client.tags = new Enmap({
  name: 'tags',
  autofetch: true,
  fetchAll: true
});


const init =  async () => {

  const { join } = require('path');
  const commands = await readdir(join(__dirname, './commands/'));
  client.logger.log(`Loading a total of ${commands.length} commands.`);
  commands.forEach(f => {
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

setTimeout(() => {
  const express = require('express');
  const app = express();
  //const favicon = require('serve-favicon');
  const path = require('path'); //eslint-disable-line no-unused-vars
  const myCommands = client.commands;
  const commandNames = myCommands.keyArray();
  const prefix = 'garnet ';
  const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    
  const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
  app.get('/', async (req, res) => {
    app.set('title', 'Garnet Help Manual');
    //app.use(favicon(__dirname + '/util/server/moonglow.ico'));
    res.set('Content-Type', 'text/html');
    let currentCategory = '';
    let output = `<h1>${client.user.username} Help Manual</h1><br><i>Use ${prefix}help <commandname> for details</i></br>`;
    sorted.forEach( c => {

      const cat = c.help.category;
      if (currentCategory !== cat) {
        output += `\n\n <h2>${cat}</h2> \n\n`;
        currentCategory = cat;
      }
      output += `<br><b>${prefix}${c.help.name}</b>${' '.repeat(longest - c.help.name.length)} || ${c.help.description}</br>`;
    });
    
    //res.write()
    res.write(output);
    res.send();
  });

  
  const server = app.listen(80, () => {
    console.log(`Express running → PORT ${server.address().port}`);
    app.set('title', 'Moonglow Help Manual');
    //app.use(favicon(__dirname + '/util/server/garnet.ico'));
  });
  //}
}, 5000);

