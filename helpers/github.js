const axios = require('axios');
const config = require('../config.js');
const db = require('../database');

let getReposByUsername = (username, res) => {
  // Use the axios module to request repos for a specific user from the github API
  axios.get(`http://api.github.com/users/${username}/repos`)
    .then(function(res) {
      // console.log("resData: ", res.data);
      return res.data.map(repo => {
        return {
          id: repo.id,
          title: repo.name,
          url: repo.html_url,
          user: repo.owner.login,
          lastUpdated: repo.updated_at,
          starCount: repo.stargazers_count
        };
      })
    })
    .then ((repoData) => {
      // console.log("repoData: ", repoData);
      return db.save(repoData, (err, data) => {
        console.log('IT FINALLY WORKS: ', data);
        return data;
      })
    })
    .then((data) => {
      console.log('POST-SAVE DATA: ', data);
      res.status(201).send()})
    .catch(function(error) {
      console.log('GET ERROR: ', error)
    })
    .finally(function() {
      console.log('Repo data retrieved.')
    });

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'FILL ME IN',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

}

module.exports.getReposByUsername = getReposByUsername;