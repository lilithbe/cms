import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import AppMenu from "./AppMenu";
import Footer from "./Footer";
import AdminSpeedDial from "../../components/admin/AdminSpeedDial";
import { Button } from "primereact/button";
import styled from "styled-components";
const UserMenuButtonList = styled.div`
  position:fixed;
  bottom:50px;
  right:50px;
  .scrollToTop{
    ${props=>props.scrollY<50? 'display:none;':null}
  }
  @media(max-width: 991px){
    display:none;
  }
 
`
const MainLayout = ({ children, configData, authData }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [scrollY, setscrollY] = useState(0);  // 스크롤값을 저장하기 위한 상태
  const handleFollow = () => {
    setscrollY(window.pageYOffset); // window 스크롤 값을 scrollY에 저장
  }
 
  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    }
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
    }
  })
  
  return (
    <div>
      <AdminSpeedDial />
      <Header configData={configData} authData={authData} isSearch={isSearch} setIsSearch={setIsSearch} />
      <AppMenu setIsSearch={setIsSearch} />
      {children}
      <Footer configData={configData} />
      <UserMenuButtonList scrollY={scrollY}>
      <Button icon="bi bi-chevron-up" className="scrollToTop" onClick={()=>{
        window.scrollTo(0,0)
      }}/>
      </UserMenuButtonList>

    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    configData: state.configData,
    authData: state.authData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
