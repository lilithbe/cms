import React from 'react'
import { connect } from 'react-redux';
import {Dropdown} from 'primereact/dropdown'
/**
* 게시판 생성 업데이트
 * 그룹 생성 업데이트
 * @param {*} param0 
 * @returns 
 */
const LevelSetupTemplate = ({setState,state, configData}) => {
    
  const _arr=[
    {label: '작성레벨', keyValue:"createGrade" ,inputType:'number'},
    {label: '업데이트레벨', keyValue:"updateGrade" ,inputType:'number'},
    {label: '글보기레벨', keyValue:"viewGrade" ,inputType:'number'},
    {label: '삭제레벨', keyValue:"deleteGrade" ,inputType:'number'},
    {label: '목록보기레벨', keyValue:"listGrade" ,inputType:'number'},

  {label: '댓글레벨', keyValue:"commentGrade" ,inputType:'number'},
  {label: '대댓글레벨', keyValue:"recommentGrade" ,inputType:'number'},   
  {label: '좋아요레벨', keyValue:"goodGrade" ,inputType:'number'},
  {label: '싫어요레벨', keyValue:"badGrade" ,inputType:'number'},
]

    return (
      <div className='col-md-12 col-lg-4'>
        <h5 className="px-2">이용 등급설정</h5>
        <table className="table table-sm table-bordered">
          <thead>
          <tr className="text-center">
            <th width="25%">key</th>
            <th>value</th>
            <th width="30%">description</th>
          </tr>
          </thead>
          <tbody>
          {_arr.map((item, i) => {
          return (
            <tr key={i}>
            <th className="text-center">{item.label}</th>
            <td>
            <Dropdown
           
               className="p-inputtext-sm w-100"
              value={state[item.keyValue]}
              onChange={(e) => {
                setState({...state,[item.keyValue]:e.value});
              }}
              options={configData.dc_gradeObject}
              optionLabel="label"
              optionValue="grade"
            />
            </td>
            <td></td>
          </tr>
          );
        })}
            
          </tbody>
        </table>
       
       
        
      </div>
    );
}
const mapStateToProps = (state) => {
    return {
      configData: state.configData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(LevelSetupTemplate);

