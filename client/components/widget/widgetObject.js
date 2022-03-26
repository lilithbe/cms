import ProductionCarousel, { ProductionCarouselSetting } from "./carousel/ProductionCarousel";
// import WidthCarousel from "./carousel/WidthCarousel";
import { WidthCarouselSetting } from "./carousel/WidthCarousel";
import dynamic from 'next/dynamic';
import SimpleBoardList, { SimpleBoardListSetting } from "./board/SimpleBoardList";
import { SimpleBoardListSettingOptions } from "../../common";

const WidthCarousel = dynamic( () => import("./carousel/WidthCarousel"), { ssr: false });


export const widgetList=[
    {
        label:'Production Carousel',
        value:'ProductionCarousel',
        description:'제품용 회전 이미지',
        defaultOptions:{
            baseHeight: 409,
            loop: true,
            nav: true,
            dots: true,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 5000,
            buttonBgColor: "#999999",
            buttonHoverBgColor: "#999999",
            buttonFontColor: "#999999",
            buttonHoverFontColor: "#999999",
            imageBorderRadius: 0,
            categoryName: '',
            sectionTitle:'',
            sectionBgImage:'',
            sectionBgColor:'',
            
        },
        component:(props)=><ProductionCarousel {...props} />,
        setting:(widget,onChange)=><ProductionCarouselSetting onChange={onChange} widget={widget}/>
    },
    {
        label:'Width Carousel',
        value:'WidthCarousel',
        description:'넓은 화면용 회전 이미지',
        defaultOptions:{
            baseHeight:800,
            loop: true,
            nav: true,
            dots: true,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 5000,
            buttonBgColor:"#999999",
            buttonHoverBgColor:"#999999",
            buttonFontColor:"#999999",
            buttonHoverFontColor:"#999999",
            
        },
        component:(props)=><WidthCarousel {...props} />,
        setting:(widget,onChange)=><WidthCarouselSetting onChange={onChange} widget={widget}/>
    },
    {
        label:'Simple Board List',
        value:'SimpleBoardList',
        description:'SimpleBoardList',
        settingOptions: SimpleBoardListSettingOptions,
        defaultOptions:{
            boardValue: '',
            limit:5,
            offset:0,
            subjectLimitCount:50,
            title:'게시판 제목',
            titleBgColor:'#00000000',
            titleFontColor:'#000000',
            tableBodyBgColor:'#00000000',
            tableBodyFontColor:'#000000',
        },
        component:(props)=><SimpleBoardList {...props} />,
        setting:(widget,onChange, widgetComponent)=><SimpleBoardListSetting onChange={onChange} widget={widget} widgetObject={widgetComponent}/>
    },
]