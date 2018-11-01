//const config = require('../config.js');
const client = require('../client.js');
const chalk = require('chalk');

module.exports = {
  name: 'reload',
  action: async (msg, args) => {
    msg.channel.sendTyping();
    const m = await client.createMessage(msg.channel.id, '[PENDING] Reloading...');
    try { 
      const props = require(__dirname + `/${args[0]}.js`);
      await client.unregisterCommand(args[0]);
      await delete require.cache[require.resolve(`./${args[0]}.js`)];
      await client.registerCommand(props.name, props.action, props.options);
      console.log(chalk.red(`[ECC] Successfully reloaded ${args[0]}`));
      m.edit(`[SUCCESS] Reloaded \`${args[0]}\``);
    } catch (err) {
      m.edit(`\`\`\`xl\n${err}\`\`\``);
    }
  },
  options: {
    'description': 'Reloads the specified command.',
    'cooldown': 0,
    'requirements': {
      'userIDs': ['278620217221971968', '239261547959025665', '282586181856657409', '155698776512790528']
    }
  }
};
