import {useRef, useState} from 'react'
import { connect } from 'react-redux'
import { setAdminMode, setConfig } from '../../redux';

import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import PageSetting from './pageSetting/PageSetting';
import NavgationSetting from './navSetting/NavgationSetting';
import styled from 'styled-components';

const AdminSpeedDialWrapper = styled.div`

.p-speeddial{
    z-index:2;
    top:30px;
    left:30px;
}
.p-speeddial-button.p-button{
    width:3rem;
    height:3rem;
}
`
const AdminSpeedDial = ({authData, setAdminMode}) => {
    const toast = useRef(null);
    const [isPageSettingOpen, setIsPageSettingOpen] = useState(false)
    const [isNavgationSettingOption, setIsNavgationSettingOption] = useState(false)
    const [isFooterSettingOpen, setIsFooterSettingOpen] = useState(false)
    const items = [
        {
            label: 'Admin Mode',
            icon: 'bi bi-star',
            command: () => {
                setAdminMode(!authData.isAdminMode)
            }
        },
        {
            label: 'Page Setting',
            icon: 'bi bi-pencil-square',
            command: (e) => {
                console.log(e.item)
                setIsPageSettingOpen(true)
            }
        },
        {
            label: 'Navgation Setting',
            icon: 'bi bi-segmented-nav',
            command: () => {
                setIsNavgationSettingOption(true)
            }
        },
        {
            label: 'Footer Setting',
            icon: 'bi bi-pip',
            command: () => {
                setIsFooterSettingOpen(true)
            }
        },
       
     
      
    ];


    return (
        authData.isAdmin && authData.grade>8?
        <AdminSpeedDialWrapper id="adminSpeedDialWrapper" className='d-none d-lg-block'>
            <Toast ref={toast} />
            <Tooltip target="#adminSpeedDialWrapper .p-speeddial-action" position="left" />
            <SpeedDial model={items} direction="down-right" type="quarter-circle" radius={100} showIcon={"bi bi-gear"} buttonClassName="p-button-danger p-button-sm" />
            <Dialog header="Page Setting" visible={isPageSettingOpen} onHide={() => { setIsPageSettingOpen(false) }}>
                <PageSetting />
            </Dialog>
            <Dialog header="Navgation Setting" visible={isNavgationSettingOption} onHide={() => { setIsNavgationSettingOption(false) }}>
                <NavgationSetting />
            </Dialog>
            <Dialog header="Footer Setting" visible={isFooterSettingOpen} onHide={() => { setIsFooterSettingOpen(false) }}>
                Footer Setting
            </Dialog>
        </AdminSpeedDialWrapper>
    :null
  )
}
const mapStateToProps = (state) => {
    return {
        configData: state.configData,
        authData: state.authData,
        boardData: state.boardData,
        groupData: state.groupData,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setConfig: (data) => dispatch(setConfig(data)),
        setAdminMode: (data) => dispatch(setAdminMode(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminSpeedDial);