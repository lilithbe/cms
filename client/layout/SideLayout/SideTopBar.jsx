import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Sidebar } from 'primereact/sidebar';

import { RadioButton } from 'primereact/radiobutton';
import { InputSwitch } from 'primereact/inputswitch';
import {Button} from "primereact/button";

const SideTopBar = (props) => {
  const router = useRouter()
const {authData}= props
const [isSideModeConfig, setIsSideModeConfig] = useState(false)
  
const [active, setActive] = useState(false);
const [scale, setScale] = useState(14);
const [scales] = useState([12,13,14,15,16]);

const config = useRef(null);
let outsideClickListener = useRef(null);

const unbindOutsideClickListener = useCallback(() => {
    if (outsideClickListener.current) {
        document.removeEventListener('click', outsideClickListener.current);
        outsideClickListener.current = null;
    }
}, []);

const hideConfigurator = useCallback((event) => {
    setActive(false);
    unbindOutsideClickListener();
    event.preventDefault();
}, [unbindOutsideClickListener]);

const bindOutsideClickListener = useCallback(() => {
    if (!outsideClickListener.current) {
        outsideClickListener.current = (event) => {
            if (active && isOutsideClicked(event)) {
                hideConfigurator(event);
            }
        };
        document.addEventListener('click', outsideClickListener.current);
    }
}, [active, hideConfigurator]);

useEffect(() => {
    if (active) {
        bindOutsideClickListener()
    }
    else {
        unbindOutsideClickListener()
    }
}, [active, bindOutsideClickListener, unbindOutsideClickListener]);

const isOutsideClicked = (event) => {
    return !(config.current.isSameNode(event.target) || config.current.contains(event.target));
}

const decrementScale = () => {
    setScale((prevState) => --prevState);
}

const incrementScale = () => {
    setScale((prevState) => ++prevState);
}

useEffect(() => {
    document.documentElement.style.fontSize = scale + 'px';
}, [scale])

const toggleConfigurator = (event) => {
    setActive(prevState => !prevState);
}

const configClassName = classNames('layout-config', {
    'layout-config-active': active
});


    return (
      <div className="layout-topbar">
        <Link href={props.mode === "admin" ? "/admin" : "/"}>
          <a className="layout-topbar-logo">
            <Image
              width={100}
              height={30}
              src={props.layoutColorMode === "dark" ? "/assets/layout/images/logo-white.svg" : "/assets/layout/images/logo-dark.svg"}
              alt="logo"
            />
            <span>{props.mode === "admin" ? "Lilith Admin" : "My profile"}</span>
          </a>
        </Link>

        <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
          <i className="pi pi-bars" />
        </button>

        <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
          <i className="pi pi-ellipsis-v" />
        </button>

        <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
          <li>
            <Link href="/">
              <a className="p-link layout-topbar-button">
                <i className="pi pi-home" />
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li>
            <button
              className="p-link layout-topbar-button"
              onClick={(e) => {
                props.onMobileSubTopbarMenuClick(e);
                if(authData.isAdmin){
                  router.push('/admin/calendar')
                }else{
                  router.push('/auth/profile/calendar')
                }
               
              }}
            >
              <i className="pi pi-calendar" />
              <span>일정</span>
            </button>
          </li>
          {authData.isAdmin ? (
            <li>
              <button
                id="sidemode-setting"
                className="p-link layout-topbar-button"
                onClick={(e) => {
                  props.onMobileSubTopbarMenuClick(e);
                  setIsSideModeConfig(!isSideModeConfig);
                }}
              >
                <i className="pi pi-cog" />
                <span>Settings</span>
              </button>
            </li>
          ) : null}

          <li>
            <button
              className="p-link layout-topbar-button"
              onClick={(e) => {
                props.onMobileSubTopbarMenuClick(e);
              }}
            >
              <i className="pi pi-user" />
              <span>Profile</span>
            </button>
          </li>
        </ul>
        <Sidebar
          className="layout-config-setting header-hide"
          position="right"
          visible={isSideModeConfig}
          showCloseIcon={false}
          style={{
            height: "calc(100% - 5rem)",
            marginTop: "5rem",
            width: "400px"
          }}
          onHide={() => {
            setIsSideModeConfig(false);
          }}
        >
          <div className="card layout-config-content">
            <div className="card-body">
              <h6 className="mt-0">Component Scale</h6>
              <div className="config-scale">
                <Button icon="pi pi-minus" onClick={decrementScale} className="p-button-text" disabled={scale === scales[0]} />
                {scales.map((item, i) => {
                  return <i onClick={()=>{
                    setScale(scales[i])
                  }} className={classNames("pi pi-circle-on cursor-pointer", { "scale-active": item === scale })} key={item} />;
                })}
                <Button icon="pi pi-plus" onClick={incrementScale} className="p-button-text" disabled={scale === scales[scales.length - 1]} />
              </div>
            </div>
            <div className="card-body">
              <h6>Input Style</h6>
              <div className="p-formgroup-inline">
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="input_outlined"
                    name="inputstyle"
                    value="outlined"
                    onChange={(e) => props.onInputStyleChange(e.value)}
                    checked={props.inputStyle === "outlined"}
                  />
                  <label htmlFor="input_outlined">Outlined</label>
                </div>
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="input_filled"
                    name="inputstyle"
                    value="filled"
                    onChange={(e) => props.onInputStyleChange(e.value)}
                    checked={props.inputStyle === "filled"}
                  />
                  <label htmlFor="input_filled">Filled</label>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6>Ripple Effect</h6>
              <InputSwitch checked={props.rippleEffect} onChange={props.onRippleEffect} />
            </div>
            <div className="card-body">
              <h6>Menu Type</h6>
              <div className="p-formgroup-inline">
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="static"
                    name="layoutMode"
                    value="static"
                    onChange={(e) => props.onLayoutModeChange(e.value)}
                    checked={props.layoutMode === "static"}
                  />
                  <label htmlFor="static">Static</label>
                </div>
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="overlay"
                    name="layoutMode"
                    value="overlay"
                    onChange={(e) => props.onLayoutModeChange(e.value)}
                    checked={props.layoutMode === "overlay"}
                  />
                  <label htmlFor="overlay">Overlay</label>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h6>Theme Type</h6>
              <div className="btn-group">
                <button
                  onClick={() => {
                    props.setLayoutColorMode("light");
                  }}
                  className={`btn btn-sm btn${props.layoutColorMode === "light" ? "-primary" : "-outline-primary"}`}
                >
                  Light
                </button>
                <button
                  onClick={() => {
                    props.setLayoutColorMode("dark");
                  }}
                  className={`btn btn-sm btn${props.layoutColorMode === "dark" ? "-primary" : "-outline-primary"}`}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>
        </Sidebar>
      </div>
    );
}

export default SideTopBar
