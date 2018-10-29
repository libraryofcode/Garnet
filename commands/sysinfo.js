const client = require('../client.js');
const os = require('os');
const si = require('systeminformation');
const osName = require('os-name');


module.exports = {
  name: 'sysinfo',
  action: async (msg) => {
    msg.channel.sendTyping();

    const gbU =  os.totalmem / 1000000000;
    const gbR = Math.round(gbU);
      
    const freegbU = os.freemem / 1000000000;
    const freegbR = Math.round(freegbU);
    const freegbF = gbR - freegbR;
  
    const hours = os.uptime / 1440;
    const sysuptime = Math.floor(hours);
    const days = hours / 24;
    const sysuptimeDays = Math.round(days);
    let data;
    let osIcon;
    if (os.platform == 'win32') {
      const thisWin = await si.osInfo();
      data = thisWin.distro;
      osIcon = 'https://cdn.discordapp.com/attachments/491024501971222538/491024518761021460/Windows-Logo.png';
    }
    if (os.platform == 'linux') {
      data = 'Linux';
      osIcon = 'https://cdn.discordapp.com/attachments/491024501971222538/491024720733536277/LINUX-LOGO.png';
    }
    if (os.platform == 'darwin') {
      data = osName(os.platform(), os.release());
      osIcon = 'https://cdn.discordapp.com/attachments/491024501971222538/491024928028491779/2000px-OS_X_El_Capitan_logo.png';
    }
    if (os.platform === null || undefined) {
      data = 'Unknown';
      osIcon = 'https://cdn.discordapp.com/emojis/461561234584502291.png?v=1'
    }


    const embed = {
      title: 'System Information',
      /*author: {
        name: 'System Information',
        icon_url: osIcon
      },*/
      thumbnail: {
        url: `${osIcon}`
      },
      fields: [
        {
          name: 'Operating System',
          value: `${data}`,
          inline: true
        },
        {
          name: 'OS Release',
          value: `${os.release()}`,
          inline: true
        },
        {
          name: 'CPU',
          value: `${os.cpus()[0].model}`,
          inline: true
        },
        {
          name: 'CPU Cores',
          value: `${os.cpus().length}`,
          inline: true
        },
        {
          name: 'Architecture',
          value: `${os.arch}`,
          inline: true
        },
        {
          name: 'Memory',
          value: `${freegbF}GB/${gbR}GB`,
          inline: true
        },
        {
          name: 'Home Directory',
          value: `${os.homedir()}`,
          inline: true
        },
        {
          name: 'Process File',
          value: `${process.mainModule.filename}`,
          inline: true
        },
        {
          name: 'System Uptime',
          value: `${sysuptimeDays} days | ${sysuptime} total hours`,
          inline: true
        }
      ],
      footer: {
        text: client.user.username,
        icon_url: client.user.avatarURL
      },
      timestamp: new Date(msg.createdAt)
    };
    msg.channel.createMessage({embed: embed});
  },
  options: {
    'description': 'Gets information for the system the bot is operating on.'
  }
};