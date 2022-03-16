import React ,{useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import { setGroup } from '../../../redux';
import { useRouter } from 'next/router'
import { postApi } from '../../../api';
import { ADMIN_CONTENT_GROUP_CREATE } from '../../../common';
import { initGroup } from '../../../common/initList';
import ComunityWriteTemplate from '../../../components/template/board_group/ComunityWriteTemplate'
import AdminContainerTemplate from '../../../components/template/AdminContainerTemplate'

const AdminGroupCreate = ({ groupData, authData ,setGroup}) => {

    const router = useRouter()
    const toast = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [groupState, setGroupState] = useState({
      ...initGroup,
      id:'',
      value:'',
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
    const c = groupData.group_config.filter(
        (f) => f.value === groupState.value
      );

  if (groupState.label.length > 2 && groupState.value.length > 5 ) {
   
      if (c.length === 0) {
        postApi(
            setIsLoading,
            ADMIN_CONTENT_GROUP_CREATE,
            (res) => {
              if (res.data.status) {
                setGroup(res.data.data);
                setGroupState(initGroup)
                router.push('/admin/group')
              }
            },
            { ...groupState, createrData: createrData },
            authData.userToken
          );
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "중복된 영문 그룹명 입니다.",
        });
      }
  
  } else {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "그룹명의 최소 글자수는 2글자 이상 영문은 6글자이상 입니다.",
    });
  }
};
    return (
      <AdminContainerTemplate adminKey="groupJ" icon="bi bi-bezier" isLoading={isLoading} toast={toast} title="그룹 신규생성">
      <ComunityWriteTemplate isLoading={isLoading} setState={setGroupState} submitCallback={onSubmitHandler} state={groupState} writeType="group-create"/>
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
  
      setGroup :(data)=>dispatch(setGroup(data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminGroupCreate);

 