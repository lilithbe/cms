import React from 'react'
import PropTypes from 'prop-types';

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { SelectButton } from 'primereact/selectbutton';
import { Slider } from 'primereact/slider';

import ColorSelecter from './ColorSelecter';
import LinkSelectMB from './LinkSelectMB';
import IconSelect from './IconSelect';
import { boolOptions } from '../../common/initList';
import FileUpload from '../file/FileUpload';
import SingleFileUpload from '../file/SingleFileUpload';

const MultifunctionalInput = ({inputType, value, callback, className, options, min, max, stap, tooltip,containerName,fileType,optionsLabel,optionValue}) => {
    switch (inputType) {
        case 'inputText': return <InputText onClick={(e)=>{e.target.select()}} className="p-inputtext-sm" value={value} onChange={(e) => callback(e.target.value)} />
        case 'inputNumber': return <InputNumber onClick={(e)=>{e.target.select()}} className="p-inputtext-sm" value={value} min={min} max={max} stap={stap} onChange={(e) => callback(e)} />
        case 'dropdown': return <Dropdown className="p-inputtext-sm" value={value} onChange={(e) => callback(e.value)} options={options} optionsLabel={optionsLabel}optionValue={optionValue}  />
        case 'bool': return <SelectButton className="p-buttonset-sm" value={value} onChange={(e) => { if (e !== null) callback(e.value) }} options={boolOptions} />
        case 'color': return <ColorSelecter className={className} value={value} onChange={(e) => callback(e)} />
        case 'link': return <LinkSelectMB value={value} callback={(e) => callback(e)} />
        case 'icon': return <IconSelect tip={tooltip} icon={value} callback={(icon) => callback(icon)} />
        case 'slider': return <div style={{paddingTop:'5px',paddingBottom:'5px'}}><Slider className={className} value={value} min={min} max={max} stap={stap}  callback={(e) => callback(e.value)} /></div>
        case 'multipleFile': return <FileUpload className={className} fileType={fileType} containerName={containerName} value={value} min={min} max={max} stap={stap}  callback={(e) => callback(e.data.result)} />
        case 'singleFile': return <SingleFileUpload className={className} fileType={fileType} containerName={containerName} value={value} min={min} max={max} stap={stap}  callback={(e) => callback(e.data.result[0])} />
        default:
            return null;
    }
}

export default MultifunctionalInput


MultifunctionalInput.propTypes = {
    inputType:PropTypes.string,
    callback:PropTypes.func,
    className:PropTypes.string,
    options:PropTypes.array,
    min:PropTypes.number,
    max:PropTypes.number,
    stap:PropTypes.number,
    tooltip:PropTypes.string,
    containerName:PropTypes.string,
    fileType:PropTypes.string,
    optionsLabel:PropTypes.string,
    optionValue:PropTypes.string  
  }
  MultifunctionalInput.defaultProps = {
    inputType:'',
    value:'',
    callback:()=>console.log('not callback found'),
    className:'',
    options:[],
    min:0,
    max:10,
    stap:1,
    tooltip:'',
    containerName:'',
    fileType:'',
    optionsLabel:'label',
    optionValue:'value',
  };