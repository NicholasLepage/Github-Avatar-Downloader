var request = require("request");
var GITHUB_TOKEN = require("./secret.js");
var fs = require("fs");
var owner = process.argv[2];
var repo = process.argv[3];


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(owner, repo, cb) {
  var options = {
    url: "https://api.github.com/repos/" + owner + "/" + repo + "/contributors",
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
  console.log("Currently downloading avatars");

  for (var i = 0; i < data.length; i++) {
    downloadImageByUrl(data[i].avatar_url, "./avatars/" + data[i].login);
  }
});

function downloadImageByUrl(url, filepath) {

  request.get(url)
         .on('error', function (err) {
           throw err;
         })

         .on("end", function() {
          console.log("Download complete");
         })

         .pipe(fs.createWriteStream(filepath));

}