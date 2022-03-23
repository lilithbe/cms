import React ,{useState,  useRef}  from 'react'
import { Button } from 'primereact/button';
import {InputText} from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import PropTypes from 'prop-types'
import { fileSizeCalculator } from '../../../lib/calculator';
import { connect } from 'react-redux';
import { arrayAddFormat , arrayDeleteFormat} from '../../../lib/array';
import JsonView from '../../admin/jsonView/JsonView';
// import $ from 'jquery' 


const FileUploadSetupTemplate = ({setState,state, configData}) => {
  const fileInit={
    label:'File Upload',
    extention:configData.dc_imageExtention,
    fileType:'image',
    minSize:10,
    maxSize:50000,
}
    const scrollBox = useRef(null)
    const addFileHander = (e) => {
        e.preventDefault()
        // setTimeout(() => {
        //   $(scrollBox.current).animate({
        //     scrollTop:scrollBox.current.scrollHeight
        //   },500)
        // }, 800);
        setState({
            ...state,
            fileUploadConfig:[...state.fileUploadConfig,fileInit]
        })
    }    
const fileUploadConfigHandler = (value,index) => {
    const newArray = arrayAddFormat(state.fileUploadConfig , value ,index)
    setState({
        ...state,
        fileUploadConfig:newArray
    })
}
const deleteHandler = (index) => {
    const newArray = arrayDeleteFormat(state.fileUploadConfig , index) 
    setState({
        ...state,
        fileUploadConfig:newArray
    })
}

const moveHandler = (index) => {

  // $(scrollBox.current).animate({
  //   scrollTop:index *390
  // },500)
}

    return (
      <div className='card'>
        <JsonView json={state.fileUploadConfig}/>
        <div className='card-body'>      
          <FileUploadConfigTemplate item={state.fileUploadConfig} configData={configData}  callback={(data)=>{
              setState({
                ...state,
                fileUploadConfig:data
            })
          }}/>
        </div>
       
      </div>
    );
}
const mapStateToProps = (state) => {
    return {
      configData: state.configData,
      groupData:state.groupData,
      boardData:state.boardData,
      authData: state.authData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(FileUploadSetupTemplate);



const FileUploadConfigTemplate = ({item, callback ,configData }) => {
  const fileTypeOption = [
    { label: "모든파일", value: "모든파일" },
    { label: "문서파일", value: "document" },
    { label: "이미지", value: "image" },
    { label: "영상파일", value: "video" },
    { label: "엑셀", value: "excel" },
    { label: "압축파일", value: "zip" }
  ];
  const toast = useRef(null)
  const [fileExtentions, setFileExtentions] = useState([])
  const changeHandler = (value,key) => {
    const itemValue = { ...item, [key]: value }
      callback(itemValue);
    }
    const extentionHandler = (e) => {
      callback({
        ...item,
        fileType: e.value,
        extention: [],
      });
      switch (e.value) {
        case "image":
          setFileExtentions([{label:'모든파일'},...configData.dc_imageExtention]);
          break;
        case "video":
          setFileExtentions([{label:'모든파일'},...configData.dc_videoExtention]);
          break;
        case "excel":
          setFileExtentions([{label:'모든파일'},...configData.dc_excelExtention]);
          break;
        case "zip":
          setFileExtentions([{label:'모든파일'},...configData.dc_fileExtention]);
          break;
          case "document":
          setFileExtentions([{label:'모든파일'},...configData.dc_documentExtention]);
          break;
          case "모든파일":
            setFileExtentions([{label:'모든파일'},
            ...configData.dc_documentExtention,
            ...configData.dc_fileExtention,
            ...configData.dc_videoExtention,
            ...configData.dc_imageExtention]);
            break;

        default:
          break;
      }
    }

  return (
    <div className='p-2' >
       <Toast ref={toast} />
       <h5>{item.label}</h5>
       <table className="table table-sm table-bordered">
        <thead>
          <tr className="text-center">
            <th width="15%">key</th>
            <th>value</th>
            <th width="70%">description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>업로드 파일갯수</th>
            <td>
            <InputNumber
              className="p-inputtext-sm"
              required
              value={item.maxCount}
              min={0} max={100}
              onChange={(e) => {
                changeHandler(e.value,'maxCount')
              }}
            />
            </td>
            <td></td>
          </tr>

          <tr>
            <th>최소용량</th>
            <td>
            <InputNumber
              className="p-inputtext-sm"
              value={item.minSize}
              onChange={(e) => {
                changeHandler(e.value,'minSize')
              }}
            />
            </td>
            <td>
            <span>{fileSizeCalculator(item.minSize)}</span>
            </td>
          </tr>

          <tr>
            <th>최대용량</th>
            <td>
            <InputNumber
              className="p-inputtext-sm"
              value={item.maxSize}
              onChange={(e) => {
                changeHandler(e.value,'maxSize')
              }}
            />
            </td>
            <td>
            <span>{fileSizeCalculator(item.maxSize)}</span>
            </td>
          </tr>

          <tr>
            <th>파일타입</th>
            <td>
            <Dropdown
              className="p-inputtext-sm"
              options={fileTypeOption}
              value={item.fileType}
              optionLabel="label"
              optionValue="value"
              onChange={extentionHandler}
            />
            </td>
            <td>
            {item.extention.map((extentionItem, y) => {
                return (
                  <Button
                    key={y}
                    onClick={(e) => {
                      e.preventDefault();
                      const result = Array.from(item.extention);
                      result.splice(y, 1);
                      changeHandler(result,'extention')
                      if(fileExtentions.length===0){
                        setFileExtentions([{label:'모든파일'},{ label: extentionItem.label }, ...fileExtentions]);
                      }else{
                        setFileExtentions([ ...fileExtentions,{ label: extentionItem.label }]);
                      }
                    }}
                    type="button"
                    label={extentionItem.label}
                    className={`btn btn-sm mt-1 mr-1 p-1 px-3 
                    btn-${configData.dc_documentExtention.findIndex(f=>f.label===extentionItem.label)!==-1?'info':
                    configData.dc_excelExtention.findIndex(f=>f.label===extentionItem.label)!==-1?'danger':
                    configData.dc_fileExtention.findIndex(f=>f.label===extentionItem.label)!==-1?'success':
                    configData.dc_imageExtention.findIndex(f=>f.label===extentionItem.label)!==-1?'warning':
                    configData.dc_videoExtention.findIndex(f=>f.label===extentionItem.label)!==-1?'primary':'link'}`}
                    badge=" "
                    badgeClassName="p-badge-danger pi pi-times"
                  />
                );
              })}
            </td>
          </tr>
          <tr>
            <th>확장자선택</th>          
            <td> 
              <Dropdown
              className="p-inputtext-sm"
              options={fileExtentions}
              optionLabel="label"
              optionValue="label"
              onChange={(e) => {
                const result = Array.from(fileExtentions);
                if(e.value==='모든파일'){
                  
                 result.splice(0,1)
            setFileExtentions([]);
            changeHandler([...result,...item.extention],'extention')
                }else{
                  if(result.length===1){
                    setFileExtentions([]);
                  }else{
                    setFileExtentions(result.filter((f) => f.label !== e.value));
                  }
                  changeHandler([...item.extention, {label:e.value}],'extention')
                }
               
              }}
            /></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
FileUploadConfigTemplate.proptypes={

     item:PropTypes.object.isRequired,
     deleteCallback:PropTypes.func.isRequired,
     callback:PropTypes.func.isRequired,
     configData:PropTypes.object.isRequired,
}