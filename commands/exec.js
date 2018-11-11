const { exec } = require('child_process');

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

module.exports = {
  name: 'exec',
  action: async (msg, args) => {
    const command = args.join(' ');
    const outMessage = await msg.channel.createMessage(`Running \`${command}\`...`);
    let stdOut = await doExec(command).catch(data=> outputErr(outMessage, data));
    stdOut = stdOut.substring(0, 1750);
    outMessage.edit(`\`OUTPUT\`\n\`\`\`sh\n${stdOut}\n\`\`\``);
  },   
  options: {
    'description': 'Executes a terminal command.',
    'aliases': ['ex'],
    'cooldown': 0,
    'hidden': true,
    'requirements': {
      'userIDs': ['278620217221971968']
    }
  }
};
