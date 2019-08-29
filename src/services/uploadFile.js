var multer = require('multer');
// var compress_images = require('compress-images');
var fs = require('fs');

module.exports = {
  StoreFile: () => {
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'src/app/public/uploads')
      },
      filename: (req, file, cb) => {
        var fileName = file.originalname.split('.');
        let name = `${new Date().getTime()}.${fileName[fileName.length - 1]}`
        cb(null, name);
      }
  });
    return multer({storage: storage});
  },

  // compressImage: (fileId, endFile) => {
  //   var placeStore = `img/uploads/`;
    
  //   let INPUT_path_to_your_images = `src/private/${placeStore}**/${fileId}.{jpg,JPG,jpeg,JPEG,png,svg,gif}`;
  //   let OUTPUT_path = `src/private/${placeStore}temp/`;

  //   let fileTemp = `src/private/${placeStore}temp/${fileId}.${endFile}`;
  //   let fileSource = `src/private/${placeStore}${fileId}.${endFile}`;

  //   compress_images(INPUT_path_to_your_images, OUTPUT_path, {compress_force: false, statistic: true, autoupdate: true}, false,
  //     {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
  //     {png: {engine: 'pngquant', command: ['--quality=20-50']}},
  //     {svg: {engine: 'svgo', command: '--multipass'}},
  //     {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, function(){
  //   });
  //   setTimeout(function() {
  //     fs.exists(fileTemp, (existsFileTemp) => {
  //       fs.exists(fileSource, (existsFileSource) => {
  //         if (existsFileSource && existsFileTemp) {
  //           fs.unlink(fileSource, err => { if(err) throw err })
  //           fs.copyFile(fileTemp, fileSource, (err) => {
  //             if (err) throw err;
  //             fs.unlink(fileTemp, err => { if(err) throw err })
  //           })
  //         }
  //       })
  //     })
  //   }, 10000)
  // },

}