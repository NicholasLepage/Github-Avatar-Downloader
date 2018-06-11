var request = require("request");
var fs = require("fs");

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

downloadImageByUrl("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg");