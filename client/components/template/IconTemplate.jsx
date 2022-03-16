import React from 'react'
import PropTypes from 'prop-types'
import { BI_ICONS } from '../../common/bi-icon'

const IconTemplate = ({callback}) => {

    return (
        <div>
            <div className='row'>
            {BI_ICONS.map((item,i)=>{
                return <div key={i} className='col-1'>
                    
                   <div className='card text-center' style={{height:"150px"}}>
                   <div className={`card-body fs-1 cursor-pointer ${i===0?'border bg-dark':''}`} 
                   onClick={(e)=>{
                       e.preventDefault()
                       callback(item.icon)}}>
                        <i className={item.icon}/>
                    </div>
                    <div className='card-body' style={{fontSize:'7px'}}>{item.label}</div>
                   </div>
                </div>
            })}
        </div>
        </div>
        
    )
}

IconTemplate.propTypes = {
    callback:PropTypes.func,
}
IconTemplate.defaultProps = {
    callback:()=>{console.log('not icons Callback. ')}
}

export default IconTemplate
