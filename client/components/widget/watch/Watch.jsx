import React, { useState, useEffect } from 'react';
import moment from 'moment';
const Watch = () => {
    let timer= null;
    const [time, setTime] = useState(moment());
    useEffect(() => {
       setInterval(() => {
          setTime(moment());
        }, 1000);
        return () => {
          clearInterval(timer);
        };
      }, [timer]);
    return (
        <div className="fs-1" style={{fontFamily:"LAB디지털"}}>
            {time.format('h:mm:ss')}
        </div>
    )
}

export default Watch
