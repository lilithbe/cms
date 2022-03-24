import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {postApi} from '../../api/index'
import { MY_FILE_LIST } from '../../common';
import { connect } from 'react-redux';
import FileUpload from '../file/FileUpload';
import { Image } from 'primereact/image';
const FileList = ({fileType,authData}) => {
    const [fileData, setFileData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
      postApi(setIsLoading,MY_FILE_LIST+fileType,(res)=>{
        setFileData(res.data.list)
      },{},authData.userToken)
    
     return () => {
        setFileData([])
    }
    }, [authData.userToken, fileType])
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
    return (
      <div className='card'>
          
          <div className='card-body'>
          {fileType === 'image' ?
                <DataTable value={fileData} responsiveLayout="scroll" size="small" tableClassName='border'>
                    <Column body={(row)=>{
                        return(
                            <div>
                                <Image src={row.src} width={100} height={70} alt={row.alt} preview imageStyle={{objectFit :'cover'}}downloadable={true} />
                            </div>
                        )
                    }} header="View"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="category" header="Category"></Column>
                    <Column field="size" body={(row)=>fileSizeCalculator(row.size)} header="Size"></Column>
                </DataTable>
                :
                <DataTable value={fileData} responsiveLayout="scroll" size="small" >
                    <Column field="file_type" header="type"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="size" body={(row)=>fileSizeCalculator(row.size)} header="Size"></Column>
                </DataTable>
            }
          </div>
          <div className='card-footer'>
            <FileUpload fileType={fileType} callback={(res)=>{
                setFileData([...fileData,...res.data.result])
            }}/>
          </div>
      </div>
    )
}
const mapStateToProps = (state) => {
    return {
        authData: state.authData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
      
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(FileList);