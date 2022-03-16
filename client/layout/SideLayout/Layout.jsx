import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import SideFooter from "./SideFooter";
import SideAppMenu from "./SideAppMenu";
import SideTopBar from "./SideTopBar";
import Head from "next/head";
import Script from "next/script";
import { CSSTransition } from 'react-transition-group';
import classNames from "classnames";
import { user_menu, admin_menu, GET_IP } from "../../common";
const SideLayout = ({children, configData, authData, mode}) => {
  const [inputStyle, setInputStyle] = useState('outlined');
  const [layoutMode, setLayoutMode] = useState("static");
  const [layoutColorMode, setLayoutColorMode] = useState("dark");
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);


  




  let menuClick = false;
  let mobileTopbarMenuClick = false;



  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, "body-overflow-hidden");
    } else {
      removeClass(document.body, "body-overflow-hidden");
    }
  }, [mobileMenuActive]);

  const onWrapperClick = (event) => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event) => {
    menuClick = true;
    if (isDesktop()) {
      if (layoutMode === "overlay") {
        if (mobileMenuActive === true) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === "static") {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMobileTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    setMobileTopbarMenuActive((prevState) => !prevState);
    event.preventDefault();
  };

  const onMobileSubTopbarMenuClick = (event) => {
    mobileTopbarMenuClick = true;

    event.preventDefault();
  };

  const onMenuItemClick = (event) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };

  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const addClass = (element, className) => {
    if (element.classList) element.classList.add(className);
    else element.className += " " + className;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
  };




  const onLayoutModeChange = (mode) => {
    setLayoutMode(mode);
  };
  const onInputStyleChange = (inputStyle) => {
    setInputStyle(inputStyle);
  };
  const onRipple = (e) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value)
  }
  const [admin, setAdmin] = useState({
    grade: 0, label: '비회원',
    isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false
  })

  useEffect(() => {
    setAdmin(configData.dc_gradeObject.filter(f => f.grade === authData.grade)[0])
  }, [authData.grade, configData.dc_gradeObject])

  const wrapperClass = classNames(`layout-wrapper side-mode`, {
    "layout-overlay":  layoutMode === "overlay",
    "layout-static": layoutMode === "static",
    "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
    "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
    "layout-mobile-sidebar-active": mobileMenuActive,
    "theme-light": layoutColorMode === "light",
    "theme-dark": layoutColorMode === "dark"
  });

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="nosnippet" />
        </Head>
        {/* <Script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></Script> */}
        <SideTopBar mode={mode}
          onToggleMenuClick={onToggleMenuClick}
          layoutColorMode={layoutColorMode}
          setLayoutColorMode={setLayoutColorMode}
          mobileTopbarMenuActive={mobileTopbarMenuActive}
          onMobileTopbarMenuClick={onMobileTopbarMenuClick}
          onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}
          rippleEffect={ripple}
          onRippleEffect={onRipple}
          inputStyle={inputStyle}
          onInputStyleChange={onInputStyleChange}
          layoutMode={layoutMode}
          onLayoutModeChange={onLayoutModeChange}
          authData={authData}
          configData={configData} />
        <div className="layout-sidebar" onClick={onSidebarClick}>
          <SideAppMenu configData={configData}
            authData={authData}
            mode={mode}
            model={mode === "admin" ? admin_menu(admin) : user_menu()}
            onMenuItemClick={onMenuItemClick} />
        </div>

        <main className="layout-main-container">
          <div className="layout-main">
            {children}
          </div>
        </main>
        <SideFooter />
      </div>
    <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
      <div className="layout-mask p-component-overlay"></div>
    </CSSTransition>
  </div>
  )
}

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

    setSocketStart: (data) => dispatch(setSocketStart(data)),
    setDisconnect: () => dispatch(setDisconnect())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideLayout);
