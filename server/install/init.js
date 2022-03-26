import env from 'dotenv'
import {v4} from 'uuid'
import { tableArray } from './tableInit'


// 기본테이블 생성목록
export const prefix = process.env.PREFIX//기본접두사
export const tableArr = tableArray(prefix)




env.config()



//메인 운영자 계정생성
const ADMIN_INIT={
    userId: process.env.ADMIN_MASTER_ID,
    nickName: process.env.ADMIN_MASTER_NICKNAME,
    email: process.env.ADMIN_MASTER_EMAIL,
    isAdmin: true,
    isEmailCheck:true,
    grade: 9999,
    level: 99,
    userImage: '/basic/default/user.jpg',
    useName: 'nickName',
}

export const adminInit = {...ADMIN_INIT , password:process.env.ADMIN_MASTER_PASSWORD,  type: 'local'}



/**
 * 사이트 기초정보
 * dc: default config 
 * sc: shop config
 * pc : product config
 */

 const navgationInit = [
    {type:'nav-item',label:'커뮤니티',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',to:'/comunity',children:[]},
    {type:'nav-item',label:'자유게시판',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',to:'/content/list/freeboard',children:[]},
    {type:'nav-item',label:'설문게시판',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',to:'/content/list/voteboard',children:[]},
    {type:'nav-item',label:'판매게시판',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',to:'/content/list/saleboard',children:[]},
    {type:'nav-item',label:'이미지게시판',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',to:'/content/list/imageboard',children:[]},
    {type:'nav-item',label:'비디오게시판',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',to:'/content/list/videoboard',children:[]},
    {type:'nav-item',label:'질문게시판',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',to:'/content/list/qnaboard',children:[]},
    {type:'nav-item',label:'코드게시판',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',to:'/content/list/codeboard',children:[]},
  
   
    // {type:'nav-item',label:'About',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:1,to:'/about',children:[]},
    // {type:'dropdown-menu',label:'system',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:2,children:[
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //     {type:'dropdown-item',label:'공지사항',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:1,to:'/content/system/notice',children:[]}
    // ]},
    // {type:'mega-menu',label:'new Group',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:3,children:[
    //    {type:'mega-group',label:'new Group 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/newgroup',children:[
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //    ]},
    //    {type:'mega-group',label:'Tools',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:1,to:'/content/list/newgroup/testboard2',children:[
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //    ]},
    //    {type:'mega-group',label:'Wood',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:2,to:'/content/list/newgroup/testboard2',children:[
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //     {type:'dropdown-item',label:'시스템그룹 한번에 보기',value:'',icon:'',hover:'',focus:'',hoverIcon:'',focusIcon:'',order:0,to:'/group/system',children:[]},
    //    ]},
    // ]}
     
]
const navgationConfigInit={
top:{

},

headLogo:'/logo-light.png',
headLogoText:process.env.SITE_NAME,
headBackgroundColor:'#ffffff',
headBackgroundImage:'',
headFontSize:'3rem',
headTextColor:'#000000',

isHeadLogoText:true,
isHeadLogo:true,
isHead:false,

isTopMenu:false,


isWelcomMent:true,
isToday:true,
isWatch:true,
isWeather:true,
isQRCode:true,
isRSS:true,
isSocialButtons:true,


accountButtonPosition:'navbar',   

isScrollMovingNavFixed:true,                                

isNavBrand:true,     
isNavBrandText:true,                              
isSearchButton:true,                                
isFixedValueCopy:true,
isHomeButton:true,

navbarBrand:'/logo-light.png',
navbarBrandText:process.env.SITE_NAME,
navbarFontFamily:'NIXGONL-Vb',
navbarButtonPosition:'center',                                
navbarPaddingY:"py-0",                                
navbarBgColor:'#000000',      
navbarHoverBgColor:'#000000',          
navbarFocusBgColor:'#000000',
navbarColor:'#ffffff',                                
navbarHoverColor:'#ffffff',                                
navbarFocusColor:'#ffffff',                                
navbarFontSize:'15px',    
isNavbarFontShadow:false,
navbarFontShadow:'#ffffff',                                
navbarHoverFontShadow:'#ffffff',                                
navbarFocusFontShadow:'#ffffff',                                
navbarFontShadowWeight:'0px',     

fixedNavbarBrand:'/logo-light.png',  
fixedNavbarBrandText:process.env.SITE_NAME,     
fixedNavbarFontFamily:'NIXGONL-Vb',           
fixedNavbarButtonPosition:'center',                                
fixedNavbarPaddingY:"py-0",                                
fixedNavbarBgColor:'#000000',    
fixedNavbarHoverBgColor:'#000000',          
fixedNavbarFocusBgColor:'#000000',
fixedNavbarColor:'#ffffff',                                
fixedNavbarHoverColor:'#ffffff',                                
fixedNavbarFocusColor:'#ffffff',                                
fixedNavbarFontSize:'15px',   
isFixedNavbarFontShadow:false,                             
fixedNavbarFontShadow:'#ffffff',                                
fixedNavbarHoverFontShadow:'#ffffff',                                
fixedNavbarFocusFontShadow:'#ffffff',                                
fixedNavbarFontShadowWeight:'0px',  



navItemBorderWeight:"0px",
navItemBorderColor:"#000000",
navItemPaddingY:"py-2",

navbarBorderTopLineWeight:"0px",
navbarBorderBottomLineWeight:"0px",
navbarBorderTopLineColor:"#000000",
navbarBorderBottomLineColor:"#000000",
navbarBorderTopShadowWeight:"0px",
navbarBorderBottomShadowWeight:"0px",
navbarBorderTopShadowColor:"#000000",
navbarBorderBottomShadowColor:"#000000",


}
const customPageListInit=[
  
    {
        label:'소개',
        type:'cp',
        value:'about',
        url:'/cp/about',
        viewGrade:0,
        viewLinkGrade:0,
        pageData:[],
    },
    {
        label:'대표 인사',
        value:'wellcom',
        type:'cp',
        url:'/cp/wellcom',
        viewGrade:0,
        viewLinkGrade:0,
        pageData:[],
    },
    {
        label:'회사소개',
        type:'cp',
        value:'company_about',
        url:'/cp/company_about',
        viewGrade:0,
        viewLinkGrade:0,
        pageData:[],
    }
]
const mainPageDataInit=  {
    label:'메인',
    type:'main',
    value:'main',
    url:'/',
    viewGrade:0,
    viewLinkGrade:0,
    pageData:[],
}
const authPageListInit=[
    {
        label:'Login',
        type:'auth',
        value:'login',
        url:'/auth/login',
        viewGrade:0,
        viewLinkGrade:0,
        pageData:[],
    },
    {
        label:'register',
        type:'auth',
        value:'register',
        url:'/auth/register',
        viewGrade:0,
        viewLinkGrade:0,
        pageData:[],
    },
    {
        label:'profile',
        type:'auth',
        value:'profile',
        url:'/auth/profile',
        viewGrade:0,
        viewLinkGrade:0,
        pageData:[],
    }
]
const initFonts =[
    {label:'serif', value:'serif', src:`serif`},
    {label:'monospace', value:'monospace', src:`monospace`},
    {label:'sans-seri', value:'sans-serif', src:`sans-serif`},

    {label:'Roboto', value:'Roboto', src:`url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap') format('woff')`},
    {label:'카페24심플해',value:'Cafe24Simplehae',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Simplehae.woff') format('woff')`},
    {label:'닉스곤폰트B',value:'NIXGONM-Vb',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff') format('woff')`},
    {label:'닉스곤폰트M',value:'NIXGONL-Vb',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONL-Vb.woff') format('woff')`},
    {label:'상주곶감체',value:'SANJUGotgam',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANJUGotgam.woff') format('woff')`,},
    {label:'웰컴체 레귤러',value:'OTWelcomeBA',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/OTWelcomeBA.woff2') format('woff2')`,},
    {label:'아이스레몬',value:'SF_IceLemon',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/SF_IceLemon.woff') format('woff')`,},
    {label:'아이스망고',value:'SF_IceMango',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/SF_IceMango.woff') format('woff')`,},
    {label:'LAB 디지털',value:'LAB디지털',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/LAB디지털.woff') format('woff')`,},
    {label:'쿠키런 레귤러',value:'CookieRun-Regular',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff') format('woff')`,},
    {label:'함렛 Bold',value:'Hahmlet-Bold',src:`url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-Bold.woff2') format('woff2')`,},
]
const terms =''
const privacy=''
const footerInit={
    footerLogo:'/logo-dark.png',
    isMap:false,
    isContact:false,
    isCompanyData:false,
    isTerms:false, //약관html
    isPrivacy: false, //개인정보취급방침html
}

export const pagesInit = [

]



const leveluppointInit=()=>{
    const result=[]
    const max=100
    let total=0
    for (let i = 1; i < max; i++) {
        const value=i*1000
        const exp=(i*1)*value
        total+=exp
        result.push({level:i,nextExp: exp,totalExp:total})
    }
    return result
}



export const configInputInit = {
    id:v4(),
    target:'main',
    userId:ADMIN_INIT.userId,
    label:'main',
    prefix:prefix,

    dc_navgation:navgationInit,
    dc_customPageData:customPageListInit,
    dc_authPageData: authPageListInit,
    dc_mainPageData: mainPageDataInit,
    dc_defaultFont:"Roboto",

    dc_navConfig:navgationConfigInit,
    dc_footerConfig:footerInit,
    dc_levelUpRule:leveluppointInit(),
    dc_title: process.env.SITE_NAME,
    dc_logoImage: '/logo-light.png',
    dc_useLogoImage: false, 
    dc_mail: process.env.ADMIN_MASTER_EMAIL,
    dc_mailName:process.env.SITE_NAME,
    dc_usePoint: false,
    dc_loginPoint: 0,
    dc_deleteContentDate: 0,
    dc_userProfileChangeDate: 7,
    dc_joinUserLogDelete: 60*24,
    dc_hotSearchTextDelete: 60*24,
    dc_captcha: '',
    dc_reCaptchaKey: '',
    dc_reCaptchaSecretKey: '',
    dc_possibleIp: '*.*.*.*',
    dc_impossibleIp: 'none',
    dc_analytics: '',
    dc_naverSyndicationKey: '',
    dc_textFilter: '시발,씨발,니미,니기미,좆같,좃같,잣같',
    dc_nickNameFilter: 'admin,administrator,관리자,운영자,어드민,주인장,webmaster,웹마스터,sysop,시삽,시샵,manager,매니저,메니저,root,루트,su,guest,방문객',
    dc_reWriteSec: 30,
    dc_searchLimit: 10000,

    dc_imageExtention:[{label:'gif'},{label:'jpg'},{label:'jpeg'},{label:'png'}] ,
    dc_videoExtention:[{label:'asx'},{label:'asf'},{label:'wmv'},{label:'mpg'}, {label:'mpg'},{label:'mpeg'},{label:'mov'},{label:'avi'},{label:'mp3'},{label:'mp4'}],
    dc_fileExtention:[{label:'zip'},{label:'alz'},{label:'tar'}],
  


    dc_addFont: initFonts,
    dc_fontSizes:['10px', '15px', '18px', '24px', '36px', '48px' , '55px' , '64px' ,'72px'],
    dc_useHomepage: false,
    dc_telephone: false,
    dc_address: false,
    dc_mobile: false,
    dc_about: false,
    dc_useReCommender: false,
    dc_reCommenderAddPoint: 3000,
    dc_reCommenderRegisetAddPoint: 3000,
  
    dc_RegisterPoint: 3000,
    dc_terms: terms,
    dc_privacy: privacy,
    dc_useCert: false,
    dc_selectCert: '',
    dc_certKey: '',
    dc_certSecretKey: '',
    dc_useMail: false,
    dc_colorObjectBT:['primary','secondary','success','danger','warning','info','light','dark'],

    // 소셜로그인
    dc_auth_isSocialLogin:true,
    dc_auth_naver: { isUse: true, publicKey: 'Vjpx2IbpGwKxZMwL7exj', secretKey: '' },
    dc_auth_google: { isUse: true, publicKey: '405141250033-ft3rduqpqm6gt94n7peo9fek7egfrdmh.apps.googleusercontent.com', secretKey: '' },
    dc_auth_kakao: { isUse: true, publicKey: 'bb12fe7ebe73a2bffbdec14de609f095', secretKey: '' },
    dc_auth_fasebook: { isUse: false, publicKey: '', secretKey: '' },
    dc_auth_instagrem: { isUse: false, publicKey: '', secretKey: '' },
    dc_auth_twiter: { isUse: false, publicKey: '', secretKey: '' },
    dc_auth_fayco: { isUse: false, publicKey: '', secretKey: '' },
    dc_auth_pass: { isUse: false, publicKey: '', secretKey: '' },
    // 소셜연동
    dc_social:{
        sf_kakao:'',
        sf_google:'',
        sf_naver:'',
        sf_naver_line:'',
        sf_instagram:'',
        sf_facebook:'',
        sf_twitter:'',
        sf_pinterest:'',
        sf_youtube:'',
        sf_github:'',
        sf_telegram:'',
        sf_twitch:'',
        sf_vimeo:'',
    },
 
    dc_useSms: false,
    dc_smsType: 'sms',
    dc_smsTokenKey: '',
 
    
    sc_company_owner: '',
    sc_company_name: '',
    sc_company_saupja_no: '',
    sc_company_tel: '',
    sc_company_fax: '',
    sc_tongsin_no: '',
    sc_company_zip: '',
    sc_company_addr: '',
    sc_company_privacy_admin_name: '',
    sc_company_privacy_admin_email: '',
    sc_delivery_company: '',
    sc_delivery_start_time: 17,
    sc_delivery_price: '2500', 


    sc_delivery_infomation: '',

    sc_delivery_change_infomation: '',

    pc_mp_carousel_time_out: 7000,
    pc_mp_carousel_skin: '',
    pc_mp_product_section_1: {
        use: true,
        order: 1,
        label: '인기',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_mp_product_section_2: {
        use: true,
        order: 2,
        label: '추천',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_mp_product_section_3: {
        use: true,
        order: 4,
        label: '히트',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_mp_product_section_4: {
        use: true,
        order: 5,
        label: '할인',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_mp_product_section_5: {
        use: true,
        order: 3,
        label: '최신',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_mp_product_section_6: {
        use: false,
        order: 1,
        label: '',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_mp_product_section_7: {
        use: false,
        order: 1,
        label: '',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_mp_product_section_8: {
        use: false,
        order: 1,
        label: '',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_mp_product_section_9: {
        use: false,
        order: 1,
        label: '',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_mp_product_section_10: {
        use: false,
        order: 1,
        label: '',
        xs: 2,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4
    },
    pc_lp_use_infinite_scroll: true,
    pc_dp_imgviewr: { imgviewr_skin: '' },
    pc_dp_costviewr: { title_skin: '', content_skin: '', option_skin: '' },
    pc_dp_useSetProduct: true,
    pc_etc_go_to_top: { use: true, color: '', bg: '', border: '' },
    pc_etc_go_to_next_section: { use: true, color: '', bg: '', border: '' },
    pc_etc_use_kakao_chat: true,
    pc_etc_use_naver_chat: true,
    pc_etc_use_server_chat: true,
    pc_etc_left_side: [
        'auth',
        'cart',
        'qna',
        'myoder',
        'delivery_check',
        'comunity',
        'cscenter',
        'social_fallow',
        'todat_click',
        'payment'
    ],
    pc_etc_right_side: ['auth', 'menu']
}

/**
 * 기본 소셜 이미지 데이터
 */
export const social_images = [
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'band.png',
        size: 3031,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/band.png',
        url: '/site/social/band.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/band.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'behance.png',
        size: 3336,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/behance.png',
        url: '/site/social/behance.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/behance.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'facebook.png',
        size: 1713,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/facebook.png',
        url: '/site/social/facebook.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/facebook.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'google.png',
        size: 3067,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/google.png',
        url: '/site/social/google.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/google.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'instagram.png',
        size: 3372,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/instagram.png',
        url: '/site/social/instagram.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/instagram.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'kakao.png',
        size: 2825,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/kakao.png',
        url: '/site/social/kakao.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/kakao.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'kakaostory.png',
        size: 2424,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/kakaostory.png',
        url: '/site/social/kakaostory.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/kakaostory.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'naver.png',
        size: 1887,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/naver.png',
        url: '/site/social/naver.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/naver.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'payco.png',
        size: 2794,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/payco.png',
        url: '/site/social/payco.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/payco.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'pinterest.png',
        size: 3453,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/pinterest.png',
        url: '/site/social/pinterest.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/pinterest.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'rss.png',
        size: 4104,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/rss.png',
        url: '/site/social/rss.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/rss.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'tumblr.png',
        size: 2591,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/tumblr.png',
        url: '/site/social/tumblr.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/tumblr.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'twitter.png',
        size: 2513,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/twitter.png',
        url: '/site/social/twitter.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/twitter.png'
    },
    {
        write_data: ADMIN_INIT,
        write_id: ADMIN_INIT.userId,
        label: 'youtube.png',
        size: 2742,
        extention: 'png',
        file_type: 'image',
        status: true,
        use_download: false,
        download_count: 0,
        request: 'social',
        path: './public/site/social/youtube.png',
        url: '/site/social/youtube.png',
        fullUrl:process.env.FILE_UPLOAD_STORAGE+ '/site/social/youtube.png'
    }
]

/**
 * 기본게시판 생성
 */
export const config_page_init = [
    { id: 'main', label: '메인페이지',value: '메인페이지', path: '/', params: '', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'about', label: '소개페이지',value: '소개페이지', path: '/my', params: 'about', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'connect', label: '커넥트페이지',value: '커넥트페이지', path: '/my', params: 'connect', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'cart', label: '장바구니',value: '장바구니', path: '/my', params: 'cart', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'order', label: '주문조회',value: '주문조회', path: '/my', params: 'order', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'wishlist', label: '위시리스트',value: '위시리스트', path: '/my', params: 'wishlist', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'reserves', label: '적립금조회',value: '적립금조회', path: '/my', params: 'reserves', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'deposit', label: '예치금조회',value: '예치금조회', path: '/my', params: 'deposit', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'coupon', label: '쿠폰내역',value: '쿠폰내역', path: '/my', params: 'coupon', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'write', label: '내게시글',value: '내게시글', path: '/my', params: 'write', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'today', label: '오늘본상품',value: '오늘본상품', path: '/my', params: 'today', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },

    { id: 'faq', label: 'faq',value: 'faq', path: '/cc', params: 'faq', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'product', label: '상품문의',value: '상품문의', path: '/cc', params: 'product', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'delivery', label: '배송문의',value: '배송문의', path: '/cc', params: 'delivery', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'cancel', label: '취소/반품문의',value: '취소/반품문의', path: '/cc', params: 'cancel', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'exchange', label: '교환문의',value: '교환문의', path: '/cc', params: 'exchange', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'oi', label: '기타문의',value: '기타문의', path: '/cc', params: 'oi', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },

    { id: 'review', label: '상품후기',value: '상품후기', path: '/cm', params: 'review', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'knowhow', label: '쇼핑노하우',value: '쇼핑노하우', path: '/cm', params: 'knowhow', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'notice', label: '공지사항',value: '공지사항', path: '/cm', params: 'notice', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'membership', label: '회원혜택',value: '회원혜택', path: '/cm', params: 'membership', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'membercheck', label: '출석체크',value: '출석체크', path: '/cm', params: 'membercheck', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },

    { id: 'login', label: '로그인',value: '로그인', path: '/auth', params: 'login', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
    { id: 'register', label: '회원가입',value: '회원가입', path: '/auth', params: 'register', isDefault: true, accessGread: 0, accessLevel: 0, content: [] },
]

const defaultGroupInit={  
       createrData: ADMIN_INIT, //
    adminData: ADMIN_INIT, //groupLaw  :false ,  //
    fileUploadConfig : [] ,  //
    isThumbnail : false ,
    defaultTitleImage: "/blog-thumbs/title_01.png",
    defaultThumbnail: "/blog-thumbs/thumbnail_01.png",
    isContentBuy : false ,

       editorType:{
    contentType:'single',
    isImage:true,
    isVideo:true,
    isTag:true,
    editorType:'quill',
    height:500
    },
    carouselData:{
        xxlItems:[],
        xlItems:[],
        lgItems:[],
        mdItems:[],
        smItems:[],
        xsItems:[],
        options:{
          xxlHeight:700,xlHeight:600,
          lgHeight:350,mdHeight:650,
          smHeight:300,xsHeight:500,
          items: 1,
          loop: true,
          nav: true,
          navText: ['<i class="pi pi-chevron-left"></i>', '<i class="pi pi-chevron-right"></i>'],
          dots: false,
          autoplay: true,
          autoplayTimeout: 100000,
          smartSpeed: 1000,
          responsive: {
              0: {
                  items: 1
              },
              992: {
                  items: 1
              },
              1200: {
                  items: 1
              },
              1500: {
                  items: 1
              }
          }
      },
      }
     }
const projectGroupId= v4()
const systemGroupId=v4()
const communityGroupId=v4()
const systemGroup=  {
    id  :  systemGroupId ,  //
    label  : 'System' ,  //
    labelTag: "System",
    value  : 'system' ,  //
    url :'/group/system',
    contentType:"normal",
    createGrade  : 10 ,  //
    listGrade  : 0 ,  //
    viewGrade  : 0 ,  //
    updateGrade  : 10 ,  //
    deleteGrade  : 10 ,  //
    commentGrade  : 10 ,  //
    recommentGrade  : 10 ,  //
    goodGrade  : 10 ,  //
    badGrade  : 10 ,  //
...defaultGroupInit
    
}
const communityGroup ={
    id  :  communityGroupId ,  //
    label  : '커뮤니티' ,  //
    value  : 'community' ,  //
    url:'/group/community', 

    createGrade  : 1 ,  //
    listGrade  : 0 ,  //
    viewGrade  : 0 ,  //
    updateGrade  : 1 ,  //
    deleteGrade  : 1 ,  //
    commentGrade  : 1 ,  //
    recommentGrade  : 1 ,  //
    goodGrade  : 1 ,  //
    badGrade  : 1 ,  //
...defaultGroupInit,
   
}
const projectGroup={
    id  :  projectGroupId ,  //
    label  : 'newgroup' ,  //
    labelTag: "newgroup",
    value  : 'newgroup' ,  //
    url:'/group/newgroup',
    contentType:"normal",
    createGrade  : 10 ,  //
    listGrade  : 0 ,  //
    viewGrade  : 0 ,  //
    updateGrade  : 10 ,  //
    deleteGrade  : 10 ,  //
    commentGrade  : 10 ,  //
    recommentGrade  : 10 ,  //
    goodGrade  : 10 ,  //
    badGrade  : 10 ,  //

...defaultGroupInit,
   
}

// 기본생성 게시판
const ID_1=v4()
const ID_2=v4()
const ID_3=v4()
const ID_4=v4()
const ID_5=v4()
const ID_6=v4()
const ID_7=v4()
const defaultBoardObject={ 
    adminData:ADMIN_INIT,
    groupLaw: false, //
    fileUploadConfig: {
        label:'File Upload',
        extention:[{label:'gif'},{label:'jpg'},{label:'jpeg'},{label:'png'}],
        fileType:'image',
        minSize:10,
        maxSize:50000,
        maxCount:5,
    }, //
    editor: "default",
    isThumbnail: false,
    
    defaultTitleImage: "/blog-thumbs/title_01.png",
    defaultThumbnail: "/blog-thumbs/thumbnail_01.png",
    isContentBuy: false,
    editorType:{
    contentType:'single',
    isImage:true,
    isVideo:true,
    isTag:true,
    editorType:'quill',
    height:500
    },
    carouselData:{
        xxlItems:[],
        xlItems:[],
        lgItems:[],
        mdItems:[],
        smItems:[],
        xsItems:[],
        options:{
          xxlHeight:700,xlHeight:600,
          lgHeight:350,mdHeight:650,
          smHeight:300,xsHeight:500,
          items: 1,
          loop: true,
          nav: true,
          navText: ['<i class="pi pi-chevron-left"></i>', '<i class="pi pi-chevron-right"></i>'],
          dots: false,
          autoplay: true,
          autoplayTimeout: 100000,
          smartSpeed: 1000,
          responsive: {
              0: {
                  items: 1
              },
              992: {
                  items: 1
              },
              1200: {
                  items: 1
              },
              1500: {
                  items: 1
              }
          }
      },
      }, 
 }
export const boardConfigInit = [
  {
    id: ID_2,
    createName: prefix + "_write_freeboard", //',
    value: "freeboard", //
    label: "자유게시판", //
    labelTag: "자유게시판",
    listUrl:'/content/list/freeboard',
    writeUrl:'/content/write/freeboard',
    groupId: projectGroupId, //
    contentType:"normal",
    boardType:'freeBoard',
    createGrade: 10, //
    listGrade: 0, //
    viewGrade: 0, //
    updateGrade: 10, //
    deleteGrade: 10, //
    commentGrade: 10, //
    recommentGrade: 10, //
    goodGrade: 10, //
    badGrade: 10, //
 ...defaultBoardObject,
  },
  {
    id: ID_3,
    createName: prefix + "_write_imageboard", //',
    value: "imageboard", //
    label: "이미지게시판", //
    labelTag: "이미지게시판",
    listUrl:'/content/list/imageboard',
    writeUrl:'/content/write/imageboard',
    groupId: projectGroupId, //
    contentType:"array",
    boardType:'imageBoard',
    createGrade: 10, 
    listGrade: 0, //
    viewGrade: 0, //
    updateGrade: 10, //
    deleteGrade: 10, //
    commentGrade: 10, //
    recommentGrade: 10, //
    goodGrade: 10, //
    badGrade: 10, //
   ...defaultBoardObject,
  },
  {
    id: ID_1,
    createName: prefix + "_write_videoboard", //',
    value: "videoboard", //
    label: "비디오게시판", //
    labelTag: "비디오게시판",
    listUrl:'/content/list/videoboard',
    writeUrl:'/content/write/videoboard',
    groupId: projectGroupId, //
    contentType:"array",
    boardType:'videoBoard',
    createGrade: 10, 
    listGrade: 0, //
    viewGrade: 0, //
    updateGrade: 10, //
    deleteGrade: 10, //
    commentGrade: 10, //
    recommentGrade: 10, //
    goodGrade: 10, //
    badGrade: 10, //
   ...defaultBoardObject,
  },
  {
    id: ID_4,
    createName: prefix + "_write_saleboard", //',
    value: "saleboard", //
    label: "판매게시판", //
    labelTag: "판매게시판",
    listUrl:'/content/list/saleboard',
    writeUrl:'/content/write/saleboard',
    groupId: projectGroupId, //
    contentType:"array",
    boardType:'saleBoard',
    createGrade: 10, 
    listGrade: 0, //
    viewGrade: 0, //
    updateGrade: 10, //
    deleteGrade: 10, //
    commentGrade: 10, //
    recommentGrade: 10, //
    goodGrade: 10, //
    badGrade: 10, //
   ...defaultBoardObject,
  },
  {
    id: ID_5,
    createName: prefix + "_write_voteboard", //',
    value: "voteboard", //
    label: "투표게시판", //
    labelTag: "투표게시판",
    listUrl:'/content/list/voteboard',
    writeUrl:'/content/write/voteboard',
    groupId: projectGroupId, //
    contentType:"array",
    boardType:'voteBoard',
    createGrade: 10, 
    listGrade: 0, //
    viewGrade: 0, //
    updateGrade: 10, //
    deleteGrade: 10, //
    commentGrade: 10, //
    recommentGrade: 10, //
    goodGrade: 10, //
    badGrade: 10, //
   ...defaultBoardObject,
  }, 
  {
    id: ID_6,
    createName: prefix + "_write_qnaboard", //',
    value: "qnaboard", //
    label: "질문게시판", //
    labelTag: "질문게시판",
    listUrl:'/content/list/qnaboard',
    writeUrl:'/content/write/qnaboard',
    groupId: projectGroupId, //
    contentType:"array",
    boardType:'qnaBoard',
    createGrade: 10, 
    listGrade: 0, //
    viewGrade: 0, //
    updateGrade: 10, //
    deleteGrade: 10, //
    commentGrade: 10, //
    recommentGrade: 10, //
    goodGrade: 10, //
    badGrade: 10, //
   ...defaultBoardObject,
  },
  {
    id: ID_7,
    createName: prefix + "_write_codeboard", //',
    value: "codeboard", //
    label: "codeboard", //
    labelTag: "codeboard",
    listUrl:'/content/list/codeboard',
    writeUrl:'/content/write/codeboard',
    groupId: projectGroupId, //
    contentType:"array",
    boardType:'codeBoard',
    createGrade: 10, 
    listGrade: 0, //
    viewGrade: 0, //
    updateGrade: 10, //
    deleteGrade: 10, //
    commentGrade: 10, //
    recommentGrade: 10, //
    goodGrade: 10, //
    badGrade: 10, //
   ...defaultBoardObject,
  }
];

//기본생성 그룹
export const boardGroupConfigInit =[systemGroup,projectGroup]

export const configInit =(userId)=> {
    return {
        id:v4(),
        target:userId,
        userId:userId,
        label:userId,
        prefix:userId,
    
        dc_navgation:[],
        dc_customPageData:[],
        dc_authPageData: [],
        dc_mainPageData: {},
        dc_defaultFont:"Roboto",
    
        dc_navConfig:navgationConfigInit,
        dc_levelUpRule:leveluppointInit(),
        dc_title: '',
        dc_logoImage: '/logo-light.png',
        dc_useLogoImage: false, 
        dc_mail: '',
        dc_mailName:'',
        dc_usePoint: false,
        dc_loginPoint: 0,
        dc_deleteContentDate: 0,
        dc_userProfileChangeDate: 7,
        dc_joinUserLogDelete: 60*24,
        dc_hotSearchTextDelete: 60*24,
        dc_captcha: '',
        dc_reCaptchaKey: '',
        dc_reCaptchaSecretKey: '',
        dc_possibleIp: '*.*.*.*',
        dc_impossibleIp: 'none',
        dc_analytics: '',
        dc_naverSyndicationKey: '',
        dc_textFilter: '시발,씨발,니미,니기미,좆같,좃같,잣같',
        dc_nickNameFilter: 'admin,administrator,관리자,운영자,어드민,주인장,webmaster,웹마스터,sysop,시삽,시샵,manager,매니저,메니저,root,루트,su,guest,방문객',
        dc_reWriteSec: 30,
        dc_searchLimit: 10000,
    
        dc_imageExtention:[{label:'gif'},{label:'jpg'},{label:'jpeg'},{label:'png'}] ,
        dc_videoExtention:[{label:'asx'},{label:'asf'},{label:'wmv'},{label:'mpg'}, {label:'mpg'},{label:'mpeg'},{label:'mov'},{label:'avi'},{label:'mp3'},{label:'mp4'}],
        dc_fileExtention:[{label:'zip'},{label:'alz'},{label:'tar'}],
        dc_addFont: initFonts,
        dc_fontSizes:['10px', '15px', '18px', '24px', '36px', '48px' , '55px' , '64px' ,'72px'],
        dc_useHomepage: false,
        dc_telephone: false,
        dc_address: false,
        dc_mobile: false,
        dc_about: false,
        dc_useReCommender: false,
        dc_reCommenderAddPoint: 3000,
        dc_reCommenderRegisetAddPoint: 3000,
      
        dc_RegisterPoint: 3000,
        dc_terms: '',
        dc_privacy: '',
        dc_useCert: false,
        dc_selectCert: '',
        dc_certKey: '',
        dc_certSecretKey: '',
        dc_useMail: false,
        dc_colorObjectBT:['primary','secondary','success','danger','warning','info','light','dark'],
    
        // 소셜로그인
        dc_auth_isSocialLogin:false,
        dc_auth_naver: { isUse: false, publicKey: '', secretKey: '' },
        dc_auth_google: { isUse: false, publicKey: '', secretKey: '' },
        dc_auth_kakao: { isUse: false, publicKey: '', secretKey: '' },
        dc_auth_fasebook: { isUse: false, publicKey: '', secretKey: '' },
        dc_auth_instagrem: { isUse: false, publicKey: '', secretKey: '' },
        dc_auth_twiter: { isUse: false, publicKey: '', secretKey: '' },
        dc_auth_fayco: { isUse: false, publicKey: '', secretKey: '' },
        dc_auth_pass: { isUse: false, publicKey: '', secretKey: '' },
        // 소셜연동
        dc_social:{
            sf_kakao:'',
            sf_google:'',
            sf_naver:'',
            sf_naver_line:'',
            sf_instagram:'',
            sf_facebook:'',
            sf_twitter:'',
            sf_pinterest:'',
            sf_youtube:'',
            sf_github:'',
            sf_telegram:'',
            sf_twitch:'',
            sf_vimeo:'',
        },
     
        dc_useSms: false,
        dc_smsType: 'sms',
        dc_smsTokenKey: '',
     
        
        sc_company_owner: '',
        sc_company_name: '',
        sc_company_saupja_no: '',
        sc_company_tel: '',
        sc_company_fax: '',
        sc_tongsin_no: '',
        sc_company_zip: '',
        sc_company_addr: '',
        sc_company_privacy_admin_name: '',
        sc_company_privacy_admin_email: '',
        sc_delivery_company: '',
        sc_delivery_start_time: 17,
        sc_delivery_price: '2500', 
    
    
        sc_delivery_infomation: '',
    
        sc_delivery_change_infomation: '',
    
        pc_mp_carousel_time_out: 7000,
        pc_mp_carousel_skin: '',
        
        pc_lp_use_infinite_scroll: true,
        pc_dp_imgviewr: { imgviewr_skin: '' },
        pc_dp_costviewr: { title_skin: '', content_skin: '', option_skin: '' },
        pc_dp_useSetProduct: true,
        pc_etc_go_to_top: { use: true, color: '', bg: '', border: '' },
        pc_etc_go_to_next_section: { use: true, color: '', bg: '', border: '' },
        pc_etc_use_kakao_chat: true,
        pc_etc_use_naver_chat: true,
        pc_etc_use_server_chat: true,
        pc_etc_left_side: [
            'auth',
            'cart',
            'qna',
            'myoder',
            'delivery_check',
            'comunity',
            'cscenter',
            'social_fallow',
            'todat_click',
            'payment'
        ],
        pc_etc_right_side: ['auth', 'menu']
    }
}