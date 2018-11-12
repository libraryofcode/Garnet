const client = require('./client.js');
const chalk = require('chalk');
const fs = require('fs');

function read() {
  fs.readdir(__dirname + '/commands/', (err, files) => {
    if (err) console.error(err);
    const jsfiles = files.filter(f => f.split('.').pop()==='js');
    jsfiles.forEach(f=>{
      const props = require(__dirname + `/commands/${f}`);
      client.registerCommand(props.name, props.action, props.options);
      console.log(chalk.blue(`[LOAD]: Loaded ${props.name}`));
    });
  });
}

console.log(chalk.magenta('[LOAD]: Loading Commands...'));
read();

fs.readdir(__dirname + '/events/', (err, files) => {
  console.log(chalk.magenta('[LOAD] Loading Events...'));
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
    console.log(chalk.blue(`[LOAD]: Loaded ${eventName}`));
  });
});

client.connect();