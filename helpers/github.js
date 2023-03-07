const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (reqBody, res) => {
  var username = reqBody.username;
  // Use the axios module to request repos for a specific user from the github API
  axios.post(`http://github.com/${username}?tab=repositories`, {
      username: `${username}`
    })
    .then(function(res) {
      console.log('Response status: ', res.status);
    })
    .catch(function(error) {
      console.log('ERROR: ', error);
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