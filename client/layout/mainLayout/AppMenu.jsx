import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Collapse, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap'
import { connect } from 'react-redux';
import { setLogin, setLogout } from '../../redux';
import { useRouter } from 'next/router'
import { Sidebar } from 'primereact/sidebar'
import { TieredMenu } from 'primereact/tieredmenu';
import styled from 'styled-components';
const NavBarDiv = styled.div`
  font-family:${props => props.navConfig.navbarFontFamily}!important;
  transition: all 0.5s;
  background-color:${props => props.isFixed ? props.navConfig.fixedNavbarBgColor : props.navConfig.navbarBgColor};
  color:${props => props.isFixed ? props.navConfig.fixedNavbarColor : props.navConfig.navbarColor}!important;
  border-top:${props => props.navConfig.navbarBorderTopLineWeight} solid ${props => props.navConfig.navbarBorderTopLineColor};
  border-bottom:${props => props.navConfig.navbarBorderBottomLineWeight} solid ${props => props.navConfig.navbarBorderBottomLineColor};
 
  ${props => {
    let top = `0 -${props.navConfig.navbarBorderTopShadowWeight} 5px ${props.navConfig.navbarBorderTopShadowColor}`
    let bottom = `0 ${props.navConfig.navbarBorderBottomShadowWeight} 5px ${props.navConfig.navbarBorderBottomShadowColor}`
    if (props.navConfig.navbarBorderTopShadowWeight === '0px') { return null } {
      return `box-shadow:${bottom} , ${top};`
    }
  }}

  .nav-link{
    
    ${(props) => {
    let px = props.navConfig.navbarFontShadowWeight
    let color = props.navConfig.navbarFontShadow
    if (props.isFixed) {
      px = props.navConfig.fixedNavbarFontShadowWeight
      color = props.navConfig.fixedNavbarFontShadow
    }
    let result = ` text-shadow:-${px} 0 ${color},${px} 0 ${color},${px} 0 ${color},-${px} 0 ${color};`
    if (px === '0px') return null
    return result
  }}

    font-size:${props => props.isFixed ? props.navConfig.fixedNavbarFontSize : props.navConfig.navbarFontSize};
    color:${props => props.isFixed ? props.navConfig.fixedNavbarColor : props.navConfig.navbarColor};
   
  }


  .nav-link:hover{
    color:${props => props.isFixed ? props.navConfig.fixedNavbarHoverColor : props.navConfig.navbarHoverColor};
  }
  .nav-item{
    border:${props => {
    return `${props.navConfig.navItemBorderWeight} solid ${props.navConfig.navItemBorderColor}`
  }};
  }
  
  .nav-item:hover{
    
    color:${props => props.isFixed ? props.navConfig.fixedNavbarHoverColor : props.navConfig.navbarHoverColor}!important;
    background-color:${props => props.isFixed ? props.navConfig.fixedNavbarHoverBgColor : props.navConfig.navbarHoverBgColor}!important;
  }
  
  .nav-item.nav-focus {
    background-color:${props => props.isFixed ? props.navConfig.fixedNavbarFocusBgColor : props.navConfig.navbarFocusBgColor}!important;
  }
  .nav-item.nav-focus .nav-link{
    color:${props => props.isFixed ? props.navConfig.fixedNavbarFocusColor : props.navConfig.navbarFocusColor}!important;
  }

  .dropdown-item a{
    color:#000000;
  }
  .dropdown-item:hover a{
    color:#ffffff;
  }

`

