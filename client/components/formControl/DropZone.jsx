import {useCallback,useState} from 'react'
import PropTypes from 'prop-types'
import {useDropzone} from 'react-dropzone'
const DropZone = ({}) => {
    const [files, setFiles] = useState([])
    const onDrop = useCallback(acceptedFiles => {
        // setFiles(acceptedFiles)
        console.log(acceptedFiles)
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
   
    return (
        <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag and drop some files here, or click to select files</p>
        }
      </div>
    )
}

DropZone.propTypes = {

}

export default DropZone
