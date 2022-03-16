import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { setGroup, setBoard } from "../../../redux/index";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { postApi } from "../../../api";
import { ADMIN_CONTENT_GROUP_UPDATE, ADMIN_MEMBER_ADMIN_LIST, ADMIN_BULK_UPDATE, ADMIN_CONTENT_GROUP_CREATE ,ADMIN_CONTENT_BOARD_UPDATE } from "../../../common";
import { Button } from "primereact/button";
import AdminContainerTemplate from "../../../components/template/AdminContainerTemplate";

import { SelectButton } from "primereact/selectbutton";
import HorizontalLayout from "../../../components/formControl/HorizontalLayout";
import { boardTypeOptions } from "../../../common/initList";
const dxlnone="d-none d-xxl-table-cell"
const AdminGroupPage = ({ configData, groupData, authData, setGroup,boardData, setBoard }) => {
  const router = useRouter();
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [groupList, setGroupList] = useState(groupData.group_config);
  const [selectRow, setSelectRow] = useState([]);
  const [editingRows, setEditingRows] = useState({});
  const [adminList, setAdminList] = useState([]);
  const [isCopyOpen, setIsCopyOpen] = useState(false);
  const [copyValue, setCopyValue] = useState({ label: "", value: "" });
  const [expandedRows, setExpandedRows] = useState(null);
  useEffect(() => {
    postApi(
      setIsLoading,
      ADMIN_MEMBER_ADMIN_LIST,
      (res) => {
        if (res.data.status) {
          setAdminList(res.data.list);
        }
      },
      {},
      authData.userToken
    );
    return()=>{
      setAdminList([])
    }
  }, [authData.userToken]);

  const onRowEditChange = (e) => {
    setEditingRows(e.data);
  };

  const nofoundListTemplate = () => {
    return (
      <div className="text-center m-5">
        <div className="m-5">게시판이 없습니다.</div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin/group/create");
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
    return (
      <InputText className="p-inputtext-sm" inputStyle={{ width: "50px" }} value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
    );
  };

  const adminChanger = (options) => {
    return (
      <Dropdown
        style={{ width: "90px" }}
        options={adminList}
        className="p-inputtext-sm"
        optionLabel="nickName"
        optionValue="userId"
        value={options.value}
        onChange={(e) => options.editorCallback(e.value)}
      />
    );
  };

  const onRowEditComplete = (e) => {
    let { newData } = e;
    postApi(
      setIsLoading,
      ADMIN_CONTENT_GROUP_UPDATE,
      (res) => {
        if (res.data.status) {
          setGroupList(res.data.data);
          setBoard(res.data.data);
          setSelectRow([]);
          toast.current.show({ severity: "success", summary: "Success Message", detail: "Save submitted", life: 2000 });
        } else {
          toast.current.show({ severity: "error", summary: "Error Message", detail: "Error submitted", life: 2000 });
        }
      },
      newData,
      authData.userToken
    );
  };
 
  const buttonTamplate = (row) => {
    return (
      <div className="btn-group">
        <button
          className="btn btn-info btn-sm"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/admin/group/update/${row.id}`);
          }}
        >
          디테일수정
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => {
            e.preventDefault();
            setCopyValue({ ...row, label: "", value: "", id: null, no: null });
            setIsCopyOpen(!isCopyOpen);
          }}
        >
          그룹옵션 복사생성
        </button>
       
      </div>
    );
  };

  const gradeTemplate = (row, col) => {
    return <div>{configData.dc_gradeObject.filter((f) => f.grade === row[col.field])[0].label}</div>;
  };

  const adminTemplate = (row) => {
    return <div>{row.adminData[row.adminData.useName]}</div>;
  };

  const groupLawTemplate = (row) => {
    return row.groupLaw ? (
      <div className="bg-primary text-center">
        <i className="bi bi-check"></i>
      </div>
    ) : (
      <div className="bg-danger text-center">
        <i className="bi bi-x-lg" />
      </div>
    );
  };

  const groupLawChanger = (row) => {
    return (
      <SelectButton
        className="p-inputtext-sm"
        value={row.value}
        options={[
          { label: "사용", value: true },
          { label: "미사용", value: false }
        ]}
        onChange={(e) => options.editorCallback(e.value)}
      />
    );
  };
  
  const bulkUpdateHandler = (e) => {
    e.preventDefault();
    postApi(
      setIsLoading,
      ADMIN_BULK_UPDATE,
      (res) => {
        if (res.data.status) {
          setBoard(res.data.data);
          setGroupList(res.data.data);
          toast.current.show({ severity: "success", summary: "Success Message", detail: "저장되었습니다.", life: 2000 });
        } else {
          toast.current.show({ severity: "error", summary: "Error Message", detail: "저장에 실패하였습니다. ", life: 2000 });
        }
      },
      { arrayData: selectRow, tableValue: "config_group" },
      authData.userToken
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
      .catch((err) => {});
  };

  const renderHeader = () => {
    return (
      <div className="p-d-flex p-jc-between p-ai-center">
        <HeaderMenu
          saveHandler={bulkUpdateHandler}
          adminList={adminList}
          selectRow={selectRow}
          gradeOption={configData.dc_gradeObject}
          token={authData.userToken}
          bulkUpdate={bulkUpdate}
        />
      </div>
    );
  };
  const korea = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  const spacial = /[~!@#\#$%<>^&*]/g;
  const upperCase = /[A-Z]/g;
  const copyFooter = (
    <div>
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => {
          const findIndex = groupData.group_config.findIndex((f) => f.value === copyValue.value);
          if (findIndex === -1) {
            postApi(
              setIsLoading,
              ADMIN_CONTENT_GROUP_CREATE,
              (res) => {
                toast.current.show({ severity: "success", summary: "Success Message", detail: "Save submitted", life: 2000 });
                setGroupList(res.data.data);
                setGroup(res.data.data);
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
        label="No"
        icon="pi pi-times"
        onClick={() => {
          setIsCopyOpen(!isCopyOpen);
        }}
      />
    </div>
  );

  const header = renderHeader();

  const rowExpansionTemplate = (data) => {
    return (
      <ChilerenTable data={data}
      toast={toast} setBoard={setBoard} groupData={groupData}
       childBoard={boardData.board_config.filter(f=>f.groupId===data.id)}authData={authData} configData={configData} adminList={adminList}/>
  );
  }

  const onRowExpand = (event) => {
  
// groupList, setGroupList
    let _expandedRows = {};
      // groupList.forEach(p => _expandedRows[`${p.id}`] = false);
      _expandedRows[`${event.data.id}`] =true
    
      setExpandedRows(_expandedRows);


    // toast.current.show({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
  }

  return (
    <AdminContainerTemplate 
    adminKey="groupJ" 
    className="admin-tmplate" 
    title="그룹 목록" 
    icon="bi bi-list-columns" 
    isLoading={isLoading} toast={toast}>
      <DataTable
        value={groupList}
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

        expandedRows={expandedRows} 
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate} 
        onRowExpand={onRowExpand}

        resizableColumns 
        columnResizeMode="fit" 
        showGridlines

        onRowReorder={(e)=>{setGroupList(e.value)}}

      >
         <Column rowReorder style={{width: '3em'}} />
        <Column selectionMode="multiple" headerStyle={{ width: "3em" }}></Column>
        <Column expander style={{ width: '3em' }} />
        <Column header="그룹이름" sortable field="label" editor={(options) => textChanger(options)} />
        <Column header="관리자" sortable field="adminData" body={adminTemplate} editor={(options) => adminChanger(options)} />
        <Column
          header="규칙"
          sortable
          field="groupLaw"
          headerStyle={{ width: "10%", minWidth: "10rem" }}
          body={groupLawTemplate}
          editor={(options) => groupLawChanger(options)}
        />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글쓰기" field="createGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글수정" field="updateGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글삭제" field="deleteGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="목록보기" field="listGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글보기" field="viewGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />

        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="댓글" field="commentGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="대댓글" field="recommentGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />

        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="좋아요" field="goodGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="싫어요" field="badGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column rowEditor headerStyle={{ width: "10%", minWidth: "8rem" }} bodyStyle={{ textAlign: "center" }}></Column>
        <Column body={buttonTamplate} />
      </DataTable>
      <Dialog header="그룹복사" visible={isCopyOpen} style={{ width: "50vw" }} footer={copyFooter} onHide={() => setIsCopyOpen(false)}>
        <HorizontalLayout label="그룹명" id="label">
          <InputText
            className="form-control form-control-sm"
            value={copyValue.label}
            onChange={(e) => {
              let value = e.target.value.replace(" ", "");
              value = value.replace(spacial, "");
              setCopyValue({ ...copyValue, label: value });
            }}
          />
          <div>
            <p>
              <small>그룹명 작성 tip: 한글,영문으로 작성 ,띄어쓰기 불가합니다. </small>
            </p>
          </div>
        </HorizontalLayout>
        <HorizontalLayout label="그룹명(영문)" id="value">
          <InputText
            className="form-control form-control-sm"
            value={copyValue.value}
            onChange={(e) => {
              let value = e.target.value.replace(" ", "").replace(korea, "").replace(spacial, "").replace(upperCase, "");
              setCopyValue({ ...copyValue, value: value });
            }}
          />
          <div>
            <small>그룹명(영문) 작성 tip: 영문으로 작성 ,띄어쓰기 불가합니다. </small>
            <br />
            <small>그룹 URL : /group/{copyValue.value}</small>
            <br />
            <small>
              게시판 URL : /content/list/{copyValue.value}
              /[게시판이름]
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
    boardData: state.boardData,
    authData: state.authData,
    groupData: state.groupData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setGroup: (data) => dispatch(setGroup(data)),
    setBoard: (data) => dispatch(setBoard(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminGroupPage);

const HeaderMenu = ({ selectRow, bulkUpdate, gradeOption, adminList, saveHandler }) => {
  const _grade = ["createGrade", "updateGrade", "listGrade", "viewGrade", "deleteGrade", "commentGrade", "recommentGrade", "goodGrade", "badGrade"];
  const _label = ["글쓰기", "글수정", "목록보기", "글보기", "글삭제", "댓글", "대댓글", "좋아요", "싫어요"];
  const [groupLaw, setGroupLaw] = useState(false);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>관리자</th>
            <th>규칙</th>
            {_label.map((item, i) => {
              return <th key={i} className="d-none d-xl-table-cell ">{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{selectRow.length === 0 ? null : <Button className="p-button-sm" label="일괄저장" onClick={saveHandler} />}</td>
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
              {" "}
              <SelectButton
                className="p-buttonset-sm"
                value={groupLaw}
                options={[
                  { label: "사용", value: true },
                  { label: "미사용", value: false }
                ]}
                onChange={(e) => {
                  setGroupLaw(e.value);
                  bulkUpdate(e.value, "groupLaw");
                }}
              />
            </td>

            {_grade.map((item, i) => {
              return (
                <td key={i} className="d-none d-xl-table-cell ">
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

const ChilerenTable = ({data , childBoard, configData, toast, setBoard, authData,adminList,groupData}) => {
  const [childrenData, setChildrenData] = useState(childBoard)
  const [editingRows, setEditingRows] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const gradeTemplate = (row, col) => {
    return <div>{configData.dc_gradeObject.filter((f) => f.grade === row[col.field])[0].label}</div>;
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
  const boardTypeChanger = (options) => {
    return (
      <Dropdown
        
        className="p-inputtext-sm"
        options={boardTypeOptions}
        optionLabel="label"
        optionValue="value"
        value={options.value}
        onChange={(e) => options.editorCallback(e.value)}
      />
    );
  };

  const onRowEditChange = (e) => {
    setEditingRows(e.data);
  };
  const textChanger = (options) => {
    return <InputText 
    className="p-inputtext-sm" 
    inputStyle={{width:"50px"}} 
    value={options.value} 
    onChange={(e) => options.editorCallback(e.target.value)} />;
  }
  const onRowEditComplete = (e) => {
    let { newData } = e;
    postApi(setIsLoading,ADMIN_CONTENT_BOARD_UPDATE,(res)=>{
      if(res.data.status){
        setChildrenData(res.data.data);
        setBoard(res.data.data)
        toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Save submitted',life:2000})
      }else{
        toast.current.show({severity: 'error', summary: 'Error Message', detail: 'Error submitted',life:2000})
      }
    
    },newData,authData.userToken)

  }
  const adminTemplate = (row) => { 
    return(
      <div>
      {row.adminData[row.adminData.useName]}
      </div>
    )
  }
  const adminChanger = (options) => {
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
  const groupLawTamplate = (row) => {
    return row.groupLaw ? (
      <div className="bg-primary text-center">
        <i className="bi bi-check"></i>
      </div>
    ) : (
      <div className="bg-danger text-center">
        <i className="bi bi-x-lg" />
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
  return(
    <DataTable
    tableClassName="admin-table table table-hover table-dark m-0 table-lg"
   value={childrenData}

   dataKey="id"
   editMode="row"
   editingRows={editingRows}
   onRowEditChange={onRowEditChange}
   onRowEditComplete={onRowEditComplete}


   resizableColumns 
   columnResizeMode="fit" 
   showGridlines
   responsiveLayout="scroll"
   >
     <Column header="게시판이름" sortable field='label' editor={(options) => textChanger(options)} />
    <Column field="boardType" header="타입" sortable editor={(options) => boardTypeChanger(options)}></Column>

    <Column header="관리자" sortable field='adminData' body={adminTemplate} editor={(options) => adminChanger(options)}/>
    <Column header="그룹규칙" sortable field='groupLaw' headerStyle={{ width: '10%', minWidth: '10rem' }}  body={groupLawTamplate} editor={(options) => groupLawChanger(options)}  />

    <Column header="글쓰기" field="createGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글수정" field="updateGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글삭제" field="deleteGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="목록보기" field="listGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="글보기" field="viewGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="댓글" field="commentGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="대댓글" field="recommentGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="좋아요" field="goodGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column bodyClassName={dxlnone} headerClassName={dxlnone} header="싫어요" field="badGrade" body={gradeTemplate} editor={(options) => gradeChanger(options)} />
        <Column rowEditor  headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
</DataTable>
  )
}
