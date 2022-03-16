import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useRouter } from 'next/router'
import {postApi} from '../../../../api/index'
import {LIST} from '../../../../common'

import ContentLayout from '../../../../layout/ContentLayout'
import PrimeTable from '../../../../components/widget/board/PrimeTable';

const ContentListPage = ({configData,boardData,groupData,authData}) => {
  const router = useRouter()
  const {board} = router.query
  const [isLoading, setIsLoading] = useState(false)
  const [boardList, setBoardList] = useState([])
  const [contentCount, setContentCount] = useState(0)
  const boardConfig = boardData.board_config.filter(f=>f.value===board)[0]
  useEffect(() => {
    postApi(setIsLoading,LIST,(res)=>{
      //list:list.rows ,boardCount:
      if(res.data.status){
        setBoardList(res.data.list)
        setContentCount(res.data.boardCount)
      }
    },{boardValue:board,offset:0,limit:20},authData.isLogin?authData.userToken:null)
    return () => {
      setBoardList([])
      setContentCount(0)
    }
  }, [authData.isLogin, authData.userToken, board])

  return (
    <div>
      <ContentLayout boardConfig={boardConfig} authData={authData} boardList={boardData.board_config} groupList={groupData.group_config}>
  
        <PrimeTable  boardValue={board}/>
      </ContentLayout>
    
     
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
export default  connect(mapStateToProps, mapDispatchToProps)(ContentListPage)

