import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { postApi } from "../../api"
import { FILE_UPLOAD } from '../../common'
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';


const FileUpload = ({fileType ,containerName, callback, authData, configData }) => {
    const [fileState, setFileState] = useState([])
    const [isLoading, setIsLoading] = useState(false)
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
        let fileKey = "dc_imageExtention";
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
          case "image":
            fileKey = "dc_imageExtention";
            setButtonLabel("이미지업로드");
            break;
          default:
            fileKey = "all";
            setButtonLabel("파일업로드");
            break;
        }
        if(fileType!=='all'){
          for (let i = 0; i < configData[fileKey].length; i++) {
            result += `.${configData[fileKey][i].label},`;
          }
        }else{
          for (let i = 0; i < configData.dc_documentExtention.length; i++) {
            result += `.${configData.dc_documentExtention[i].label},`;
          }
          for (let i = 0; i < configData.dc_videoExtention.length; i++) {
            result += `.${configData.dc_videoExtention[i].label},`;
          }
          for (let i = 0; i < configData.dc_fileExtention.length; i++) {
            result += `.${configData.dc_fileExtention[i].label},`;
          }
          for (let i = 0; i < configData.dc_imageExtention.length; i++) {
            result += `.${configData.dc_imageExtention[i].label},`;
          }
        }
       
        setAcceptState(result);
        return () => {
          setAcceptState(0);
          setButtonLabel("파일업로드");
        };
      }, [configData, fileType]);
      const  uuidv4=() =>{
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
      }
    const fileSaveHandler = (e) => {
      e.preventDefault()
        if(fileState.length!==0) {
          const formData = new FormData();
          for (let i = 0; i < fileState.length; i++) {
            const file = fileState[i];
            formData.append("upload", file);
          }
       
          formData.append("containerName", containerName);
          postApi(
            setIsLoading,
            `${FILE_UPLOAD}/single`,
            (res) => {
              if (res.data.status) {
               
                  callback(res)
                  setFileState([])
                
              }
            },
            formData,
            authData.userToken
          );
        }
      };
      const uuid= uuidv4()
      const fileChangeHandler = (e) => { 
        e.preventDefault()
        const arr=[]
        for (let i = 0; i < e.target.files.length; i++) {
          const file = e.target.files[i];
          const extention =  file.name.split('.')[file.name.split('.').length-1]
          const result = acceptState.replaceAll('.','').split(',').findIndex(f=>f===extention)
          if(result !==-1){
            arr.push(file)
          }
        }
        setFileState(arr)
       }
  return (
    <form encType='multipart/form-data' onSubmit={fileSaveHandler}>
      <div className="w-100">
        <label htmlFor={`fileUpload-${uuid}`} className="btn btn-info btn-sm">
          <i className="bi-image mr-2" /> {buttonLabel}
        </label>
        <input
          name="upload"
          accept={acceptState}
          onChange={fileChangeHandler}
          type="file"
          id={`fileUpload-${uuid}`}
          style={{ display: "none" }}
          required
        />
        <span>{fileState.length}</span>
        <Button type='submit' label="save" className='py-1 p-button-sm' disabled={fileState.length === 0 ? true : false} />
      </div>
    </form>

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

  FileUpload.propTypes = {
    fileType: PropTypes.string,
    callback:PropTypes.func.isRequired,
    containerName:PropTypes.string
  };
  FileUpload.defaultProps = {
    fileType: 'image',
    containerName:'user-upload',
    callback:()=>{
      console.log('callback function is not found')
    }
  };