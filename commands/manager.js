const { exec } = require('child_process');

exports.run = async (client, msg, args) => {
  const command = `pm2 ${args.join(' ')}`;
  const outMessage = await msg.channel.send(`Processing \`${args.join(' ')}\`...`);
  let stdOut = await doExec(command).catch(data=> outputErr(outMessage, data));
  stdOut = stdOut.substring(0, 1750);
  outMessage.edit(`\`OUTPUT\`
\`\`\`sh
${stdOut}
\`\`\``);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ex'],
  permLevel: 'Systems Administrator'
};

exports.help = {
  name: 'manager',
  category: 'System',
  description: 'Tells the Process Manager to execute something.',
  usage: 'manager [...command]'
};

const outputErr = (msg, stdData) => {
  const { stdout, stderr } = stdData;
  const message = stdout.concat(`\`\`\`${stderr}\`\`\``);
  msg.edit(message);
};

const doExec = (cmd, opts = {}) => {
  return new Promise((resolve, reject) => {
    exec(cmd, opts, (err, stdout, stderr) => {
      if (err) return reject({ stdout, stderr });
      resolve(stdout);
    });
  });
};