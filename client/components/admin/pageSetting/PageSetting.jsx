import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { setConfig, setPage } from '../../../redux'
import { useRouter } from 'next/router'
import { postApi } from "../../../api";
import { GET_PAGE_DATA, SET_PAGE_DATA } from "../../../common";
import { Toast } from 'primereact/toast'
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import { uuidv4 } from "../../../lib/random";
import { Dialog } from "primereact/dialog";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import dynamic from 'next/dynamic'

const SimpleCodeEditor = dynamic(() => import('../../codemirror/SimpleCodeEditor'))


const PageSetting = ({authData, setPage }) => {
    const router = useRouter()
    const toast = useRef(null)
    const [path, setPath] = useState('main')
    const [isLoading, setIsLoading] = useState(false)
    const [pageData, setPageData] = useState({
        path: '',
        children: [],
        className: '',
        styled: '',
        history: [],
    })
    useEffect(() => {
        const pathNames = router.asPath.split("/");
        let _page = ''
        if (pathNames[1] === "") {
            setPath('main')
            _page = 'main'
            setPageData({
                path: 'main'
                , children: [],
                className: '',
                styled: '',
                history: [],
            })
        } else {
            setPath(router.asPath.replace('/', '').replaceAll('/', '-'))
            _page = router.asPath.replace('/', '').replaceAll('/', '-')
            setPageData({
                path: router.asPath.replace('/', '')
                , children: [],
                className: '',
                styled: '',
                history: [],
            })
        }
        postApi(setIsLoading, GET_PAGE_DATA + _page, (res) => {
            if (res.data.status === true) {
                setPageData(res.data.data)
            } else {
                toast.current.show({ severity: 'info', summary: 'None Page Data', detail: res.data.message });
            }
        })
    }, [router.asPath]);

    useEffect(() => {
        console.log(pageData)
    }, [pageData])

    const [activeIndex, setActiveIndex] = useState(0)

    const childrenChangeHandler = (values) => {
        setPageData({
            ...pageData,
            children: values
        })
    }
    const saveHandler = () => { 
        postApi(setIsLoading ,SET_PAGE_DATA+path,(res)=>{
            if(res.data.status){
                toast.current.show({ severity: 'primary', summary: 'Save Success', detail: '페이지 데이터 저장 완료' });
                setPage(pageData)
            }
        },pageData,authData.userToken )
     }
    return (
        <div className="card p-0" style={{ width: "100%" }}>
            <div className="card-body p-0" >
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Page Object Setting">
                    <TableTemplate  value={pageData.children} loading={isLoading} onChange={childrenChangeHandler} type="Section"/>
                    </TabPanel>
                    <TabPanel header="Page Style Setting">
                       <StyleTemplate value={pageData} onChange={setPageData}/>
                    </TabPanel>
                </TabView>
            </div>

            <div className={`card-footer d-flex justify-content-${activeIndex === 0 ? 'between' : 'end'} p-0`} >
                {activeIndex === 0 ?
                    <Button label="section add" className="p-button-sm" onClick={() => {
                        setPageData({
                            ...pageData,
                            children: [...pageData.children, {
                                type: 'section',
                                className: '',
                                styled: '',
                                children: [],
                                id: uuidv4()
                            }]
                        })
                    }} /> : null}

                <Button label="저장" className="p-button-sm" onClick={saveHandler}/>
            </div>

            <Toast ref={toast} />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        configData: state.configData,
        authData: state.authData,
        boardData: state.boardData,
        groupData: state.groupData,
        socketData: state.socketData
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setConfig: (data) => dispatch(setConfig(data)),
        setPage: (data) => dispatch(setPage(data))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageSetting);



const TableTemplate = ({ value, loading, onChange , type }) => {
    const onRowReorder = (e) => {
        onChange(e.value);
    }
    const childrenType=`${type==='Section'?'Col':type==='Col'?'Widget':'Widget'}`

    return (
        <div className="card" style={{minWidth:"800px"}}>
            <div className="card-body p-0">
            <DataTable
            value={value}
            size="small"
            dataKey="id"
            rowHover
            loading={loading}
            responsiveLayout="scroll"
            emptyMessage={`No ${type} found.`}
            // reorderableColumns
            onRowReorder={onRowReorder}
        >
            <Column rowReorder rowReorderIcon="bi bi-arrows-move" style={{ width: '3em' }} />
            {type !== 'Widget' ?  <Column 
                    bodyClassName="p-0" 
                    body={(row, col) => {
                    return <SettingDialog
                        type={type}
                        childrenType={childrenType.toLowerCase()}
                        row={row}
                        col={col}
                        value={value}
                        onChange={onChange}>
                        <TableTemplate
                            type={childrenType}
                            value={row.children}
                            loading={loading}
                            onChange={(data) => {
                                const result = Array.from(value)
                                result.splice(col.rowIndex, 1, { ...row, children: data })
                                onChange(result);
                            }} />
                    </SettingDialog>
                }} /> : null}
       
            <Column field="type" header="Type" />

            <Column body={(row) => row.children.length} header="Children Count" />
            <Column bodyClassName="p-0" header="Editor" body={(row, col) => {
                return (
                    <div>
                        {childrenType!=='Widget'?
                        <Button icon="bi-plus" className="p-button-sm p-button-info" onClick={() => {
                            const result = Array.from(value)
                            result.splice(col.rowIndex, 1, {
                                ...row, 
                                children: [...row.children, {
                                    type: childrenType.toLowerCase(),
                                    className: childrenType.toLowerCase(),
                                    styled: '',
                                    children: [],
                                    id: uuidv4()
                                }]
                            })
                            onChange(result)
                        }} />:null}

                        {type !== 'Widget' ?
                            <StyleDialog 
                            type={type}
                            value={row} 
                            onChange={(data)=>{
                                const result = Array.from(value)
                                result.splice(col.rowIndex, 1, data)
                                onChange(result)
                           }}
                           /> : null}


                        <Button icon="bi-trash" className="p-button-sm p-button-danger" onClick={() => {
                            const result = Array.from(value)
                            result.splice(col.rowIndex, 1)
                            onChange(result)
                        }} />
                    </div>
                )
            }} />
        </DataTable>
            </div>
        </div>
    )
}


const SettingDialog = ({ children, type, childrenType, row, col, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <Button icon="bi-boxes" className="p-button-sm" onClick={() => { setIsOpen(true) }} />
            <Dialog dismissableMask header={`${type} Setting`} footer={() => {
                if (type !== "Widget") {
                    return (
                        <Button icon="bi-plus" className="p-button-sm p-button-info" onClick={() => {
                            const result = Array.from(value)
                            result.splice(col.rowIndex, 1, {
                                ...row, children: [...row.children, {
                                    type: childrenType.toLowerCase(),
                                    className: type.toLowerCase(),
                                    styled: '',
                                    children: [],
                                    id: uuidv4()
                                }]
                            })
                            onChange(result)
                        }} />
                    )
                } else {
                    return null
                }
            }} visible={isOpen} onHide={() => { setIsOpen(false) }}>
                {children}
            </Dialog>
        </div>
    )
}

const StyleDialog = ({ children, type , value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [codeState, setCodeState] = useState('')
    return (
        <>
            <Button tooltip={`${type} Style Changer`} tooltipOptions={{position:'bottom'}} icon="bi bi-braces" className="p-button-sm" onClick={() => { setIsOpen(true) }} />
            <Dialog dismissableMask header={`${type} Style Setting`} visible={isOpen} onHide={() => { setIsOpen(false) }} footer={<Button label="Close" className="p-button-sm" onClick={() => { setIsOpen(false) }}/>}>
            <div className="card" style={{minWidth:"700px"}}>
            <div className="card-header">
                    Class
                </div>
                <div className="card-body p-0">
                    <InputText
                        className="p-inputtext-sm w-100"
                        value={value.className}
                        onChange={(e) => {
                            onChange({
                                ...value,
                                className:e.target.value
                            })
                        }} 
                        autoFocus
                        />
                </div>
                <div className="card-header">
                Styled
                </div>
                <div className="card-body p-0">
              
                      <InputTextarea
                        className="w-100"
                        rows={10}
                        cols={30}
                        autoResize 
                        value={value.styled}
                        onChange={(e) => {
                            onChange({
                                ...value,
                                styled: e.target.value
                            })
                        }} />
                </div>
            </div>
            </Dialog>
        </>
    )
}

const StyleTemplate = ({ value, onChange }) => {
    return (
        <div>
            <div className="card" style={{minWidth:"700px"}}>
            <div className="card-header">
                    Class
                </div>
                <div className="card-body p-0">
                    <InputText
                        className="p-inputtext-sm w-100"
                        value={value.className}
                        onChange={(e) => {
                            onChange({
                                ...value,
                                className:e.target.value
                            })
                        }} 
                        autoFocus
                        />
                </div>
                <div className="card-header">
                Styled
                </div>
                <div className="card-body p-0">
                    <SimpleCodeEditor
                        value={value.styled}
                        onChange={(data) => {
                            onChange({
                                ...value,
                                styled: data
                            })
                        }} />
                </div>
            </div>
        </div>
    )
}