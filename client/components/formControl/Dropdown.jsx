import React from 'react'
import PropTypes from 'prop-types'

const DropdownTemplate = ({ value, callback, options,optionLabel,optionValue , placeholder}) => {
    return (
      <div className="btn-group w-100">
        <button className="btn btn-secondary btn-sm dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
        
          {options.filter(f=>f[optionValue]===value)[0][optionLabel]|| placeholder}
        </button>
        <ul className="dropdown-menu">
          {options.map((item, i) => {
            return (
              <li
                key={i}
                className="dropdown-item cursor-pointer"
                onClick={() => {
                  callback(item[optionValue]);
                }}
              >
                {item[optionLabel]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  DropdownTemplate.propTypes = {
    value:PropTypes.string,
     callback:PropTypes.func.isRequired,
      options:PropTypes.array.isRequired,
      optionLabel:PropTypes.string,
      optionValue:PropTypes.string,
      placeholder:PropTypes.string,
}
DropdownTemplate.defaultProps={
    value:'',
    optionLabel:'label',
    optionValue:'value',
    placeholder:'옵션을 선택하세요'
}
export default DropdownTemplate
