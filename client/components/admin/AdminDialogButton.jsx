import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const AdminDialog= styled.div`
    position:absolute;
    z-index:100;
`
const AdminDialogButton = ({authData,buttonClassName,buttonLabel,children , icon,dismissableMask ,dialogHeader,footer}) => {
    const [isOpen, setIsOpen] = useState(false)
    if(authData.isAdmin && authData.grade>=9){
      return (
        <div>
          <div className='d-flex justify-content-center'>
          <AdminDialog>
            <Button icon={icon} className={buttonClassName} label={buttonLabel} onClick={() => { setIsOpen(true) }} />
          </AdminDialog>
          </div>
       
          <Dialog footer={footer} header={dialogHeader} visible={isOpen} dismissableMask={dismissableMask} style={{minWidth:"600px"}} onHide={() => { setIsOpen(false) }}>
            {children}
          </Dialog>
        </div>
      )
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminDialogButton);
AdminDialogButton.propTypes = {
  icon:PropTypes.string,
  buttonClassName:PropTypes.string,
  buttonLabel:PropTypes.string,
  dismissableMask:PropTypes.bool,
  dialogHeader:PropTypes.string,

};
AdminDialogButton.defaultProps = {
  icon:'bi bi-gear',
  buttonLabel:'Setting',
  buttonClassName:'p-button-danger p-button-sm py-0',
  dismissableMask:false,
  dialogHeader:'',
};