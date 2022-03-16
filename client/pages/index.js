import Head from 'next/head'
import { connect } from 'react-redux';
import FileUpload from '../components/file/FileUpload';
import PageView from '../components/pageView/PageView';


const Main = ({configData, authData}) => { 

  
  return (
    <div>
        <Head>
          <title>{configData.dc_addMeta.defaultTitle}</title>
          <meta name="Description" content={configData.dc_addMeta.defaultDescription}/>
          <meta name="google-site-verification" content={configData.dc_addMeta.googleVerification}/>
          <meta name="naver-site-verification" content={configData.dc_addMeta.naverVerification}/>
        </Head>
        <PageView />
    

    </div>
  );
};
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
export default  connect(mapStateToProps, mapDispatchToProps)(Main)
