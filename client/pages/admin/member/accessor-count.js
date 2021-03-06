import React, { useState, useEffect,useRef  } from 'react'
import { connect } from 'react-redux';
import {setMessageUpdate} from '../../../redux'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Image from 'next/image';
import { Badge } from 'primereact/badge';
import HorizontalLayout from '../../../components/formControl/HorizontalLayout'
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import AdminContainerTemplate from '../../../components/template/AdminContainerTemplate';
const AccessorCount = ({socketData, authData,configData, messageData}) => {
    const gradeOption = configData.dc_gradeObject
    const [joinUsersState, setJoinUsersState] = useState([])
    const [selectUsers, setSelectUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const toast = useRef(null);
    useEffect(() => {
        socketData.socket.emit('getJoinUser',(res)=>{
            setJoinUsersState(res)
        })
        return()=>{
            setJoinUsersState([])
        }
    }, [socketData.socket])

    const gradeTemplate = (row) => {
        return(
            <div>
                {row.userType==='member'?gradeOption.find(d=>d.grade===row.userData.grade).label:'λΉνμ'}
            </div>
        )
    }
    const imageTemplate = (row) => {
        return(
            row.userType==='member'? <Image className='rounded-circle' src={row.userData.userImage} alt={row.nickName} width={20} height={20} />:null
        )
    }
    const messageInit ={
        summary:'',detail:'',life:0,severity:'info'
    }
    const [messageState, setMessageState] = useState(messageInit)
    const showConfirm = () => {
        toast.current.show({ severity: messageState.severity, summary: messageState.summary, detail: messageState.detail, life:2000
          });
    }
    const messageSubmitHandler = () => {
        socketData.socket.emit('admin_message',{users:selectUsers,messageState:messageState,token:authData.userToken},(res)=>{
            console.log(res)
        })
    }
    const userTypeTemplate =(row)=>{
        return(
            row.userType==='member'?'νμ':'λΉνμ'
        )
    }
    return (
        <AdminContainerTemplate adminKey="isAdmin" isLoading={isLoading} icon="bi bi-broadcast" title="μ μμμ§κ³">
        <DataTable 
         value={joinUsersState} 
         selection={selectUsers} 
         onSelectionChange={e => setSelectUsers(e.value)}
         selectionMode='checkbox'
             >
                     <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                     <Column field='userType'body={userTypeTemplate} header="νμμν"></Column>
                     <Column body={imageTemplate} header="μ΄λ―Έμ§"></Column>
                     <Column body={gradeTemplate} header="λ±κΈ"></Column>
                     <Column field="ip" header="ip"></Column>
                     <Column field="port" header="port"></Column>
                     <Column field="family" header="family"></Column>
                     <Column field="socketId" header="socketId"></Column>
                     <Column field="pathname" header="pathname"></Column>
         </DataTable>
         {selectUsers.length>0?
         <div className="mb-2 card bg-dark">
              {selectUsers.map((user , i)=>{
                  return(
                      <Badge  key={i} value={user.nickName}/>
                  )
              })}
               <HorizontalLayout label="λ©μΈμ§μ λͺ©">
                 <input className='form-control mt-2' value={messageState.summary}
                 onChange={(e)=>{
                     showConfirm()
                     setMessageState({...messageState,summary:e.target.value})
                 }}
                 />
               </HorizontalLayout>
               <HorizontalLayout label="λ©μΈμ§λ΄μ©">
                 <input className='form-control mt-2' value={messageState.detail}
                 onChange={(e)=>{
                     showConfirm()
                     setMessageState({...messageState,detail:e.target.value})
                 }}
                 />
               </HorizontalLayout>
               <HorizontalLayout label="μκ°μ€μ ">
                 <InputNumber  className=' w-50 mt-2' value={messageState.life/1000}
                 showButtons buttonLayout="horizontal" step={1}
                 decrementButtonClassName="p-button-danger" 
                 incrementButtonClassName="p-button-success"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  min={0} max={20}
                 //   mode="currency" 
                   currency="sec"
                 onValueChange={(e)=>{
                     const value = e.value
                     showConfirm()
                     setMessageState({...messageState,life:value*1000})
                 }}
                 />
               </HorizontalLayout>
               <HorizontalLayout label="λ©μΈμ§λ°μ€ μμ">
                 <Dropdown options={[
                     {label:'success',value:'success'},
                     {label:'info',value:'info'},
                     {label:'warn',value:'warn'},
                     {label:'error',value:'error'},
                 ]} 
                 optionValue='value'
                 optionLabel='label'
                 value={messageState.severity}
                 onChange={(e)=>{
                     showConfirm()
                     setMessageState({...messageState,severity:e.value})
                 }}
                 />
                 <Toast ref={toast}  position="bottom-right"></Toast>
               
               </HorizontalLayout>
                 <Button onClick={messageSubmitHandler}>λ©μΈμ§ μ μ‘</Button>
         </div>
         :''}
        </AdminContainerTemplate>
    )
}
const mapStateToProps = (state) => {
    return {
      authData: state.authData,
      configData:state.configData,
      socketData:state.socketData,
      messageData:state.messageData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        setMessageUpdate:(data) => dispatch(setMessageUpdate(data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AccessorCount);
