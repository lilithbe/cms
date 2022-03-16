import React ,{useState, useEffect, useRef} from 'react'
import { connect } from 'react-redux'
import { setGroup } from '../../../../../redux';
import { useRouter } from 'next/router'
import { postApi } from '../../../../../api';
import { ADMIN_CONTENT_GROUP_UPDATE } from '../../../../../common';
import { initGroup } from '../../../../../common/initList';
import ComunityWriteTemplate from '../../../../../components/template/board_group/ComunityWriteTemplate'
import Script from 'next/script'
import AdminContainerTemplate from '../../../../../components/template/AdminContainerTemplate';
const AdminGroupUpdate = ({ groupData, authData ,setGroup}) => {   
    const router =useRouter()
    const [id, setId] = useState('')
    useEffect(() => {
        setId( router.query.id)
      
    }, [router.query.id])
    const toast = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [groupState, setGroupState] = useState(initGroup)
    useEffect(() => {
        const c = groupData.group_config.filter(
            (f) => f.id === id
          )[0]
        if(c !==undefined){
            setGroupState(c)
        }else{
            setGroupState(initGroup)
        }
    }, [groupData, id])


const onSubmitHandler = () => {
  if (groupState.label.length > 2 && groupState.value.length > 5 ) {   
    postApi(
        setIsLoading,
        ADMIN_CONTENT_GROUP_UPDATE,
        (res) => {
          console.log(res)
          if (res.data.status) {
            setGroup(res.data.data);
            router.push('/admin/group')
          }
        },
        groupState,
        authData.userToken
      );  
  } else {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "그룹명의 최소 글자수는 2글자 이상 영문은 6글자이상 입니다.",
    });
  }
};
return (
  <AdminContainerTemplate adminKey="groupJ" icon="bi bi-bezier" isLoading={isLoading} toast={toast} title="그룹 업데이트">
    
      {/* <Script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></Script> */}
      <ComunityWriteTemplate isLoading={isLoading} 
      setState={setGroupState} 
      submitCallback={onSubmitHandler} 
      state={groupState} 
      writeType="group-update"/>
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
  export default connect(mapStateToProps, mapDispatchToProps)(AdminGroupUpdate);

 