const AppMenu = ({ authData, configData, setLogout, groupData, boardData, expand, socketData, isTest, setIsSearch }) => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const linkClickHandler = (to) => {
    if (!isDesktop) {
      toggle()
    }
    if (router.asPath !== to) {
      router.push(to)
    }

  }
  const homeClickHandler = (e) => {
    e.preventDefault()
    if (router.pathname !== '/') {
      router.push("/")
    }

  }
  const chatClickHandler = (e) => {
    e.preventDefault()
    if (authData.isLogin) {
      alert('chatClickHandler login user')
    } else {
      alert('chatClickHandler not login user')
    }
  }

  const messageClickHandler = (e) => {
    e.preventDefault()
    if (authData.isLogin) {
      alert('messageClickHandler login user')
    } else {
      alert('messageClickHandler not login user')
    }
  }

  const profileClickHandler = (e) => {
    e.preventDefault()
    if (authData.isLogin) {
      alert('profileClickHandler login user')
    } else {
      alert('profileClickHandler not login user')
    }
  }


  const menuRender = <Collapse navbar 
    className={configData.dc_navConfig.navbarButtonPosition === 'center' ? `justify-content-center d-none d-lg-block` : 'd-none  d-lg-block'}
    isOpen={isMobileSideMenuOpen} >
    {configData.dc_navConfig.isNavBrand ? <a className={`navbar-brand cursor-pointer ${configData.dc_navConfig.navbarFontFamily}`} onClick={homeClickHandler} >
      {  !configData.dc_navConfig.isNavBrandText ?
        <Image src={ configData.dc_navConfig.navbarBrand} layout="intrinsic" width={180} height={32} alt="logo" /> :
        configData.dc_navConfig.navbarBrandText
      }
    </a> : null}


    <Nav navbar className={configData.dc_navConfig.navbarButtonPosition === 'right' ? 'ml-auto' : configData.dc_navConfig.navbarButtonPosition === 'left' ? 'mr-auto' : ''}>
      {configData.dc_navConfig.isHomeButton ?
        <NavItem className={`${configData.dc_navConfig.navItemPaddingY}`} onClick={homeClickHandler}>
          <a className="nav-link cursor-pointer"  >Home</a>
        </NavItem> : null
      }


      {/* 네비게이션 버튼 */}
      {configData.dc_navgation.map((item, i) => {
        if (item.type === 'nav-item') {
          return (
            <NavItem key={i} className={` cursor-pointer ${configData.dc_navConfig.navItemPaddingY} ${router.asPath === item.to ? 'nav-focus' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                linkClickHandler(item.to)
              }}>
              <a className="nav-link">{item.icon !== '' ? <i className={`${item.icon} ml-2`} /> : null} {item.label}</a>
            </NavItem>
          )
        } else if (item.type === 'dropdown-menu') {
          return (
            <DropdownMenuTemplate key={i} index={i}
              configData={configData} item={item} linkClickCallback={linkClickHandler}
            />

          )
        } else {
          return (
            <MegaDropdwonMenuTemplate key={i} index={i}
              configData={configData} item={item} linkClickCallback={linkClickHandler} />
          )
        }
      })}

      {/* 계정버튼 */}
      {configData.dc_navConfig.accountButtonPosition==='navbar'?
      <AccountsMenuTemplate authData={authData} configData={configData} setLogout={setLogout} socketData={socketData} router={router} />:null}
      

      {/* 검색버튼 */}
      {configData.dc_navConfig.isSearchButton ?
        <NavItem className={`${configData.dc_navConfig.navItemPaddingY} px-3 cursor-pointer`} onClick={() => { setIsSearch(true) }}>
          <a className='nav-link'><i className='bi bi-search' /></a>
        </NavItem> : null}
     
    </Nav>
  </Collapse>

const mobileMenuList=<div >
  {/* 네비게이션 버튼 */}
  {configData.dc_navgation.map((item, i) => {
    if (item.type === 'nav-item') {
      return (
        <NavItem key={i} className={` cursor-pointer ${configData.dc_navConfig.navItemPaddingY} ${router.asPath === item.to ? 'nav-focus' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            linkClickHandler(item.to)
          }}>
          <a className="nav-link">{item.icon !== '' ? <i className={`${item.icon} ml-2`} /> : null} {item.label}</a>
        </NavItem>
      )
    } else if (item.type === 'dropdown-menu') {
      return (
        <DropdownMenuTemplate key={i} index={i}
          configData={configData} item={item} linkClickCallback={linkClickHandler}
        />

      )
    } else {
      return (
        <MegaDropdwonMenuTemplate key={i} index={i}
          configData={configData} item={item} linkClickCallback={linkClickHandler} />
      )
    }
  })}
