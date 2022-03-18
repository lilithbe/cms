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
import JsonView from "../jsonView/JsonView";

const SimpleCodeEditor = dynamic(() => import('../../codemirror/SimpleCodeEditor'))


const PageSetting = ({ authData, setPage,onHide,toast }) => {
    const router = useRouter()
  
    const [path, setPath] = useState('main')
    const [isLoading, setIsLoading] = useState(false)
    const [pageData, setPageData] = useState({
        path: '',
        children: [],
        widgetIds:[],
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
                toast.current.show({ severity: 'warn', summary: 'None Page Data', detail: res.data.message });
            }
        })
    }, [router.asPath, toast]);



    const [activeIndex, setActiveIndex] = useState(0)
    const [isSave, setIsSave] = useState(false)

    const childrenChangeHandler = (values) => {
        setPageData({
            ...pageData,
            children: values
        })
        setIsSave(false)
    }
    const saveHandler = () => {

        const _new = newWidget.filter(x => !deleteWidget.includes(x))
        const _delete = deleteWidget.filter(x => !newWidget.includes(x))
        postApi(setIsLoading, SET_PAGE_DATA + path, (res) => {
            if (res.data.status) {
                setIsSave(true)
                setDeleteWidget([])
                setNewWidget([])
                onHide()
                toast.current.show({ severity: 'success', summary: 'Save Success', detail: '페이지 데이터 저장 완료' });
                setPage(pageData)
            }
        }, {...pageData,deleteWidget:_delete,newWidget:_new}, authData.userToken)
    }
    const [deleteWidget, setDeleteWidget] = useState([])
    const [newWidget, setNewWidget] = useState([])
    const deleteWidgetHandler = (ids) => { setDeleteWidget([...deleteWidget,...ids]) }
    const addWidgetHandler=(id) => { setNewWidget([...newWidget,id]) }


    return (
        <div className="card p-0" style={{ width: "100%" }}>
            <div className="card-body p-0" >
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Page Object Setting">
                        <TableTemplate value={pageData.children} loading={isLoading} onChange={childrenChangeHandler} type="Section"addWidget={addWidgetHandler} widgetDelete={deleteWidgetHandler}/>
                    </TabPanel>
                    <TabPanel header="Page Style Setting">
                        <StyleTemplate value={pageData} onChange={setPageData} />
                    </TabPanel>
                </TabView>
            </div>

            <div className={`card-footer d-flex justify-content-${activeIndex === 0 ? 'between' : 'end'} p-0`} >
                <div className="btn-group">
                    {activeIndex === 0 ?
                        <Button label="section add" className="p-button-sm" onClick={() => {
                            setPageData({
                                ...pageData,
                                children: [...pageData.children, {
                                    type: 'section',
                                  
                                    className: '',
                                    styled: '',

                                    children: [],
                                    id: uuidv4(),


                                    isBackgroundImage:false,
                                    backgroundImage:'',
                                    backgroundPosition:'',
                                    backgroundColor:'#00000000',

                                }]
                            })
                        }} /> : null}


                
                         <JsonView json={pageData} title="Page Object Open"/>

                </div>
                <Button label="저장" className="p-button-sm" onClick={saveHandler} />
            </div>


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



const TableTemplate = ({ value, loading, onChange, type , widgetDelete , addWidget}) => {
    const onRowReorder = (e) => {
        onChange(e.value);
    }
    const childrenType = `${type === 'Section' ? 'Col' : type === 'Col' ? 'Widget' : ''}`

    return (
        <div className="card" style={{ minWidth: "800px" }}>
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
                    {type !== 'Widget' ? <Column
                        bodyClassName="p-0"
                        body={(row, col) => {
                            return <SettingDialog
                                type={type}
                                childrenType={childrenType.toLowerCase()}
                                row={row}
                                col={col}
                                value={value}
                                addWidget={addWidget}
                                onChange={onChange}>
                                <TableTemplate
                                    type={childrenType}
                                    value={row.children}
                                    loading={loading}
                                    widgetDelete={widgetDelete}
                                    addWidget={addWidget}
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
                                {childrenType!==''?
                                <Button icon="bi-plus" className="p-button-sm p-button-info" onClick={() => {
                                        const result = Array.from(value)
                                        const getId= uuidv4()
                                        result.splice(col.rowIndex, 1, {
                                            ...row,
                                            children: [...row.children, {
                                                type: childrenType.toLowerCase(),
                                                className: childrenType === 'Col'?'col-md-12 col-lg-12':childrenType.toLowerCase(),
                                                styled: '',
                                                children: [],
                                                id: getId,

                                                isBackgroundImage:false,
                                                backgroundImage:'',
                                                backgroundPosition:'',
                                                backgroundColor:'#00000000',
                                            }]
                                        })
                                        onChange(result)
                                        console.log(row.type)
                                        if(row.type==='col'){
                                            addWidget(getId)
                                        }
                                    }} />:null}

                                {type !== 'Widget' ?
                                    <StyleDialog
                                        type={type}
                                        value={row}
                                        onChange={(data) => {
                                            const result = Array.from(value)
                                            result.splice(col.rowIndex, 1, data)
                                            onChange(result)
                                           
                                        }}
                                    /> : null}


                                <Button icon="bi-trash" className="p-button-sm p-button-danger" onClick={() => {
                                    const result = Array.from(value)
                                    result.splice(col.rowIndex, 1)
                                    onChange(result)
                                    const newarr=[]
                                    if (row.type === 'widget') {
                                        widgetDelete([row.id])
                                    } else if (row.type === 'col') {
                                        for (let i = 0; i < row.children.length; i++) {
                                            newarr.push(row.children[i].id)
                                        }
                                        widgetDelete(newarr)
                                    } else if (row.type === 'section') {
                                        for (let i = 0; i < row.children.length; i++) {
                                            const Section = row.children[i]
                                            for (let j = 0; j < Section.children.length; j++) {
                                                newarr.push(Section.children[j].id)
                                            }
                                        }
                                        widgetDelete(newarr)
                                    } 
                                
                                }} />
                                   <JsonView json={row} title={``}/>
                            </div>
                        )
                    }} />
                </DataTable>
            </div>
        </div>
    )
}


const SettingDialog = ({ children, type, childrenType, row, col, value, onChange,addWidget }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <Button icon="bi-boxes" className="p-button-sm" onClick={() => { setIsOpen(true) }} />
            <Dialog dismissableMask header={`${type} Setting`} footer={() => {
                if (type !== "Widget") {
                    return (
                        <Button icon="bi-plus" className="p-button-sm p-button-info" onClick={() => {
                            const result = Array.from(value)
                            const uuid =  uuidv4()
                            result.splice(col.rowIndex, 1, {
                                ...row, children: [...row.children, {
                                    type: childrenType.toLowerCase(),
                                    className: childrenType === 'col'?'col-md-12 col-lg-12':childrenType.toLowerCase(),
                                    styled: '',
                                    children: [],
                                    id:uuid,

                                    isBackgroundImage:false,
                                    backgroundImage:'',
                                    backgroundPosition:'',
                                    backgroundColor:'#00000000',
                                }]
                            })
                            onChange(result)
                            if(childrenType==='widget'){
                                addWidget(uuid)
                            }
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

const StyleDialog = ({ children, type, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [codeState, setCodeState] = useState('')
    return (
        <>
            <Button tooltip={`${type} Style Changer`} tooltipOptions={{ position: 'bottom' }} icon="bi bi-braces" className="p-button-sm" onClick={() => { setIsOpen(true) }} />
            <Dialog dismissableMask header={`${type} Style Setting`} visible={isOpen} onHide={() => { setIsOpen(false) }} footer={<Button label="Close" className="p-button-sm" onClick={() => { setIsOpen(false) }} />}>
                <div className="card" style={{ minWidth: "700px" }}>
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
                                    className: e.target.value
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
            <div className="card" style={{ minWidth: "700px" }}>
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
                                className: e.target.value
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