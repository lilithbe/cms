import ProductionCarousel from "./carousel/ProductionCarousel";
// import WidthCarousel from "./carousel/WidthCarousel";
import { WidthCarouselSetting } from "./carousel/WidthCarousel";
import dynamic from 'next/dynamic';
import SimpleBoardList, { SimpleBoardListSetting } from "./board/SimpleBoardList";

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
            baseHeight:800,
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
    {
        label:'Simple Board List',
        value:'SimpleBoardList',
        description:'SimpleBoardList',
        settingOptions: [
            { label: 'selected board name', key: 'boardValue', inputType: 'boardList', description: '보여질 게시판 이름을 선택하세요.' },
            { label: 'limit post count', key: 'limit', inputType: 'inputNumber', min: 1, max: 30, description: '최대 글 갯수를 입력하세요.' },  
            { label: 'limit subject count', key: 'subjectLimitCount', inputType: 'inputNumber', min: 20, max: 100, description: '최대 제목의 글자 갯수를 입력하세요.' },

            { label: 'Title', key: 'title', defaultValue: '게시판 제목', inputType: 'inputText', description: '' },
            { label: 'Title Bg Color', key: 'titleBgColor', defaultValue: '#00000000', inputType: 'color', description: '' },
            { label: 'Title Font Color', key: 'titleFontColor', defaultValue: '#000000', inputType: 'color', description: '' },
            { label: 'table Body Bg Color', key: 'tableBodyBgColor', defaultValue: '#00000000', inputType: 'color', description: '' },
            { label: 'table Body Font Color', key: 'tableBodyFontColor', defaultValue: '#000000', inputType: 'color', description: '' },
          ],
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