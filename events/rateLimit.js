module.exports = (client, guild, message, rateLimit) => {
  const info = rateLimit.info;
  client.channel.get('503374359918805009').send(info)
};