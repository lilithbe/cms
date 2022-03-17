import { Dropdown } from 'primereact/dropdown';
import React from 'react'
import { connect } from 'react-redux'
const BoardListDropdown = ({boardData, value, callback}) => {
  return (
    <Dropdown options={[{label:'selected board name...',value:''},...boardData.board_config]} value={value} onChange={callback}  />
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
  export default connect(mapStateToProps, mapDispatchToProps)(BoardListDropdown)