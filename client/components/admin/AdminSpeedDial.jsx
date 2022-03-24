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
import { confirmDialog } from 'primereact/confirmdialog';
import { Sidebar } from 'primereact/sidebar';
import FooterSetting from './footerSetting/FooterSetting';
const AdminSpeedDialWrapper = styled.div`
position:relative;
.p-speeddial{
    position:fixed;
    z-index:1031;
    top:30px;
    left:30px;
}
.p-speeddial-button.p-button{
    width:3rem;
    height:3rem;
}
`

const CustomSidebar =styled.div`
    z-index:1500;
    background-color:#ffffff;
    position:fixed;
    width:0;
    height:100vh;
    top:0,
    right:0;
    trangition:all .2s;
`
const AdminSpeedDial = ({authData, setAdminMode,configData, setConfig}) => {
    const toast = useRef(null);
    const [isPageSettingOpen, setIsPageSettingOpen] = useState(false)
    const [isNavgationSettingOption, setIsNavgationSettingOption] = useState(false)
    const [isFooterSettingOpen, setIsFooterSettingOpen] = useState(false)
    const [isSideOpen, setIsSideOpen] = useState(false)
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
        {
            label: 'Testing',
            icon: 'bi bi-pip',
            command: () => {
                setIsSideOpen(true)
            }
        },
       
     
      
    ];
    const [defaulteConfigData , setDefaultConfig] = useState(configData)

    return (
        authData.isAdmin && authData.grade>8?
        <div>
 <AdminSpeedDialWrapper id="adminSpeedDialWrapper" className='d-none d-lg-block'>
            <Toast ref={toast} baseZIndex={9999999} />
            <Tooltip target="#adminSpeedDialWrapper .p-speeddial-action" position="left" />
            <SpeedDial model={items} direction="down-right" type="quarter-circle" radius={100} showIcon={"bi bi-gear"} buttonClassName="p-button-danger p-button-sm" />
            <Dialog header="Page Setting" visible={isPageSettingOpen} onHide={() => {
                 confirmDialog({
                    message: '저장하지 않은 데이터는 초기화됩니다.',
                    header: '경고',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        setConfig(defaulteConfigData)
                        setIsPageSettingOpen(false)},
                    reject: () => {}
                });
                 }}>
                    <PageSetting onHide={() => {
                        setIsPageSettingOpen(false)
                        setDefaultConfig(configData)
                    }}
                        toast={toast} />
            </Dialog>
            <Dialog header="Navgation Setting" visible={isNavgationSettingOption} onHide={() => {confirmDialog({
                    message: '저장하지 않은 데이터는 초기화됩니다.',
                    header: '경고',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        setConfig(defaulteConfigData)
                        setIsNavgationSettingOption(false)},
                    reject: () => {}
                });}}>
                    <NavgationSetting onHide={() => {
                        setIsNavgationSettingOption(false)
                        setDefaultConfig(configData)
                    }}
                        toast={toast} />
            </Dialog>
            <Dialog header="Footer Setting" visible={isFooterSettingOpen} onHide={() => { setIsFooterSettingOpen(false) }}>
                <FooterSetting onHide={() => {
                        setIsFooterSettingOpen(false)
                        setDefaultConfig(configData)
                    }}
                        toast={toast}/>
            </Dialog>
         
        </AdminSpeedDialWrapper>
        <CustomSidebar >

            </CustomSidebar>
        </div>
       
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