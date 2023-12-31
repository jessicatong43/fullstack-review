const express = require('express');
const axios = require('axios');
const github = require('../helpers/github.js');
const db = require('../database');
let app = express();

app.use(express.static('client/dist'));
app.use(express.json());
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body.username, res);
});

app.get('/repos', function (req, res) {
  // This route should send back the top 25 repos
  db.getAll()
    .then((top25) => {
      res.send(top25);
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

