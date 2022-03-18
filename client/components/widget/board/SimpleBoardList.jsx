import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BoardListDropdown from '../../formControl/BoardListDropdown';
import { InputNumber } from 'primereact/inputnumber';
import { postApi } from '../../../api';
import { LIST } from '../../../common';
import ColorSelecter from '../../formControl/ColorSelecter';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import styled from 'styled-components';
import {useRouter} from 'next/router'
import JsonView from '../../admin/jsonView/JsonView';
const SimpleBoardListWrapper = styled.div`

.p-datatable-header{
  background-color:${props=>props.options.titleBgColor};
  color:${props=>props.options.titleFontColor};
}
.p-datatable-table{

}
td{

}
`

const SimpleBoardList = ({ data }) => {
  const router =useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [boardCount, setBoardCount] = useState(0);
  useEffect(() => {
    if (data.options.boardValue !== '') {
      postApi(
        setIsLoading,
        LIST,
        (res) => {
          if (res.data.status) {
            setBoardCount(res.data.boardCount);
            if (res.data.boardCount > 0) {
              setBoardList(res.data.list);
            }
          }
        },
        data.options
      );
    }

    return () => {
      setBoardList([]);
      setBoardCount(0);
    };
  }, [data.options]);
  const headerTemplate = <div className='d-flex justify-content-between'>
   <div className='pl-2'>{ data.options.title}</div>
   <div className='pr-2 cursor-pointer' onClick={()=>{
     router.push(`/content/list/${data.options.boardValue}`)//boardValue
   }}>moer +</div>
  </div>
// /content/view/freeboard/${row.id}
  return (
    <SimpleBoardListWrapper options={data.options}>
      <DataTable header={headerTemplate} className='border border-top-0' value={boardList} size="small" emptyMessage="This article does not exist." responsiveLayout="scroll">
        <Column field="subject" body={(row, col) => <div style={{cursor:'pointer'}} onClick={()=>{
           router.push(` /content/view/${data.options.boardValue}/${row.id}`)//boardValue
        }}>{row.subject.substring(0, data.options.subjectLimitCount)}{row.subject.length > data.options.subjectLimitCount ? '...' : null}</div>} header="subject"></Column>
      </DataTable>
     
    </SimpleBoardListWrapper>
  )
}
const mapStateToProps = (state) => {
  return {
    configData: state.configData,
    authData: state.authData,
    groupData: state.groupData,
    boardData: state.boardData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SimpleBoardList)

export const SimpleBoardListSetting = ({ widget, onChange, widgetObject }) => {
  return (
    <div className='card' style={{ minWidth: "800px" }}>
       <DataTable value={widgetObject.settingOptions} size="small" responsiveLayout="scroll">
        <Column field="label" header="label" />
        <Column bodyClassName='p-0' body={(row, key) => {
          switch (row.inputType) {
            case 'boardList':
              return (
                <BoardListDropdown value={widget.options[row.key]}
                  callback={(e) => {
                    onChange({
                      ...widget,
                      options: {
                        ...widget.options,
                        [row.key]: e.value
                      }
                    })
                  }} />
              )
            case 'inputNumber':
              return (
                <InputNumber
                  decrementButtonClassName="p-button-danger"
                  incrementButtonClassName="p-button-success"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  showButtons buttonLayout="horizontal" step={1}
                  className='p-inputtext-sm'
                  value={widget.options[row.key]}
                  min={row.min} max={row.max}
                  onChange={(e) => {
                    onChange({
                      ...widget,
                      options: {
                        ...widget.options,
                        [row.key]: e.value
                      }
                    })
                  }}
                />
              )
            case 'color':
              return (
                <ColorSelecter color={widget.options[row.key]}
                  callback={(color) => {
                    onChange({
                      ...widget,
                      options: {
                        ...widget.options,
                        [row.key]: color
                      }
                    })
                  }} />
              )

              case 'inputText':
                return (
                  <InputText
                    className='p-inputtext-sm'
                    value={widget.options[row.key]}
                    onChange={(e) => {
                      onChange({
                        ...widget,
                        options: {
                          ...widget.options,
                          [row.key]: e.target.value
                        }
                      })
                    }}
                  />
                )
            default:
              return (
                <div>

                </div>
              )
          }

        }} header="label" />
        <Column field="description" header="Description" />
      </DataTable>
    
    </div>
  )
}