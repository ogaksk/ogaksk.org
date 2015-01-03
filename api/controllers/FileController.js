/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
var DIRPATH = 'assets/images';

function processImage(name, path, cb) {
  console.log('Processing image');
 
  cb(null, {
    'result': 'success',
    'name': name,
    'path': path
  });
}

module.exports = {
  index: function (req,res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="/file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>' +
    '<img src="/images/test.png" />'
    )
  }, 

  upload: function  (req, res) {   
    var fileName = "test.png",
      filePath = DIRPATH + '/' + fileName;

    req.file("avatar").upload(function (err, files) {
      if (err)
        return res.serverError(err);
    
      fs.readFile(files[0].fd, function (err, data) {
        if (err) {
          res.json({'error': 'could not read file'});
        } else {
          fs.writeFile(filePath, data, function (err) {
            if (err) {
              res.json({'error': 'could not write file to storage'});
            } else {
              processImage(fileName, filePath, function (err, data) {
                if (err) {
                  res.json(err);
                } else {
                  res.json(data);
                }
              });
            }
          })
        }
      });

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }
	
};

