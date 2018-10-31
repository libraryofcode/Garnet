//const config = require("../config.js");
const chalk = require('chalk');
module.exports = (client) => {
  console.log(chalk.green('[SYSTEM]: Logged in as ' + client.user.username));
  client.editStatus('online', { name: 'alpha help | Moonglow Alpha on Eris' });
};