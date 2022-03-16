import ProductionCarousel from "./carousel/ProductionCarousel";
// import WidthCarousel from "./carousel/WidthCarousel";
import { WidthCarouselSetting } from "./carousel/WidthCarousel";
import dynamic from 'next/dynamic';

const WidthCarousel = dynamic( () => import("./carousel/WidthCarousel"), { ssr: false });


export const widgetList=[
    {
        label:'Production Carousel',
        value:'ProductionCarousel',
        description:'제품용 회전 이미지',
        defaultOptions:{},
        component:(props)=><ProductionCarousel {...props} />,
        setting:()=>{}
    },
    {
        label:'Width Carousel',
        value:'WidthCarousel',
        description:'넓은 화면용 회전 이미지',
        defaultOptions:{
            loop: true,
            nav: true,
            dots: true,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 5000,
        },
        component:(props)=><WidthCarousel {...props} />,
        setting:(widget,onChange)=><WidthCarouselSetting onChange={onChange} widget={widget}/>
    },
]