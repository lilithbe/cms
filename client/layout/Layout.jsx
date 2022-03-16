import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setLogout, setPage } from "../redux";
import { useRouter } from "next/router";
import { GET_IP, GET_PAGE_DATA } from "../common";
import SideLayout from './SideLayout/Layout'
import MainLayout from './mainLayout/Layout'
import ipFilter from 'ip-filter'
import { postApi } from "../api";
import AdminDialogButton from "../components/admin/AdminDialogButton";
import AdminSetupButton from "../components/admin/AdminSetupButton";
import PageSetting from "../components/admin/pageSetting/PageSetting";
const Layout = ({ children, configData,setPage, authData, boardData, socketData }) => {
  const router = useRouter();

  const [isIpCheck, setIsIpCheck] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // 아이피 차단
    const iip = configData.dc_impossibleIp.split(",")
    const pip = configData.dc_possibleIp.split(",")
    postApi(setIsLoading, GET_IP, (res) => {
      let ip = res.data.ip

      if (ip === '1') {
        ip = '127.0.0.1'
      }
      const iipc = ipFilter(ip, iip) === null ? true : false
      const pipc = ipFilter(ip, pip) === null ? false : true

      if (ip !== '127.0.0.1') {
        setIsIpCheck(iipc && pipc)
      }
    })
    return () => {
      setIsIpCheck(true)
    }
  }, [configData.dc_impossibleIp, configData.dc_possibleIp])



  const [firstPath, setFirstPath] = useState("");
  const [pathnames, setPathnames] = useState([])
  const [sideMode, setSideMode] = useState(false);


  useEffect(() => {
   
    const pathNames = router.asPath.split("/");
    let path
    if (pathNames[1] === "") {
      setFirstPath("main");
      setPathnames(["", "main"])
      path = 'main'
    } else {
      setFirstPath(pathNames[1]);
      setPathnames(pathNames)
      path=router.asPath.replace('/', '').replaceAll('/', '-')
    }

    postApi(setIsLoading,GET_PAGE_DATA+path,(res)=>{
      if (res.data.status === true) {
        setPage(res.data.data)
    } else {
       
    }
    })

    if (pathNames[1] === "admin" || pathNames[2] === "profile" || pathNames[2] === "dashboard") {
      setSideMode(true);
    } else {
      setSideMode(false);
    }
  }, [router.asPath, setPage]);


  const mainTemplate = () => {
    if (isIpCheck) { //ip 체크
      if (sideMode) { //사이드 모드
        return (
          <SideLayout mode={firstPath}>
              {children}
          </SideLayout>
        );
      } else { //일반
        if (pathnames[1] === 'main') {// 메인페이지
          return (
            <MainLayout >
              {children}
              <AdminSetupButton openType="modal" buttonLabel="Page Setting" header="Page Setting">
                <PageSetting />
              </AdminSetupButton>
          
            </MainLayout>
          );
        } else if (pathnames[1] === 'shop') {
          return (
            <MainLayout >
              {children}
              <AdminSetupButton openType="modal" buttonLabel="Page Setting" header="Page Setting">
                <PageSetting />
              </AdminSetupButton>
            </MainLayout>
          );
        } else if(pathnames[1]==='content') {
          return (
            <MainLayout >
              {children}
              <AdminSetupButton openType="modal" buttonLabel="Page Setting" header="Page Setting">
                <PageSetting />
              </AdminSetupButton>
            </MainLayout>
          );
        }else if(pathnames[1]==='template'){
          return (
            <MainLayout >
            {children}
            <AdminSetupButton openType="modal" buttonLabel="Page Setting" header="Page Setting">
                <PageSetting />
              </AdminSetupButton>
          </MainLayout>
          );
        }else{
          return (
            <MainLayout >
              {children}
              <AdminSetupButton openType="modal" buttonLabel="Page Setting" header="Page Setting">
                <PageSetting />
              </AdminSetupButton>
            </MainLayout>
          );
        }

      }
    } else {
      return (<IpCheckMent />)
    }
  };

  return (
    <div >
      {mainTemplate()}
    </div>
  )



};
const mapStateToProps = (state) => {
  return {
    configData: state.configData,
    authData: state.authData,
    boardData: state.boardData,
    socketData: state.socketData,
    messageData: state.messageData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLogout: (data) => dispatch(setLogout(data)),
    setLogin: (data) => dispatch(setLogin(data)),
    setConfig: (data) => dispatch(setConfig(data)),
    setBoard: (data) => dispatch(setBoard(data)),
    setGroup: (data) => dispatch(setGroup(data)),
    setPage:(data) => dispatch(setPage(data)),

    setSocketStart: (data) => dispatch(setSocketStart(data)),
    setDisconnect: () => dispatch(setDisconnect())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);


const IpCheckMent = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-black text-light" style={{ height: "100vh" }}>
      <div className="text-center">
        Ip Check ...
      </div>
    </div>
  )
}