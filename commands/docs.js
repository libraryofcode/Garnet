//const client = require('../client.js');

module.exports = {
  name: 'docs',
  action: async (msg, args) => {
    msg.channel.sendTyping();
    if (args[0] === 'eris') {
      if (args[1] === 'class') {
        return msg.channel.createMessage(`https://abal.moe/Eris/docs/${args[2]}`);
      }
      if (args[1] === 'function') {
        return msg.channel.createMessage(`https://abal.moe/Eris/docs/${args[2]}#function-${args[3]}`);
      }
      if (args[1] === 'event') {
        return msg.channel.createMessage(`https://abal.moe/Eris/docs/${args[2]}#event-${args[3]}`);
      }
      if (args[1] === 'docs') {
        return msg.channel.createMessage('https://abal.moe/Eris/docs');
      }
      if (args[1] < 0) {
        return msg.channel.createMessage('Searches: class, function, event. `alpha docs eris class [classname]`, `alpha docs eris function [class name, function name], `alpha docs eris event [class name, event name]`');
      }

    }

    if (args[0] === 'djs' || 'discord.js') {
      if (args[1] === 'class') {
        return msg.channel.createMessage(`https://discord.js.org/#/docs/main/stable/class/${args[2]}`);
      }
      if (args[1] === 'typedef') {
        return msg.channel.createMessage(`https://discord.js.org/#/docs/main/stable/typedef/${args[2]}`);
      }
      if (args[1] === 'examples') {
        return msg.channel.createMessage(`https://discord.js.org/#/docs/main/stable/examples/${args[2]}`);
      }
      if (args[1] === 'method' || 'property') {
        return msg.channel.createMessage(`https://discord.js.org/#/docs/main/stable/class/${args[2]}?scrollTo=${args[3]}`);
      }
      if (args[1] === 'event') {
        return msg.channel.createMessage(`https://discord.js.org/#/docs/main/stable/class/${args[2]}?scrollTo=e-${args[3]}`);
      }
    }
    
    if (args[0] === 'dpy' || 'discord.py') {
      if (args[1] === 'api') {
        if (args[2]) return msg.channel.createMessage(`https://discordpy.readthedocs.io/en/rewrite/api.html#${args[2]}`);
        if (!args[2]) return msg.channel.createMessage('https://discordpy.readthedocs.io/en/rewrite/api.html#');
      }
    }
  }, options: {
    'description': 'Gets docs for eris, djs, or dpy.'
  }
};