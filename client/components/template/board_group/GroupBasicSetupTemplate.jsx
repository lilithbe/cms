import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";

import { connect } from "react-redux";
import { ADMIN_MEMBER_LIST } from "../../../common";
import { postApi } from "../../../api";
import { Dropdown } from "primereact/dropdown";
import EditorSetupTemplate from './EditorSetupTemplate'
/**
 * 그룹 생성및 업데이트 기본생성 템플릿
 * @param {} param0 
 * @returns 
 */
const GroupBasicSetupTemplate = ({ setState, state, authData,groupData, writeType }) => {
  const [userList, setUserList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    postApi(
      setIsLoading,
      ADMIN_MEMBER_LIST,
      (res) => {
        if (res.data.status) {
          setUserList(res.data.list);
          setAdminList(res.data.list.filter((f) => f.isAdmin === true));
        }
      },
      {},
      authData.userToken
    );
    return()=>{
      setUserList([]);
      setAdminList([]);
    }
  }, [authData.userToken]);

  const korea = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  const spacial = /[~!@#\#$%<>^&*]/g;
  const upercase = /[A-Z]/g;

  return (
    <div className='col-md-12 col-lg-8'>
      <h5 className="px-2">그룹 기본 정보</h5>
      <table className="table table-sm table-bordered">
        <thead>
          <tr className="text-center">
            <th width="15%">key</th>
            <th>value</th>
            <th width="40%">description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-center">그룹 이름</th>
            <td>
              <InputText
                className="form-control form-control-sm"
                value={state.label}
                onChange={(e) => {
                  let value = e.target.value.replace(" ", "");
                  value = value.replace(spacial, "");
                  setState({ ...state, label: value });
                }}
              />
            </td>
            <td>
              <small>그룹이름 작성 tip: 한글,영문으로 작성 ,띄어쓰기 불가합니다. </small>
            </td>
          </tr>
          {writeType.split("-")[1] === "create" ? (
            <tr>
              <th className="text-center">게시판 코드</th>
              <td>
                <InputText
                  className="form-control form-control-sm"
                  value={state.value}
                  onChange={(e) => {
                    let value = e.target.value.replace(" ", "").replace(korea, "").replace(spacial, "").replace(upercase, "");
                    let countCheck =  groupData.group_config.findIndex(f=>f.value===value)
                    const vcnt = value.length
                    if(countCheck===0){
                      value = value.slice(0, vcnt -1);
                    }
                    setState({
                      ...state,
                      value: value,
                      listUrl: `/content/list/${value}`,
                      writeUrl: `/content/write/${value}`
                    });
                  }}
                />
              </td>
              <td>
                <div>
                  <small>그룹명(영문) 작성 tip: 영문으로 작성 ,띄어쓰기 불가합니다. </small>
                  <br />
                  <small>그룹 URL : /group/{state.value}</small>
                  <br />
                  <small>
                    게시판 URL : /content/list/{state.value}
                    /[게시판이름]
                  </small>
                </div>
              </td>
            </tr>
          ) : null}
          <tr>
            <th className="text-center">관리자 설정</th>
            <td>
              <Dropdown
                className="p-inputtext-sm"
                options={adminList}
                optionLabel="nickName"
                optionValue="userId"
                value={state.adminData.userId}
                onChange={(e) => {
                  const admin = adminList.filter((f) => f.userId === e.value)[0];
                  setState({ ...state, adminData: admin });
                }}
              />
            </td>
            <td>그룹의 관리자를 설정합니다. 미설정시 현재 이 그룹을 만드는 운영진이 관리자가 됩니다.</td>
          </tr>
          <tr>
            <th className="text-center">그룹규칙 설정</th>
            <td>
              <SelectButton
              className='p-buttonset-sm' 
                value={state.groupLaw ? true : false}
                options={[
                  { label: "on", value: true },
                  { label: "off", value: false }
                ]}
                onChange={(e) => setState({ ...state, groupLaw: e.value })}
                optionLabel="label"
                optionValue="value"
              />
            </td>
            <td>이 기능을 활성화 할경우 하위 게시판의 모든 규칙은 그룹의 규칙이 우선적용 됩니다.</td>
          </tr>
        </tbody>
      </table>
      <EditorSetupTemplate state={state} setState={setState}/>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    authData: state.authData,
    groupData:state.groupData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setBoard: (data) => dispatch(setBoard(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GroupBasicSetupTemplate);
