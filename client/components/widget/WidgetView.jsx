import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { postApi } from '../../api'
import { GET_WIDGET_DATA, SET_WIDGET_DATA } from '../../common/path'
import AdminDialogButton from '../admin/AdminDialogButton'
import { widgetList } from './widgetObject'
import WidgetSetting from './WidgetSetting'
import { SpeedDial } from 'primereact/speeddial';
import { Dialog } from 'primereact/dialog'
const WidgetDiv = styled.div`
  ${(props) => props.isAdminMode ? 'min-height:300px;' : null}
  position:relative;
  .p-speeddial{
    z-index:2;
    top:20px;
    right:20px;
  }
  .p-speeddial-button.p-button{
      width:2.3rem;
      height:2.3rem;
  }
`
const WidgetView = ({ authData, widget }) => {
  const toast = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [isWidgetSettingOpen, setIsWidgetSettingOpen] = useState(false)
  const [widgetState, setWidgetState] = useState({
    id: widget.id,
    label: '',
    viewGrade: 0,
    component: '',
    data: {},
    options: {},
    styled: '',
    className: '',
  })
  const [widgetComponent, setWidgetComponent] = useState({
    label: '',
    value: '',
    component: () => { },
    setting: () => { }
  })
  useEffect(() => {
    postApi(setIsLoading, GET_WIDGET_DATA + widget.id, (res) => {
      if (res.data.status) {
        setWidgetState(res.data.data)
      } else {
        console.log(res.data.message)
      }
    })
  }, [widget.id])
  useEffect(() => {
    if (widgetList.findIndex(f => f.value === widgetState.component) !== -1) {
      setWidgetComponent(widgetList.filter(f => f.value === widgetState.component)[0])
    }
    return () => {
      setWidgetComponent({
        label: '',
        value: '',
        component: () => { },
        setting: () => { }
      })
    }
  }, [widgetState.component])

  const footerTemplate = () => {
    return (
      <div>
        <Button label="저장" className='p-button-sm' onClick={() => {
          postApi(setIsLoading, SET_WIDGET_DATA + widget.id, (res) => {
            if (res.data.status) {
              toast.current.show({ severity: 'success', summary: 'Success Message', detail: 'Save Success' });
            } else {
              toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Save Error' });
            }
          }, widgetState)
        }} />
      </div>
    )
  }




  const items = [
    {
      label: 'Add',
      icon: 'pi pi-pencil',
      command: () => {
        setIsWidgetSettingOpen(true)
      }
    },
    {
      label: 'Update',
      icon: 'bi bi-trash',
      command: () => {

      }
    },
  ];

  return (
    <WidgetDiv isAdminMode={authData.isAdminMode}>
      {widgetComponent.component({
        data: widgetState
      })}


      <Dialog blockScroll={true} header="Widget Setting" visible={isWidgetSettingOpen} onHide={() => {
        setIsWidgetSettingOpen(false)
      }} footer={footerTemplate}>
        <WidgetSetting widget={widgetState} onChange={setWidgetState} widgetComponent={widgetComponent} />
      </Dialog>

      {authData.isAdminMode ? <SpeedDial model={items} direction="left" mask /> : null}

      <Toast ref={toast} />
    </WidgetDiv>
  )
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
export default connect(mapStateToProps, mapDispatchToProps)(WidgetView);