</div>


  const [position, setPosition] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', e => {
      if (window.scrollY > 50) {
        setPosition('fixed-top')
        if (configData.dc_navConfig.isFixedValueCopy) {
          setIsFixed(true)
        } else {
          setIsFixed(false)
        }
      } else if (isTest) {
        setPosition('fixed-top')
        setIsFixed(true)
      } else {
        setPosition('')
        setIsFixed(false)
      }
    });
    return () => {
      setPosition('')
      setIsFixed(false)
    }
  }, [configData.dc_navConfig.isFixedValueCopy, isTest]);
  useEffect(() => {
    console.log(position);
  }, [position]);

const [isMobileSideMenuOpen, setIsMobileSideMenuOpen] = useState(false)
  return (
    <div className='position-relative'>
      <NavBarDiv isFixed={isFixed}
        className={`navbar navbar-expand-md d-none d-lg-block ${configData.dc_navConfig.navbarPaddingY} ${configData.dc_navConfig.isScrollMovingNavFixed ? position : ''}`}
        navConfig={configData.dc_navConfig} >

        {/* <button className='navbar-toggler' onClick={toggle}><i className='navbar-toggler-icon' /></button> */}
        {menuRender}
      </NavBarDiv>

      {/* mobile top navbar */}
      <div className='navbar d-block d-lg-none position-fixed top-0 w-100 bg-body py-2 border-bottom'
        style={{
          zIndex: 999,
          fontFamily: configData.dc_navConfig.navbarFontFamily
        }}>
        <div className="d-flex justify-content-between">
          <button className='btn btn-outline-link ml-2' onClick={(e)=>{
            e.preventDefault()
            setIsMobileSideMenuOpen(!isMobileSideMenuOpen)}}>
            <i className="bi bi-list" />
          </button>
          <button className='btn btn-outline-link mx-auto'>
            {configData.dc_isLogoImage ?
              <Link href={"/"}>
                <a  >
                  <Image src={configData.dc_logoImage} width={150} height={22} alt="logo" />
                </a></Link>
              :
              <Link href={"/"}>{configData.dc_title}</Link>}

          </button>
          <button className='btn btn-outline-link mr-2' onClick={profileClickHandler}>
            <i className="bi bi-person" />
          </button>
        </div>
      </div>

      {/* mobile footer navbar */}
      <div className='navbar d-block d-lg-none position-fixed bottom-0 w-100 bg-body py-2'
        style={{ zIndex: 999, fontFamily: configData.dc_navConfig.navbarFontFamily }}>
        <div className="d-flex justify-content-between">
          <button className='btn btn-outline-link ml-2' onClick={homeClickHandler}>
            <i className="bi bi-house-door-fill" />
          </button>
          <button className='btn btn-outline-link mx-auto' onClick={messageClickHandler}>
            <i className="bi bi-envelope" />
          </button>
          <button className='btn btn-outline-link mr-2' onClick={chatClickHandler}>
            <i className="bi bi-chat-dots-fill" />
          </button>
        </div>
      </div>

      <Sidebar style={{ width: "260px" }} className='d-none-header d-block d-lg-none' visible={isMobileSideMenuOpen} onHide={() => { setIsMobileSideMenuOpen(false) }}>
        {mobileMenuList}
      </Sidebar>
   


    </div>
  );
}

