var request = require("request");
var GITHUB_TOKEN = require("./secret.js");
var fs = require("fs");


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
    downloadImageByUrl(data[i].avatar_url, "./avatars/" + data[i].login);
  }
});

function downloadImageByUrl(url, filepath) {

  request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           console.log('Response Status Code: ', response.statusMessage);
         })
         .on("end", function() {
          console.log("Download complete");
         })

         .pipe(fs.createWriteStream(filepath));
         console.log("Currently downloading avatar");

}