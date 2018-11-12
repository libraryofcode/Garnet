// This event executes when a new guild (server) is left.
const fs = require('fs');
module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);

  fs.readFile('./allowedGuildDB.json', 'utf8', async (err, data) => { // readFile method basically allows us to read the data in that file
    if (err !== null) { // Just an error checker
      return console.log(err);
    }
    else {
      const guildID = guild.id;
      //if (typeof (args[0]) !== 'number') return message.channel.send('TypeError: Cannot read property \'guildID\' of undefined');

      const requiredData = JSON.parse(data);
      const index = requiredData.allowedGuildIDs.indexOf(guildID);
      if (index !== -1) {
        requiredData.allowedGuildIDs.splice(index, 1);
        // And now we write the final data again
        const json = JSON.stringify(requiredData);
        fs.writeFile('./allowedGuildDB.json', json, 'utf8', (err) => {
          if (err !== null) {
            console.log(err);
          }
        });
      }
      /*  const requiredData = JSON.parse(data);
    requiredData.allowedGuildIDs.shift(guildID);
    // And now we write the final data again
    const json = JSON.stringify(requiredData);
    fs.writeFile('./allowedGuildDB.json', json, 'utf8', (err) => {
      if (err !== null) {
        console.log(err);
      }
      
    });*/
    }

    // If the settings Enmap contains any guild overrides, remove them.
    // No use keeping stale data!
    if (client.settings.has(guild.id)) {
      client.settings.delete(guild.id);
    }
    //};
  });
};
