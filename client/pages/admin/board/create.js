import React ,{useState,  useRef} from 'react'
import { connect } from 'react-redux'
import { setBoard } from '../../../redux';
import { useRouter } from 'next/router'
import { postApi } from '../../../api';
import { ADMIN_CONTENT_BOARD_CREATE, ADMIN_MEMBER_LIST } from '../../../common';

import { initBoard } from '../../../common/initList';
import ComunityWriteTemplate from '../../../components/template/board_group/ComunityWriteTemplate';

import AdminContainerTemplate from '../../../components/template/AdminContainerTemplate';
import { uuidv4 } from '../../../lib/random';

const BoardCreate = ({boardData, groupData, authData ,setBoard}) => {
    const router = useRouter()
    const toast = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    

    const [newBoardState, setNewBoardState] = useState(
      {...initBoard,
        id:'',
        value:uuidv4(),
      adminData:{
      userId: authData.userId,
      nickName: authData.nickName,
      email:authData.email,
      isAdmin: authData.isAdmin,
      isEmailCheck:authData.isEmailCheck,
      grade: authData.grade,
      level:authData.level,
      userImage: authData.userImage,
      useName:authData.useName,
      groupId:'',
      groupData:{}
    }})


const createrData = {
    nickName:authData.nickName,
    level:authData.level,
    grade:authData.grade,
    email:authData.email,
    useName:authData.useName,
    userImage:authData.userImage,
}

const onSubmitHandler = () => {
    const c = boardData.board_config.filter(
        (f) => f.value === newBoardState.value
      );

  if (newBoardState.label.length > 2 && newBoardState.value.length > 5 ) {
   
      if (c.length === 0) {
        postApi(
            setIsLoading,
            ADMIN_CONTENT_BOARD_CREATE,
            (res) => {
         
              if (res.data.status) {
                setBoard(res.data.data);
                setNewBoardState(initBoard)
                router.push('/admin/board')
              }
            },
            { ...newBoardState, createrData: createrData },
            authData.userToken
          );
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "중복된 영문 게시판명 입니다.",
        });
      }
  
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
          setState={setNewBoardState}
          submitCallback={onSubmitHandler}
          state={newBoardState}
          writeType="board-create"
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
  export default connect(mapStateToProps, mapDispatchToProps)(BoardCreate);

 