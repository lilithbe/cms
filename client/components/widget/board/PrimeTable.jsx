import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import Link from "next/link";
import { LIST } from "../../../common";
import { postApi } from "../../../api";
// import {howMushTime} from '../../../lib'
import moment from 'moment' 
import {useRouter} from 'next/router'
const PrimeTable = ({ boardValue, authData }) => {
  const router = useRouter()
  const [boardList, setBoardList] = useState([]);
  const [boardCount, setBoardCount] = useState(0);
  useEffect(() => {
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
      { boardValue: boardValue, offset: 0, }
    );
    return () => {
      setBoardList([]);
      setBoardCount(0);
    };
  }, [boardValue]);

  const [selectedPosts, setSelectedPosts] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    "country.name": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const writerTemplate = (row) => {
    console.log(row);
    return <div>{row.writeData[row.writeData.useName]}</div>;
  };
  const subjectTemplate = (row) => {
    return <div className="w-100" onClick={()=>{router.push(`/content/view/${boardValue}/${row.id}`)}}>{row.subject}</div>;
  };
  const createTemplate = (row) => {
    return <div>{howMushTime(row.updatedAt)}</div>;
  };

  const howMushTime = (time) => {
    const inTime = moment(time);
    var now = moment();
    const base = moment.duration(now.diff(inTime)); //
    const asSeconds = base.asSeconds();
    const asMinutes = base.asMinutes();
    const asHours = base.asHours();
    const asDays = base.asDays();
    if (asSeconds < 60) return "?????????";
    else if (asMinutes < 60) return Math.floor(asMinutes) + "??????";
    else if (asHours < 24) return Math.floor(asHours) + "?????????";
    else if (asDays < 7) return Math.floor(asDays) + "??????";
    else if (asDays < 30) return Math.floor(asDays / 7) + "??????";
    else if (asDays < 365) return Math.floor(asDays * 30) + "??????";
    else return Math.floor(asDays * 365) + "??????";
  };

  return (
    <div>
      <DataTable
      size="small"
        value={boardList}
        paginator
        tableClassName="table talbe-hover"
        // header={header}
        rows={10}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"

        rowsPerPageOptions={[10,15,30,50,100]}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedPosts}
        onSelectionChange={(e) => setSelectedPosts(e.value)}
        filters={filters}
        filterDisplay="menu"
        loading={isLoading}
        responsiveLayout="scroll"
        globalFilterFields={["name", "country.name", "representative.name", "balance", "status"]}
        emptyMessage="No customers found."
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        {!authData.isAdmin ? <Column selectionMode="multiple" headerStyle={{ width: "3em" }}></Column> : null}
        <Column headerClassName="d-none d-lg-table-cell" bodyClassName="d-none d-lg-table-cell" field="no" header="No" headerStyle={{ width: "3rem" }} />
        <Column header="??????" body={subjectTemplate} />
        <Column
          headerClassName="d-none d-lg-table-cell"
          bodyClassName="d-none d-lg-table-cell"
          header="?????????"
          body={writerTemplate}
          headerStyle={{ width: "10rem" }}
        />
        <Column
          headerClassName="d-none d-lg-table-cell"
          bodyClassName="d-none d-lg-table-cell"
          header="??????"
          body={createTemplate}
          headerStyle={{ width: "10rem" }}
        />
      </DataTable>
    </div>
  );
};

PrimeTable.propTypes = {};
const mapStateToProps = (state) => {
  return {
    socketData: state.socketData,
    configData: state.configData,
    authData: state.authData,
    groupData: state.groupData,
    boardData: state.boardData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(PrimeTable);
