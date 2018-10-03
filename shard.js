const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./index.js'); 
Manager.spawn(5, 10000); // This example will spawn 2 shards (5,000 guilds);
