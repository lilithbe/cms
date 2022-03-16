import {useEffect} from 'react'
import io from 'socket.io-client'
import { PUBLIC_URL,TOKEN_NAME, REMEMBER_NAME  } from '../common';
let socket;

export const useSocket= (
  setSocketStart ,
  setDisconnect
  )=>{
    const ENDPORINT =PUBLIC_URL
    socket = io(ENDPORINT);


    useEffect(() => {
      setSocketStart(socket)
      socket.on("disconnect", (res) => {
        setDisconnect()
      });
       
    }, [ setDisconnect,  setSocketStart]);
 
  }