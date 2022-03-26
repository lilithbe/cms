import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import WriteBody from "../../../../components/widget/board/WriteBody";
const ContentWrite = () => {
  const router = useRouter();
  const { board } = router.query;
  const breadcrumb=<nav aria-label="breadcrumb" className=" p-2 border mb-1">
  <ol className="breadcrumb mb-0">
    <li className="breadcrumb-item">
      <Link href="/">
        <a>
          <i className="bi bi-house" /> Home
        </a>
      </Link>
    </li>
    <li className="breadcrumb-item">content</li>
    <li className="breadcrumb-item">write</li>
    <li className="breadcrumb-item active">{board}</li>
  </ol>
</nav>
  return (
    <div className="container">
     
      <div className="row">
        <div className="col-12 col-md-9">
          {breadcrumb}
          <WriteBody />
        {/* <WriteTemplate /> */}
        </div>
        <div className="col-12 col-md-3">
          side menu
        </div>
      </div>
     

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    configData: state.configData,
    authData: state.authData,
    groupData: state.groupData,
    boardData: state.boardData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
   
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentWrite);
