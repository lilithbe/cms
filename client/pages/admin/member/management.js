import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { postApi } from "../../../api";
import { ADMIN_MEMBER_LIST, ADMIN_MEMBER_UPDATE_PASSWORD, ADMIN_MEMBER_UPDATE_DATAS, ADMIN_MEMBER_UPDATE_DATA } from "../../../common";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import HorizontalLayout from "../../../components/formControl/HorizontalLayout";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import Image from "next/image";
import moment from "moment";
import { InputNumber } from "primereact/inputnumber";
import AdminContainerTemplate from "../../../components/template/AdminContainerTemplate";
const Management = ({ authData, configData }) => {
  const [userList, setUserList] = useState([]);
  const [inTableData, setInTableData] = useState(userList);
  const [isLoading, setIsLoading] = useState(true);
  const gradeOption = configData.dc_gradeObject;
  const toast = useRef(null);

  useEffect(() => {
    postApi(
      setIsLoading,
      ADMIN_MEMBER_LIST,
      (res) => {
        setUserList(res.data.list);
        setInTableData(res.data.list);
      },
      null,
      authData.userToken
    );
    return ()=>{
      setUserList([]);
      setInTableData([]);
    }
  }, [authData.userToken]);
  const gradeTemplate = (row) => {
    return <div>{gradeOption.find((d) => d.grade === row.grade).label}</div>;
  };
  const imageTemplate = (row) => {
    return (
      <div className="">
        <Image className="rounded-circle" src={row.userImage} alt={row.nickName} width={20} height={20} />
      </div>
    );
  };
  const [checkData, setCheckData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nickName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    updatedAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [gradeSelectState, setGradeSelectState] = useState("all");
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="p-d-flex p-jc-between p-ai-center">
        <span className="">
          <Dropdown
            className="p-input-small"
            options={[{ label: "????????????", grade: "all" }, ...gradeOption]}
            optionLabel="label"
            optionValue="grade"
            value={gradeSelectState}
            onChange={(e) => {
              setGradeSelectState(e.value);
              if (e.value === "all") {
                setInTableData(userList);
              } else {
                setInTableData(userList.filter((d) => d.grade === e.value));
              }
            }}
          />
        </span>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
        </span>
      </div>
    );
  };
  const header = renderHeader();
  const createdTemplate = (row) => {
    return <div>{moment(row.createdAt).format("YYYY-MM-DD")}</div>;
  };
  const updatedTemplate = (row) => {
    const value = row.createdAt === row.updatedAt ? "????????????" : moment(row.updatedAt).format("YYYY-MM-DD");
    return <div>{value}</div>;
  };
  const [isUserViewOpen, setIsUserViewOpen] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [selectUser, setSelectUser] = useState({});

  const editorTemplate = (row) => {
    let rowData = row;
    const passwordChangeHandler = () => {
      postApi(
        setIsLoading,
        ADMIN_MEMBER_UPDATE_PASSWORD,
        (res) => {
          if (res.data.status) {
            setIsPassword(false);
            setPassword("");
            toast.current.show({ severity: "info", summary: "???????????? ??????", detail: "???????????? ????????? ?????????????????????.", life: 3000 });
          } else {
            setIsPassword(false);
            toast.current.show({ severity: "error", summary: "Error Message", detail: "Api Error...", life: 3000 });
          }
        },
        { no: row.no, password: password },
        authData.userToken
      );
    };
    const passwordfooter = () => {
      return (
        <div>
          <button className="btn btn-danger" onClick={passwordChangeHandler}>
            <i className="pi pi-check" />
            Password Change
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              setIsPassword(false);
            }}
          >
            <i className="pi pi-times" />
            ??????
          </button>
        </div>
      );
    };
    const footer = () => {
      return (
        <div>
          <button type="submit" className="btn btn-outline-warning" onClick={onSubmitHandler}>
            <i className="pi pi-check" />
            ????????????
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              setIsUserViewOpen(false);
            }}
          >
            <i className="pi pi-times" />
            ??????
          </button>
        </div>
      );
    };
    const onSubmitHandler = () => {
      postApi(
        setIsLoading,
        ADMIN_MEMBER_UPDATE_DATA,
        (res) => {
          if (res.data.status) {
            toast.current.show({ severity: "info", summary: "???????????? ??????", detail: "?????? ????????? ?????????????????????.", life: 3000 });
          } else {
            toast.current.show({ severity: "error", summary: "Error Message", detail: "Api Error...", life: 3000 });
          }
          setIsUserViewOpen(false);
        },
        selectUser,
        authData.userToken
      );
    };
        return (
        <React.Fragment>
            <div>
            <button
                className="btn btn-outline-primary"
                onClick={() => {
                setSelectUser(row);
                setIsUserViewOpen(true);
                }}
            >
                <i className="bi bi-pen" />
            </button>

            <form
                onSubmit={(e) => {
                onSubmitHandler(e);
                }}
            >
                <Dialog
                header="User Data"
                footer={footer}
                visible={isUserViewOpen}
                style={{ width: "50vw" }}
                modal
                onHide={() => {
                    setIsUserViewOpen(false);
                }}
                >
                <HorizontalLayout label="?????????">
                    <input
                    className="form-control"
                    value={selectUser.email}
                    onChange={(e) => {
                        setSelectUser({ ...selectUser, email: e.target.value });
                    }}
                    />
                    <small>???????????? ???????????? ???????????? ???????????????.</small>
                </HorizontalLayout>
                <HorizontalLayout label="????????????">
                    <button className="btn btn-danger" onClick={() => setIsPassword(true)}>
                    Password Change
                    </button>
                    <Dialog
                    header="Password Changer"
                    onHide={() => {
                        setIsPassword(false);
                    }}
                    visible={isPassword}
                    footer={passwordfooter}
                    >
                    <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div>
                        <small>??????????????? ????????? ??????????????? ???????????????.</small>
                    </div>
                    </Dialog>

                    <div>
                    <small>??????????????? ????????? ??????????????? ???????????????.</small>
                    </div>
                </HorizontalLayout>
                <HorizontalLayout label="??????">
                    <HorizontalLayout label="?????????">
                    <input
                        className="form-control"
                        value={selectUser.nickName}
                        onChange={(e) => {
                        setSelectUser({ ...selectUser, nickName: e.target.value });
                        }}
                    />
                    </HorizontalLayout>
                    <HorizontalLayout label="???">
                    <input
                        className="form-control"
                        value={selectUser.firstName}
                        onChange={(e) => {
                        setSelectUser({ ...selectUser, firstName: e.target.value, fullName: selectUser.lastName + " " + e.target.value });
                        }}
                    />
                    </HorizontalLayout>
                    <HorizontalLayout label="??????">
                    <input
                        className="form-control"
                        value={selectUser.lastName}
                        onChange={(e) => {
                        setSelectUser({ ...selectUser, lastName: e.target.value, fullName: e.target.value + " " + selectUser.firstName });
                        }}
                    />
                    </HorizontalLayout>
                    <HorizontalLayout label="????????? ??????">
                    <Dropdown
                        options={[
                        { label: "?????????", value: "nickName" },
                        { label: "?????????", value: "email" },
                        { label: "???", value: "firstName" },
                        { label: "??????", value: "lastName" },
                        { label: "?????????", value: "fullName" }
                        ]}
                        value={selectUser.useName}
                        optionValue="value"
                        optionLabel="label"
                        onChange={(e) => {
                        setSelectUser({ ...selectUser, useName: e.value });
                        }}
                    />
                    </HorizontalLayout>

                    <small>?????????, ????????? ?????? ??????????????? ???????????????.</small>
                </HorizontalLayout>
                <HorizontalLayout label="????????????">
                    <Checkbox
                    onChange={(e) => {
                        setSelectUser({ ...selectUser, isLock: e.checked });
                    }}
                    checked={selectUser.isLock}
                    ></Checkbox>
                    <div>
                    {" "}
                    <small>??????????????? ????????? ??????????????????. ????????? ???????????? ???????????? ??????????????? ???????????????.</small>
                    </div>
                </HorizontalLayout>
                </Dialog>
            </form>
            </div>
        </React.Fragment>
        );
  };
  const [allGradeState, setAllGradeState] = useState(0);
  const [allLevelState, setAllLevelState] = useState(0);
  const [allIsLock, setAllIsLock] = useState(false);
  const checkMemberChageTemplate = () => {
    //checkData, setCheckData
    const allChangeHandler = (value, type) => {
      const result = Array.from(checkData);
      setCheckData(
        result.map((c) => {
          c[type] = value;
          return c;
        })
      );
    };

    const onSubmitArrayHandler = () => {
      postApi(
        setIsLoading,
        ADMIN_MEMBER_UPDATE_DATAS,
        (res) => {
          if (res.data.status) {
            toast.current.show({ severity: "info", summary: "???????????? ??????", detail: "?????? ????????? ?????????????????????.", life: 3000 });
            setCheckData([]);
          } else {
            toast.current.show({ severity: "error", summary: "Error Message", detail: "Api Error...", life: 3000 });
          }
        },
        checkData,
        authData.userToken
      );
    };

    return (
      <div className="card">
        <div className="card-header"> {checkData.length} ??? ??????</div>
        <div className="card-body">
          <HorizontalLayout label="????????????">
            <Dropdown
              value={allGradeState}
              options={gradeOption}
              optionLabel="label"
              optionValue="grade"
              onChange={(e) => {
                setAllGradeState(e.value);
                allChangeHandler(e.value, "grade");
              }}
            />
          </HorizontalLayout>
          <HorizontalLayout label="????????????">
            <InputNumber
              className=""
              value={allLevelState}
              onChange={(e) => {
                setAllLevelState(e.value);
                allChangeHandler(e.value, "level");
              }}
            />
          </HorizontalLayout>
          <HorizontalLayout label="????????????">
            <Dropdown
              value={allIsLock}
              options={[
                { label: "??????", value: false },
                { label: "????????????", value: true }
              ]}
              optionLabel="label"
              optionValue="value"
              onChange={(e) => {
                setAllIsLock(e.value);
                allChangeHandler(e.value, "isLock");
              }}
            />
          </HorizontalLayout>
          <button className="btn btn-outline-primary w-100" onClick={onSubmitArrayHandler}>
            ??????
          </button>
        </div>
      </div>
    );
  };

  return (
    <AdminContainerTemplate
    className="admin-tmplate" 
     toast={toast} adminKey="isAdmin" isLoading={isLoading} icon="bi bi-person-rolodex" title="????????????">
    <DataTable
      tableClassName="admin-table table table-hover table-dark m-0 table-lg"
        header={header}
        size="small"
        selectionMode="checkbox"
        selection={checkData}
        onSelectionChange={(e) => {
          setCheckData(e.value);
        }}
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={["nickName", "email", "updatedAt", "createdAt"]}
        value={inTableData}
        responsiveLayout="scroll"
        loading={isLoading}
        rows={10}
        dataKey="no"
        rowHover
        paginator
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        emptyMessage="No user lists found."
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3em" }}></Column>
        <Column field="no" header="no"></Column>
        <Column body={imageTemplate} header="?????????"></Column>
        <Column body={gradeTemplate} header="??????"></Column>
        <Column field="level" header="??????"></Column>
        <Column field="nickName" header="??????"></Column>
        <Column field="email" header="?????????"></Column>
        <Column body={updatedTemplate} header="??????????????????"></Column>
        <Column body={createdTemplate} header="?????????"></Column>
        <Column body={editorTemplate} headerStyle={{ width: "4rem", textAlign: "center" }} bodyStyle={{ textAlign: "center", overflow: "visible" }}></Column>
      </DataTable>
    {checkData.length > 0 ? checkMemberChageTemplate() : null}
    </AdminContainerTemplate>
  );
};

const mapStateToProps = (state) => {
  return {
    authData: state.authData,
    configData: state.configData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Management);
