import {useState,useEffect,useMemo } from 'react'
import { connect } from 'react-redux';
import { useRouter } from 'next/router'
import {postApi} from '../../../../../api'
import {READ} from '../../../../../common'
import ContentLayout from '../../../../../layout/ContentLayout'
import Link from 'next/link'
import Htmlparser from 'react-html-parser'
import HandButton from '../../../../../components/formControl/HandButton'
import ViewBody from '../../../../../components/widget/board/ViewBody';


const ContentView = ({boardData,groupData,authData}) => {
  const router = useRouter()
  const {board ,id} = router.query
  const boardConfig = boardData.board_config.filter(f=>f.value===board)[0]
 
 

  return (
    <ContentLayout boardConfig={boardConfig} authData={authData} boardList={boardData.board_config} groupList={groupData.group_config}>
    <nav aria-label="breadcrumb"className=" p-2 border mb-1">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item"><Link href="/"><a><i className='bi bi-house'/> Home</a></Link></li>
        <li className="breadcrumb-item">content</li>
        <li className="breadcrumb-item">view</li>
        <li className="breadcrumb-item active">{board}</li>
      </ol>
    </nav>

    <ViewBody/>
        

    </ContentLayout>
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
export default  connect(mapStateToProps, mapDispatchToProps)(ContentView)

