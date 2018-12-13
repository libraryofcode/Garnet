var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator['throw'](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : new P(function(resolve) { resolve(result.value); }).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), 'throw': verb(1), 'return': verb(2) }, typeof Symbol === 'function' && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function(v) { return step([n, v]); }; }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0: case 1: t = op; break;
        case 4: _.label++; return { value: op[1], done: false };
        case 5: _.label++; y = op[1]; op = [0]; continue;
        case 7: op = _.ops.pop(); _.trys.pop(); continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop(); continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var _this = this;
var Discord = require('discord.js');
var talkedRecently = new Set();
var status = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline/Invisible'
};
exports.run = function(client, message, args, level) { return __awaiter(_this, void 0, void 0, function() {
  function checkUserPermission(guild, botuser) {
    var arrayOfPerms = [];
    if (botuser.hasPermission('ADMINISTRATOR')) {
      arrayOfPerms.push('Administrator');
    }
    if (botuser.hasPermission('MANAGE_GUILD')) {
      arrayOfPerms.push('Manage Server');
    }
    if (botuser.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
      arrayOfPerms.push('Manage Roles');
    }
    if (botuser.hasPermission('MANAGE_CHANNELS')) {
      arrayOfPerms.push('Manage Channels');
    }
    if (botuser.hasPermission('VIEW_AUDIT_LOG')) {
      arrayOfPerms.push('View Audit Logs');
    }
    if (botuser.hasPermission('KICK_MEMBERS')) {
      arrayOfPerms.push('Kick Members');
    }
    if (botuser.hasPermission('BAN_MEMBERS')) {
      arrayOfPerms.push('Ban Members');
    }
    if (botuser.hasPermission('MANAGE_NICKNAMES')) {
      arrayOfPerms.push('Manage Nicknames');
    }
    if (botuser.hasPermission('MANAGE_EMOJIS')) {
      arrayOfPerms.push('Manage Emojis');
    }
    if (botuser.hasPermission('MANAGE_WEBHOOKS')) {
      arrayOfPerms.push('Manage Webhooks');
    }
    if (botuser.hasPermission('MANAGE_MESSAGES')) {
      arrayOfPerms.push('Manage Messages');
    }
    if (botuser.hasPermission('MENTION_EVERYONE')) {
      arrayOfPerms.push('Mention Everyone');
    }
    return arrayOfPerms;
  }
  function staffFunction(botuser) {
    var staffArray = [];
    if (botuser.id === '278620217221971968') {
      staffArray.push('Founder & Creator');
    } // 310092788630945793
    if (['278620217221971968', '239261547959025665', '282586181856657409', '155698776512790528'].indexOf(botuser.id) >= 0) {
      staffArray.push('Developer');
    }
    if (['213632190557192192', '278620217221971968', '239261547959025665', '282586181856657409', '155698776512790528', '233667448887312385'].indexOf(botuser.id) > 0) {
      staffArray.push('Community Administrator');
    }
    if (['208688963936845824', '454749660041707531', '239261547959025665', '278620217221971968', '213632190557192192'].indexOf(botuser.id) > 0) {
      staffArray.push('Community Public Relations');
    }
    if (['105412668122214400', '233667448887312385', '155698776512790528', '156450671338586112', '427479645395353600', '282586181856657409', '223391425302102016', '335871787453775873', '154497072148643840', '284713468790308885', '208688963936845824', '454749660041707531', '304594274182496258', '239261547959025665', '193118227348324363', '278620217221971968', '213632190557192192', '179908288337412096'].indexOf(botuser.id) > 0) {
      staffArray.push('Community Staff');
    }
    if (['213632190557192192', '278620217221971968', '454749660041707531', '282586181856657409', '427479645395353600', '155698776512790528', '233667448887312385', '179908288337412096'].indexOf(botuser.id) > 0) {
      staffArray.push('Support & Assistance');
    }
    if (['213632190557192192', '239261547959025665', '154497072148643840', '282586181856657409', '156450671338586112', '155698776512790528', '193118227348324363', '179908288337412096'].indexOf(botuser.id) > 0) {
      staffArray.push('Contributor');
    }
    if (['425023068004548618', '193118227348324363'].indexOf(botuser.id) >= 0) {
      staffArray.push('Tester & Early Adopter');
    }
    return staffArray;
  }
  var resolvedUser, botmessage, botuser, matt, bot, myDick, i, millisJoined, dj, millisJoined1, dj1, aPerms, options, embed, joinPosition3;
  return __generator(this, function(_a) {
    switch (_a.label) {
      case 0:
        resolvedUser = (args[0] !== undefined) ? message.guild.members.get(args[0].match(/[0-9]/g).join('')) : message.guild.members.find(function(r) { return r.user.username.toLowerCase() === args; });
        if (!(talkedRecently.has(message.author.id) && !message.member.roles.has('490364533550874644'))) return [3 /*break*/, 2];
        return [4 /*yield*/, message.channel.send('You are being rate limited!' + message.author)];
      case 1:
        botmessage = _a.sent();
        botmessage['delete'](10000);
        return [3 /*break*/, 3];
      case 2:
        if (resolvedUser)
          try {
            level = client.permlevel(resolvedUser.lastMessage);
          }
          catch (e) {
            level = 0;
          }
        message.channel.startTyping();
        try {
          botuser = resolvedUser ? message.guild.members.get(resolvedUser.id) : message.member;
          matt = resolvedUser ? message.guild.members.get(resolvedUser.id).roles.sort(function(a, b) { return b.position - a.position; }).map(function(i) { return i.id; }).slice(0, -1) : message.member.roles.sort(function(a, b) { return b.position - a.position; }).map(function(i) { return i.id; }).slice(0, -1);
          bot = '';
          myDick = '';
          for (i = 0; i < matt.length; i++) {
            myDick += '<@&' + matt[i] + '>';
            if (matt.length != (i + 1))
              myDick += ', ';
          }
          if (botuser.user.bot === true) {
            bot = 'Yes';
          }
          else {
            bot = 'No';
            // It's like 1, 2, 3, just as easy as can be.
          }
          millisJoined = new Date().getTime() - botuser.joinedAt.getTime();
          dj = millisJoined / 1000 / 60 / 60 / 24;
          millisJoined1 = new Date().getTime() - botuser.user.createdAt.getTime();
          dj1 = millisJoined1 / 1000 / 60 / 60 / 24;
          aPerms = void 0;
          /*/const settings = message.settings = client.getGuildSettings(message.guild);
                    const thisRole = botuser.roles.find(r => r.name === settings.modRole).id;*/
          if (botuser.permissions.has('MANAGE_MESSAGES')) {
            aPerms = 'Server Moderator';
          }
          if (botuser.permissions.has('MANAGE_GUILD')) {
            aPerms = 'Server Manager';
          }
          if (botuser.permissions.has('ADMINISTRATOR')) {
            aPerms = 'Server Administrator';
          }
          if (botuser.id === message.guild.ownerID) {
            aPerms = 'Server Owner';
          }
          options = { timeZone: 'America/New_York', hour12: true };
          embed = new Discord.RichEmbed();
          embed.setAuthor(botuser.user.username, botuser.user.avatarURL);
          embed.setTitle(`<@!${botuser.id}>`);
          if (bot === 'Yes') {
            embed.setTitle(`<@!${botuser.id}> | <:bot:515695746595684374>`);
          }
          embed.setThumbnail(botuser.user.avatarURL);
          if (botuser.displayColor) {
            embed.setColor(botuser.displayColor);
          }
          embed.addField('Joined Server At', botuser.joinedAt.toLocaleString('en-US', options) + ' | ' + dj.toFixed(0) + ' Days Ago', true);
          joinPosition3 = null;
          embed.addField('Join Position', joinPosition3, false);
          embed.addField('Created Account At', botuser.user.createdAt.toLocaleString('en-US', options) + ' | ' + dj1.toFixed(0) + ' Days Ago', true);
          embed.addField('Status', '' + status[botuser.user.presence.status], true);
          embed.addField('Playing', '' + (botuser.user.presence.game ? '' + botuser.user.presence.game.name : 'Nothing'), true);
          if (botuser.roles.size - 1) {
            embed.addField('Roles [' + (botuser.roles.size - 1) + ']', '' + myDick, true);
          }
          if (checkUserPermission(message.guild, botuser).length > 0) {
            embed.addField('Key Permissions', '' + checkUserPermission(message.guild, botuser).join(', '), true);
          }
          if (aPerms) {
            embed.addField('Acknowledgements', aPerms, true);
          }
          if (staffFunction(botuser).length) {
            embed.addField('Garnet Team', '' + staffFunction(botuser).join(', '), true);
          }
          embed.addField('System Level', '' + level, true);
          embed.setTimestamp();
          embed.setFooter(client.user.username + ' | ID ' + botuser.id);
          message.channel.send(embed);
          setTimeout(function() {
            // Removes the user from the set after a minute
            message.channel.stopTyping();
          }, 1000);
        }
        catch (err) {
          message.channel.send('An error has happened during processing. | ' + err);
          message.channel.stopTyping();
        }
        talkedRecently.add(message.author.id);
        setTimeout(function() {
          // Removes the user from the set after a minute
          talkedRecently['delete'](message.author.id);
        }, 2000);
        _a.label = 3;
      case 3: return [2 /*return*/]; //eslint disable-line no-fallthrough
    }
  });
}); };
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['userinfo'],
  permLevel: 'Standard User'
};
exports.help = {
  name: 'whois',
  category: 'Misc',
  description: 'Provides user information.',
  usage: 'whois [...user]'
};