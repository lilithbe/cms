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

const SimpleBoardList = ({ data }) => {
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
  const cardHeaderClass=classNames(`card-header`)
  return (
    <div className='card' style={{
      backgroundColor:data.options.cardBgColor,
      color:data.options.cardFontColor,
    }}>
      <div className={cardHeaderClass} style={{
      backgroundColor:data.options.cardHeaderBgColor,
      color:data.options.cardHeaderFontColor,
    }}>{data.options.cardTitle}</div>
      <div className='card-body p-0' style={{
      backgroundColor:data.options.cardBodyBgColor,
      color:data.options.cardBodyFontColor,
    }}>
        <DataTable value={boardList} size="small" emptyMessage="This article does not exist." responsiveLayout="scroll">
          <Column field="subject" body={(row,col)=><div>{row.subject.substring(0, data.options.subjectLimitCount) }{row.subject.length>data.options.subjectLimitCount?'...':null}</div>} header="subject"></Column>
        </DataTable>
      </div>
    </div>
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