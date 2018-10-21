module.exports = (client, guild) => {
  const guildName = guild.name;
  const guildID = guild.id;
  client.channels.get('503374691046653963').send(`Guild ${guildName} with ID ${guildID} has become unavailable to the client.`);
};