const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  title: String,
  user: String,
  lastUpdated: Date,
  starCount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoData) => {
  // This function should save a repo or repos to
  // the MongoDB
  // TODO: Your code here
}

module.exports.save = save;