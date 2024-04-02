// var http = require('http');
// var express = require('express');
// var app = express();
// var fs = require('fs')
var url = require('url');
// var path = require('path');

// http.createServer(function (req, res) {
//   var filePath = url.parse(req.url, true).pathname;
//   var folderPath = filePath
//   fs.readdir(path.join(__dirname, folderPath), function (err, files) {
//     let pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');
//     if (err) {
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end('Internal server error');
//     } else {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(pngFiles.join(', '));
//     }
//   });
// }).listen(10086, '127.0.0.1');

var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var fs = require('fs');
app.use(cors())

app.get('/getPngFiles', function (req, res) {
  var filePath = url.parse(req.url, true).query;
  var folderPath = '/' + filePath.file
  var directoryPath = path.join(__dirname, folderPath); // directory from which you want to get .png files

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.send('Unable to scan directory: ' + err);
    }
    let pngFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');
    pngFiles.sort((a, b) => {
      return parseInt(a) - parseInt(b)
    })
    res.send(pngFiles);
  });
});

app.listen(3000, function () {
  console.log('Server is listening on port 3000');
});
