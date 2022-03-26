import { useState, useRef, useEffect } from 'react'
import { postApi } from '../../../../api'
import { ScrollPanel } from 'primereact/scrollpanel'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import DialogButtonSet from '../../../dialog/DialogButtonSet'

import MultifunctionalInput from '../../../formControl/MultifunctionalInput'
import { CATEGORY_CREATE, CATEGORY_DELETE, CHILDREN_CATEGORY_LIST } from '../../../../common'
import { Dialog } from 'primereact/dialog'
const CategoryList = ({ toast,mainCategory, setMainCategory, allCategory, setAllCategory }) => {
    const [isLoading, setIsLoading] = useState(false)


    const newSaveHandler = (object) => {
        postApi(setIsLoading, CATEGORY_CREATE, (res) => {
            if (res.data.status) {
                const isMain = object.parentId === 'main' ? true : false
                if (isMain) setMainCategory([...mainCategory, res.data.data])
                setAllCategory([...allCategory, res.data.data])
            }else{
                toast.current.show({severity: 'error', summary: 'Error Message', detail: res.data.error});
            }
        }, object)
    }
    const deleteHandler = (object) => {
        const isMain = object.parentId === 'main' ? true : false
        postApi(setIsLoading, CATEGORY_DELETE+'/'+object.id, (res) => {
            if (res.data.status) {
                if (isMain){
                    const result = mainCategory.filter(f=>f.id!==object.id)
                    setMainCategory(result)
                }
                const result = allCategory.filter(f=>f.id!==object.id)
              setAllCategory(result)
            }
        },object)
    }
    const saveHandler = () => {

    }

    return (
        <div>
            <div className='card bg-dark'>
                <div className='card-header p-1 d-flex justify-content-sm-start justify-content-md-between '>
                    <CategoryEditor
                        tableArray={categoryArray}
                        defaultValue={newCategoryInit}
                        buttonIcon={"bi bi-plus"}
                        buttonLabel={"Add New Category"}
                        buttonClass={"p-button-sm"}
                        callback={newSaveHandler}
                    />
                </div>
                <div className='card-body' >
                    <ScrollPanel style={{ height: "600px" }} >

                        <CategoryTable
                            value={mainCategory}
                            loading={isLoading}
                            onLoading={setIsLoading}
                            allCategory={allCategory}
                            newChildHandler={newSaveHandler}
                            deleteHandler={deleteHandler}
                        />


                    </ScrollPanel>

                </div>
                <div className='card-footer  p-1 d-flex justify-content-start'>
                    <Button className='p-button-sm' icon="bi bi-save" label="저장" onClick={saveHandler} />
                </div>
            </div>
        </div>
    )
}

export default CategoryList
const newCategoryInit = {
    label: 'New Category',
    parentId: 'main',
    isAdultOnry: false,
    parentLabel: '',
    path: '/'
}

const CategoryEditor = (props) => {
    const { defaultValue, tableArray, buttonIcon, buttonLabel, buttonClass, callback } = props
    const [categoryState, setCategoryState] = useState(defaultValue)
    const FooterTemplate = (setIsOpen) => {
        return (
            <div>
                <Button icon="bi bi-x-lg" className="p-button-sm p-button-danger" label="취소" onClick={() => { setIsOpen(false) }} />
                <Button icon="bi bi-save" className="p-button-sm" label="저장" onClick={() => { setCategoryState(defaultValue); setIsOpen(false); callback(categoryState) }} />
            </div>
        )
    }
    return (
        <DialogButtonSet icon={buttonIcon} buttonLabel={buttonLabel} className={buttonClass} header="New Category Create" footer={FooterTemplate}>
            <ScrollPanel style={{ width: "400px", height: "600px" }}>
                <DataTable value={tableArray} size="small">
                    <Column field='label' header="Label" />
                    <Column header="Editor" bodyClassName='p-0' body={(row, col) => {
                        if (!row.isChildren) {
                            return (<MultifunctionalInput
                                inputType={row.inputType}
                                value={categoryState[row.key]}
                                options={row.options}
                                optionValue={row.optionValue}
                                optionLabel={row.optionLabel}
                                callback={(value) => {
                                    setCategoryState({ ...categoryState, [row.key]: value })

                                }} />)
                        } else {
                            return null
                        }
                    }} />
                </DataTable>
            </ScrollPanel>
        </DialogButtonSet>
    )
}




const categoryArray = [
    { label: '카테고리명', key: 'label', inputType: 'inputText', description: '', valueType: 'string,한글,대문자,소문자,하이픈,언더바', options: [] },
    { label: '성인전용상품', key: 'isAdultOnry', inputType: 'bool', description: '', valueType: 'bool,', options: [] },
]


const ChildrenCategory = ({ row, col, isLoading, setIsLoading, allCategory, newChildHandler,deleteHandler }) => {
    const [childrenCategory, setChildrenCategory] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const newCategoryInit = {
        label: 'New Category',
        parentId: row.id,
        isAdultOnry: false,
        parentLabel: row.label,
        // path:`${row.path}/${row.label}`
        // path: `${row.path === '/' ? '' : `${row.path}/`}${row.label}`
        path: `${row.path === '/' ? `/${row.label}` : `${row.path}/${row.label}`}`
    }
    useEffect(() => {
        const _childs = allCategory.filter(f => f.parentId === row.id)
        setChildrenCategory(_childs)

        return () => {
            setChildrenCategory([])
        }
    }, [allCategory, row.id])

    return (
        <div>
            <Button className='p-button-sm p-button-danger' badge={childrenCategory.length} label="Child Category" onClick={() => { setIsOpen(true) }} />
            <CategoryEditor
                     tableArray={categoryArray}
                defaultValue={newCategoryInit}
                buttonIcon={"bi bi-plus"}
                buttonLabel={""}
                buttonClass={"p-button-sm"}
                callback={(value) => { newChildHandler(value) }}
            />

            <Dialog header={`${row.label} 카테고리`} visible={isOpen} onHide={() => setIsOpen(false)} style={{width:"1200px"}} dismissableMask>
                <CategoryTable
                    value={childrenCategory}
                    loading={isLoading}
                    onLoading={setIsLoading}
                    allCategory={allCategory}
                    newChildHandler={newChildHandler}
                    deleteHandler={deleteHandler}
                />
            </Dialog>

        </div>
    )
}
const CategoryTable = ({ value, loading, onLoading, allCategory, newChildHandler , deleteHandler }) => {
    return (
        <DataTable value={value} loading={loading} size="small" responsiveLayout="scroll">
              
            <Column field='label' header="Label" />
            <Column field='path' body={(row,col)=>{
                return <div>{row.path==='/'?'':row.path}/{row.label}</div>
            }} header="Path" />
          
            <Column bodyClassName='p-0'  header="성인전용유무" body={(row, col) => {
                return (
                    <div>{row.isAdultOnry ?'true':'false'}</div>
                )
            }} />
            <Column bodyClassName='p-0' header="Children" body={(row, col) => {
                return (
                    <ChildrenCategory newChildHandler={newChildHandler} allCategory={allCategory} setIsLoading={onLoading} isLoading={loading} row={row} col={col} deleteHandler={deleteHandler}/>
                )
            }} />
            <Column bodyClassName='p-0'  header="Delete" body={(row, col) => {
                return <Button className='p-button-sm p-button-danger' icon="bi bi-trash" onClick={()=>{
                    deleteHandler(row)
                }}/>
            }} />

        </DataTable>
    )
}