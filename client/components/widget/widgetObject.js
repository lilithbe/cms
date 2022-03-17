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
            { label: 'card Title', key: 'cardTitle', defaultValue: '게시판 제목', inputType: 'inputText', description: '' },
            { label: 'card Bg Color', key: 'cardBgColor', defaultValue: '#00000000', inputType: 'color', description: '' },
            { label: 'card Font Color', key: 'cardFontColor', defaultValue: '#000000', inputType: 'color', description: '' },
            { label: 'card Header Bg Color', key: 'cardHeaderBgColor', defaultValue: '#00000000', inputType: 'color', description: '' },
            { label: 'card Header Font Color', key: 'cardHeaderFontColor', defaultValue: '#000000', inputType: 'color', description: '' },
            { label: 'card Body Bg Color', key: 'cardBodyBgColor', defaultValue: '#00000000', inputType: 'color', description: '' },
            { label: 'card Body Font Color', key: 'cardBodyFontColor', defaultValue: '#000000', inputType: 'color', description: '' },
          ],
        defaultOptions:{
            boardValue: '',
            limit:5,
            offset:0,
            subjectLimitCount:50,
            cardTitle:'게시판 제목',
            cardBgColor:'#00000000',
            cardFontColor:'#000000',
            cardHeaderBgColor:'#00000000',
            cardHeaderFontColor:'#000000',
            cardBodyBgColor:'#00000000',
            cardBodyFontColor:'#000000',
        },
        component:(props)=><SimpleBoardList {...props} />,
        setting:(widget,onChange, widgetComponent)=><SimpleBoardListSetting onChange={onChange} widget={widget} widgetObject={widgetComponent}/>
    },
]