var request = require("request");
var GITHUB_TOKEN = require("./secret.js");


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN.GITHUB_TOKEN,
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  var data = JSON.parse(result);
  console.log("Errors:", err);
  console.log("Here are the URLs for each avatars: ");

  for (var i = 0; i < data.length; i++) {
    console.log(data[i].avatar_url);
  }


});