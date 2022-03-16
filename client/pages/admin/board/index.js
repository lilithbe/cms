import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { setBoard } from "../../../redux/index";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import HorizontalLayout from "../../../components/formControl/HorizontalLayout";
import { InputText } from "primereact/inputtext";
import { postApi } from "../../../api";
import { ADMIN_CONTENT_BOARD_UPDATE,  ADMIN_MEMBER_ADMIN_LIST, ADMIN_BULK_UPDATE, ADMIN_CONTENT_BOARD_CREATE } from "../../../common";

import AdminContainerTemplate from "../../../components/template/AdminContainerTemplate";

import { SelectButton } from 'primereact/selectbutton';
import { boardTypeOptions } from "../../../common/initList";
const dxlnone="d-xl-none d-xxl-table-cell"
const AdminBoardList = ({configData, boardData, groupData, authData, setBoard}) => {
  const router = useRouter();
  const toast = useRef(null)
  const [isLoading, setIsLoading] = useState(false);
  const [boardList, setBoardList] = useState(boardData.board_config)
  const [selectRow, setSelectRow] = useState([])
  const [editingRows, setEditingRows] = useState({});
  const [adminList, setAdminList] = useState([])
  const [isCopyOpen, setIsCopyOpen] = useState(false)
  const [copyValue, setCopyValue] = useState({label:'',value:'',})
  useEffect(() => {
    postApi(setIsLoading,ADMIN_MEMBER_ADMIN_LIST,(res)=>{
      if(res.data.status){
        setAdminList(res.data.list);
      }     
    },{},authData.userToken) 
  }, [authData.userToken])

  const onRowEditChange = (e) => {
    setEditingRows(e.data);
  };
  const groupLabelTemplate =(row)=>{
    const groupLabel =row.groupId==='nongroup'?'그룹이 없습니다':groupData.group_config.filter(f=>f.id===row.groupId)[0].label 
    return <div>{groupLabel}</div>
  }
  const nofoundListTemplate = () => {
    return (
      <div className="text-center m-5">
        <div className="m-5">게시판이 없습니다.</div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/board/create");
          }}
        >
          게시판 생성
        </button>
      </div>
    );
  };
  const gradeChanger = (options) => {
    return (
      <Dropdown
        style={{ width: "90px" }}
        className="p-inputtext-sm"
        options={configData.dc_gradeObject}
        optionLabel="label"
        optionValue="grade"
        value={options.value}
        onChange={(e) => options.editorCallback(e.value)}
      />
    );
  };
  const textChanger = (options) => {
    return <InputText 
    className="p-inputtext-sm" 
    inputStyle={{width:"50px"}} 
    value={options.value} 
    onChange={(e) => options.editorCallback(e.target.value)} />;
  }
  const adminChanger = (options) => {
    console.log(options)
    return (
      <Dropdown
        style={{ width: "90px" }}
        options={[{nickName:'관리자를 선택하세요.',userId:'none'},...adminList]}
        className="p-inputtext-sm"
        optionLabel="nickName"
        optionValue="userId"
        value={options.value}
        onChange={(e) => {
          if(e.value==='none'){
            options.editorCallback(authData)
          }else{
            const i=adminList.findIndex(f=>f.userId===e.value)
            options.editorCallback(adminList[i])
          }
        }}
      />
    );
  };
  const groupChanger = (options) => {
    return <Dropdown  
    options={[{label:'그룹을 선택하세요',id:'nongroup'},...groupData.group_config]}
    className="p-inputtext-sm" 
    optionLabel='label'
    optionValue='id'
    value={options.value} 
    onChange={(e) => options.editorCallback(e.value)} />;
  }
  const onRowEditComplete = (e) => {
    let { newData } = e;
    postApi(setIsLoading,ADMIN_CONTENT_BOARD_UPDATE,(res)=>{
      if(res.data.status){
        setBoardList(res.data.data);
        setBoard(res.data.data)
        toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Save submitted',life:2000})
      }else{
        toast.current.show({severity: 'error', summary: 'Error Message', detail: 'Error submitted',life:2000})
      }
    
    },newData,authData.userToken)

  }
  const buttonTamplate = (row) => {
    return (
    <div className="btn-group">
        <button
        className="btn btn-info btn-sm"
        onClick={(e) => {
          e.preventDefault();
          router.push(`/admin/board/update/${row.id}`);
        }}
      >
       <i className="bi bi-pen"/>
      </button>
      <button
        className="btn btn-danger btn-sm"
        onClick={(e) => {
          e.preventDefault();
          console.log(row)
          setCopyValue({...row,label:'',value:'',id:null,no:null})
          setIsCopyOpen(!isCopyOpen)
        }}
      >
          <i className="bi bi-subtract"/>
      </button>
    </div>
    );
  };
  const gradeTemplate = (row, col) => {
    return <div>{configData.dc_gradeObject.filter((f) => f.grade === row[col.field])[0].label}</div>;
  };
  const adminTemplate = (row) => { 
    return(
      <div>
      {row.adminData[row.adminData.useName]}
      </div>
    )
  }
  const groupLawTamplate = (row) => {
    return row.groupLaw ? (
      <div className="bg-primary text-center">
        <i className="bi bi-check"></i>
      </div>
    ) : (
      <div className="bg-danger text-center">
        <i className="bi bi-check" />
      </div>
    );
  };
  const groupLawChanger = (options) => {
    return (
      <SelectButton
        className="p-buttonset-sm"
        value={options.value}
        options={[
          { label: "사용", value: true },
          { label: "미사용", value: false }
        ]}
        onChange={(e) => {
          options.editorCallback(e.value);
        }}
      />
    );
  };
  const bulkUpdate = (value, key) => {
    const arr = [];
    const set = async () => {
      selectRow.forEach((item) => {
        item[key] = value;
        arr.push(item);
      });
    };
    set()
      .then(() => {
        setSelectRow(arr);
      })
      .catch((err) => {
      
      });
  };
  const bulkUpdateHandler = (e) => {
    e.preventDefault()
    postApi(setIsLoading,ADMIN_BULK_UPDATE,(res)=>{  
        if(res.data.status){
          setBoard(res.data.data)
          setBoardList(res.data.data)
          toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Save submitted',life:2000})
        }else{
          toast.current.show({severity: 'error', summary: 'Error Message', detail: 'Error submitted',life:2000})
        }
    },{arrayData:selectRow,tableValue:"config_board"},authData.userToken)
  }
  const renderHeader = () => {
    return (
        <div className="p-d-flex p-jc-between p-ai-center">
          <HeaderMenu 
          saveHandler={bulkUpdateHandler} 
          adminList={adminList} 
          selectRow={selectRow} 
          gradeOption={configData.dc_gradeObject} 
          token={authData.userToken} 
          bulkUpdate={bulkUpdate} />
        </div>
    )
  }
  const header = renderHeader();
  const korea = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  const spacial = /[~!@#\#$%<>^&*]/g;
  const upperCase = /[A-Z]/g;
  const copyFooter = (<div>
              <Button
                label="Save"
                icon="pi pi-check"
                onClick={() => {
                  const findIndex = boardData.board_config.findIndex((f) => f.value === copyValue.value);
                  if (findIndex === -1) {
                    postApi(
                      setIsLoading,
                      ADMIN_CONTENT_BOARD_CREATE,
                      (res) => {
                        toast.current.show({ severity: "success", summary: "Success Message", detail: "Save submitted", life: 2000 });
                        setBoardList(res.data.data);
                        setBoard(res.data.data);
                        setIsCopyOpen(!isCopyOpen);
                      },
                      copyValue,
                      authData.userToken
                    );
                  } else {
                    toast.current.show({ severity: "error", summary: "Error Message", detail: "영문 이름은 중복되면 안됩니다.", life: 2000 });
                  }
                }}
              />
              <Button
                label="Cansl"
                icon="pi pi-times"
                onClick={() => {
                  setIsCopyOpen(!isCopyOpen);
                }}
              />
                    </div>
                    );
                  
  const boardTypeChanger = (options) => {
    return(
      <Dropdown 
      className="p-inputtext-sm"
      options={boardTypeOptions} 
      value={options.value} 
      optionValue="value" 
      optionLabel="label" 
      onChange={(e)=>{
        options.editorCallback(e.value);
      }}/>
    )
  }
                
  const boardTemplate = (row) => {
  
    return(
      <div>{boardTypeOptions.filter((f) => f.value === row.boardType)[0].label}</div>
    )
  }
  
  return (
  <AdminContainerTemplate 
  adminKey="boardJ" 
  className="admin-tmplate" 
  title="게시판목록" 
  icon="bi bi-list-columns" 
  isLoading={isLoading} 
  toast={toast}>
    <DataTable 
      value={boardList}
      loading={isLoading}
      emptyMessage={nofoundListTemplate}
      className=" mb-5"
      tableStyle={{ zIndex: 9999 }}
      tableClassName="admin-table table table-hover table-dark m-0 table-lg"
      header={header}
      size="small"
      paginator
      responsiveLayout="scroll"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      rows={10}
      rowsPerPageOptions={[10, 20, 50]}
      selectionMode="checkbox"
      selection={selectRow}
      onSelectionChange={(e) => setSelectRow(e.value)}
      editMode="row"
      dataKey="id"
      editingRows={editingRows}
      onRowEditChange={onRowEditChange}
      onRowEditComplete={onRowEditComplete}
      >
        <Column  selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
        <Column header="게시판이름" sortable field='label' editor={(options) => textChanger(options)} />
        <Column header="타입" sortable field='boardType' body={boardTemplate} editor={(options) => boardTypeChanger(options)}/>
        <Column header="관리자" sortable field='adminData' body={adminTemplate} editor={(options) => adminChanger(options)}/>
        <Column header="소속 그룹" sortable  field='groupId' body={groupLabelTemplate} editor={(options) => groupChanger(options)}/>
        <Column header="그룹규칙" sortable field='groupLaw' headerStyle={{ width: '10%', minWidth: '10rem' }}  body={groupLawTamplate} editor={(options) => groupLawChanger(options)}  />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글쓰기" field="createGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글수정" field="updateGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글삭제" field="deleteGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="목록보기" field="listGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글보기" field="viewGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="댓글" field="commentGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="대댓글" field="recommentGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="좋아요" field="goodGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="싫어요" field="badGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column rowEditor  headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        <Column body={buttonTamplate}  headerStyle={{ width: '10%', minWidth: '8rem' }}/>
    </DataTable>
    <Dialog header="게시판 복사" visible={isCopyOpen} style={{ width: '50vw' }} footer={copyFooter} onHide={() => setIsCopyOpen(false)}>
    <HorizontalLayout label="게시판이름" id="label">
                  <InputText
                    className="form-control form-control-sm"
                    value={copyValue.label}
                    onChange={(e) => {
                      let value = e.target.value.replace(" ", "");
                      value = value.replace(spacial, "");
                      setCopyValue({...copyValue,label:value});
                    }}
                  />
                  <div>
                    <p>
                      <small>
                        게시판이름 작성 tip: 한글,영문으로 작성 ,띄어쓰기
                        불가합니다.{" "}
                      </small>
                    </p>
                  </div>
                </HorizontalLayout>
<HorizontalLayout label="게시판이름(영문)" id="value">
                  <InputText
                    className="form-control form-control-sm"
                    value={copyValue.value}
                    onChange={(e) => {
                      let value = e.target.value.replace(" ", "").replace(korea, "").replace(spacial, "").replace(upperCase,"");
                       setCopyValue({...copyValue,
                        value:value});
                    }}
                  />
                  <div>
                    <small>
                      게시판이름(영문) 작성 tip: 영문으로 작성 ,띄어쓰기 불가합니다.{" "}
                    </small>
                    <br />
                    <small>
                      게시판 URL : /content/list/[그룹값]/{copyValue.value}
                     
                    </small>
                  </div>
                </HorizontalLayout>
           
      </Dialog>
  </AdminContainerTemplate>
  );
};
  const mapStateToProps = (state) => {
    return {
      configData: state.configData,
      boardData:state.boardData,
      authData: state.authData,
      groupData:state.groupData
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      setBoard: (data) => dispatch(setBoard(data)),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AdminBoardList);
  const HeaderMenu = ({ selectRow, bulkUpdate, gradeOption, adminList,saveHandler }) => {
    const _grade = ["createGrade", "updateGrade", "listGrade", "viewGrade", "deleteGrade", "commentGrade", "recommentGrade", "goodGrade", "badGrade"];
    const _label = ["글쓰기", "글수정", "목록보기", "글보기", "글삭제", "댓글", "대댓글", "좋아요", "싫어요"];
    const [groupLaw, setGroupLaw] = useState(false)
    const [defaultValues, setDefaultValues] = useState({
      boardType:"freeBoard",

    })
    return (
      <div>
        <table>
          <thead>
            <tr>
            <th></th>
              <th>관리자</th>
              <th>게시판타입</th>
              <th>규칙</th>
              {_label.map((item, i) => {
                return <th key={i}>{item}</th>;
              })}
             
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>{selectRow.length===0?null:<Button className="p-button-sm" label="일괄저장" onClick={saveHandler}/>}</td>
              <td>
                <DropdownWithButton
                  selectRow={selectRow}
                  options={adminList}
                  optionLabel="nickName"
                  optionValue="userId"
                  onChange={(v) => {
                    bulkUpdate(v, "userId");
                  }}
                />
              </td>
              <td>
                <Dropdown 
                className="p-inputtext-sm"
                options={boardTypeOptions} 
                optionLabel="label" 
                optionValue="value" 
                value={defaultValues.boardType}
                onChange={(e)=>{
                  setDefaultValues({...defaultValues,boardType:e.value})
                  bulkUpdate(e.value, "boardType");
                }}/>
              </td>
              <td> <SelectButton 
               className="p-buttonset-sm"
              value={groupLaw} 
              options={[
                {label: '사용', value: true},
          {label: '미사용', value: false}
        ]} onChange={(e) => {setGroupLaw(e.value)
               bulkUpdate(e.value, "groupLaw");
               }} /></td>
  
              {_grade.map((item, i) => {
                return (
                  <td key={i}>
                    <DropdownWithButton
                      selectRow={selectRow}
  
                      options={gradeOption}
                      optionValue="grade"
                      optionLabel="label"
                      onChange={(v) => {
                        bulkUpdate(v, item);
                      }}
                    />
                  </td>
                );
              })}
              
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  const DropdownWithButton = ({ options, onChange, optionValue, optionLabel }) => {
    const [state, setState] = useState(0);
    return (
      <Dropdown
      className="p-inputtext-sm"
        style={{ width: "120px" }}
        value={state}
        options={options}
        optionValue={optionValue}
        optionLabel={optionLabel}
        onChange={async (e) => {
          e.preventDefault();
          setState(e.value);
          onChange(e.value);
        }}
      />
    );
  };
  
