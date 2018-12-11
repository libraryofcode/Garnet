async function check(id) {
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/';

  const thisPrem = await MongoClient.connect(url);//.then(m => {
  var dbo = thisPrem.db('Garnet');
  const premServers = await dbo.collection('premium').findOne({guild: id});
  if (id === '446067825673633794') return true;
  if (await premServers) return true;
  if (await !premServers) return false;
  thisPrem.close();
}

module.exports = check;


