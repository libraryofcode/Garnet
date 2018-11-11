//const client = require('../client.js');

module.exports = {
  name: 'docs',
  action: (msg, args) => {
    msg.channel.sendTyping();

    let string = 'Invalid arguments';
    if (args[0] === 'eris') {
      switch (args[1]) {
        case 'class': {
          string = `https://abal.moe/Eris/docs/${args[2]}`;
          break;
        }
        case 'function': {
          string = `https://abal.moe/Eris/docs/${args[2]}#function-${args[3]}`;
          break;
        }
        case 'event': {
          string = `https://abal.moe/Eris/docs/${args[2]}#event-${args[3]}`;
          break;
        }
        case 'docs': {
          string = 'https://abal.moe/Eris/docs';
          break;
        }
        default: {
          string = 'Searches: class, function, event. `alpha docs eris class [classname]`, `alpha docs eris function [class name, function name], `alpha docs eris event [class name, event name]`';
          break;
        }
      }

    } else if (args[0] === 'djs' || args[0] === 'discord.js') {
      switch (args[1]) {
        case 'class': {
          string = `https://discord.js.org/#/docs/main/stable/class/${args[2]}`;
          break;
        }
        case 'typedef': {
          string = `https://discord.js.org/#/docs/main/stable/typedef/${args[2]}`;
          break;
        }
        case 'examples': {
          string = `https://discord.js.org/#/docs/main/stable/examples/${args[2]}`;
          break;
        }
        case 'method':
        case 'property': {
          string = `https://discord.js.org/#/docs/main/stable/class/${args[2]}?scrollTo=${args[3]}`;
          break;
        }
        case 'event': {
          string = `https://discord.js.org/#/docs/main/stable/class/${args[2]}?scrollTo=e-${args[3]}`;
          break;
        }
        default: {
          string = 'https://discord.js.org/#/docs';
          break;
        }
      } 
    } else if (args[0] === 'dpy' || args[0] === 'discord.py') {
      if (args[1] === 'api') {
        if (args[2]) {
          string = `https://discordpy.readthedocs.io/en/rewrite/api.html#${args[2]}`;
        } else {
          string = 'https://discordpy.readthedocs.io/en/rewrite/api.html#';
        }
      }
    }
    return msg.channel.createMessage(string);
    
  }, options: {
    'description': 'Gets docs for eris, djs, or dpy.'
  }
};