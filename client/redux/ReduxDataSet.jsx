
import React, { useState, useEffect, useRef } from 'react';
import { connect } from "react-redux";
import {
  setLogin, setConfig, setBoard, setGroup, setLogout,
  setSocketStart, setDisconnect, setMessageUpdate,
  setFallowMeUpdate, setMyFallowUpdate, setMsgAdd, setChatAdd, setChatRoomChange, setPopup
} from "../redux/index";
import { useSession } from "../lib/auth";
import { useCheck } from '../lib/check';
import Popup from '../layout/Popup';

import Preloder from '../components/loading/Preloder'
const ReduxDataSet = ({ children,
  authData,
  setConfig,
  setBoard,
  setGroup,
  setLogin,
  configData,
  boardData,
  groupData,
  setPopup, popupData,
}) => {


  const [isLoading, setIsLoading] = useState(false)

  useSession(setLogin, setIsLoading);
  useCheck(setIsLoading, setConfig, setBoard, setGroup, setPopup)


  useEffect(() => {
    var fontStyles = `
  body {  
     font-family: '${configData.dc_defaultFont}', sans-serif; 
  }
  `;



    configData.dc_addFont.forEach(function (font) {
      fontStyles += `@font-face {` +
        `font-family: '${font.value}';` +
        `src: ${font.src};` +
        `font-weight: normal;` +
        `font-style: normal;` +
        `}
    .${font.value}{
      font-family:${font.value};
    }
    `
    })
    const node = document.createElement('style')
    node.innerHTML = fontStyles;
    const oldNode = document.getElementById("font-family-style")

    if (oldNode) {
      console.log('update font-family-style')
      oldNode.innerHTML = fontStyles;
    } else {
      console.log('new Create')
      node.setAttribute("id", "font-family-style")
      document.body.appendChild(node);
    }


  }, [configData.dc_addFont, configData.dc_defaultFont])

  return (
    <Preloder isData={boardData.isStart && configData.isStart && groupData.isStart ? true : false}
      isLoading={authData.isLoading && groupData.isLoading && boardData.isLoading && configData.isLoading && popupData.isLoading && isLoading ? true : false} >
      <Popup list={popupData.list}>
        {children}
      </Popup>
    </Preloder>


  )

}
const mapStateToProps = (state) => {
  return {
    popupData: state.popupData,
    configData: state.configData,
    boardData: state.boardData,
    groupData: state.groupData,
    authData: state.authData,
    socketData: state.socketData,
    messageData: state.messageData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPopup: (data) => dispatch(setPopup(data)),
    setLogout: (data) => dispatch(setLogout(data)),
    setLogin: (data) => dispatch(setLogin(data)),
    setConfig: (data) => dispatch(setConfig(data)),
    setBoard: (data) => dispatch(setBoard(data)),
    setGroup: (data) => dispatch(setGroup(data)),
    setMessageUpdate: (data) => dispatch(setMessageUpdate(data)),
    setSocketStart: (data) => dispatch(setSocketStart(data)),

    setFallowMeUpdate: (data) => dispatch(setFallowMeUpdate(data)),
    setMyFallowUpdate: (data) => dispatch(setMyFallowUpdate(data)),
    setMsgAdd: (data) => dispatch(setMsgAdd(data)),
    setChatAdd: (data) => dispatch(setChatAdd(data)),
    setChatRoomChange: (data) => dispatch(setChatRoomChange(data)),

    setDisconnect: () => dispatch(setDisconnect())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReduxDataSet);

