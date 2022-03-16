import express from "express";
import fileUpload from "express-fileupload";
import env from "dotenv";
import { Table } from "../../managers/modelsManager/index";
import {fileUploadToAzure} from '../../lib/file'
import { getTokenToUserData } from "../../lib/auth";
env.config();

const route = express.Router();

route.use(
  fileUpload({
    createParentPath: true
  })
);

route.post("/:request/:savemode", (req, res) => {
  try {
    const userData = getTokenToUserData(req)
    const saveMode = req.params.savemode
    fileUploadToAzure(req, userData,'upload').then((saveData) => {
      const saveFile=saveMode==='editor'?{
        isWrite: true,
        isSave: false,
      }:{
        isWrite: false,
        isSave: true,
      }
      Table("log_file")
        .create({...saveData,
          ...saveFile
        })
        .then((data) => {
          res.status(200).json({ reqName: "file-upload", status: true, result: data });
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
