
import { useState } from 'react'
import { Slider } from 'primereact/slider';
import { Checkbox } from 'primereact/checkbox';

import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
import { ScrollPanel } from 'primereact/scrollpanel';
import FontFamilyDropdwon from '../../formControl/FontFamilyDropdwon';
import IconSelect from '../../formControl/IconSelect';
import ColorSelecter from '../../formControl/ColorSelecter';
import { Button } from 'primereact/button';
import JsonView from '../../admin/jsonView/JsonView';
import PropTypes  from 'prop-types'
import PageSelect from '../../formControl/PageSelect';
import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';
/**
 *  ${props=>{
    if(!props.options.isTransparent  && !props.options.isTransparent){
      return `background-color:transparent;`
    }else{
      return `background-color:${props.options.gradientTopColor};`
    }
  }}
 */
const CustomButtonWrapper=styled.button`
  ${(props) => {
      if (props.options.isGradient && props.options.isTransparent) {
         return 'background: linear-gradient(to bottom, '+props.options.gradientTopColor+' 5%, '+props.options.gradientBottomColor+' 100%);'
      }
    }
  }
  ${props=>{
    if(!props.options.isGradient  && !props.options.isTransparent){
      return `background-color:transparent;`
    }else{
      return `background-color:${props.options.gradientTopColor};`
    }
  }}

 
  border-radius: ${props=>props.options.borderRadius}px;
  border:${props=>props.options.borderSize}px solid ${props=>props.options.borderColor};
  text-decoration:none;
  padding:${props=>props.options.verticalSize}px ${props=>props.options.horizontalSize}px;
  font-size:${props=>props.options.fontSize}rem;
  font-family:${props=>props.options.fontFamily};
  color:${props=>props.options.fontColor};
  ${props=>props.options.isBold?'font-weight: bold;':null}
  ${props=>props.options.isItalic?'font-style: italic;':null}
  ${props=>{
    if(props.isBoxShadow){
      return `box-shadow: ${props.options.isInset?'inset':null}  ${props.options.boxShadowHorizontalPosition}px ${props.options.boxShadowVerticalPosition}px ${props.options.boxShadowBlurRadius}px ${props.options.boxShadowSpreadRadius}px ${props.options.boxShadowColor};`
    }
  }}
  
  ${props=>{
    if(props.isTextShadow){
      return `text-shadow:${props.options.textHorizontalPosition}px ${props.options.textVerticalPosition}px ${props.options.textBlurRadius}px ${props.options.textShadowColor};`
    }
  }}
  


  :hover{
    color:${props=>props.options.fontHoverColor};
    ${props=>props.options.isGradient?
      `background: linear-gradient(to bottom, ${props=>props.options.gradientBottomColor} 5%, ${props=>props.options.gradientTopColor} 100%);`
      :null}
      ${props=>{
        if(props.options.isTransparent){
          return `background-color:transparent;`
        }else{
          return `background-color:${props.options.gradientBottomColor};`
        }
      }}
    }

    :active{
      position:relative;
	    top:1px;
    }

`
const CustomButton = ({ options ,onClick ,isCallbackObject  }) => {
  return (
    <CustomButtonWrapper options={options}
     
     onClick={(e)=>{
      e.preventDefault()
      if(isCallbackObject){
        onClick(options)
      }else{
        onClick()
      }
    }} ><i className={options.firstIcon}/> <span className={options.firstIcon!=='' ||options.lastIcon!==''?'px-3':null} >{options.label}</span>   <i className={options.lastIcon}/></CustomButtonWrapper>
  )
}

export default CustomButton
CustomButton.propTypes ={
  isCallbackObject:PropTypes.bool
}
CustomButton.defaultProps   ={
  isCallbackObject:false
}

