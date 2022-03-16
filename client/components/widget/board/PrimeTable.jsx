import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from "next/link";
import { LIST } from "../../../common";
import { postApi } from "../../../api";
// import {howMushTime} from '../../../lib'
import moment from 'moment'
const PrimeTable = ({ boardValue, authData }) => {
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
      { boardValue: boardValue, offset: 0, limit: 10 }
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
    return <Link href={`/content/view/${boardValue}/${row.id}`}>{row.subject}</Link>;
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
    if (asSeconds < 60) return "방금전";
    else if (asMinutes < 60) return Math.floor(asMinutes) + "분전";
    else if (asHours < 24) return Math.floor(asHours) + "시간전";
    else if (asDays < 7) return Math.floor(asDays) + "일전";
    else if (asDays < 30) return Math.floor(asDays / 7) + "주전";
    else if (asDays < 365) return Math.floor(asDays * 30) + "달전";
    else return Math.floor(asDays * 365) + "년전";
  };

  return (
    <div>
      <DataTable
        value={boardList}
        paginator
        className="p-datatable-customers"
        // header={header}
        rows={10}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50]}
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
        <Column header="제목" body={subjectTemplate} />
        <Column
          headerClassName="d-none d-lg-table-cell"
          bodyClassName="d-none d-lg-table-cell"
          header="글쓴이"
          body={writerTemplate}
          headerStyle={{ width: "10rem" }}
        />
        <Column
          headerClassName="d-none d-lg-table-cell"
          bodyClassName="d-none d-lg-table-cell"
          header="날짜"
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
