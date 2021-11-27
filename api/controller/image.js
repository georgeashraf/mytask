var fs = require("fs");
var multer  = require('multer');
const express = require('express');
const router = express.Router();



const multerStorage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,'../app/public');
  },
  filename: (req,file,cb) =>{
    const ext = file.mimetype.split('/')[1]
    cb(null,`files/products-${req.params.id}.${ext}`)
  }
});
const multerStorageCategory = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,'../app/public');
  },
  filename: (req,file,cb) =>{
    const ext = file.mimetype.split('/')[1]
    cb(null,`files/category-${req.params.id}.${ext}`)

    // cb(null,`files/admin-${file.fieldname}-${req.params.id}--${Date.now()}.${ext}`)
  }
});

const multerFilter = (req,file,cb) =>{
  if (file.mimetype.split('/')[1]=='jpeg' || file.mimetype.split('/')[1]=='jpg' ||file.mimetype.split('/')[1]=='png' ){
    cb(null,true)
  }else{
    cb(new Error("unsupported formate"),false)
  }
};
exports.upload = multer({
  storage:multerStorage,
  fileFilter:multerFilter
});
exports.upload_category = multer({
  storage:multerStorageCategory,
  fileFilter:multerFilter
});

exports.upload_image = async (request, response,next)  =>{
  try {
    console.log(request.body)
    console.log('from file upload')
    // const newFile = await File.create({
    //   name:req.file.filename
    // })
    // if (newFile){
    //   response.status(200).json({
    //     message:'File uploaded succesfully'
    //   })
    // }
  } catch (error) {
    console.log(error)
    response.json({
      error
    });
  }

}
exports.delete_image = async (request, response,next)  =>{
  try {
    const filePath = "public/files/"+req.params.name ;
    const newFile =  await fs.promises.unlink(filePath)

      res.status(200).json({
        message:'File deleted succesfully'
      })

  } catch (error) {
    res.json({
      error
    });
  }
}