const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true},
  title: String,
  url: String,
  user: String,
  lastUpdated: Date,
  starCount: Number
});

let Repo = mongoose.model('Repo', repoSchema);
// mongo will look for the lowercase plural version (repos)

let save = (repoData, callback) => {
  // This function should save a repo or repos to
  // the MongoDB
  db.on('error', err => {
    console.log(err);
  });
  db.once('open', () => {
    console.log('Connected to database.');
  });

  //*====== JAKE'S CODE =====
  var count = 0;
  var repos = [];
  repoData.forEach((repo) => {
    var filter = {id: repo.id};
    var update = repo;
    Repo.updateOne(filter, update, {
      new: true,
      upsert: true,
      // rawResult: true // Return the raw result from the MongoDB driver
    }, (err, res) => {
      // console.log('\n\n\n', res);
      if (err) return callback(err, repo.name);
      repos.push(repo);
      // results.push([repo.name, (res.upserted === undefined) ? (res.nModified > 0 ? true : null) : false]);
      count++;
      if (count === repoData.length) {
        // All updates have completed
        callback(null, repos);
      }
    });
  })

  //*====== FROM SOLUTION CODE ======
  // return Repo.create(repoData);

  // return repoData.forEach((repo) => {
  //   var newRepo = new Repo(repo);
  //   newRepo.findOneAndUpdate({upsert: true});
  // })
};

let getAll = () => {
  return Repo.find({}).sort('-stars').limit(25).exec()
  .then((top25) => {res.send(top25)});
};

module.exports.save = save;
module.exports.getAll = getAll;