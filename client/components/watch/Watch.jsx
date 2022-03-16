import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
const Watch = ({className, format}) => {
    const [time, setTime] = useState(moment());  

    useEffect(() => {
       setInterval(() => {
          setTime(moment());
        }, 1000);
        return()=>{
          setTime(moment())
        }
      }, []);

      // useEffect(() => {
      //   setInterval(() => {
      //      setTime(moment());
      //    }, 1000);
         
      //    return () => {
      //      clearInterval(timer);
      //    };
      //  }, [timer]);
    return (
        <span className={`${className} px-2 fw-bold`} style={{fontFamily:"LAB디지털"}}>
            {time.format(format)}
        </span>
    )
}


export default Watch
Watch.propTyps={
  format:PropTypes.string,
}
Watch.defaultProps={
  format:'hh:mm:ss'
}