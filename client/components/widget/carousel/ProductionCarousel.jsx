import { useEffect, useState, useRef, useMemo } from 'react'
import 'react-owl-carousel2/lib/styles.css';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(async () => {
    const { default: QL } = await import("react-owl-carousel2")
    return function comp({ forwardedRef, ...props }) {
        return <QL ref={forwardedRef} {...props} />
    }
}, { ssr: false });
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Image } from 'primereact/image'

import { InputText } from 'primereact/inputtext';
import ColorSelecter from '../../formControl/ColorSelecter';
import IconSelect from '../../formControl/IconSelect';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber'
import { boolOptions } from '../../../common';
import { Slider } from 'primereact/slider';
import SingleFileUpload from '../../file/SingleFileUpload';
const ProductionCarouselWrapper = styled.section`
${props=>`
backround-image: url("${props.op.sectionBgImage}");
background-color: ${props.op.sectionBgColor};
   





`}
padding-top: 70px;
padding-bottom: 60px;


.section-title {
	margin-bottom: 70px;
    text-align: center;
}
.section-title h2 {
	font-size: 36px;
}

.product-slider .owl-nav {
	position: absolute!important;
	top: calc(50% - 60px)!important;
	width: 100%!important;
	left: 0!important;
}




.product-slider .owl-nav button.owl-next,
.product-slider .owl-nav button.owl-prev {
    color: ${props=>props.op.buttonFontColor}!important;
	background-color: ${props=>props.op.buttonBgColor}!important;
	font-size: 42px!important;
	position: relative!important;
    :hover{
        color: ${props=>props.op.buttonHoverFontColor}!important;
        background-color: ${props=>props.op.buttonHoverBgColor}!important;
    }
}





.product-slider .owl-nav button.owl-next {
	float: right!important;
	right: -92px!important;
}

.product-slider .owl-nav button.owl-prev {
	float: left!important;
	left: -92px!important;
}

.product-item .pi-pic {
	position: relative;
	display: block;
    border-radius:${props=>props.op.imageBorderRadius}px;
    margin:2px;
    img{
        height:${props=>props.op.baseHeight}px;
      
    }
}

.product-item .tag-new,
.product-item .tag-sale {
	position: absolute;
	right: 16px;
	top: 14px;
	font-size: 10px;
	font-weight: 700;
	color: #fff;
	background: #50e550;
	line-height: 1;
	text-transform: uppercase;
	padding: 5px 9px 1px;
	border-radius: 15px;
	width: 42px;
}

.product-item .tag-sale {
	text-align: center;
	padding: 5px 0px 1px;
	min-width: 65px;
	background: #f51167;
}

.product-item .pi-links {
	width: 100%;
	position: absolute;
	right: 0;
	bottom: 18px;
	z-index: 9;
	padding-right: 15px;
	text-align: right;
}

.product-item .pi-links button {
	display: inline-table;
	width: 36px;
	height: 36px;
	background: #fff;
	border-radius: 60px;
	font-size: 18px;
	line-height: 18px;
	padding-top: 9px;
	overflow: hidden;
	color: #000;
	position: relative;
	-webkit-box-shadow: 1px 0 32px rgba(0, 0, 0, 0.2);
	box-shadow: 1px 0 32px rgba(0, 0, 0, 0.2);
	-webkit-transition: all 0.4s ease;
	-o-transition: all 0.4s ease;
	transition: all 0.4s ease;
	text-align: center;
}

.product-item .pi-links button i {
	display: inline-block;
	color: #000;
}

.product-item .pi-links button.add-card {
	padding-top: 8px;
}

.product-item .pi-links button.add-card span {
	font-size: 12px;
	font-weight: bold;
	text-transform: uppercase;
	position: absolute;
	right: 19px;
	top: 20px;
	opacity: 0;
}

.product-item .pi-links button.add-card:hover {
	width: 148px;
	padding: 8px 18px 0;
	text-align: left;
}

.product-item .pi-links button.add-card:hover span {
	opacity: 1;
	top: 10px;
	-webkit-transition: all 0.4s ease 0.3s;
	-o-transition: all 0.4s ease 0.3s;
	transition: all 0.4s ease 0.3s;
}

.product-item .pi-text {
    margin:5px;
	padding-top: 22px;
	height: 87px;
}

.product-item .pi-text h6 {
	float: right;
	padding-left: 40px;
	overflow: hidden;
	font-weight: 700;
	color: #111111;
}

.product-item .pi-text p {
	font-size: 16px;
	color: #111111;
	margin-bottom: 0;
}


`
const ProductionCarousel = ({  items, id, data}) => {
    const {
        sectionTitle,
        loop,
        nav,
        dots,
        margin,
        autoplay,
        autoplayTimeout,
        categoryName,

    } = data.options
    const carousel = useRef(null)
    return (

        <ProductionCarouselWrapper id={id} op={data.options}>
            <div className="container">
                <div className="section-title">
                    <h2>{sectionTitle}</h2>
                </div>
                {items.length !== 0 ?
                    <OwlCarousel
                        ref={carousel}
                        className="product-slider owl-carousel"
                        options={{
                            loop: loop,
                            nav: nav,
                            dots: dots,
                            margin: margin,
                            autoplay: autoplay,
                            autoplayTimeout:autoplayTimeout,
                            navText: [
                                '<button class="btn py-1 owl-prev"><i class="bi bi-chevron-left"></i></button>',
                                '<button class="btn py-1 owl-next"><i class="bi bi-chevron-right"></i></button>'
                            ],
                            responsive: {
                                0: {
                                    items: 1,
                                },
                                480: {
                                    items: 2,
                                },
                                768: {
                                    items: 3,
                                },
                                1200: {
                                    items: 4,
                                }
                            }
                        }}
                    // events={events}
                    >

                        {items.map((item, i) => {
                            return (
                                <div className="product-item" key={i}>
                                    <div className="pi-pic">
                                        <Image src={item.src} width={300} height={409} alt={item.label} />
                                        <div className="pi-links">
                                            <button className="btn p-2 mr-2 rounded-pill add-card"><i className="bi bi-bag" /><span>ADD TO CART</span></button>
                                            <button className="btn p-2 rounded-pill wishlist-btn"><i className="bi bi-heart" /></button>
                                        </div>
                                    </div>
                                    <div className="pi-text">
                                        <h6>{item.unit}{item.price}</h6>
                                        <p>{item.label}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </OwlCarousel> : null}
            </div>
        </ProductionCarouselWrapper>


    )
}

ProductionCarousel.propTypes = {
    items: PropTypes.array,
    title: PropTypes.string
}
ProductionCarousel.defaultProps = {
    title: '제목을 입력하세요',
    items: [
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/1.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/2.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/3.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/4.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/5.jpg',
            idValue: '#',
        },
        {
            label: 'Flamboyant Pink Top',
            price: '35,00',
            unit: '$',
            src: '/img/product/6.jpg',
            idValue: '#',
        },
    ]
}

export default ProductionCarousel

const Card = ({ title, children }) => {
    return (
        <div>
             {title}
            <div className=''>
                {children}
            </div>
        </div>
    )
}
export const ProductionCarouselSetting = ({ widget, onChange }) => {

    return (
        <ScrollPanel style={{ width: "100%", height: '600px' }}>
            <div className='row' style={{ width: "1700px" }}>
                {arr.map((classItem, k) => {
                    return (
                        <div key={k} className='col-6'> 
                            <div className='card'>
                                <div className='card-header py-1 fw-bold' >
                                    {classItem.label}
                                </div>
                                <div className='card-body'>
                                {classItem.children.map((item, i) => {
                                switch (item.inputType) {
                                    case "bool":
                                        return (
                                            <Card key={i} title={item.label}>
                                                <SelectButton className='p-buttonset-sm'
                                                    value={widget.options[item.key]} options={boolOptions}
                                                    onChange={(e) => {
                                                        if (e.value !== null) {
                                                            onChange({
                                                                ...widget, options: {
                                                                    ...widget.options,
                                                                    [item.key]: e.value
                                                                }
                                                            })
                                                        }
                                                    }} />
                                            </Card>
                                        )
                                    case "inputNumber":
                                        return (
                                            <Card key={i} title={item.label}>
                                                <InputNumber className='p-inputtext-sm'
                                                    value={widget.options[item.key]}
                                                    onChange={(e) => {
                                                        if (e.value !== null) {
                                                            onChange({
                                                                ...widget, options: {
                                                                    ...widget.options,
                                                                    [item.key]: e.value
                                                                }
                                                            })
                                                        }
                                                    }} />
                                            </Card>
                                        )


                                    case "color":

                                        return (
                                            <Card key={i} title={item.label}>
                                                <ColorSelecter className='p-inputtext-sm'
                                                    color={widget.options[item.key]}
                                                    callback={(color) => {
                                                        if (color !== null) {
                                                            onChange({
                                                                ...widget, options: {
                                                                    ...widget.options,
                                                                    [item.key]: color
                                                                }
                                                            })
                                                        }
                                                    }} />
                                            </Card>
                                        )
                                    case "slider":
                                        return (
                                            <Card key={i} title={item.label}>
                                               <div className='mt-3'>
                                               <Slider
                                                    min={item.min} step={1} max={item.max}
                                                    value={widget.options[item.key]}
                                                    onChange={(e) => {
                                                        if (e.value !== null) {
                                                            onChange({
                                                                ...widget, options: {
                                                                    ...widget.options,
                                                                    [item.key]: e.value
                                                                }
                                                            })
                                                        }
                                                    }} />
                                               </div>
                                            </Card>
                                        )

                                        case "inputText":
                                            return (
                                                <Card key={i} title={item.label}>
                                                  <InputText
                                                        value={widget.options[item.key]}
                                                        onChange={(e) => {
                                                            onChange({
                                                                ...widget, options: {
                                                                    ...widget.options,
                                                                    [item.key]: e.target.value
                                                                }
                                                            })
                                                        }} />
                                                </Card>
                                            )

                                            case "image":
                                                return (
                                                    <Card key={i} title={item.label}>
                                                      <SingleFileUpload
                                                            callback={(res) => {
                                                                onChange({
                                                                    ...widget, options: {
                                                                        ...widget.options,
                                                                        [item.key]: res.data.result[0]
                                                                    }
                                                                })
                                                            }} />
                                                    </Card>
                                                )




                                    default:
                                        return null;
                                }
                            })}
                                </div>
                            </div>



                           
                        </div>
                    )


                })}

            </div>
        </ScrollPanel>
    )
}
// { label: '', key: '', inputType: '', defaultValue: '', description: '' },
const arr = [
 
    


    {
        label: 'Section', children: [
            { label: 'Section Title', key: 'sectionTitle', inputType: 'inputText', defaultValue: '', description: '섹션 이름 선택' },

            { label: 'Section Bg Color', key: 'sectionBgColor', inputType: 'color', defaultValue: '', description: '섹션 배경색상 선택' },
            { label: 'Section Bg Image', key: 'sectionBgImage', inputType: 'image', defaultValue: '', description: '섹션 배경이미지 선택' },
        ]
    },
    {
        label: 'Image', children: [
            { label: 'base height', key: 'baseHeight', inputType: 'inputNumber', defaultValue: 800, description: '이미지 기본 높이' },
            { label: 'Image Border Radius', key: 'imageBorderRadius', inputType: 'slider', min: 0, max: 42, defaultValue: '', description: '이미지 모서리 라운드' },
        ]
    },
    {
        label: 'Carousel', children: [
            { label: 'loop', key: 'loop', inputType: 'bool', defaultValue: true, description: '무한회전 여부 결정' },
            { label: 'nav', key: 'nav', inputType: 'bool', defaultValue: true, description: '이동 버튼 생성 여부' },
            { label: 'dots', key: 'dots', inputType: 'bool', defaultValue: false, description: '점선 버튼 생성여부' },
            { label: 'margin', key: 'margin', inputType: 'inputNumber', defaultValue: 0, description: '하단 여백 설정' },
            { label: 'autoplay', key: 'autoplay', inputType: 'bool', defaultValue: true, description: '자동회전 설정' },
            { label: 'autoplayTimeout', key: 'autoplayTimeout', inputType: 'inputNumber', defaultValue: 5000, description: '자동회전 시간설정 밀리초단위(ex:1000 = 1초)' },
            { label: 'Prev Next Button BgColor', key: 'buttonBgColor', inputType: 'color', defaultValue: "#999999", description: '버튼 배경색상' },
            { label: 'Prev Next Button HoverBgColor', key: 'buttonHoverBgColor', inputType: 'color', defaultValue: "#999999", description: '버튼:호버 배경색상' },
            { label: 'Prev Next Button FontColor', key: 'buttonFontColor', inputType: 'color', defaultValue: "#999999", description: '화살표 색상' },
            { label: 'Prev Next Button HoverFontColor', key: 'buttonHoverFontColor', inputType: 'color', defaultValue: "#999999", description: '화살표:호버 색상' },

        ]
    },
    {
        label: 'Category', children: [
            { label: 'Category Select', key: 'categoryName', inputType: 'categorySelect', defaultValue: '', description: '제품 분류 선택' },
        ]
    },









]