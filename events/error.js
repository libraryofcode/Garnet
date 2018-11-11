module.exports = async (client, error) => {
  console.warn('An unknown error has occured, please read the following log message.');
  await client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, 'error');
};
