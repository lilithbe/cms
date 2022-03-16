import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
const HorizontalLayout = ({children , label, id,labelClass,colSize,labelCenter ,className, contentClass}) => {
    const labelClasschange = classnames(`col-${colSize} col-form-label ${labelClass}`,{
      'text-center':labelCenter
    })
    const contentClassChange = classnames(contentClass,`col-${12-colSize}`,{

    })
  return (
    <div className={`row ${className}`}>
      <label htmlFor={id} className={labelClasschange}>
        {label}
      </label>
      <div className={contentClassChange}>
        {children}
      </div>
    </div>
  );
}

HorizontalLayout.propTypes = {
  label :PropTypes.string,
  id:PropTypes.string,
  labelClass:PropTypes.string,
  colSize:PropTypes.number,
  labelCenter:PropTypes.bool,
  className:PropTypes.string,
  contentClass:PropTypes.string,
}
HorizontalLayout.defaultProps = {
  label :"",
  id:"",
  labelClass:"",
  colSize:3,
  labelCenter:true,
  className:''
}
export default HorizontalLayout
