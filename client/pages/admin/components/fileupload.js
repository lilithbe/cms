import {useState,useRef} from 'react'

import AdminContainerTemplate from '../../../components/template/AdminContainerTemplate'
import FileViewTemplate from '../../../components/template/FileViewTemplate'

const FileuploadPage = () => {
    const toast = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    return (
        <AdminContainerTemplate adminKey="adminJ" toast={toast} isLoading={isLoading} title="File Upload Components" icon="bi bi-file">

            <div style={{maxHeight:"700px" ,overflow:'hidden',overflowX:'hidden',overflowY:'scroll'}}>

            <FileViewTemplate
            isCallback
            fileType="document"
            callback={(res)=>{
                console.log(res)
            }}/>

<FileViewTemplate
            isCallback
            fileType="image"
            callback={(res)=>{
                console.log(res)
            }}/>

<FileViewTemplate
            isCallback
            fileType="video"
            callback={(res)=>{
                console.log(res)
            }}/>

<FileViewTemplate
            isCallback
            fileType="file"
            callback={(res)=>{
                console.log(res)
            }}/>

            </div>
           

        </AdminContainerTemplate>
    )
}

export default FileuploadPage
