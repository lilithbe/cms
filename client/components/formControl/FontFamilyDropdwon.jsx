import React from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'primereact/dropdown'
import PropTypes from 'prop-types'
const FontFamilyDropdwon = ({configData ,value,callback,className}) => {
    return (
        <Dropdown
        className={className}
         options={configData.dc_addFont}
         optionLabel="label"
            value={value}
            onChange={(e) => {
                callback( e.value)
            }} />
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(FontFamilyDropdwon)


FontFamilyDropdwon.propTypes = {
    className:PropTypes.string,
  }
  FontFamilyDropdwon.defaultProps = {
    className:'p-inputtext-sm'
  }
  