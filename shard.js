const Discord = require('discord.js');
const sharder = new Discord.ShardingManager('./index.js'); 
sharder.spawn(1); 
