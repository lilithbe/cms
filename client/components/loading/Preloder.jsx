import React from 'react'
import PropTypes from 'prop-types'
import { useState , useEffect} from 'react'

const Preloder = ({isLoading ,isData , children}) => {
    const [isStart, setIsStart] = useState(false)
    useEffect(() => {
        if(isData===true && isLoading===false ){
            setInterval(() => {
                setIsStart(true)
            }, 1000);
        }
        return()=>{
            setIsStart(false)
        }
       
    }, [isData, isLoading])
    return (
        <div>
            {isStart?children
            :
            <div className="preloder_1">
                <div className="loader_1"></div>
            </div>}
        </div>
    )
}

Preloder.propTypes = {

}

export default Preloder
