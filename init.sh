echo "Hi, welcome to the Garnet initialization script. We're going to ask you some questions to get setup."
read -sp "Token: " token
if [ $token ]
 then 
 touch config.js
else echo "Please provide a token."
fi
read -p "Your Discord User ID: " userID
read -p "Prefix: " prefix
echo "Your admin prefix is a prefix only you and your developers can use, helpful for diagnosing issues and bypassing restrictions."
read -p "Admin Prefix: " adminPrefix
echo "Thanks! Your config has been created as config.js"
echo "You can edit any additional settings here, thanks for using Garnet!"
printf "const config = {
  // Bot Owner, level 10 by default. A User ID. Should never be anything else than the bot owner's ID.
  'ownerID': '$userID',
  
  // Bot Admins, level 9 by default. Array of user ID strings.
  'developers': ['155698776512790528', '239261547959025665', '282586181856657409'],

  'admins': ['213632190557192192', '239261547959025665', '310092788630945793', '105412668122214400',],
  
  // Bot Support, level 8 by default. Array of user ID strings
  'support': ['335871787453775873', '223391425302102016', '155698776512790528'],

  'staff': ['193118227348324363', '304594274182496258', '208688963936845824', '284713468790308885', '154497072148643840', '156450671338586112'],
  
  'tester': ['233667448887312385', '314005026404171786', '454749660041707531', '273035913725214720', '315381917996548097', '431046114557296641', '193118227348324363', '284713468790308885', '315342131185057794', '368867272049033217'],
  
  'contributor': ['154497072148643840', '282586181856657409', '156450671338586112'],

  'pr': ['335871787453775873', '233667448887312385'],
  
  // Your Bot's Token. Available on https://discordapp.com/developers/applications/me
  'token': '$token',




  
  // Default per-server settings. New guilds have these settings. 
  
  // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
  // VIA COMMANDS IN THE GUILD.
    
  'defaultSettings' : {
    'prefix': '$prefix',
    'adminPrefix': '$adminPrefix',
    'modLogChannel': 'mod-log',
    'modRole': 'Moderator',
    'adminRole': 'Council',
    'systemNotice': 'false', // This gives a notice when a user tries to run a command that they do not have permission to use.
    'welcomeChannel': 'welcome',
    'welcomeMessage': 'Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D',
    'welcomeEnabled': 'false',
    'stats': 'true'
  },
  
  // PERMISSION LEVEL DEFINITIONS.
  
  permLevels: [
    // This is the lowest permisison level, this is for non-roled users.
    { level: 0,
      name: 'Standard User', 
      // Don't bother checking, just return true which allows them to execute any command their
      // level allows them to.
      check: () => true
    },
  
    // This is your permission level, the staff levels should always be above the rest of the roles.
    { level: 2,
      // This is the name of the role.
      name: 'Server Moderator',
      // The following lines check the guild the message came from for the roles.
      // Then it checks if the member that authored the message has the role.
      // If they do return true, which will allow them to execute the command in question.
      // If they don't then return false, which will prevent them from executing the command.
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: 'Server Manager',
      check: (message) => message.member.hasPermission('MANAGE_GUILD')
    },
  
    { level: 4,
      name: 'Server Admin', 
      check: (message) => message.member.hasPermission('ADMINISTRATOR')
      /*
          try {
            const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
            return (adminRole && message.member.roles.has(adminRole.id));
          } catch (e) {
            return false;
          }
        }
        */
    },
    // This is the server owner.
    { level: 5,
      name: 'Server Owner', 
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) => message.channel.type === 'text' ? (message.guild.ownerID === message.author.id ? true : false) : false
    },
  
  
    { level: 6,
      name: 'Systems Alpha/Dev Tester',
      check: (message) => config.tester.includes(message.author.id) || message.member.roles.has('488761877338259459')
    },
  
    {level: 7,
      name: 'Contributor',
      check: (message) => config.contributor.includes(message.author.id) || message.member.roles.has('471390910278664212')
    },

    { level: 8,
      name: 'Moonglow Staff',
      check: (message) => config.staff.includes(message.author.id)
    },
  
    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
    { level: 9,
      name: 'Systems Support',
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (message) => config.support.includes(message.author.id) || message.member.roles.has('488869588499693618')
    },

    { level: 10,
      name: 'Public Relations',
    
      check: (message) => config.pr.includes(message.author.id)
    },
  
    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { level: 11,
      name: 'Systems Administrator',
      check: (message) => config.admins.includes(message.author.id) || message.member.roles.has('458977755833565206')
    },
  
    // This is the bot owner, this should be the highest permission level available.
    // The reason this should be the highest level is because of dangerous commands such as eval
    // or exec (if the owner has that).
    { level: 12,
      name: 'Systems Developer',
      check: (message) => config.developers.includes(message.author.id)
    },
    { level: 13,
      name: 'Systems Main Developer', 
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};
  
module.exports = config;" > config.js

 