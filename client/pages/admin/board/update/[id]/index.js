import React ,{useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import { setBoard } from '../../../../../redux';
import { useRouter } from 'next/router'

import { postApi } from '../../../../../api';
import { ADMIN_CONTENT_BOARD_UPDATE } from '../../../../../common';
import ComunityWriteTemplate from '../../../../../components/template/board_group/ComunityWriteTemplate';
import AdminContainerTemplate from '../../../../../components/template/AdminContainerTemplate';

const BoardDataUpdate = ({boardData, groupData, authData ,setBoard}) => {
    const router = useRouter()
    const {id}= router.query
    const toast = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [boardState, setBoardState] = useState(boardData.board_config.find(f=>f.id===id))

const onSubmitHandler = (e) => {
  e.preventDefault()
    if (boardState.label.length > 2 && boardState.value.length > 5 ) {   
        postApi(
          setIsLoading,
          ADMIN_CONTENT_BOARD_UPDATE,
          (res) => {
            if(res.data.status){
              setBoard(res.data.data);
                router.push('/admin/board')
            }
          },
          boardState,
          authData.userToken
        )
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "게시판명의 최소 글자수는 2글자 이상 영문은 6글자이상 입니다.",
      });
    }
  };


    return (
      <AdminContainerTemplate
      adminKey="boardJ" 
      className="admin-tmplate" 
      title="게시판 신규생성" 
      icon="bi bi-list-columns" 
      isLoading={isLoading} toast={toast}>
        <ComunityWriteTemplate    
          setState={setBoardState}
          submitCallback={onSubmitHandler}
          state={boardState}
          writeType="board-update"
        />
      </AdminContainerTemplate>

    
    );
}
const mapStateToProps = (state) => {
    return {
      groupData:state.groupData,
      boardData:state.boardData,
      authData: state.authData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
  
      setBoard :(data)=>dispatch(setBoard(data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(BoardDataUpdate);
