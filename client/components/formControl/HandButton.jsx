import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { postApi } from '../../api'
import { CONTENT_BG } from '../../common'

const HandButton = ({className , item, authData,boardValue,callback }) => {
   
    const [goodFill, setGoodFill] = useState(item.goodUser.filter(f=>f.userId===authData.userId).length>0?true:false)
    const [badFill, setBadFill] = useState(item.badUser.filter(f=>f.userId===authData.userId).length>0?true:false)
    
    const [isLoading, setIsLoading] = useState(false)
    const upHandHandler = (e) => {
        e.preventDefault()
        let request
        if(!goodFill){
            setGoodFill(true)
            if(badFill){//이미 베드를 클릭한 상태에서 베드기록을 삭제하고 좋아요를 올림
                request='goodUp-badDown' 
                setBadFill(false)          
            }else{//좋아요만 올림
                request='goodUp'
            }
        }else{// 좋아요 클릭을 취소함
            request='goodDown'
            setGoodFill(false)
        }
       
        
        postApi(setIsLoading,CONTENT_BG,(res)=>{
            callback(res.data.data)
        },{request:request,boardValue:boardValue,id:item.id},authData.userToken)
        
    }
    const downHandHandler = (e) => {
        e.preventDefault()
        let request
        if(!badFill){
            if(goodFill){//이미 굿을 클릭한 상태에서 굿 기록을 삭제하고 베드기록만 올림
                request='goodDown-badUp'
                setGoodFill(false)
            }else{
                request='badUp'
            }
            setBadFill(true)
        }else{// 베드 클릭을 취소함
            request='badDown'
            setBadFill(false)
        }
        postApi(setIsLoading,CONTENT_BG,(res)=>{
            callback(res.data.data)
        },{request:request,boardValue:boardValue,id:item.id},authData.userToken)
        
    }
    return(
        <div className={className}>
            <a className='cursor-pointer' onClick={upHandHandler}><i className={`bi bi-hand-thumbs-up${goodFill?'-fill':''}`}  /></a>
            <a className='cursor-pointer' onClick={downHandHandler}><i className={`bi bi-hand-thumbs-down${badFill?'-fill':''}`}  /></a>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      configData: state.configData,
      authData: state.authData,
      groupData:  state.groupData,
      boardData: state.boardData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  export default  connect(mapStateToProps, mapDispatchToProps)(HandButton)
