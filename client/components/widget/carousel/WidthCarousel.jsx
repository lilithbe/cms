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

const WriteEditor = dynamic(() => import("../../editor/WriteEditor"), { ssr: false });
const FileUpload = dynamic(() => import("../../file/FileUpload"), { ssr: false });

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
              height:${props.item.height}px;
              background-image: url("${props.item.src}");         
              background-repeat:no-repeat;
              background-size:cover;
              background-position: ${props.item.backgroundPosition};
              @media (min-width: 1200) {
                background-position:  ${props.item.backgroundPosition};
              }
              .carousel-label-wrapper{
                  text-shadow:5px 5px 5px #999999;
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
    return (
        <div className='w-100'>
             {HtmlParser(item.label)}
            {/* <div className={`carousel-label-wrapper text-${lp === 'left' ? 'start' : lp === 'right' ? 'end' : lp} `} >
                {HtmlParser(item.label)}
            </div> */}
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
                {/* <Button icon="bi bi-plus" label="Add Item" className='p-button-sm  py-1' onClick={() => {
                    onChange({ ...widget, data: [...widget.data, newItem] })
                }} /> */}

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
                        <FileUpload
                            addId={index}
                            fileType={'image'}
                            callback={(res) => {
                                onChange({ ...item, ...res.data.result }, index)
                            }} />
                    </div>
                    <div className='card-header fw-bold' style={{ fontSize: '13px' }}>
                        Image Position
                    </div>
                    <div className='card-body p-0'>
                        <SelectButton
                            className='p-buttonset-sm'
                            value={item.backgroundPosition}
                            options={alignOptions}
                            onChange={(e) => {
                                onChange({ ...item, backgroundPosition: e.value }, index)
                            }} />
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
                                <WriteEditor value={item.label} width="100%" buttonList={buttonList} onChange={(html,text)=>{
                                       
                                      onChange({ ...item, label:html },index)
                                }}/>
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



const buttonList= [[
        "undo",
        "redo",
        "font",
        "fontSize",
        "formatBlock",
        "paragraphStyle",
        "blockquote",
        "bold",
        "underline",
        "italic",
        "strike",
        "subscript",
        "superscript",
        "fontColor",
        "hiliteColor",
        "removeFormat",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "lineHeight",
    ]]



