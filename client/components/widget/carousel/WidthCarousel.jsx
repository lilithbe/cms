import { useEffect, useState, useRef, useMemo } from 'react'
import 'react-owl-carousel2/lib/styles.css';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

import PropTypes from 'prop-types'
import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
// import FileUpload from '../../file/FileUpload';
import HtmlParser from 'react-html-parser';
import { Dropdown } from 'primereact/dropdown';
import IconTemplate from '../../template/IconTemplate';
import PageSelect from '../../formControl/PageSelect';
import ColorSelecter from '../../formControl/ColorSelecter';
import { alignOptions } from '../../../common/initList';
import CustomButton, { CustomButtonSetting } from '../button/CustomButton';
import {useRouter } from 'next/router'
import { Slider } from 'primereact/slider';
import { Checkbox } from 'primereact/checkbox';
import FontFamilyDropdwon from '../../formControl/FontFamilyDropdwon';
import IconSelect from '../../formControl/IconSelect';

import anime from 'animejs'
const WriteEditor = dynamic(() => import("../../editor/WriteEditor"), { ssr: false });
const SingleFileUpload = dynamic(() => import("../../file/SingleFileUpload"), { ssr: false });

const OwlCarousel = dynamic(async () => {
    const { default: QL } = await import("react-owl-carousel2")
    return function comp({ forwardedRef, ...props }) {
        return <QL ref={forwardedRef} {...props} />
    }
}, { ssr: false });


const CarouselWrapper = styled.div`
    position: relative;
    height:auto;

    button:hover,
    button:focus{
        border:none;
        outline: none;
        box-shadow: none;
    }
    .owl-prev,
    .owl-next {
      position: absolute;
      ${(props)=>`background-color: ${props.co.buttonBgColor};`}
    
      width: 50px;
      height: 50px;
      font-size: 20px;
      text-align: center;
      line-height: 50px;
      top: 45%;
      left: 3%;
  
      -webkit-transition-duration: 500ms;
      -o-transition-duration: 500ms;
      transition-duration: 500ms;
     }
     .owl-prev i,
     .owl-next i {
        ${(props)=>`color: ${props.co.buttonFontColor};`}
     }

     .owl-prev:hover,
     .owl-prev:focus,
     .owl-next:hover,
     .owl-next:focus {
        ${(props)=>`background-color: ${props.co.buttonHoverBgColor};`}
     }
     .owl-prev:hover i,
     .owl-prev:focus i,
     .owl-next:hover i,
     .owl-next:focus i{
        ${(props)=>`color: ${props.co.buttonHoverFontColor};`}
     }

     @media only screen and (max-width: 767px) {
        .owl-prev,
        .owl-next {
          width: 30px;
          height: 30px;
          font-size: 13px;
          line-height: 30px;
          margin-top: -10px; 
       
        } 
        }
       .owl-next {
            left: auto;
            right: 3%; 
          }

`
const CarouselItemWrapper=styled.div`
          ${(props)=>{
              return `
              width:100%;
              height: ${props.height}px;
          
              background-image: url("${props.item.src}");  
            
              background-repeat:no-repeat;
              background-size:cover;
              background-position: ${props.item.backgroundPosition};
              @media (min-width: 1200) {
                background-position:  ${props.item.backgroundPosition};
              }
             
              `
          }}

         
         
`
const WidthCarousel = ({data, items }) => {
    const carousel = useRef(null)
    return (
        <CarouselWrapper co={data.options}>
         
            <OwlCarousel
                ref={carousel}
                className="owl-carousel width-carousel"
                options={{
                    ...data.options,
                    navText: [
                        '<button class="btn py-1"><i class="bi bi-chevron-left"></i></button>',
                        '<button class="btn py-1"><i class="bi bi-chevron-right"></i></button>'
                    ],
                    responsive: {
                        0: {
                            items: 1,
                        },
                        480: {
                            items: 1,
                        },
                        768: {
                            items: 1,
                        },
                        1200: {
                            items: 1,
                        }
                    }
                }}
            // events={events}
            >

                {data.data.map((item, i) => {
                    const fp=item.position.split('-')[0]
                    const lp=item.position.split('-')[1]
                    return (
                        <CarouselItemWrapper key={i} 
                        height={data.options.baseHeight}
                        item={item}
                        className={`p-sm-1 p-md-2 p-lg-5 d-flex align-items-${fp==='top'?'start':fp==='bottom'?'end':fp}`}
                       >

                           <WidthType_1 item={item} />
                        </CarouselItemWrapper>
                    )
                })}
            </OwlCarousel>
        </CarouselWrapper>


    )
}

