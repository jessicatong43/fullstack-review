const axios = require('axios');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (reqBody, res) => {
  var username = reqBody.username;
  // Use the axios module to request repos for a specific user from the github API
  axios.get(`http://api.github.com/users/${username}/repos`)
    .then(function(res) {
      let repoData = res.data.map(repo => {
        return {
          id: repo.id,
          title: repo.name,
          lastUpdated: repo.updated_at,
          starCount: repo.stargazers_count
        };
      })
      console.log('REPODATA: ', repoData);
      db.save(repoData);
    })
    .catch(function(error) {
      console.log('GET ERROR: ', error);
    })
    .finally(function() {
      console.log('Repo data retrieved.')
    });


    // FOR THE END OF GET REQUESTS:
    // .finally(function() {
    //   console.log('Post complete.')
    // });



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