const multer = require('multer');
const path = require('path');
//set storage engine
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')//null means error
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
  const upload = multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter:(req,file,cb)=>{
    CheckFileType(file,cb);
    }
 }).single('myImage');

 CheckFileType = (file,cb)=>{
     //allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;
    //check extensions
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null,true)
    }
    else{
       return cb('Error Image Only');
    }

   }
   module.exports = upload