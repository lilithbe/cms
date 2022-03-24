import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import AppMenu from "./AppMenu";
import Footer from "./Footer";
import AdminSpeedDial from "../../components/admin/AdminSpeedDial";
import { Button } from "primereact/button";
import styled from "styled-components";
import { ScrollTop } from 'primereact/scrolltop';
import { SpeedDial } from 'primereact/speeddial';
import UserSpeedDial from "./UserSpeedDial";
const MainLayout = ({ children, configData, authData }) => {
  const [isSearch, setIsSearch] = useState(false);

 
  return (
    <div>
      <AdminSpeedDial />
      <UserSpeedDial />
      <Header configData={configData} authData={authData} isSearch={isSearch} setIsSearch={setIsSearch} />
      <AppMenu setIsSearch={setIsSearch} />
      {children}
      <Footer configData={configData} />
    
      <ScrollTop threshold={200} />
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
