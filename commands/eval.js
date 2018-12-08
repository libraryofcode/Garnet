const Discord = require('discord.js');
const axios = require('axios');
exports.run = async (client, message, args) => { 
  let evaled;
  

  try {
    evaled = await eval(args.join(' ').trim());
      
  } catch (err) {
    const embed2 = new Discord.RichEmbed();
    //embed2.setAuthor(client.user.username, client.user.avatarURL);
    embed2.setColor('#FF0000');
    embed2.setTitle('__JAVASCRIPT EVALUATION__');
    embed2.setDescription(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
    embed2.setTimestamp();
    embed2.setFooter(`${client.user.username} | Requested by ${message.author.username}#${message.author.discriminator}`, client.user.avatarURL);
    return message.channel.send(embed2);
  }

  if (typeof evaled === 'string') {
    evaled = evaled.replace(client.token, '[TOKEN]');
  }
  if (typeof evaled === 'object') {
    evaled = require('util').inspect(evaled, {depth: 0});
  }
  if (evaled == undefined) {
    evaled = 'undefined';
  }
  if (evaled.length > 1900) {
    axios({
      method: 'post',
      url: 'https://api.github.com/gists',
      headers: {
        authorization: client.config.gistToken,
      },
      data: {
        description: 'Garnet Eval Overflow',
        public: false,
        files: {
          'evalOverload.js': {
            content: evaled
          }
        }
      }
    }).then(m => {
      const overloadEmbed = new Discord.RichEmbed();
      overloadEmbed.setTitle('__JAVASCRIPT EVALUATION__');
      overloadEmbed.setColor('ORANGE');
      overloadEmbed.setDescription(`Result was too large to be sent, was posted on GitHub Gists | ${m.data.html_url}`);
      overloadEmbed.setTimestamp();
      overloadEmbed.setFooter(`${client.user.username} | Requested by ${message.author.username}#${message.author.discriminator}`, client.user.avatarURL);
      return message.channel.send(overloadEmbed);
    });
  }

  //let clean = await client.clean(client, evaled);

  const embed1 = new Discord.RichEmbed()
    //.setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#00FF00')
    .setTitle('__JAVASCRIPT EVALUATION__')
    .setDescription(`\`\`\`js\n${evaled}\n\`\`\``)
    .setTimestamp()
    .setFooter(`${client.user.username} | Requested by ${message.author.username}#${message.author.discriminator}`, client.user.avatarURL);
  message.channel.send(embed1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 'Systems Developer'
};

exports.help = {
  name: 'eval',
  category: 'System',
  description: 'Evaluates arbitrary JavaScript.',
  usage: 'eval [...code]'
};
