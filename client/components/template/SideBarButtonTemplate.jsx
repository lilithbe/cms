import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Sidebar } from 'primereact/sidebar';
import { Tooltip } from 'reactstrap';

const SideBarButtonTemplate = (props) => {
    const {btnClass,children,buttonLabel,fullscreen ,icon, color,outline,position, onHide,visible,tooltip,tooptipPosition,id , sidebarStyle}=props
    const ol =outline?"-outline":""
    const buttonColor=`-${color}`
    const buttonmainClass = `btn${ol}${buttonColor}`
    const [isOpen, setIsOpen] = useState(false)
    return (
        < >
            <button 
                id={id}
                className={`btn ${buttonmainClass} ${btnClass}`} onClick={(e)=>{
                    e.preventDefault()
                onHide(!visible)
            }}>
                <i className={icon}/>
                {buttonLabel}</button>
                <Tooltip 
                isOpen={isOpen}
                    placement={tooptipPosition}
                    target={id}
                    toggle={()=>{
                        setIsOpen(!isOpen)
                        }}
                >
                    {tooltip}
                </Tooltip>
            <Sidebar visible={visible} position={position} style={sidebarStyle} fullScreen={fullscreen} onHide={() => {
                onHide(false)
                // setIsOpen(false)
                }}>
            {children}
            </Sidebar>
        </>
    )
}

export default SideBarButtonTemplate
SideBarButtonTemplate.propTypes={
    id:PropTypes.string,
    tooltip:PropTypes.string,
    tooptipPosition:PropTypes.string,
    btnClass:PropTypes.string,
    icon:PropTypes.string,
    color:PropTypes.string,
    outline:PropTypes.bool,
    buttonLabel:PropTypes.string,
    position:PropTypes.string,
    fullscreen:PropTypes.bool,
    visible:PropTypes.bool,
    onHide:PropTypes.func,
}
SideBarButtonTemplate.defaultProps ={
    id:'98409238dfh',
    tooltip:'',
    tooptipPosition:'bottom',
    btnClass:'btn-outline-primary',
    icon:'bi bi-plus',
    color:"primary",
    outline:true,
    buttonLabel:'',
    position:"right",
    fullscreen:false,
    visible:false,
    onHide:()=>console.log('not function')
}