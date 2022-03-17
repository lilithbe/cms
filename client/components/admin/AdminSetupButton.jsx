import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Sidebar } from 'primereact/sidebar'
import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
const AdminDialog = styled.div`
    position:fixed;
    top:0;
    ${(props) => {
        if (props.position === 'right') {
            return `right:0;`
        } else {
            return `left:0;`
        }
    }}
    .p-button{
        padding-top:2px;
        padding-bottom:2px;
    }
`

const AdminSetupButton = ({children,authData, openType, position, icon, buttonClassName,buttonLabel, tooltip, header,dismissableMask, }) => {
    const [isOpen, setIsOpen] = useState(false)
    if(authData.isAdmin && authData.grade>9){
        if (openType === 'side') {
            return (
                <div>
                    <AdminDialog position={position}>
                        <Button className={buttonClassName} label={buttonLabel} icon={icon} tooltip={tooltip} tooltipOptions={{position:'top'}} onClick={() => { setIsOpen(true) }} />
                    </AdminDialog>
                    <Sidebar className='header-none' visible={isOpen} position={position} onHide={() => { setIsOpen(false) }}>
                        {children}
                    </Sidebar>
                </div>
            )
        } else {
            return (
                <div>
                    <AdminDialog position={position}>
                        <Button className={buttonClassName} label={buttonLabel}  tooltip={tooltip} tooltipOptions={{position:'top'}} icon={icon} onClick={() => { setIsOpen(true) }} />
                    </AdminDialog>
                    <Dialog header={header} visible={isOpen} onHide={() => { setIsOpen(false) }} dismissableMask={dismissableMask}>
                        {children}
                    </Dialog>
                </div>
            )
        }
    }else{
        return null
    }
  

}
const mapStateToProps = (state) => {
    return {
      authData: state.authData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminSetupButton);
AdminSetupButton.propTypes = {
    openType: PropTypes.string,
    position: PropTypes.string,
    icon:PropTypes.string,
    buttonClassName:PropTypes.string,
    buttonLabel:PropTypes.string,
    dismissableMask:PropTypes.bool,

  };
  AdminSetupButton.defaultProps = {
    openType: 'side',
    position:'left',
    icon:'bi bi-gear',
    buttonClassName:'p-button-danger p-button-sm',
    buttonLabel:'',
    dismissableMask:false
  };