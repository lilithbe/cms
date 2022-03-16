import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { connect } from "react-redux";
import { ADMIN_MEMBER_LIST } from "../../../common";
import { postApi } from "../../../api";
import { Dropdown } from "primereact/dropdown";
import EditorSetupTemplate from './EditorSetupTemplate'
import { boardTypeOptions } from "../../../common/initList";
const BoardBasicTemplate = ({ setState, state, authData, groupData,boardData, writeType }) => {
 
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
  }, [authData.userToken]);

  const korea = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  const spacial = /[~!@#\#$%<>^&*]/g;
  const upercase = /[A-Z]/g;
  return (
    <div className='col-md-12 col-lg-8'>
      <h5 className="px-2">게시판 기본 설정</h5>
      <table className="table table-sm table-bordered">
        <thead>
          <tr className="text-center">
            <th width="15%">key</th>
            <th>value</th>
            <th width="50%">description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-center">게시판 이름</th>
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
              <small>게시판이름 작성 tip: 한글,영문으로 작성 ,띄어쓰기 불가합니다. </small>
            </td>
          </tr>
          {writeType !== "board-update" ? (
            <tr>
              <th className="text-center">게시판 코드</th>
              <td>
                <InputText
                  className="form-control form-control-sm"
                  value={state.value}
                  onChange={(e) => {
                    let value = e.target.value.replace(" ", "").replace(korea, "").replace(spacial, "").replace(upercase, "");
                    let boardCountCheck =  boardData.board_config.findIndex(f=>f.value===value)
                    const vcnt = value.length
                    if(boardCountCheck===0){
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
                  <small>게시판이름(영문) 작성 tip: 영문으로 작성 ,띄어쓰기 불가합니다. </small>
                  <br />
                  <small>게시판 URL : /group/{state.value}</small>
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
            <th className="text-center">게시판 타입</th>
            <td>
              <Dropdown  
               className="p-inputtext-sm"
              options={boardTypeOptions} 
              value={state.boardType} 
              optionLabel="label" 
              optionValue="value" 
              onChange={(e)=>{
                setState({
                  ...state,
                  boardType: e.value,
                });
              }} />
            </td>
            <td> 
            boardType
             자유 게시판,
                  비디오 게시판,
                  이미지 게시판,
                  판매 게시판,
                  질문답변 게시판,


            </td>
          </tr>

          <tr>
            <th className="text-center">관리자 설정</th>
            <td>
              {" "}
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
            <td>게시판의 관리자를 설정합니다. 미설정시 현재 이 게시판을 만드는 운영진이 관리자가 됩니다.</td>
          </tr>

          <tr>
            <th className="text-center">그룹 설정</th>
            <td>
              <Dropdown
               className="p-inputtext-sm"
                options={[{ label: "그룹을 선택하세요", id: "nongroup" }, ...groupData.group_config]}
                optionLabel="label"
                optionValue="id"
                value={state.groupId}
                onChange={(e) => {
                  if(e.value!=="nongroup"){
                    const group = groupData.group_config.filter((f) => f.id === e.value)[0];
                    setState({ ...state, groupId: group.id, groupData: group });
                  }else{
                    setState({ ...state, groupId: "nongroup" });
                  }
                  
                }}
              />
            </td>
            <td>그룹을 설정합니다. 미설정시 단독게시판이 됩니다.</td>
          </tr>
          {state.groupId!=='nongroup'?
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
            <td>이 기능을 활성화 할경우 그룹의 규칙을 우선 적용 합니다.<br/>
            만약 그룹의 규칙이 우선적용 되어있을경우 이 규칙들은 우선적용되지 않습니다.</td>
          </tr>:null}
        </tbody>
      </table>
      {!state.groupLaw? <EditorSetupTemplate state={state} setState={setState}/>:
      <div className="text-center m-auto ">그룹의 에디터 규칙을 적용합니다.</div>}
     
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    groupData: state.groupData,
    boardData: state.boardData,
    authData: state.authData,
    configData: state.configData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setBoard: (data) => dispatch(setBoard(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BoardBasicTemplate);
