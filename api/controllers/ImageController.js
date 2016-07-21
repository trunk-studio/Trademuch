
var self = module.exports = {
  index: async (req,res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/api/uploadImage" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="picBase64"><br>'+
    '<input type="file" name="image" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  uploadOld: async  (req, res) => {
    try {

      let promise = new Promise((resolve, reject) => {
        req.file('image').upload(sails.config.uploadImage, async (err, files) => {
          resolve(files);
        });
      });

      let files = await promise.then();
      let uploadImages = [];
      for (let i in files) {
        if(files[i].type.split('/')[0] == 'image') {
          let name = files[i].filename;
          let path = files[i].fd.split('/.tmp/public')[1];
          uploadImages.push({
            name: name,
            src: path
          });
        }
      }
      console.log("==== imageUpload:upload =====\n",uploadImages);
      return res.json(uploadImages);
    } catch (e) {
      res.serverError(e);
    }
  },

  upload: async  (req, res) => {
    try {
      let data = req.body;
      console.log("==== imageUpload ====",data);
      let base64Data = data.picBase64;
      let imageTypeRegularExpression = /\/(.*?)$/;
      let crypto = require('crypto');
      let seed = crypto.randomBytes(20);
      let uniqueSHA1String = crypto
        .createHash('sha1')
        .update(seed)
        .digest('hex');
      let imageBuffer = self.decodeBase64Image(base64Data);
      let userUploadedFeedMessagesLocation = sails.config.uploadImage.dirname;
      let uniqueRandomImageName = uniqueSHA1String;
      let imageTypeDetected = imageBuffer
        .type
        .match(imageTypeRegularExpression);
      let userUploadedImagePath = userUploadedFeedMessagesLocation +
        uniqueRandomImageName +
        '.' +
        imageTypeDetected[1];
      let result = await new Promise((done) => {
        require('fs').writeFile(userUploadedImagePath, imageBuffer.data,
          function() {
            console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
            done(userUploadedImagePath);
        });
      });
      console.log("upload pic result->",result);
      let path = result.split('/public/')[1];
      let uploadImages = [];
      uploadImages.push({
        name: uniqueSHA1String,
        src: "/"+path
      });
      return res.json(uploadImages);
    } catch (e) {
      res.serverError(e);
    }
  },
  decodeBase64Image: (dataString) => {
    try {
      let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let response = {};
      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');
      return response;
    } catch (e) {
      res.serverError(e);
    }
  }
}
