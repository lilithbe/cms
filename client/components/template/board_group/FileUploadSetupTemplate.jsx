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
      <div className='row'>
        <div className='col-2 pr-0'>      
        <ul className="list-group text-center"
         style={{
          minHeight: "400px",
          width: "auto",
          maxHeight: "680px",
          overflow: "hidden",
          overflowY: "scroll",
          overflowX: "hidden",
        }}>
          <li className="list-group-item cursor-pointer p-0 ">
          <Button label="파일추가" className='w-100 p-button-sm' onClick={addFileHander} />
          </li>
        {state.fileUploadConfig.map((item, i) => {
          return(<li key={i} className="list-group-item p-0 d-flex justify-content-between" >
            <div className='text-center w-100'> <span className='cursor-pointer' onClick={()=>{moveHandler(i)}}> {i+1}. {item.label}</span></div>
            <Button  className='p-button-sm p-button-info' icon='bi bi-trash' onClick={()=>{
              deleteHandler(i)
            }} />
          </li>)
        })}
      </ul>
        </div>
        <div className='col-10 pl-0'>
        <div 
          ref={scrollBox}
          style={{
            minHeight: "400px",
            width: "auto",
            maxHeight: "680px",
            overflow: "hidden",
            overflowY: "scroll",
            overflowX: "hidden",
          }}>
          {state.fileUploadConfig.map((item, i) => {
            return (
              <FileUploadConfigTemplate
                idvalue={`filemake-${i}`}
                configData={configData}
                key={i}
                item={item}
                index={i}
                callback={fileUploadConfigHandler}
              />
            );
          })}
        </div>
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



const FileUploadConfigTemplate = ({idvalue, index, item, callback ,configData }) => {
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
      callback(itemValue,index);
    }
    const extentionHandler = (e) => {
      callback({
        ...item,
        fileType: e.value,
        extention: [],
      },index);
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
    <div id={idvalue} className='p-2'
    style={{
      minHeight: "355px",
      maxHeight: "355px",
    }}>
       <Toast ref={toast} />
       <h5>{index+1}. {item.label}</h5>
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
            <th>업로드</th>
            <td>
            <InputText
              className="p-inputtext-sm"
              required
              value={item.label}
              onChange={(e) => {
                changeHandler(e.target.value,'label')
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
      index:PropTypes.number.isRequired,
     item:PropTypes.object.isRequired,
     deleteCallback:PropTypes.func.isRequired,
     callback:PropTypes.func.isRequired,
     configData:PropTypes.object.isRequired,
}