WidthCarousel.propTypes = {
    items: PropTypes.array,
}
WidthCarousel.defaultProps = {
    items: [
        {
            label: 'Flamboyant Pink Top',
            src: '/assets/carousel/carousel_1.png',
        }
    ]
}

export default WidthCarousel

const WidthType_1 = ({item}) => {
    const router=useRouter()
    const fp=item.position.split('-')[0]
    const lp=item.position.split('-')[1]
    useEffect(() => {
        anime({
            targets: '.caption',
            translateX: function() {
                return anime.random(0, -70);
              },
            direction: 'alternate',
            loop: true,
            duration: 10000,
            easing: function(el, i, total) {
              return function(t) {
                return Math.pow(Math.sin(t * (i + 1)), total);
              }
            }

          });
      }, []);
  

    return (
        <div className='w-100'>
             {item.captions.map((caption, i) => {
                    return <CaptionTemplate key={i} caption={caption} className={`caption text-${lp === 'left' ? 'start' : lp === 'right' ? 'end' : lp} `} style={{width:"auto"}}/>
                })}
            <div className={`carousel-button-wrapper text-${lp}`}>
                 <CustomButton options={item.buttonObject} onClick={()=>{
                     router.push(item.buttonObject.url)
                 }} />
            </div>

        </div>
    )
}









