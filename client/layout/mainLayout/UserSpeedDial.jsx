import {useRef, useState} from 'react'
import { connect } from 'react-redux'

import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import styled from 'styled-components';
import { confirmDialog } from 'primereact/confirmdialog';
import { Sidebar } from 'primereact/sidebar';
import FileList from '../../components/user/FileList';

const UserSpeedDialWrapper = styled.div`
position:relative;
.p-speeddial{
    position:fixed;
    z-index:1031;
    bottom:30px;
    left:30px;
}
.p-speeddial-button.p-button{
    width:2.5rem;
    height:2.5rem;
}
`
const UserSpeedDial = () => {
    const userModel= [
        {
            label: 'My Chat Status',
            icon: 'bi bi-chat-dots',
            command: (e) => {
             
            }
        },{
            label: 'My Images',
            icon: 'bi bi-image',
            command: (e) => {
                setIsImageDialog(true)
            }
        },{
            label: 'My files',
            icon: 'bi bi-file-arrow-up',
            command: (e) => {
                setIsFileDialog(true)
            }
        },{
            label: 'My peoples',
            icon: 'bi bi-people',
            command: (e) => {
             
            }
        }
    ];
    const [isFileDialog, setIsFileDialog] = useState(false)
    const [isImageDialog, setIsImageDialog] = useState(false)
  return (
    <UserSpeedDialWrapper id="user-speeddial-wrapper">
         <Tooltip target="#user-speeddial-wrapper .p-speeddial-action" position='top' />
        <SpeedDial Tooltip model={userModel} direction="up-right" type="quarter-circle" transitionDelay={100} radius={95}  showIcon={"bi bi-palette"}/>
        <Dialog  visible={isFileDialog} onHide={()=>setIsFileDialog(false)} contentClassName="p-0">
            <FileList fileType="all"/>
        </Dialog>
        <Dialog visible={isImageDialog} onHide={()=>setIsImageDialog(false)} contentClassName="p-0">
            <FileList fileType="image"/>
        </Dialog>
    </UserSpeedDialWrapper>
  )
}

export default UserSpeedDial