AppMenu.defaultProps = {
  expand: "md",
  isTest: false,
}
const mapStateToProps = (state) => {
  return {
    configData: state.configData,
    authData: state.authData,
    boardData: state.boardData,
    groupData: state.groupData,
    socketData: state.socketData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (data) => dispatch(setLogin(data)),
    setLogout: (data) => dispatch(setLogout(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);



const DropdownMenuTemplate = ({ configData, item, linkClickCallback, index }) => {
  const menu = useRef(null);
  const menuItem = (_item) => {
    const resut = []
    for (let i = 0; i < _item.children.length; i++) {
      const eItem = _item.children[i];
      
      if (eItem.type === 'dropdown-item') {
        eItem.command = () => linkClickCallback(eItem.to)
        resut.push(eItem)
        delete eItem.items
      } else if (eItem.type !== 'dropdown-item'){
       eItem.items = menuItem(eItem)
        resut.push(eItem)
      }
    }
    console.log(resut)
    return resut
  }
  return (
    <UncontrolledDropdown inNavbar nav key={index} className={`${configData.dc_navConfig.navItemPaddingY}`}>
      <DropdownToggle caret nav onClick={(e) => { menu.current.toggle(e) }}>
        {item.icon !== '' ? <i className={`${item.icon} ml-2`} /> : null}{item.label}
      </DropdownToggle>
      <TieredMenu model={menuItem(item)} popup ref={menu} />
    </UncontrolledDropdown>
  )
};

const MegaDropdwonMenuTemplate = ({ configData, item, linkClickCallback, index }) => {
  return (
    <UncontrolledDropdown inNavbar nav key={index}
      className={`${configData.dc_navConfig.navItemPaddingY} has-megamenu`}>
      <DropdownToggle caret nav className='cursor-pointer'>
        {item.icon !== '' ? <i className={`${item.icon} ml-2`} /> : null} {item.label}
      </DropdownToggle>
      <DropdownMenu style={{ width: "100%" }} className='megamenu'>
        <div className='container-lg'>
          <div className='row'>
            {item.children.map((mdgItem, j) => {
              return (
                <div key={j} className='col'>
                  <div>
                    <div className='fw-bold'>{mdgItem.label}</div>
                    <div>
                      {mdgItem.children.map((mdItem, y) => {
                        return (<DropdownItemTemplate key={y} linkClickCallback={linkClickCallback} item={mdItem} />)
                      })}
                    </div>
                  </div>


                </div>
              )
            })}
          </div>
        </div>

      </DropdownMenu>
    </UncontrolledDropdown>
  )
}
const DropdownItemTemplate = ({ linkClickCallback, item }) => {
  const [isHover, setIsHover] = useState(false);
  const iconChanger = isHover ? item.hoverIcon === '' ? null : item.hoverIcon + ' m-1' : item.icon === '' ? null : item.icon + ' m-1'
  return (
    <DropdownItem className='cursor-pointer'
      onMouseEnter={() => {
        if (item.hoverLabel !== '') {
          setIsHover(true)
        }
      }}
      onMouseLeave={() => {
        if (item.hoverLabel !== '') {
          setIsHover(false)
        }
      }}
      onClick={(e) => {
        e.preventDefault()
        linkClickCallback(item.to)
      }}>
      <i className={iconChanger} />
      {isHover ? item.hoverLabel : item.label}
    </DropdownItem>
  )
};

const AccountsMenuTemplate = ({ authData, configData, setLogout, socketData, router }) => {

  return (
    !authData.isLogin ? <>
      <NavItem className={`${configData.dc_navConfig.navItemPaddingY}`}>
        <Link href="/auth/login" ><a className="nav-link"   >Sign In</a></Link>
      </NavItem >
      <NavItem className={`${configData.dc_navConfig.navItemPaddingY}`}>
        <Link href="/auth/register" ><a className="nav-link"   >Sign Up</a></Link>
      </NavItem >
    </> :
      <UncontrolledDropdown inNavbar nav className={`d-none d-md-block ${configData.dc_navConfig.navItemPaddingY}`}>
        <DropdownToggle caret nav>
          Account
        </DropdownToggle>
        <DropdownMenu>
          <Link href="/auth/profile" ><a className='dropdown-item'><i className='bi bi-person-badge mr-1' />Profile</a></Link>
          {authData.isAdmin ? <Link href="/admin" ><a className='dropdown-item'><i className='bi bi-speedometer mr-1' />Admin Dashboard</a></Link> : null}
    
          <DropdownItem divider />
          <DropdownItem onClick={() => {
            setLogout()
            router.push("/")
          }}><i className='pi pi-sign-out mr-1' />Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
  )
};

