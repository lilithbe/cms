import { useEffect } from "react";
import {postApi} from '../api'
import { CONFIG } from "../common";
import moment from 'moment'

export const useCheck = (loadingFunction,setConfig, setBoard,setGroup,setPopup) => {
   useEffect(() => {
    postApi(loadingFunction, CONFIG, (res) => {     
      if(res.error===false || res.data.status===true){
        setConfig(res.data.config)
        setBoard(res.data.boardConfig)
        setGroup(res.data.groupConfig)
        setPopup(res.data.popup)
        // setIsStart(true)
      }
      })
    
   }, [loadingFunction, setBoard, setConfig, setGroup, setPopup])

}

export const onedayCheck = (time) => {
  const nowTime = moment(); //현재 시간
  const createdTime = moment(time); //입력받은 시간
  const resultTime = moment.duration(nowTime.diff(createdTime)).asDays(); //두개의 시간차 하루
  if (resultTime < 0) {
    return  moment(time).format('YYYY년MM월DD일')
  } else {
    return  moment(time).format('MM월DD일 hh시mm분')
  }
};

