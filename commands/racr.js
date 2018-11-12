const fs = require('fs');
exports.run = async (client, message, args) => {

  fs.readFile('./allowedGuildDB.json', 'utf8', async (err, data) => { // readFile method basically allows us to read the data in that file
    if (err !== null) { // Just an error checker
      return console.log(err);
    }
    else {
      const guildID = args[0];
      //if (typeof guildID !== 'number') return message.channel.send('TypeError: Cannot read property \'guildID\' of undefined'); //throw new TypeError('Cannot read property \'guildID\' of none')
      if (data.length === 0) { // So let's use this case when the file data is empty
        // So let's get the guild ID first. In eris, the arguments (Whatever follows the command name) is split by spaces, so it should be pretty easy to get the guild ID we need
        const requiredObject = {
          allowedGuildIDs: []
        };
        requiredObject.allowedGuildIDs.push(guildID);
        // After we push the data, we convert it to JSON
        const json = JSON.stringify(requiredObject);
        // And now we write the data to the same file
        fs.writeFile('./allowedGuildDB.json', json, 'utf8', (err) => {
          if (err !== null) {
            console.log(err);
          }
        });
        // Make sure you send message when this condition occurs too
      }
      else { // this case would mean that the file isn't empty
        const requiredData = JSON.parse(data);
        requiredData.allowedGuildIDs.push(guildID);
        const find = client.activatedServers.get(args[1]);
        if (find === undefined) {
          client.activatedServers.set(args[1], [`${guildID}`]);
        } else {
          client.activatedServers.push(args[1], `${guildID}`);
        }
        // And now we write the final data again
        const json = JSON.stringify(requiredData);
        fs.writeFile('./allowedGuildDB.json', json, 'utf8', (err) => {
          if (err !== null) {
            console.log(err);
          }
                    
        });
        //503491110149160961
        message.delete();
        message.channel.send(`✅ ***Moonglow has been activated on ${guildID} for <@!${args[1]}>***`);
        //const acUser = client.users.get(args[1]).tag;
        //const filter = (reaction) => reaction.emoji.name === '✅';

        //same tbh


      }
    }
  }); 
     
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['confirm'],
  permLevel: 'Systems Support'
};
  
exports.help = {
  name: 'racr',
  category: 'System',
  description: 'Activates the specified server for the specified user.',
  usage: 'racr [...server ID] [...user ID]'
};
