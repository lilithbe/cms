import classNames from "classnames";
import React, { useState, useEffect } from "react";
import HtmlParser from "react-html-parser"
import {useRouter} from 'next/router'
import moment from 'moment'
const Popup = ({ children, list }) => {
    const router= useRouter()
    const today = moment()
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
      const page=router.pathname.split("/")[1]
      setIsOpen(page==='admin' || page==='auth'?false:true )
    }, [router])

    const openCheck =(start,end)=>{

        const _start = moment(start)
        const _end = moment(end)
        const cal =  moment.duration(_start.diff(_end)).asMinutes();
        console.log(cal)
       return cal < 0?true:false
    }
  return (
 
    <>
    {isOpen?
      <div className="position-realtive">
        {list &&
          list.map((item, i) => {
              if( openCheck( today ,item.end ) && openCheck( item.start , today ) ){
                return <PopItem key={i} item={item} />;
              }else{
                  console.log(item.label , '조건 딸림')
                  return null
              }
          
            
          })}
      </div>:null}
      {children}
    </>
  );
};

export default Popup;

const PopItem = ({ item }) => {
    const router = useRouter()
  const [isClose, setIsClose] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  useEffect(() => {
    const _session = localStorage.getItem(`pop-${item.id}`);
    console.log(_session);
    if (_session === null) {
      setIsClose(false);

      localStorage.setItem(`pop-${item.id}`, false);
    } else if (_session === "false") {
      setIsClose(false);
    } else {
      setIsClose(true);
    }
  }, [item.id]);
  const closeHandler = (e) => {
    e.preventDefault();
    setIsClose(true);
   
  };
  const classString = classNames("position-fixed border", {
    "d-none": isClose,
    "d-block": !isClose
  });
  const checkboxHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem(`pop-${item.id}`);
    localStorage.setItem(`pop-${item.id}`, !isCheck);
    setIsCheck(!isCheck);
  };
  const linkHandler = (e) => {
      e.preventDefault()
      if(item.url!==""){
        setIsClose(true);
        router.push(item.url)
      }
  }
  return (
    <div
      className={classString}
      style={{
        top: item.y,
        left: item.x,
        width: item.width,
        height: item.height,
        backgroundImage: `url("${item.src}")`,
        backgroundSize: "cover",
        zIndex: 30000
      }}
    >
      <div
        className="position-realtive "
        style={{
          width: item.width,
          height: item.height
        }}
      >
        <div
          style={{
              cursor:item.url?"pointer":"initial",
            width: item.width,
            height: item.height,
            overflow:"hidden"
          }}
          onClick={linkHandler}
        >
          {HtmlParser(item.content)}
        </div>

        <div className="w-100 bg-white position-absolute d-flex flex-row-reverse bd-highlight" style={{ bottom: 0 }}>
          <button className="btn btn-success btn-sm py-0" onClick={closeHandler}>
            닫기
          </button>
          <input checked={isCheck} type="checkbox" className="form-check-input mx-1" id="same-address" onClick={checkboxHandler} />
          {item.isTodayClose?
          <div className="form-check mx-1  " onClick={checkboxHandler}>
          <label className="form-check-label cursor-pointer" htmlFor="same-address">
            오늘하루 그만보기
          </label>
        </div>
        :null}
          
        </div>
      </div>
    </div>
  );
};
