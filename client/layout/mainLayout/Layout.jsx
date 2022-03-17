import { useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import AppMenu from "./AppMenu";
import Footer from "./Footer";
import AdminSpeedDial from "../../components/admin/AdminSpeedDial";
const MainLayout = ({ children, configData, authData }) => {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <div>
      <AdminSpeedDial />
      <Header configData={configData} authData={authData} isSearch={isSearch} setIsSearch={setIsSearch} />
      <AppMenu setIsSearch={setIsSearch} />
      {children}
      <Footer configData={configData} />
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
