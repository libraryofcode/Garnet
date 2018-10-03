//AIzaSyD7ZRm5CCh-LU2YsrnhCc6ulIRb62m8gGY
//Yes I know a YouTube API key is here. I don't care, please stop yelling at me.
const Discord = require('discord.js');
const Music = require('discord.js-musicbot-addon');
const client = new Discord.Client(); //replace client with what you want your Discord Client to be.
const settings = require('./musicsettings.json'); //Load the token, prefix, and other info from a JSON file.

client.on('ready', () => {
    console.log(`[Start] ${new Date()}`);
});

// A random, empty map.
// This will contain the data for the prefixs.
// Note this has to be a map.
var mapper = new Map();
// A valid set of data needs an id and prefix in the object.
let mprop = {
  id: "387727240047230976",
  prefix: "click"
}
// Set the data into the map.
// Change be changed latter with the set command.
mapper.set('387727240047230976', mprop);

Music.start(client, {
  youtubeKey: "AIzaSyD7ZRm5CCh-LU2YsrnhCc6ulIRb62m8gGY",        // The youtube api key.
  prefix: settings.prefix,            // Prefix for the commands. Will be used for deafult prefix's for servers.
  botAdmins: ["275147928249827338"],  // List of ID's for admins (bypasses all permissions). // Prefix for the commands.
    global: true,            // Non-server-specific queues.
    maxQueueSize: 25,        // Maximum queue size of 25.
    clearInvoker: true,      // If permissions applicable, allow the bot to delete the messages that invoke it.
    helpCmd: 'mhelp',        // Sets the name for the help command.
    playCmd: 'moon music play',        // Sets the name for the 'play' command.
    volumeCmd: 'moon music volume',     // Sets the name for the 'volume' command.
    leaveCmd: 'moon music leave',      // Sets the name for the 'leave' command.
    disableLoop: true        // Disable the loop command.
  });

client.login(musicsettings.token);
