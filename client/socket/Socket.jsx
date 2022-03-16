import React, {  useState } from 'react'
import './style.css'
const SocketIndex = ({ socketData,authData,messageData }) => {
    return (
        <SocketLamp socketData={socketData} authData={authData} messageData={messageData} />
    )
}

export default SocketIndex

const SocketLamp = ({socketData, authData,messageData}) => {
 
    const [isClose, setIsClose] = useState(true)
    const [isUserOpen, setIsUserOpen] = useState(false)
    const [isSocketOpen, setIsSocketOpen] = useState(false)
    const [isMessageOpen, setIsMessageOpen] = useState(false)
    const [dataState, setDataState] = useState({
        type:''
    })
    const onOffToggle = () => {
        setIsClose(!isClose)
        if(isClose){
            setIsSocketOpen(false)
            setIsUserOpen(false)
            setIsMessageOpen(false)
        }
    }
    const viewToggle = (type) =>{
      
        if(type==='socket'){
            setDataState({...socketData,type:type})
            setIsSocketOpen(!isSocketOpen)
            setIsUserOpen(false)
            setIsMessageOpen(false)
        }else if(type==='user'){
            setDataState({...authData,type:type})
            setIsUserOpen(!isUserOpen)
            setIsSocketOpen(false)
            setIsMessageOpen(false)
        }else if(type==='message'){
            setDataState({...messageData,type:type})
            setIsMessageOpen(!isMessageOpen)
            setIsUserOpen(false)
            setIsSocketOpen(false)
        }
       
    }
    
    return(

        <div className={`socket-lamp-box ${isClose?'show':''}`}>
            <i onClick={onOffToggle} className={`socket-view-btn mdi mdi-chevron-double-${isClose?'right':'left'}`}/>
            <i onClick={()=>{viewToggle('socket')}} className={`socket-lamp ${socketData.isSocket?'on':'off'} mdi mdi-flash`}/>
            <i onClick={()=>{viewToggle('user')}} className={`socket-lamp-account ${authData.isLogin?'on':'off'} mdi mdi-account-network`}/>
            <i onClick={()=>{viewToggle('message')}} className={`socket-lamp-message ${messageData.message.length>0?'on':'off'} mdi  mdi-email-outline`}/>
            {/* mdi-email-outline */}
            <SocketView data={dataState} isOpen={isSocketOpen} />
            <UserView data={dataState} isOpen={isUserOpen} />
            <MessageView data={dataState} isOpen={isMessageOpen} />
        </div>
    )
}
const SocketView = ({isOpen,data}) => {
    return(
        <div className={`data-view-box ${isOpen?'show':''}`}>
            {data.type}
        </div>
    )
}
const UserView = ({isOpen,data}) => {
    return(
        <div className={`data-view-box ${isOpen?'show':''}`}>
            {data.type}
        </div>
    )
}
const MessageView = ({isOpen,data}) => {
    return(
        <div className={`data-view-box ${isOpen?'show':''}`}>
            {data.type}
        </div>
    )
}


