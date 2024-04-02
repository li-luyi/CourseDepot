var fs = require('fs');
var path = require('path');

function readFile(filePath) {
  var folderPath = filePath + '/*.png';

  fs.readdir(folderPath, function (err, files) {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach(function (file) {
      console.log(path.join(folderPath, file)); // 输出文件的完整路径
    });
  });
}
