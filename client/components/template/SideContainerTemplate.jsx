import React from 'react'
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';
import { Toast } from 'primereact/toast';
const SideContainerTemplate = ({children, title, icon,isLoading ,toast,className}) => {
    return (
        <div className="side-laout-container container-fluid">
            <Loading isLoading={isLoading}/>
            <Toast ref={toast}/>
            <div className="row">
                <div className="col col-lg-8">
                    <h3><i className={`${icon} mr-3`} />{title}</h3>
                    <hr className='mb-0'/>
                </div>
                <div className={`col-12`} >
                    <div className={className}>
                    {children}
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default SideContainerTemplate
SideContainerTemplate.propTypes ={
   
     title:PropTypes.string, 
     icon:PropTypes.string,
     isLoading:PropTypes.bool,
}
SideContainerTemplate.defaultProps ={
    title:'title 입력',
    icon:'bi bi-gear',
    isLoading:false,
    toast:null
}