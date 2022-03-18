import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { setConfig } from '../../../redux';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styled from 'styled-components';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { postApi } from '../../../api';
import { ADMIN_CONFIG_UPDATE } from '../../../common';
import { SelectButton } from 'primereact/selectbutton';
import ColorSelecter from '../../formControl/ColorSelecter';
import FileUpload from '../../file/FileUpload';
import {
    alignOptions,
    boolOptions,
    bootstrapPaddingOptions,
    fixedNavgationOptionsSettingArr,
    fontSizeOptions,
    headerOptionsSettingArr,
    navgationDefaultSettingOptions,
    navgationOptionsSettingArr,
    shadowSizeOptions,
    topOptionsSettingArr
} from '../../../common/initList';
import IconSelect from '../../formControl/IconSelect';
import LinkSelectMB from '../../formControl/LinkSelectMB';
import FontFamilyDropdwon from '../../formControl/FontFamilyDropdwon';
const NavgationSettingWrapper = styled.div`
   
`
const NavgationSetting = ({ configData, setConfig, authData,onHide,toast }) => {

    const [isLoading, setIsLoading] = useState(false)
    const updateHandler = (value) => {
        setConfig(value)
    }
    const saveHandler = () => {
        postApi(setIsLoading, ADMIN_CONFIG_UPDATE, (res) => {
        
            if(res.data.status){
                onHide()
                toast.current.show({ severity: 'success', summary: 'Save Success', detail: '네비게이션 데이터 저장 완료' });
            }
        }, { dc_navConfig: configData.dc_navConfig, dc_navgation: configData.dc_navgation }, authData.userToken)
    }
    return (
        <NavgationSettingWrapper>
            <TabView>
                <TabPanel header="Navgation List">
                    <NavgationListSetting isLoading={isLoading} type="main" navList={configData.dc_navgation} callback={(value) => { updateHandler({ dc_navgation: value }) }} />
                </TabPanel>
                <TabPanel header="Navgation Default Options" >
                    <OptionSettingTemplate isLoading={isLoading} arr={navgationDefaultSettingOptions} navConfig={configData.dc_navConfig} callback={(value) => { updateHandler({ dc_navConfig: value }) }} />
                </TabPanel>

                <TabPanel header="Navgation Options" >
                    <OptionSettingTemplate isLoading={isLoading} arr={navgationOptionsSettingArr} navConfig={configData.dc_navConfig} callback={(value) => { updateHandler({ dc_navConfig: value }) }} />
                </TabPanel>
                <TabPanel header="Fixed Navgation Options" >
                    <OptionSettingTemplate isLoading={isLoading} arr={fixedNavgationOptionsSettingArr} navConfig={configData.dc_navConfig} callback={(value) => { updateHandler({ dc_navConfig: value }) }} />
                </TabPanel>
                <TabPanel header="Top Menu" >
                    <OptionSettingTemplate isLoading={isLoading} arr={topOptionsSettingArr} navConfig={configData.dc_navConfig} callback={(value) => { updateHandler({ dc_navConfig: value }) }} />
                </TabPanel>
                <TabPanel header="Header Setting">
                    <OptionSettingTemplate isLoading={isLoading} arr={headerOptionsSettingArr} navConfig={configData.dc_navConfig} callback={(value) => { updateHandler({ dc_navConfig: value }) }} />
                </TabPanel>
            </TabView>
            <Button label="Save" icon="pi pi-save" className='py-1' onClick={saveHandler} />
     
        </NavgationSettingWrapper>
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

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavgationSetting);

const NavListTableWrapper = styled.div`
  
`
const ChildrenOpen = ({ row, col, callback, header }) => {
    const [isChildrenOpen, setIsChildrenOpen] = useState(false)
    return (
        <>
            <Button disabled={row.children.length > 0 ? false : true} tooltip='Children List Open' tooltipOptions={{ position: 'bottom' }} className='p-button-sm p-button-warning' icon="bi bi-arrows-fullscreen" onClick={() => { setIsChildrenOpen(true) }} />
            <Dialog header={header} visible={isChildrenOpen} onHide={() => setIsChildrenOpen(false)} dismissableMask>
                <NavgationListSetting type={row.type} navList={row.children} callback={(value) => { callback(value) }} />
            </Dialog>
        </>
    )
}

const NavgationListSetting = ({ isLoading, navList, callback, type }) => {
    const onRowReorder = (e) => {
        callback(e.value);
    }
    const changeHandler = (index, value) => {
        const result = Array.from(navList)
        if (value) {
            result.splice(index, 1, value)
        } else {
            result.splice(index, 1)
        }
        callback(result)
    }
    const editorTemplate = (row, col) => {
        const _arr = [
            { label: "링크", value: "nav-item" },
            { label: "드롭다운 메뉴", value: "dropdown-menu" },
            { label: "메가메뉴", value: "mega-menu" }
        ];
        const __arr = (parentType) => {
            return parentType === "main" ? _arr : parentType === "dropdown-menu" ? [
                { label: "드롭다운 메뉴", value: "dropdown-menu" },
                { label: "드롭다운 링크", value: "dropdown-item" }
            ]
                : parentType === "mega-menu" ? [{ label: "메가 그룹", value: "mega-group" }] : [{ label: "메가 링크", value: "mega-item" }];
        };


        const newMenuInit = (parentType) => {
            return {
                type:
                    parentType === "main"
                        ? "nav-item"
                        : parentType === "dropdown-menu"
                            ? "dropdown-item"
                            : parentType === "mega-menu"
                                ? "mega-group"
                                : parentType === "mega-group"
                                    ? "mega-item"
                                    : "dd",
                label: "New Menu Item",
                icon: "",
                hoverLabel: "",
                focusLabel: "",
                hoverIcon: "",
                focusIcon: "",
                to: "",
                children: []
            }
        }

        return (
            <div className='btn-group'>
                <Dropdown className='p-inputtext-sm' options={(__arr(type))} value={row.type}
                    onChange={(e) => {
                        changeHandler(col.rowIndex, { ...row, type: e.value })
                    }} />
                {row.type.split('-')[1] !== 'item' ?
                    <ChildrenOpen header="Children Item List" row={row} col={col} callback={(value) => {
                        changeHandler(col.rowIndex, { ...row, children: value })
                    }} /> : null}
                {row.type.split('-')[1] !== 'item' ?
                    <Button tooltip='Add Children Item' tooltipOptions={{ position: 'bottom' }} className='p-button-sm p-button-info' icon="bi bi-plus" onClick={() => {
                        changeHandler(col.rowIndex, { ...row, children: [...row.children, newMenuInit(row.type)] })
                    }} /> : null}
                <Button tooltip='Current Item Delete' tooltipOptions={{ position: 'bottom' }} className='p-button-sm p-button-danger' icon="bi bi-trash" onClick={() => {
                    changeHandler(col.rowIndex)
                }} />
            </div>
        )
    }
    const iconTemplate = (row, col) => {
        return (
            <div className='btn-group'>
                <IconSelect buttonClass={"p-button-info"} icon={row.icon} tip="" callback={(icon) => {
                    changeHandler(col.rowIndex, { ...row, icon: icon })
                }} />
                <IconSelect buttonClass={"p-button-success"} icon={row.hoverIcon} tip="Hover" callback={(icon) => {
                    changeHandler(col.rowIndex, { ...row, hoverIcon: icon })
                }} />
                {type === 'main' ?
                    <IconSelect buttonClass={"p-button-help"} icon={row.focusIcon} tip="Focus " callback={(icon) => {
                        changeHandler(col.rowIndex, { ...row, focusIcon: icon })
                    }} /> : null}

            </div>
        )
    }
    const textInputTemplate = (row, col) => {
        return <InputText className='p-inputtext-sm' value={row[col.field]} placeholder={`${col.field} input text...`}
            onChange={(e) => {
                changeHandler(col.rowIndex, { ...row, [col.field]: e.target.value })
            }} />
    }
    const linkTemplate = (row, col) => {
        return <LinkSelectMB
            isModal={true}
            value={row.to}
            callback={(url) => {
                changeHandler(col.rowIndex, { ...row, to: url })
            }} />
    }
    return (
        <NavListTableWrapper>
            <DataTable loading={isLoading} value={navList} onRowReorder={onRowReorder} responsiveLayout="scroll" size='small'>
                <Column rowReorder rowReorderIcon='bi bi-arrows-move mx-1' style={{ width: '3em' }} />
                <Column field='label' body={textInputTemplate} bodyClassName="p-0" header="Label" />
                <Column field='hoverLabel' body={textInputTemplate} bodyClassName="p-0" header="Hover Label" />
                {type === 'main' ? <Column field='focusLabel' body={textInputTemplate} bodyClassName="p-0" header="Focus Label" /> : null}

                <Column body={linkTemplate} bodyClassName="p-0" header="Link" />
                <Column body={iconTemplate} bodyClassName="p-0" header="Icons" />
                <Column body={editorTemplate} bodyClassName="p-0" header="Editor" />
            </DataTable>

        </NavListTableWrapper>
    )
}


const OptionSettingTemplate = ({ isLoading, arr, navConfig, callback }) => {

    return (
        <NavListTableWrapper>
            <DataTable loading={isLoading} value={arr} responsiveLayout="scroll" size='small'>
                <Column field='label' bodyClassName="p-0" header="Label" />
                <Column body={(row, col) => {
                    switch (row.inputType) {
                        case 'bool':
                            return (
                                <SelectButton
                                    value={navConfig[row.key]}
                                    className='p-buttonset-sm'
                                    options={boolOptions}
                                    onChange={(e) => {
                                        if (e.value !== null) {
                                            callback({ ...navConfig, [row.key]: e.value })
                                        }
                                    }} />
                            )
                        case 'inputtext':
                            return (
                                <InputText
                                    value={navConfig[row.key]}
                                    className='p-inputtext-sm'
                                    onChange={(e) => {
                                        callback({ ...navConfig, [row.key]: e.target.value })
                                    }} />
                            )
                        case 'color':
                            return (
                                <ColorSelecter
                                    color={navConfig[row.key]}
                                    callback={(color) => {
                                        callback({ ...navConfig, [row.key]: color })
                                    }} />
                            )
                        case 'image':
                            return (
                                <FileUpload fileType='image'
                                    addId={row.key}
                                    callback={(res) => {
                                        console.log(res.data.result)
                                        callback({...navConfig,[row.key]:res.data.result.src})
                                    }} />
                            )
                        case 'fontsize':
                            return (
                                <Dropdown className='p-inputtext-sm' options={fontSizeOptions} value={navConfig[row.key]} onChange={(e) => {
                                    callback({ ...navConfig, [row.key]: e.value })
                                }} />
                            )
                        case 'fontfamily':
                            return (
                                <FontFamilyDropdwon value={navConfig[row.key]} callback={(value) => {
                                    callback({ ...navConfig, [row.key]: value })
                                }} />
                            )
                        case 'padding':
                            return (
                                <SelectButton
                                    value={navConfig[row.key]}
                                    className='p-buttonset-sm'
                                    options={bootstrapPaddingOptions}
                                    onChange={(e) => {
                                        if (e.value !== null) {
                                            callback({ ...navConfig, [row.key]: e.value })
                                        }
                                    }} />
                            )
                        case 'align':
                            return (
                                <SelectButton
                                    value={navConfig[row.key]}
                                    className='p-buttonset-sm'
                                    options={alignOptions}
                                    onChange={(e) => {
                                        if (e.value !== null) {
                                            callback({ ...navConfig, [row.key]: e.value })
                                        }
                                    }} />
                            )

                        case 'accountSelect':
                            return (
                                <SelectButton
                                    value={navConfig[row.key]}
                                    className='p-buttonset-sm'
                                    options={[{ label: 'navbar', value: 'navbar' }, { label: 'top', value: 'top' }, { label: 'not used', value: 'notUsed' }]}
                                    onChange={(e) => {
                                        if (e.value !== null) {
                                            callback({ ...navConfig, [row.key]: e.value })
                                        }
                                    }} />
                            )
                        default:
                            return null;
                    }
                }} bodyClassName="p-0" header="Label" />
            </DataTable>
        </NavListTableWrapper>
    )
}

