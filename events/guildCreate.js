// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  /* this code checks to make sure that the bot is in the authorized list of servers below in the "activatedServers"
  If it's not in this list, then the bot will leave the server and then will return a DEBUG message to the console. */

  const activatedServers = ["446067825673633794", "472913337454297108", "477182486586327060", "276019666399395850", "475574326926770186"]
  if (!activatedServers.includes()) {
    client.logger.debug(`[UNAUTHORIZED SERVER] ${guild.name} (${guild.id}) tried to add the bot, however the server is not activated. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`)
    guild.leave()
  }
  else {
    return;
}
// If you don't want this feature on your bot, feel free to remove everything from this line of text to the above comment.
    


  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);



};
