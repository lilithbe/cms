import express from "express";
import fileUpload from "express-fileupload";
import env from "dotenv";
import { Table } from "../../managers/modelsManager/index";
import { editorUpload, multipleUpload, singleUpload} from '../../lib/file'
import { getTokenToUserData } from "../../lib/auth";
env.config();

const route = express.Router();

route.use(
  fileUpload({
    createParentPath: true
  })
);

route.post("/multiple", async(req, res) => {
  try {
    const userData = getTokenToUserData(req)
    console.log(req.files.upload.length)
    if(req.files.upload.length > 0){
      multipleUpload(req, userData,'upload').then((saveData) => {
        Table("log_file")
          .bulkCreate(saveData)
          .then((data) => {
            res.status(200).json({ reqName: "file-upload", status: true, result: data });
          })
          .catch((error) => {
            res.status(200).json({ reqName: "file-upload", status: false, error: error, errorMessage: "insert error message" });
          });
      })
    }else{
  singleUpload(req, userData,'upload').then((saveData) => {
      Table("log_file")
        .create(saveData)
        .then((data) => {
          res.status(200).json({ reqName: "file-upload", status: true, result: [data] });
        })
        .catch((error) => {
          res.status(200).json({ reqName: "file-upload", status: false, error: error, errorMessage: "insert error message" });
        });
    })
    }
  } catch (error) {
    res.status(200).json({ reqName: "file-upload", status: false, error: error, errorMessage: "insert error message" });
  }

});

route.post("/single", async(req, res) => {
  try {
    const userData = getTokenToUserData(req)
    editorUpload(req, userData,'upload').then((saveData) => {
      Table("log_file")
        .create(saveData)
        .then((data) => {
          res.status(200).json({ reqName: "file-upload", status: true, result: [data] });
        })
        .catch((error) => {
          res.status(200).json({ reqName: "file-upload", status: false, error: error, errorMessage: "insert error message" });
        });
    })
  } catch (error) {
 
    res.status(200).json({ reqName: "file-upload", status: false, error: error, errorMessage: "insert error message" });
  }

});

module.exports = route;