export const WidthCarouselSetting = ({ widget, onChange }) => {
    const arr = [
        { label: 'base height', key: 'baseHeight', inputType: 'number', defaultValue: 800, description: '기본 높이' },


        { label: 'loop', key: 'loop', inputType: 'bool', defaultValue: true, description: '무한회전 여부 결정' },
        { label: 'nav', key: 'nav', inputType: 'bool', defaultValue: true, description: '이동 버튼 생성 여부' },
        { label: 'dots', key: 'dots', inputType: 'bool', defaultValue: false, description: '점선 버튼 생성여부' },
        { label: 'margin', key: 'margin', inputType: 'number', defaultValue: 0, description: '하단 여백 설정' },
        { label: 'autoplay', key: 'autoplay', inputType: 'bool', defaultValue: true, description: '자동회전 설정' },
        { label: 'autoplayTimeout', key: 'autoplayTimeout', inputType: 'number', defaultValue: 5000, description: '자동회전 시간설정 밀리초단위(ex:1000 = 1초)' },
        { label: 'Prev Next Button BgColor', key: 'buttonBgColor', inputType: 'color', defaultValue: "#999999", description: '버튼 배경색상' },
        { label: 'Prev Next Button HoverBgColor', key: 'buttonHoverBgColor', inputType: 'color', defaultValue: "#999999", description: '버튼:호버 배경색상' },
        { label: 'Prev Next Button FontColor', key: 'buttonFontColor', inputType: 'color', defaultValue: "#999999", description: '화살표 색상' },
        { label: 'Prev Next Button HoverFontColor', key: 'buttonHoverFontColor', inputType: 'color', defaultValue: "#999999", description: '화살표:호버 색상' },
    ]
    const newItem = {
        src: '/assets/carousel/carousel_1.png',
        backgroundPosition:'right',
        width: 400,
        height: 150,
        label: '',
        captions:[],
        position: 'center-center',
        buttonObject: {
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
         
            previewBgColor: '#f5f5f5',
            gradientTopColor: '#44c767',
            gradientBottomColor: '#5cbf2a',
            fontColor: '#ffffff',
            fontHoverColor:'#18ab29',
            borderColor: '#18ab29',
            boxShadowColor: '#3dc21b',
            textShadowColor: '#2f6627'
        },
    }
    return (
        <TabView>
            <TabPanel header="Option Setting">
                <table className='table table-sm border'>
                    <thead>
                        <tr>
                            <th>label</th>
                            <th>editor</th>
                            <th>description</th>
                            <th>defaultValue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <th>{item.label}</th>
                                    <td className='p-0'>
                                        {item.inputType === 'bool' ? <SelectButton
                                            value={widget.options[item.key]}
                                            options={[{ label: 'Used', value: true }, { label: 'Not used', value: false }]}
                                            className="p-buttonset-sm"
                                            onChange={(e) => {
                                                if (e.value !== null) {
                                                    onChange({ ...widget, options: { ...widget.options, [item.key]: e.value } })
                                                }
                                            }}
                                        /> :
                                            item.inputType === 'number' ? <InputNumber
                                                className="p-inputtext-sm"
                                                value={widget.options[item.key]}
                                                onChange={(e) => {
                                                    if (e.value !== null) {
                                                        onChange({ ...widget, options: { ...widget.options, [item.key]: e.value } })
                                                    }
                                                }}
                                            /> :item.inputType === 'color' ? <ColorSelecter
                                            color={widget.options[item.key]}
                                            callback={(color) => {
                                                onChange({ ...widget, options: { ...widget.options, [item.key]: color } })
                                            }}
                                        /> : ''}
                                          
                                    </td>
                                    <td>{item.description}</td>
                                    <td>{item.defaultValue === true ? 'Used' : item.defaultValue === false ? 'Not used' : widget.options[item.key]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </TabPanel>
            <TabPanel header="Items Setting">
                {widget.data.length===0?
                 <Button icon="bi bi-plus" label="Add Item" className='p-button-sm  py-1' onClick={() => {
                    onChange({ ...widget, data: [...widget.data, newItem] })
                }} />
            :null}
               

                {widget.data.map((item, i) => {
                    return (
                        <ItemSettingTemplate key={i}
                            item={item}
                            index={i}
                            lastIndex={widget.data.length}
                            deleteCallbak={(index) => {
                                const result = Array.from(widget.data)
                                result.splice(index, 1)
                                onChange({ ...widget, data: result })
                            }}
                            addCallbak={() => {
                                onChange({ ...widget, data: [...widget.data, newItem] })
                            }}
                            onChange={(object,index) => {
                                const result = Array.from(widget.data)
                                
                                result.splice(index, 1, object)
                                onChange({ ...widget, data: result })
                            }}
                        />
                    )
                })}
            </TabPanel>
        </TabView>
    )
}

const ItemSettingTemplate = ({ item, addCallbak, lastIndex, index, deleteCallbak, onChange }) => {
    const [isTextOpen, setIsTextOpen] = useState(false)
    const [isButtonOpen, setIsButtonOpen] = useState(false)
    const [isPositionOpen, setIsPositionOpen] = useState(false)
    const [isBgImagePosition, setIsBgImagePosition] = useState(false)
    return (
       <div className='card m-2' style={{width:"1800px"}}>
           <div className='card-header fw-bold'> No {index+1}. Image Setting</div>
           <div className='card-body '>
           <div className='row'>
            <div className='col-4'>
                <div className='card'>
                    <div className='card-body' style={{
                        background:`url("${item.src}")`,
                        backgroundSize:'cover',
                        width:"100%",
                        height:"300px"
                    }}>
                        {/* <Image src={item.src} width={item.width} height={item.height} alt={"회전목마 이미지"} /> */}
                    </div>
                </div>
            </div>
            <div className='col-3'>
                <div className='card'>
                    <div className='card-header fw-bold' style={{ fontSize: '13px' }}>
                        Image Upload
                    </div>
                    <div className='card-body p-0'>
                        <SingleFileUpload
                          
                            fileType={'image'}
                            callback={(res) => {
                                onChange({ ...item, ...res.data.result[0] }, index)
                            }} />
                    </div>
                    <div className='card-header fw-bold' style={{ fontSize: '13px' }}>
                        Image Position
                    </div>
                    <div className='card-body p-0'>
                    <DialogTemplate header="Background image Position Setting" icon="bi bi-image" buttonLabel={item.backgroundPosition} isOpen={isBgImagePosition} setIsOpen={setIsBgImagePosition}>
                            <PositionSelectTemplate value={item.backgroundPosition} onClick={(value)=>{

                                    onChange({ ...item, backgroundPosition:`${value.split('-')[0]} ${value.split('-')[1]}` },index)
                                    setIsBgImagePosition(false)
                            }}/>
                            </DialogTemplate>
                        {/* <SelectButton
                            className='p-buttonset-sm'
                            value={item.backgroundPosition}
                            options={alignOptions}
                            onChange={(e) => {
                                onChange({ ...item, backgroundPosition: e.value }, index)
                            }} /> */}
                    </div>

                    <div className='card-header fw-bold' style={{ fontSize: '13px' }}>
                    Image Height
                    </div>
                    <div className='card-body p-0'>
                        <InputNumber className='p-inputtext-sm w-100' value={item.height} onChange={(e) => {
                            onChange({ ...item, height: e.value }, index)
                        }} />
                    </div>
                </div>
            </div>
            <div className='col-3'>
                <div className='card'>
                    <div className='card-header fw-bold' style={{ fontSize: '13px' }}>
                        Text
                    </div>
                    <div className='card-body p-0'>
                    <DialogTemplate header="Label Changer" icon="bi bi-fonts" buttonLabel={"Open Text Editor"} isOpen={isTextOpen} setIsOpen={setIsTextOpen}>
                        <CarouselTextTemplate captions={item.captions} callback={(value)=>{
                            setIsTextOpen(false)
                             onChange({ ...item, captions:value },index)
                        }}>
                              <PositionSelectTemplate value={item.position} onClick={(value)=>{
                                    onChange({ ...item, position:value },index)
                                    setIsPositionOpen(false)
                            }}/>
                        </CarouselTextTemplate>
                                {/* <WriteEditor value={item.label} width="100%" buttonList={buttonList} onChange={(html,text)=>{
                                       
                                      onChange({ ...item, label:html },index)
                                }}/> */}
                            </DialogTemplate>
                    </div>
                </div>


                <div className='card'>
                <div className='card-header fw-bold' style={{ fontSize: '13px' }}>
                        Button Setting
                    </div>
                    <div className='card-body p-0'>
                    <DialogTemplate header={"Button Setting"} icon="bi bi-fonts" buttonLabel={"Open Button Select"} isOpen={isButtonOpen} setIsOpen={setIsButtonOpen}>
                                    <CustomButtonSetting isCallbackObject value={item.buttonObject} callback={(data) => {
                                        onChange({ ...item, buttonObject: data }, index)
                                        setIsButtonOpen(false)
                                    }} />
                       
                            </DialogTemplate>
                    </div>
                </div>

                <div className='card'>
                <div className='card-header fw-bold' style={{ fontSize: '13px' }}>
                    Text Position
                    </div>
                    <div className='card-body p-0'>
                    <DialogTemplate header="Text Position Setting" icon="bi bi-fonts" buttonLabel={"Open Position Editor"} isOpen={isPositionOpen} setIsOpen={setIsPositionOpen}>
                            <PositionSelectTemplate value={item.position} onClick={(value)=>{
                                    onChange({ ...item, position:value },index)
                                    setIsPositionOpen(false)
                            }}/>
                            </DialogTemplate>
                    </div>
                </div>


          
            </div>
        </div>
           </div>
            <div className='card-footer p-0'>
                <Button icon="bi bi-trash" label="Delete Item" className='p-button-sm p-button-danger py-1' onClick={() => { deleteCallbak(index) }} />
                {index === lastIndex - 1 ? <Button icon="bi bi-plus" label="Add Item" className='p-button-sm py-1' onClick={addCallbak} />: null}
            </div>
       </div>
    )
}

const DialogTemplate = ({ setIsOpen, isOpen, icon, buttonLabel, children ,header }) => {
    return (
        <div>
            <Button icon={icon} label={buttonLabel} className="p-button-sm py-1" onClick={() => {
                setIsOpen(true)
            }} />
            <Dialog header={header} visible={isOpen} onHide={() => { setIsOpen(false) }} dismissableMask>
                {children}
            </Dialog>
        </div>
    )
}

const PositionSelectTemplate = ({onClick,value}) => { 

    return(
        <table>
           <tbody>
                <tr>
                    <td width={280}><Button className={`w-100 p-button-info ${value==='top-left'?'p-button-outlined':null}`}  label="Top - Left" onClick={() => { onClick('top-left') }} /></td>
                    <td width={280}><Button className={`w-100 p-button-info ${value==='top-center'?'p-button-outlined':null}`} label="Top - Center" onClick={() => { onClick('top-center') }} /></td>
                    <td width={280}><Button className={`w-100 p-button-info ${value==='top-right'?'p-button-outlined':null}`}  label="Top - Right" onClick={() => { onClick('top-right') }} /></td>
                </tr>
                <tr>
                    <td width={280}><Button className={`w-100  ${value==='center-left'?'p-button-outlined':null}`}   label="Center - Left" onClick={() => { onClick('center-left') }} /></td>
                    <td width={280}><Button className={`w-100  ${value==='center-center'?'p-button-outlined':null}`} label="Center - Center" onClick={() => { onClick('center-center') }} /></td>
                    <td width={280}><Button className={`w-100  ${value==='center-right'?'p-button-outlined':null}`}  label="Center - Right" onClick={() => { onClick('center-right') }} /></td>
                </tr>
                <tr>
                    <td width={280}><Button className={`w-100 p-button-warning ${value==='bottom-left'?'p-button-outlined':null}`}   label="Bottom - Left" onClick={() => { onClick('bottom-left') }} /></td>
                    <td width={280}><Button className={`w-100 p-button-warning ${value==='bottom-center'?'p-button-outlined':null}`} label="Bottom - Center" onClick={() => { onClick('bottom-center') }} /></td>
                    <td width={280}><Button className={`w-100 p-button-warning ${value==='bottom-right'?'p-button-outlined':null}`}  label="Bottom - Right" onClick={() => { onClick('bottom-right') }} /></td>
               </tr>
           </tbody>
        </table>
    )
 }






    const captionSettingArray = [
        {
          label: 'Text',
          children: [

            { label: 'CaptionText', isLabel: false, key: 'text', inputType: 'inputText', checkKey: null, min: 8, max: 28 },
            { label: 'Font Family', isLabel: false, key: 'fontFamily', inputType: 'fontFamilyDropdown', checkKey: null },
           
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



const CarouselTextTemplate = ({captions,callback,children}) => { 
    const [captionsState, setCaptionsState] = useState(captions)
    const [currentCaption, setCurrentCaption] = useState({})
    const [activeIndex, setActiveIndex] = useState(null)
    const [previewBackgroundColor, setPreviewBackgroundColor] = useState('#999999')
    const newCaption={
        text:'new caption text...',
        fontSize: 0.8,
        fontFamily: 'Arial',
        isBold: true,
        isItalic: true,
      
        verticalSize: 7,
        horizontalSize: 31,
      
        borderRadius: 0,
        borderSize: 0,
      
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
     
        previewBgColor: '#f5f5f5',
        gradientTopColor: '#adadad20',
        gradientBottomColor: '#adadad20',
        fontColor: '#ffffff',
        fontHoverColor:'#BFDDFF',
        borderColor: '#bfbfbf64',
        boxShadowColor: '#bfbfbf64',
        textShadowColor: '#bfbfbf64'

    }
    const addButton=<Button className='p-button-sm w-100 py-1' icon="bi bi-plus" label="add Caption"
    onClick={()=>setCaptionsState([...captionsState,newCaption])}
/>

    const autoSaveHandler=(value)=>{
        setCurrentCaption(value)
        const result = Array.from(captionsState)
        result.splice(activeIndex,1,value)
        setCaptionsState(result)
    }

    return(
        <div className="row" style={{minWidth:"1200px"}}>
            <div className='col-2'>
                <div className='card'>
                <div className='card-header py-1 fw-bold'>Caption Texts</div>
                {captionsState.length===0? <div className='card-footer p-0'>{addButton}</div>:null}
                </div>
             

                {captionsState.map((item,i)=>{
                    return(
                        <div key={i} className="card-body cursor-pointer" onClick={()=>{setCurrentCaption(item);setActiveIndex(i)}}>
                            {item.text}
                        </div>
                    )
                })}
                 {captionsState.length!==0? <div className='card-footer p-0'>{addButton}</div>:null}
            </div>
            <div className='col-7'>

                <div className='card' >
                <div className='card-header py-1 fw-bold'>Preveiw</div>
                    <div className='card-body' style={{backgroundColor:previewBackgroundColor}}>
                    <CaptionTemplate caption={currentCaption}/>
                    </div>
                    <div className='card-footer'>
                    <div className='d-flex justify-content-between'>
              <ColorSelecter tooltip={"Preview background color"} tooltipOptions={{ position: "bottom" }} buttonClassName="p-1" color={previewBackgroundColor} callback={(color) => { setPreviewBackgroundColor(color) }} />
                    {colorArray.map((item, i) => {
                       
                        if (currentCaption[item.checkKey] || !item.checkKey) {
                        return (
                            <ColorSelecter key={i}
                            tooltip={item.tooltip}
                            tooltipOptions={{ position: "bottom" }}
                            buttonClassName="p-1"
                            color={currentCaption[item.key]}
                            callback={(color) => { 
                                console.log(color)
                                autoSaveHandler({ ...currentCaption, [item.key]: color }) }} />
                        )
                        } else {
                        return (
                            <Button disabled className='p-button-sm py-0' icon="bi bi-x-lg"/>
                        )
                        }
                    })}

                    </div>

                    <div className='mt-1'>
                        <Button label="save" className='p-button-sm mr-1' icon="bi bi-save" onClick={()=>{callback(captionsState)}}/>
                        {activeIndex!==null?
                        <Button label="delete" className='p-button-sm' icon="bi bi-trash" onClick={()=>{
                            setCurrentCaption({})
                            const result = Array.from(captionsState)
                            result.splice(activeIndex,1)
                            setCaptionsState(result)
                                callback(result)
                        }}/>:null}
                    </div>
                   
                    </div>
             
                   

                </div>
                <div className='card mt-2'>
                <div className='card-header py-1 fw-bold'>Text Position</div>
                <div className='card-body'>
                        {children}
                    </div>
                </div>


               


            </div>
            <div className='col-3'>
               

                {captionSettingArray.map((item,i)=>{
                    return(
                        <div className='card' key={i}>
                            <div className='card-header py-1 fw-bold'>
                                {item.label}
                            </div>
                        <div className='card-body'>
                           <div className='row'>
                           {item.children.map((cItem, ci) => {
                                    if (!cItem.checkKey || currentCaption[cItem.checkKey]) {
                                        return (
                                            <div key={ci} className="col-6 py-1">
                                                {cItem.isLabel ? <label style={{ fontSize: "12px" }}>{cItem.label} {cItem.inputType === 'slider' ? ` : ${currentCaption[cItem.key]} ${cItem.key==='fontSize'?'rem':'px'}` : null}</label> : null}

                                            {cItem.inputType === 'slider' ?
                                            <div className='pt-2 px-3'>
                                                <Slider min={cItem.min} step={cItem.key === 'fontSize' ? 0.1 : 1} max={cItem.max} value={currentCaption[cItem.key]} 
                                                onChange={(e) => { autoSaveHandler({ ...currentCaption, [cItem.key]: e.value }) }} /></div>
                                            : cItem.inputType === 'checkBox' ?
                                            <div className="px-2 field-checkbox mb-0">
                                            <Checkbox inputId={cItem.key} checked={currentCaption[cItem.key]} onChange={e => autoSaveHandler({ ...currentCaption, [cItem.key]: e.checked })} />
                                            <label htmlFor={cItem.key} style={{ fontSize: "12px" }}>{cItem.label}</label>
                                            </div>
                                            : cItem.inputType === 'inputText' ?
                                            <div className='pt-0 px-2'><InputText className='p-inputtext-sm' value={currentCaption[cItem.key]} onChange={(e) => { autoSaveHandler({ ...currentCaption, [cItem.key]: e.target.value }) }} /></div>
                                            : cItem.inputType === 'fontFamilyDropdown' ?
                                            <div className='pt-0 px-2'><FontFamilyDropdwon className='p-inputtext-sm w-100' value={currentCaption[cItem.key]} callback={(value) => { autoSaveHandler({ ...currentCaption, [cItem.key]: value }) }} /></div>
                                            : cItem.inputType === 'icon' ?
                                            <div className='pt-0 px-2'><IconSelect tip={cItem.tip} icon={currentCaption[cItem.key]} callback={(value) => { autoSaveHandler({ ...currentCaption, [cItem.key]: value }) }} /></div>
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

const Caption=styled.span`
minWidth:auto!important;
background: linear-gradient(to bottom, ${props=>props.op.gradientTopColor} 5%, ${props=>props.op.gradientBottomColor} 100%);
border-radius: ${props=>props.op.borderRadius}px;
border:${props=>props.op.borderSize}px solid ${props=>props.op.borderColor};
text-decoration:none;
padding:${props=>props.op.verticalSize}px ${props=>props.op.horizontalSize}px;
font-size:${props=>props.op.fontSize}rem;
font-family:${props=>props.op.fontFamily};
color:${props=>props.op.fontColor};
${props=>props.op.isBold?'font-weight: bold;':null}
${props=>props.op.isItalic?'font-style: italic;':null}
${props=>{
  if(props.isBoxShadow){
    return `box-shadow: ${props.op.isInset?'inset':null}  ${props.op.boxShadowHorizontalPosition}px ${props.op.boxShadowVerticalPosition}px ${props.op.boxShadowBlurRadius}px ${props.op.boxShadowSpreadRadius}px ${props.op.boxShadowColor};`
  }
}}

${props=>{
  if(props.isTextShadow){
    return `text-shadow:${props.op.textHorizontalPosition}px ${props.op.textVerticalPosition}px ${props.op.textBlurRadius}px ${props.op.textShadowColor};`
  }
}}



:hover{
  color:${props=>props.op.fontHoverColor};
  ${props=>props.op.isGradient?
    `background: linear-gradient(to bottom, ${props=>props.op.gradientBottomColor} 5%, ${props=>props.op.gradientTopColor} 100%);`
    :null}
    ${props=>{
      if(props.op.isTransparent){
        return `background-color:transparent;`
      }else{
        return `background-color:${props.op.gradientBottomColor};`
      }
    }}
  }

  :active{
    position:relative;
      top:1px;
  }
`
 const CaptionTemplate=({caption ,className})=>{
   
     return(
         <div  className={className} >
            <Caption op={caption}>{caption.text}</Caption>
         </div>
     )
 }