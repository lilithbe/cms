import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import DropdownTemplate from "./Dropdown";
const InputLevel = ({ value, onClick, configData }) => {
 
  return (
    <DropdownTemplate value={value} callback={(v) => {
      onClick(v);
    }}
    options={configData.dc_gradeObject} optionLabel="label" optionValue="grade"
    />
  );
};
InputLevel.PropTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    configData: state.configData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InputLevel);
