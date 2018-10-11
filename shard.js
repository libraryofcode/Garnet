const Discord = require('discord.js');
const sharder = new Discord.ShardingManager('./index.js'); 
sharder.spawn(1, 1000); // This will spawn 2 shards (5,000 guilds);
//To be totally and completely honest with you, I don't even know what the fuck is going on here...
//I highly recommend that you just start the bot with npm start until I can actually figure out what kind of bullshit is going on here.
//Because it's literally just trash, pls don't use. Kthxbye