const ExampleButtonWrapper = styled.div` 
  background-color:#${props => props.bg};
  border:1px solid #999999; 
  height:${props => props.height};
  display: flex;
  align-items: center;
  .button-div{
    width:100%;
    text-align: center;
  }
`
export const CustomButtonSetting = ({isCallbackObject , callback, value}) => {
  const [buttonState, setButtonState] = useState(value)
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#999999')
  const [isLinkOpen, setIsLinkOpen] = useState(false)
  return (
    <div className='row'>
      <div className='col-3'>
        <div  className='card'>
          <div className='card-header py-1 fw-bold' style={{ fontSize: '13px', }}>
            Default Button List
          </div>
          <div   className='card-body p-0'>
    <ScrollPanel style={{height:'650px'}}>
      <div  className='row'>
      {colorsArray.map((item, i) => {
              return (
                <ExampleButtonWrapper bg={item.previewBgColor} height="70px" className='col-6' key={i}>
                  <div className='text-center w-100'>
                  <CustomButton options={{...buttonsDefault,...item}} isCallbackObject onClick={(obj)=>{
                      setButtonState(obj)
                  }} />
                  </div>
                </ExampleButtonWrapper>
              )
            })}
      </div>   
    </ScrollPanel>
        
          </div>
        </div>
      </div>
      <div className='col-4'>
        <div className='card'>
          <div className='card-header py-1 fw-bold' style={{ fontSize: '13px', }}>
            Preview
          </div>
          <div className='card-body'>
            <ExampleButtonWrapper bg={buttonState.previewBgColor} height="200px">
              <div className='button-div'>
                <CustomButton options={buttonState} onClick={()=>{}}/>
              </div>

            </ExampleButtonWrapper>
          </div>
          <div className='card-footer'>

            <div className='d-flex justify-content-between'>
              <ColorSelecter tooltip={"Preview background color"} tooltipOptions={{ position: "bottom" }} buttonClassName="p-1" color={buttonBackgroundColor} callback={(color) => { setButtonBackgroundColor(color) }} />
              {colorArray.map((item, i) => {
                if (buttonState[item.checkKey] || !item.checkKey) {
                  return (
                    <ColorSelecter key={i}
                      tooltip={item.tooltip}
                      tooltipOptions={{ position: "bottom" }}
                      buttonClassName="p-1"
                      color={buttonState[item.key]}
                      callback={(color) => { setButtonState({ ...buttonState, [item.key]: color }) }} />
                  )
                } else {
                  return (
                    <Button disabled className='p-button-sm py-0' icon="bi bi-x-lg"/>
                  )
                }
              })}
            </div>
            <div className="px-2 field-checkbox mb-0 mt-1">
                <Checkbox inputId={'transparent'} 
                checked={!buttonState.isTransparent}
                 onChange={e => {
                   if(!buttonState.isGradient){
                    setButtonState({ ...buttonState, 
                      isTransparent: !e.checked ,
                      isGradient:true
                      })
                   }else{
                    setButtonState({ ...buttonState, 
                      isTransparent: !e.checked ,
                      })
                   }
                 
                 
               } } />
                <label htmlFor={'transparent'} style={{ fontSize: "12px" }}>Transparent</label>
              </div>
              <div className="px-2 field-checkbox mb-0  mt-1">
                <Checkbox inputId={'gradient'} 
                checked={!buttonState.isGradient} 
                onChange={e => {
                  if(!buttonState.isTransparent){
                    setButtonState({ ...buttonState, 
                      isTransparent: true ,
                      isGradient: !e.checked
                      })
                   }else{
                    setButtonState({ ...buttonState, 
                      isGradient: !e.checked ,
                      })
                   }
                }
                 } />
                <label htmlFor={'gradient'} style={{ fontSize: "12px" }}>No Gradient</label>
              </div>


          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
            <JsonView json={buttonState} />
          </div>
        
        </div>
        {isCallbackObject ?
          <div className='card'>
            <div className='card-header'>

            </div>
            <div className='card-body'>
              <Button className='p-button-sm mr-1' icon="bi bi-link" label="Link selelct" onClick={() => { setIsLinkOpen(true) }} />
              <Dialog header="Link Setting" visible={isLinkOpen} onHide={() => { setIsLinkOpen(false) }}>
                <div className='card'>
                  <div className='card-header'>
                    페이지 링크
                  </div>
                  <div className='card-body'>
                    <PageSelect value={buttonState.url} onChange={(url) => {
                      setButtonState({
                        ...buttonState, url: url
                      })
                    }} />
                  </div>
                  <div className='card-footer'>
                  <Button className='p-button-sm mr-1' icon="bi bi-save" label="Link Save" onClick={() => { setIsLinkOpen(false) }} />
                  </div>
                </div>
              </Dialog>
             

              <Button label="Get Button Option" className='p-button-sm mr-1' onClick={() => {
                callback(buttonState)
              }} />
            </div>

          </div> : null}



      </div>
      <div className='col-5'>
        {buttonSettingArray.map((item, i) => {
          return (
            <div className='card' key={i}>
              <div className='card-header py-1 fw-bold' style={{ fontSize: '13px', }}>{item.label}</div>
              <div className='card-body p-2'>
                <div className='row'>
                  {item.children.map((cItem, ci) => {
                    if (!cItem.checkKey || buttonState[cItem.checkKey]) {
                      return (
                        <div key={ci} className="col-6 py-1">
                          {cItem.isLabel ? <label style={{ fontSize: "12px" }}>{cItem.label} {cItem.inputType === 'slider' ? ` : ${buttonState[cItem.key]}px` : null}</label> : null}

                          {cItem.inputType === 'slider' ?
                            <div className='pt-2 px-3'><Slider min={cItem.min} step={cItem.key==='fontSize'?0.1:1} max={cItem.max} value={buttonState[cItem.key]} onChange={(e) => { setButtonState({ ...buttonState, [cItem.key]: e.value }) }} /></div>
                            : cItem.inputType === 'checkBox' ?
                              <div className="px-2 field-checkbox mb-0">
                                <Checkbox inputId={cItem.key} checked={buttonState[cItem.key]} onChange={e => setButtonState({ ...buttonState, [cItem.key]: e.checked })} />
                                <label htmlFor={cItem.key} style={{ fontSize: "12px" }}>{cItem.label}</label>
                              </div>
                              : cItem.inputType === 'inputText' ?
                                <div className='pt-0 px-2'><InputText className='p-inputtext-sm' value={buttonState[cItem.key]} onChange={(e) => { setButtonState({ ...buttonState, [cItem.key]: e.target.value }) }} /></div>
                                : cItem.inputType === 'fontFamilyDropdown' ?
                                  <div className='pt-0 px-2'><FontFamilyDropdwon className='p-inputtext-sm w-100' value={buttonState[cItem.key]} callback={(value) => { setButtonState({ ...buttonState, [cItem.key]: value }) }} /></div>
                                  : cItem.inputType === 'icon' ?
                                    <div className='pt-0 px-2'><IconSelect tip={cItem.tip} icon={buttonState[cItem.key]} callback={(value) => { setButtonState({ ...buttonState, [cItem.key]: value }) }} /></div>
                                    : null}
                        </div>
                      )
                    } else {
                      return null
                    }
                  })}
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}
CustomButtonSetting.propTypes ={
  isCallbackObject:PropTypes.bool
}
CustomButtonSetting.defaultProps   ={
  isCallbackObject:false
}

const buttonSettingArray = [
  {
    label: 'Text',
    children: [
      { label: 'Label', isLabel: false, key: 'label', inputType: 'inputText', checkKey: null, min: 8, max: 28 },




      { label: 'Font Family', isLabel: false, key: 'fontFamily', inputType: 'fontFamilyDropdown', checkKey: null },
      { label: 'First Icon', tip: 'First', isLabel: true, key: 'firstIcon', inputType: 'icon', checkKey: null },
      { label: 'Last Icon', tip: 'Last', isLabel: true, key: 'lastIcon', inputType: 'icon', checkKey: null },
      { label: 'Bold', isLabel: false, key: 'isBold', inputType: 'checkBox', checkKey: null },
      { label: 'Italic', isLabel: false, key: 'isItalic', inputType: 'checkBox', checkKey: null },
      { label: 'Font Size', isLabel: true, key: 'fontSize', inputType: 'slider', checkKey: null, min: 0.1, max: 5 },
    ]
  },
  {
    label: 'Size',
    children: [
      { label: 'Vertical Size', isLabel: true, key: 'verticalSize', inputType: 'slider', checkKey: null, min: 0, max: 32 },
      { label: 'Horizontal Size', isLabel: true, key: 'horizontalSize', inputType: 'slider', checkKey: null, min: 0, max: 76 }
    ]
  },
  {
    label: 'Border',
    children: [
      { label: 'Border Radius', isLabel: true, key: 'borderRadius', inputType: 'slider', checkKey: null, min: 0, max: 42 },
      { label: 'Border Size', isLabel: true, key: 'borderSize', inputType: 'slider', checkKey: null, min: 0, max: 12 }
    ]
  },

  {
    label: 'Box Shadow',
    children: [
      { label: 'Box Shadow Used', isLabel: false, key: 'isBoxShadow', inputType: 'checkBox', checkKey: null },
      { label: 'Inset Used', isLabel: false, key: 'isInset', inputType: 'checkBox', checkKey: 'isBoxShadow' },
      { label: 'Vertical Position', isLabel: true, key: 'boxShadowVerticalPosition', inputType: 'slider', checkKey: 'isBoxShadow', min: -50, max: 50 },
      { label: 'Horizontal Position', isLabel: true, key: 'boxShadowHorizontalPosition', inputType: 'slider', checkKey: 'isBoxShadow', min: -50, max: 50 },
      { label: 'Blur Radius', isLabel: true, key: 'boxShadowBlurRadius', inputType: 'slider', checkKey: 'isBoxShadow', min: 0, max: 50 },
      { label: 'Spread Radius', isLabel: true, key: 'boxShadowSpreadRadius', inputType: 'slider', checkKey: 'isBoxShadow', min: -50, max: 50 },
    ]
  },
  {
    label: 'Text Shadow',
    children: [
      { label: 'text Shadow Used', isLabel: false, key: 'isTextShadow', inputType: 'checkBox', checkKey: null },
      { label: 'Vertical Position', isLabel: true, key: 'textVerticalPosition', inputType: 'slider', checkKey: 'isTextShadow', min: -50, max: 50 },
      { label: 'Horizontal Position', isLabel: true, key: 'textHorizontalPosition', inputType: 'slider', checkKey: 'isTextShadow', min: -50, max: 50 },
      { label: 'Blur Radius', isLabel: true, key: 'textBlurRadius', inputType: 'slider', checkKey: 'isTextShadow', min: 0, max: 50 },
    ]
  }
]

const colorArray = [
  { tooltip: 'Gradient Top Color', key: 'gradientTopColor', checkKey: 'isTransparent' },
  { tooltip: 'Gradient bottom Color', key: 'gradientBottomColor', checkKey: 'isGradient' },
  { tooltip: 'Font Color', key: 'fontColor', checkKey: null },
  { tooltip: 'Font Hover Color', key: 'fontHoverColor', checkKey: null },
  { tooltip: 'Border Color', key: 'borderColor', checkKey: null },
  { tooltip: 'Box Shadow Color', key: 'boxShadowColor', checkKey: 'isBoxShadow' },
  { tooltip: 'Text Shadow Color', key: 'textShadowColor', checkKey: 'isTextShadow' },
]

const buttonsDefault =  {
  label:'Button',
  url: '/',
  isBlank: false,

  firstIcon: '',
  lastIcon: '',
  fontSize: 0.8,
  fontFamily: 'Arial',
  isBold: true,
  isItalic: true,

  verticalSize: 7,
  horizontalSize: 31,

  borderRadius: 0,
  borderSize: 1,

  isBoxShadow: true,
  isInset: true,
  boxShadowVerticalPosition: 0,
  boxShadowHorizontalPosition: 0,
  boxShadowBlurRadius: 0,
  boxShadowSpreadRadius: 2,

  isTextShadow: true,
  textVerticalPosition: 1,
  textHorizontalPosition: 1,
  textBlurRadius: 1,


  isTransparent: true,
  isGradient: true,


}

const colorsArray = [
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#44c767',
    gradientBottomColor: '#5cbf2a',
    fontColor: '#ffffff',
    fontHoverColor:'#18ab29',
    borderColor: '#18ab29',
    boxShadowColor: '#3dc21b',
    textShadowColor: '#2f6627'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#7892c2',
    gradientBottomColor: '#476e9e',
    fontColor: '#ffffff',
    fontHoverColor:'#4e6096',
    borderColor: '#4e6096',
    boxShadowColor: '#9fb4f2',
    textShadowColor: '#283966'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#599bb3',
    gradientBottomColor: '#408c99',
    fontColor: '#ffffff',
    fontHoverColor:'#29668f',
    borderColor: '#29668f',
    boxShadowColor: '#276873',
    textShadowColor: '#3d768a'
  },
  { 
    previewBgColor: '#e8e7e2',
    gradientTopColor: '#768d87',
    gradientBottomColor: '#6c7c7c',
    fontColor: '#ffffff',
    fontHoverColor:'#566963',
    borderColor: '#566963',
    boxShadowColor: '#91b8b3',
    textShadowColor: '#2b665e'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#77b55a',
    gradientBottomColor: '#72b352',
    fontColor: '#ffffff',
    fontHoverColor:'#4b8f29',
    borderColor: '#4b8f29',
    boxShadowColor: '#3e7327',
    textShadowColor: '#5b8a3c'
  },
  { 
    previewBgColor: '#f2f2f2',
    gradientTopColor: '#e4685d',
    gradientBottomColor: '#eb675e',
    fontColor: '#ffffff',
    fontHoverColor:'#ffffff',
    borderColor: '#ffffff',
    boxShadowColor: '#e67a73',
    textShadowColor: '#b23e35'
  },
  { 
    previewBgColor: '#2a2218',
    gradientTopColor: '#a73f2d',
    gradientBottomColor: '#b34332',
    fontColor: '#ffffff',
    fontHoverColor:'#241d13',
    borderColor: '#241d13',
    boxShadowColor: '#b54b3a',
    textShadowColor: '#7a2a1d'
  },
  { 
    previewBgColor: '#1c1c1e',
    gradientTopColor: '#2dabf9',
    gradientBottomColor: '#0688fa',
    fontColor: '#ffffff',
    fontHoverColor:'#0b0e07',
    borderColor: '#0b0e07',
    boxShadowColor: '#29bbff',
    textShadowColor: '#263666'
  },
  { 
    previewBgColor: '#3f5c93',
    gradientTopColor: '#2e466e',
    gradientBottomColor: '#415989',
    fontColor: '#ffffff',
    fontHoverColor:'#1f2f47',
    borderColor: '#1f2f47',
    boxShadowColor: '#23395e',
    textShadowColor: '#263666'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#d0451b',
    gradientBottomColor: '#bc3315',
    fontColor: '#ffffff',
    fontHoverColor:'#942911',
    borderColor: '#942911',
    boxShadowColor: '#cf866c',
    textShadowColor: '#854629'
  },
  { 
    previewBgColor: '#2d2e29',
    gradientTopColor: '#eae0c2',
    gradientBottomColor: '#ccc2a6',
    fontColor: '#505739',
    borderColor: '#333029',
    boxShadowColor: '#1c1b18',
    textShadowColor: '#ffffff'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#7d5d3b',
    gradientBottomColor: '#634b30',
    fontColor: '#ffffff',
    fontHoverColor:'#54381e',
    borderColor: '#54381e',
    boxShadowColor: '#a6827e',
    textShadowColor: '#4d3534'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#007dc1',
    gradientBottomColor: '#0061a7',
    fontColor: '#ffffff',
    fontHoverColor:'#124d77',
    borderColor: '#124d77',
    boxShadowColor: '#54a3f7',
    textShadowColor: '#154682'
  },
  { 
    previewBgColor: '#e2e2e2',
    gradientTopColor: '#33bdef',
    gradientBottomColor: '#019ad2',
    fontColor: '#ffffff',
    fontHoverColor:'#057fd0',
    borderColor: '#057fd0',
    boxShadowColor: '#f0f7fa',
    textShadowColor: '#5b6178'
  },
  { 
    previewBgColor: '#e2e2e2',
    gradientTopColor: '#ffec64',
    gradientBottomColor: '#ffab23',
    fontColor: '#333333',
    borderColor: '#ffaa22',
    boxShadowColor: '#fff6af',
    textShadowColor: '#ffee66'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#74ad5a',
    gradientBottomColor: '#68a54b',
    fontColor: '#ffffff',
    fontHoverColor:'#3b6e22',
    borderColor: '#3b6e22',
    boxShadowColor: '#9acc85',
    textShadowColor: '#92b879'
  },
  { 
    previewBgColor: '#3b5898',
    gradientTopColor: '#637aad',
    gradientBottomColor: '#5972a7',
    fontColor: '#ffffff',
    fontHoverColor:'#314179',
    borderColor: '#314179',
    boxShadowColor: '#7a8eb9',
    textShadowColor: '#7a8eb9'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#ededed',
    gradientBottomColor: '#bab1ba',
    fontColor: '#3a8a9e',
    borderColor: '#d6bcd6',
    boxShadowColor: '#899599',
    textShadowColor: '#e1e2ed'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#c62d1f',
    gradientBottomColor: '#f24437',
    fontColor: '#ffffff',
    fontHoverColor:'#d02718',
    borderColor: '#d02718',
    boxShadowColor: '#8a2a21',
    textShadowColor: '#810e05'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#79bbff',
    gradientBottomColor: '#378de5',
    fontColor: '#ffffff',
    fontHoverColor:'#337bc4',
    borderColor: '#337bc4',
    boxShadowColor: '#1564ad',
    textShadowColor: '#528ecc'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#dbe6c4',
    gradientBottomColor: '#9ba892',
    fontColor: '#757d6f',
    borderColor: '#b2b8ad',
    boxShadowColor: '#f2fadc',
    textShadowColor: '#ced9bf'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#dfbdfa',
    gradientBottomColor: '#bc80ea',
    fontColor: '#ffffff',
    fontHoverColor:'#c584f3',
    borderColor: '#c584f3',
    boxShadowColor: '#efdcfb',
    textShadowColor: '#9752cc'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#bddbfa',
    gradientBottomColor: '#80b5ea',
    fontColor: '#ffffff',
    fontHoverColor:'#84bbf3',
    borderColor: '#84bbf3',
    boxShadowColor: '#dcecfb',
    textShadowColor: '#528ecc'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#ffffff',
    gradientBottomColor: '#f6f6f6',
    fontColor: '#666666',
    borderColor: '#dcdcdc',
    boxShadowColor: '#ffffff',
    textShadowColor: '#ffffff'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#fc8d83',
    gradientBottomColor: '#e4685d',
    fontColor: '#ffffff',
    fontHoverColor:'#d83526',
    borderColor: '#d83526',
    boxShadowColor: '#f7c5c0',
    textShadowColor: '#b23e35'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#63b8ee',
    gradientBottomColor: '#468ccf',
    fontColor: '#14396a',
    borderColor: '#3866a3',
    boxShadowColor: '#bee2f9',
    textShadowColor: '#7cacde'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#ffec64',
    gradientBottomColor: '#ffab23',
    fontColor: '#333333',
    borderColor: '#ffaa22',
    boxShadowColor: '#fff6af',
    textShadowColor: '#ffee66'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#89c403',
    gradientBottomColor: '#77a809',
    fontColor: '#ffffff',
    fontHoverColor:'#74b807',
    borderColor: '#74b807',
    boxShadowColor: '#a4e271',
    textShadowColor: '#528009'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#f9f9f9',
    gradientBottomColor: '#e9e9e9',
    fontColor: '#666666',
    borderColor: '#dcdcdc',
    boxShadowColor: '#ffffff',
    textShadowColor: '#ffffff'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#c123de',
    gradientBottomColor: '#a20dbd',
    fontColor: '#ffffff',
    fontHoverColor:'#a511c0',
    borderColor: '#a511c0',
    boxShadowColor: '#e184f3',
    textShadowColor: '#9b14b3'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#3d94f6',
    gradientBottomColor: '#1e62d0',
    fontColor: '#ffffff',
    fontHoverColor:'#337fed',
    borderColor: '#337fed',
    boxShadowColor: '#97c4fe',
    textShadowColor: '#1570cd'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#ff5bb0',
    gradientBottomColor: '#ef027d',
    fontColor: '#ffffff',
    fontHoverColor:'#ee1eb5',
    borderColor: '#ee1eb5',
    boxShadowColor: '#fbafe3',
    textShadowColor: '#c70067'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#f0c911',
    gradientBottomColor: '#f2ab1e',
    fontColor: '#c92200',
    borderColor: '#e65f44',
    boxShadowColor: '#f9eca0',
    textShadowColor: '#ded17c'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#f24537',
    gradientBottomColor: '#c62d1f',
    fontColor: '#ffffff',
    fontHoverColor:'#d02718',
    borderColor: '#d02718',
    boxShadowColor: '#f5978e',
    textShadowColor: '#810e05'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#b8e356',
    gradientBottomColor: '#a5cc52',
    fontColor: '#ffffff',
    fontHoverColor:'#83c41a',
    borderColor: '#83c41a',
    boxShadowColor: '#d9fbbe',
    textShadowColor: '#86ae47'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#ffc477',
    gradientBottomColor: '#fb9e25',
    fontColor: '#ffffff',
    fontHoverColor:'#eeb44f',
    borderColor: '#eeb44f',
    boxShadowColor: '#fce2c1',
    textShadowColor: '#cc9f52'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#ededed',
    gradientBottomColor: '#dfdfdf',
    fontColor: '#777777',
    borderColor: '#dcdcdc',
    boxShadowColor: '#ffffff',
    textShadowColor: '#ffffff'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#79bbff',
    gradientBottomColor: '#378de5',
    fontColor: '#ffffff',
    fontHoverColor:'#84bbf3',
    borderColor: '#84bbf3',
    boxShadowColor: '#bbdaf7',
    textShadowColor: '#528ecc'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#77d42a',
    gradientBottomColor: '#5cb811',
    fontColor: '#306108',
    borderColor: '#268a16',
    boxShadowColor: '#caefab',
    textShadowColor: '#aade7c'
  },
  { 
    previewBgColor: '#f5f5f5',
    gradientTopColor: '#fe1a00',
    gradientBottomColor: '#ce0100',
    fontColor: '#ffffff',
    fontHoverColor:'#d83526',
    borderColor: '#d83526',
    boxShadowColor: '#f29c93',
    textShadowColor: '#b23e35'
  },

]