const superagent = require('superagent');
const math = require('mathjs');
const Discord = require('discord.js');

async function request(i) {
  return await superagent.get(`http://numbersapi.com/${i}?json`);
}
exports.run = async (client, message, args) => {
  const input = args.join(' ');
  const errmsg = {
    exp: 'Couldn\'t evaluate the given expression, please try again later.',
    err: 'Alert: An error occurred during the processing, please try again later.',
    fact: 'Couldn\'t get any facts for the expression unput that you provided.',
  };
  let res; // Used to get number facts
  let output; // Output from mathjs
  let result = {}; // Sends the result message
  result.embed = {};
  result.fields = [];
  const mathembed = new Discord.RichEmbed();
  mathembed.setTitle('Calculator');
  mathembed.setColor('RANDOM');
  mathembed.setFooter(`${client.user.username}`, `${client.user.avatarURL}`);
  mathembed.addField('Input', input);
  mathembed.setTimestamp();
  //result.embed.title = 'Calculator';
  //result.embed.foot = `${client.user.username}, ${client.user.avatarURL}`;

  if (args[0].toLowerCase() === 'fact') {
    try {
      res = await request('random/math');

      if (res.body.found) {
        result.fields.push({
          name: `Fact about ${res.body.number}`,
          value: res.body.text,
          inline: false,
        });
      }
    } catch (e) {
      result = errmsg.err;
    }

    return message.channel.send(mathembed);
  }

  if (args.length === 1 && !isNaN(args[0])) {
    const ainput = (input.startsWith('.')) ? '0' + input : input;
    res = await request(`${ainput.split('.')[0]}/math`);

    if (res.body.found) {
      result.embed.fields.push({
        name: `Fact about ${res.body.number}`,
        value: res.body.text,
        inline: false,
      });
    } else {
      result = errmsg.fact;
    }
  } else {
    try {
      output = math.eval(input).toString();
      mathembed.addField('Output', output);

      result.fields.push({
        name: 'Input',
        value: input,
        inline: false,
      });

      result.fields.push({
        name: 'Input',
        value: output,
        inline: false,
      });
    } catch (e) {
      result = errmsg.exp;
    }
  }

  return message.channel.send(mathembed);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['calc'],
  permLevel: 'Standard User'
};
  
exports.help = {
  name: 'math',
  category: 'Fun',
  description: 'Calculates a given mathematical expression.',
  usage: 'math [...args]'
};
