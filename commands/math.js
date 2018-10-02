const superagent = require('superagent');
const math = require('mathjs');

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
  result.embed.fields = [];
  result.embed.color = 0x41dae2;

  if (args[0].toLowerCase() === 'fact') {
    try {
      res = await request('random/math');

      if (res.body.found) {
        result.embed.fields.push({
          name: `Fact about ${res.body.number}`,
          value: res.body.text,
          inline: false,
        });
      }
    } catch (e) {
      result = errmsg.err;
    }

    return message.channel.send(result);
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

      result.embed.fields.push({
        name: 'Input',
        value: input,
        inline: false,
      });

      result.embed.fields.push({
        name: 'Output',
        value: output,
        inline: false,
      });
    } catch (e) {
      result = errmsg.exp;
    }
  }

  return message.channel.send(result);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['calc'],
  permLevel: 'Systems Alpha/Dev Tester'
};
  
exports.help = {
  name: 'math',
  category: 'Fun',
  description: 'Calculates a given mathematical expression.',
  usage: 'math [...args]'
};
