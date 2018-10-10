const Discord = require('discord.js');
const Manager = new Discord.ShardingManager('./index.js'); 
Manager.spawn(1, 1000); // This will spawn 2 shards (5,000 guilds);
//To be totally and completely honest with you, I don't even know what the fuck is going on here...
