import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useState } from 'react'

import PropTypes from 'prop-types';

import { ScrollPanel } from 'primereact/scrollpanel';


import dynamic from 'next/dynamic'
import { reactJsonViewArray } from '../../../common';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import styled from 'styled-components';

const JsonViewWrapper = styled.div`
padding:0;
  .react-json-view{
      padding:20px;
  }
`
const DataTableWrapper = styled.div`
.p-datatable-thead th{
    padding-top:2px;
    padding-bottom:2px;
}
  .p-column-title{
      width:100%;
      text-align:center;
  }
`
const ReactJson = dynamic(async () => import('react-json-view'),
    { ssr: false })
const JsonView = (props) => {
    const { json, title,
        collapseStringsAfter,
        onAdd,
        onEdit,
        onDelete,
        displayObjectSize,
        enableClipboard,
        theme,
        iconStyle,
        collapsed,
        indentWidth,
        displayDataTypes,
        callback
    } = props

    const [isViewOpen, setIsViewOpen] = useState(false)
    const [viewOption, setViewOption] = useState({
        src: json,
        onAdd: onAdd,
        onEdit: onEdit,
        onDelete: onDelete,

        collapseStringsAfter: collapseStringsAfter,
        displayObjectSize: displayObjectSize,
        displayDataTypes: displayDataTypes,
        enableClipboard: enableClipboard,
        theme: theme,
        iconStyle: iconStyle,
        collapsed: collapsed,
        indentWidth: indentWidth,
    })


    const isDev = process.env.NEXT_PUBLIC_TYPE==="development"?true:false

    return (isDev?
        <>
            <Button className='p-button-sm' label={title} icon={"bi bi-tree"} onClick={() => {
                setIsViewOpen(true)
            }} />
            <Dialog header={`${title}`} visible={isViewOpen} onHide={() => setIsViewOpen(false)} dismissableMask style={{ width: "1400px" }} blockScroll={true}>
                <div className='row'>
                    <JsonViewWrapper className='col-9'>
                        <ScrollPanel style={{ height: '600px' }}>
                            <ReactJson src={viewOption.src}
                                onAdd={viewOption.onAdd
                                    ? e => {
                                        console.log(e);
                                        setViewOption({ src: e.updated_src });
                                    }
                                    : false}
                                onEdit={
                                    viewOption.onEdit
                                        ? e => {
                                            console.log(e);
                                            setViewOption({ src: e.updated_src });
                                        }
                                        : false
                                }
                                onDelete={viewOption.onDelete
                                    ? e => {
                                        console.log(e);
                                        setViewOption({ src: e.updated_src });
                                    }
                                    : false}

                                collapseStringsAfter={viewOption.collapseStringsAfter}
                                displayObjectSize={viewOption.displayObjectSize}
                                displayDataTypes={viewOption.displayDataTypes}
                                enableClipboard={viewOption.enableClipboard}
                                theme={viewOption.theme}
                                iconStyle={viewOption.iconStyle}
                                collapsed={viewOption.collapsed}
                                indentWidth={viewOption.indentWidth}
                            />
                        </ScrollPanel>
                    </JsonViewWrapper>

                    <DataTableWrapper className='col-3'>
                        <DataTable tableClassName='border table table-hover' size='small' value={reactJsonViewArray}>
                            <Column field='label' header={"Label"} bodyStyle={{fontSize:'12px',fontWeight: "bold",textAlign:'center'}} headerStyle={{width:"60%"}}   />
                            <Column bodyClassName='p-0' body={(row, col) => {
                                return (
                                    <div>
                                        <Dropdown className='p-inputtext-sm w-100' value={viewOption[row.key]} optionLabel="label" options={row.options} onChange={(e) => {
                                            setViewOption({
                                                ...viewOption,
                                                [row.key]: e.value
                                            })
                                        }} />
                                    </div>
                                )
                            }} header="Editor" />
                        </DataTable>
                        {viewOption.onEdit ||viewOption.onDelete||viewOption.onAdd?
                        <Button label="Callback" className='p-button-sm'/>:null}
                    </DataTableWrapper>

                </div>
            </Dialog>

        </>:null


    )
}

export default JsonView

JsonView.propTypes = {
    title: PropTypes.string,

    onAdd: PropTypes.bool,
    onEdit: PropTypes.bool,
    onDelete: PropTypes.bool,
    collapseStringsAfter: PropTypes.bool,
    displayObjectSize: PropTypes.bool,
    displayDataTypes: PropTypes.bool,
    enableClipboard: PropTypes.bool,
    theme: PropTypes.string,
    iconStyle: PropTypes.string,
    collapsed: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
    ]),

    indentWidth: PropTypes.number,
    callback:PropTypes.func
}
JsonView.defaultProps = {
    title: 'Json Open',
    onAdd: false,
    onEdit: false,
    onDelete: false,
    collapseStringsAfter: false,
    displayObjectSize: true,
    displayDataTypes: true,
    enableClipboard: true,
    theme: 'brewer',
    iconStyle: 'circle',
    collapsed: true,
    indentWidth: 4,
    callback:()=>{}
}
