import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { postApi } from "../../api"
import { FILE_UPLOAD } from '../../common'

const FileUpload = ({fileType , callback, authData, configData , addId}) => {
    const [fileState, setFileState] = useState({
        size:0,name:'',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isFileUpload, setIsFileUpload] = useState(false)
    const [acceptState, setAcceptState] = useState("");
    const [buttonLabel, setButtonLabel] = useState("이미지업로드");
    const fileSizeCalculator = (_fileSize,_fixed) => {
        var str
        let fileSize=Number(_fileSize)
        let fixed=_fixed||0
        if(fileSize===null && fileSize=== undefined && fileSize===0 && fileSize==='0') return "0 b"
      
        if (fileSize >= 1024 * 1024 *1024 *1024) {
            fileSize = fileSize / (1024 * 1024 * 1024*1024);
            fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
            str = fileSize + ' TB';
        }
        
        else if (fileSize >= 1024 * 1024 *1024) {
            fileSize = fileSize / (1024 * 1024 * 1024);
            fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
            str = fileSize + ' GB';
        }
          //MB 단위 이상일때 MB 단위로 환산
        else if (fileSize >= 1024 * 1024) {
            fileSize = fileSize / (1024 * 1024);
            fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
            str = fileSize + ' MB';
        }
        //KB 단위 이상일때 KB 단위로 환산
        else if (fileSize >= 1024) {
            fileSize = fileSize / 1024;
            fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
            str = fileSize + ' KB';
        }
        //KB 단위보다 작을때 byte 단위로 환산
        else {
            fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
            str = fileSize + ' byte';
        }
        return str;
    }
    useEffect(() => {
        let result = "";
        let fileKey = "";
        switch (fileType) {
          case "document":
            fileKey = "dc_documentExtention";
            setButtonLabel("문서업로드");
            break;
          case "video":
            fileKey = "dc_videoExtention";
            setButtonLabel("비디오업로드");
            break;
          case "file":
            fileKey = "dc_fileExtention";
            setButtonLabel("파일업로드");
            break;
          default:
            fileKey = "dc_imageExtention";
            setButtonLabel("이미지업로드");
            break;
        }
    
        for (let i = 0; i < configData[fileKey].length; i++) {
          result += `.${configData[fileKey][i].label},`;
        }
        setAcceptState(result);
        return () => {
          setAcceptState(0);
          setButtonLabel("이미지업로드");
        };
      }, [configData, fileType]);

    const fileSaveHandler = (e) => {
        const files = e.target.files;
        const formData = new FormData();
    
        formData.append("upload", files[0]);
        postApi(
          setIsLoading,
          `${FILE_UPLOAD}/${fileType}s/save`,
          (res) => {
            if (res.data.status) {
                callback(res)
                setFileState(res.data.result)
                console.log(res.data.result)
                setIsFileUpload(true)
            }
          },
          formData,
          authData.userToken
        );
      };

  return (
<div className="w-100">
    <label htmlFor={`fileUpload-${fileType}${addId}`} className="btn btn-info btn-sm">
      <i className="bi-image mr-2" /> {buttonLabel}
    </label>
    <input
      name="upload"
      accept={acceptState}
      onChange={fileSaveHandler}
      type="file"
      id={`fileUpload-${fileType}${addId}`}
      style={{ display: "none" }}
      required
    />
    <span>{fileState.name} {fileSizeCalculator(fileState.size,2)}</span>
  </div>
  )
}
const mapStateToProps = (state) => {
    return {
      configData: state.configData,
      authData: state.authData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  export default  connect(mapStateToProps, mapDispatchToProps)(FileUpload)