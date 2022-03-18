import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'

import PropTypes from 'prop-types';

// import ReactJson from 'react-json-view'


import dynamic from 'next/dynamic'
const ReactJson = dynamic(async () => import('react-json-view'),
    { ssr: false })
const JsonView = ({json,title}) => {
    const [isViewOpen, setIsViewOpen] = useState(false)
  return (
   
    <>
   
    <Button className='p-button-sm' label={title} icon={"bi bi-tree"} onClick={()=>{
        setIsViewOpen(true)
    }} />
    <Dialog header={`${title}`} visible={isViewOpen} onHide={()=>setIsViewOpen(false)} dismissableMask style={{minWidth:"800px"}}>
    <ReactJson src={json}/>
    </Dialog>
</>
  
 
  )
}

export default JsonView

JsonView.propTypes ={
    title:PropTypes.string
}
JsonView.defaultProps  ={
    title:'Json Open'
}
