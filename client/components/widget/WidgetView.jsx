import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { postApi } from '../../api'
import { GET_WIDGET_DATA, SET_WIDGET_DATA } from '../../common/path'
import AdminDialogButton from '../admin/AdminDialogButton'
import { widgetList } from './widgetObject'
import WidgetSetting from './WidgetSetting'
const WidgetDiv = styled.div`

`
const WidgetView = ({widget}) => { 
    const toast = useRef()
    const [isLoading, setIsLoading] = useState(false)
    const [widgetState, setWidgetState] = useState({
      id:widget.id,
      label:'',
      viewGrade:0,
      component:'',      
      data:{},  
      options:{},
      styled:'',
      className:'',
    })
    const [widgetComponent, setWidgetComponent] = useState({
      label:'',
      value:'',
      component:()=>{},
      setting:()=>{}
    })
    useEffect(() => {            
      postApi(setIsLoading, GET_WIDGET_DATA+widget.id,(res)=>{         
          if(res.data.status){
            setWidgetState(res.data.data)
          }else{
            console.log(res.data.message)
          }
      })
    }, [widget.id])
    useEffect(() => {
      if(widgetList.findIndex(f=>f.value===widgetState.component)!==-1){
        setWidgetComponent(widgetList.filter(f=>f.value===widgetState.component)[0])
      }
      return () => {
        setWidgetComponent({
          label:'',
          value:'',
          component:()=>{},
          setting:()=>{}
        })
      }
    }, [widgetState.component])
    
    const footerTemplate = () => { 
      return(
        <div>
          <Button label="저장" className='p-button-sm' onClick={()=>{
             postApi(setIsLoading, SET_WIDGET_DATA+widget.id,(res)=>{         
              if(res.data.status){
                toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Save Success'});
              }else{
                toast.current.show({severity: 'error', summary: 'Error Message', detail: 'Save Error'});
              }
          },widgetState)
          }}/>
        </div>
      )
     }

    useEffect(() => {
      console.log(widgetState)
    }, [widgetState])
    
     
  return (
    <WidgetDiv>
        {widgetComponent.component({
            data:widgetState
        })}
      
        <AdminDialogButton buttonLabel="Widget Setting"dialogHeader='Widget Setting Dialog' footer={footerTemplate} >
            <WidgetSetting widget={widgetState} onChange={setWidgetState} widgetComponent={widgetComponent}/>
        </AdminDialogButton>
        <Toast ref={toast}/>
    </WidgetDiv>
  )
}

export default WidgetView
