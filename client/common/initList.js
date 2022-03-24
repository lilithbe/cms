import moment from "moment";

export const carouselInit={
    type:'carousel',
    value:'carousel',
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
export const initGroup={
    contentType:"normar",
    adminData: {},
    badGrade: 0,
    boardType: "",
    commentGrade: 0,
    contentCount: 0,
    createGrade: 0,
    createrData: {},
    defaultThumbnail: "/blog-thumbs/thumbnail_01.png",
    defaultTitleImage: "/blog-thumbs/title_01.png",
    deleteGrade: 0,
    editor: "default",
    fileUploadConfig: [],
    fileUploadCount: 0,
    goodGrade: 0,
    groupLaw: false,
    groupStatus: "normal",
    groupType: "basic",
    isThumbnail: false,
    isUse: true,
    label: "",
    labelTag:"",
    listGrade: 0,
    recommentGrade: 0,
    theme: [],
    updateGrade: 0,
    value: "",
    viewGrade: 0,
    isMeta:true,
    pageMeta:{
        title:'',
        robots:true,
        description:'',
    },
    editorType:{
        contentType:'single',
        isImage:true,
        isVideo:true,
        isTag:true,
        editorType:'quill',
        height:500
    },
    carouselData:carouselInit,
}
export const initBoard={
    contentType:"normar",
    adminData: {},
    badGrade: 0,
    boardType: "freeBoard",

    commentGrade: 0,
    contentCount: 0,
    createGrade: 0,
 
    createrData: {},
 
    defaultThumbnail: "/blog-thumbs/thumbnail_01.png",
    defaultTitleImage: "/blog-thumbs/title_01.png",
    deleteGrade: 0,
    editor: "default",
    fileUploadConfig: [],
    fileUploadCount: 0,
    groupId:'nongroup',
    goodGrade: 0,
    groupLaw: false,
    groupStatus: "normal",
    groupType: "basic",
    isThumbnail: false,
    isUse: true,
    label: "",
    labelTag:"",
    listGrade: 0,
    recommentGrade: 0,
    theme: [],
    updateGrade: 0,
    value: "",
    viewGrade: 0,
    editorType:{
        contentType:'single',
     
        isImage:true,
        isVideo:true,
        isTag:true,
        editorType:'quill',
        height:500
    },
    carouselData:carouselInit,
}
export  const boardTypeOptions=[
    {label:'자유 게시판', value:'freeBoard'},
    {label:'비디오 게시판', value:'videoBoard'},
    {label:'이미지 게시판', value:'imageBoard'},
    {label:'판매 게시판', value:'saleBoard'},
    {label:'구매 게시판', value:'buyBoard'},
    {label:'질문답변 게시판', value:'qnaBoard'},
    {label:'설문 게시판', value:'voteBoard'},
    {label:'코드 게시판', value:'codeBoard'},
]
export const initPost={
    isMobile: false,
    subject: "",
    content: "",
    string: "",
    arrayContent: [],
    writeData: {
        userImage:'',
    },
    writeId: "",
    thumbnail: {},
    isThumbnail: false,
    uploadFiles: [],
    goodUser: [],
    badUser: [],
    price: 0,
    unit: "point",
    isVote: false,
    options: [],
    start: moment(),
    end: moment(),
    isNotice: false, 
    editorFiles: [],
    imageBoardData: [],
    videoBoardData: [],
    saleBoardData: [],
    buyBoardData: [],
    qnaBoardData: [],
    voteBoardData: [],
    codeBoardData:[]
}

export const fontSizeOptions=[
    {label:'8px',value:'8px'},
    {label:'10px',value:'10px'},
    {label:'12px',value:'12px'},
    {label:'14px',value:'14px'},
    {label:'16px',value:'16px'},
    {label:'18px',value:'18px'},
    {label:'20px',value:'20px'},
    {label:'22px',value:'22px'},
    {label:'24px',value:'24px'},
    {label:'26px',value:'26px'},
    {label:'28px',value:'28px'},
    {label:'30px',value:'30px'},
    {label:'32px',value:'32px'},
    {label:'35px',value:'35px'},
    {label:'40px',value:'40px'},
    {label:'45px',value:'45px'},
    {label:'50px',value:'50px'},
    {label:'55px',value:'55px'},
    {label:'60px',value:'60px'},
    {label:'70px',value:'70px'},
    {label:'80px',value:'80px'},
    {label:'90px',value:'90px'},
    {label:'100px',value:'100px'}
]
export const boolOptions=[
    {label:'used',value:true},
    {label:'not used',value:false},
]
export const shadowSizeOptions=[
    {label:'0px',value:'0px'},
    {label:'1px',value:'1px'},
    {label:'2px',value:'2px'},
    {label:'3px',value:'3px'},
    {label:'4px',value:'4px'},
    {label:'5px',value:'5px'},
    {label:'6px',value:'6px'},
    {label:'7px',value:'7px'},
    {label:'8px',value:'8px'},
    {label:'9px',value:'9px'},
    {label:'10px',value:'10px'},
    {label:'12px',value:'12px'},
    {label:'14px',value:'14px'},
    {label:'16px',value:'16px'},
    {label:'18px',value:'18px'},
    {label:'20px',value:'20px'},
    {label:'22px',value:'22px'},
    {label:'24px',value:'24px'},
    {label:'26px',value:'26px'},
    {label:'28px',value:'28px'},
    {label:'30px',value:'30px'},
    {label:'40px',value:'40px'},
    {label:'50px',value:'50px'},
    {label:'60px',value:'60px'},
    {label:'70px',value:'70px'},
    {label:'80px',value:'80px'},
    {label:'90px',value:'90px'},
    {label:'100px',value:'100px'},
]
export const alignOptions=[
    {label:'left',value:'left'},
    {label:'center',value:'center'},
    {label:'right',value:'right'},
]

export const navgationDefaultSettingOptions=[
    {label:'accountButtonPosition', key:'accountButtonPosition', defaultValue:'navbar', inputType:'accountSelect'},
    {label:'isScrollMovingNavFixed', key:'isScrollMovingNavFixed', defaultValue:true, inputType:'bool'},
    {label:'isNavBrand', key:'isNavBrand', defaultValue:true, inputType:'bool'},
    {label:'isNavBrandText', key:'isNavBrandText', defaultValue:true, inputType:'bool'},
    {label:'isSearchButton', key:'isSearchButton', defaultValue:true, inputType:'bool'},
    {label:'isFixedValueCopy', key:'isFixedValueCopy', defaultValue:true, inputType:'bool'},
    {label:'isHomeButton', key:'isHomeButton', defaultValue:true, inputType:'bool'},
]
export const navgationOptionsSettingArr = [
    { label: 'navbar Brand', key: 'navbarBrand', defaultValue: '/logo-light.png', inputType: 'image' },
    { label: 'navbar Brand Text', key: 'navbarBrandText', defaultValue: '', inputType: 'inputtext' },
    { label: 'navbar Font Family', key: 'navbarFontFamily', defaultValue: 'NIXGONL-Vb', inputType: 'fontfamily' },
    { label: 'navbar Button Position', key: 'navbarButtonPosition', defaultValue: 'center', inputType: 'align' },
    { label: 'navbar Padding Y', key: 'navbarPaddingY', defaultValue: "py-0", inputType: 'padding' },
    { label: 'navbar Background Color', key: 'navbarBgColor', defaultValue: '#000000', inputType: 'color' },
    { label: 'navbar Hover Background Color', key: 'navbarHoverBgColor', defaultValue: '#000000', inputType: 'color' },
    { label: 'navbar Focus Background Color', key: 'navbarFocusBgColor', defaultValue: '#000000', inputType: 'color' },
    { label: 'navbar Font Color', key: 'navbarColor', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'navbar Font HoverColor', key: 'navbarHoverColor', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'navbar Font Focus Color', key: 'navbarFocusColor', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'navbar Font Size', key: 'navbarFontSize', defaultValue: '15px', inputType: 'fontsize' },
    { label: 'is Navbar Font Shadow', key: 'isNavbarFontShadow', defaultValue: false, inputType: 'bool' },
    { label: 'navbar Font Shadow', key: 'navbarFontShadow', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'navbar Hover Font Shadow', key: 'navbarHoverFontShadow', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'navbar Focus Font Shadow', key: 'navbarFocusFontShadow', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'navbar Font Shadow Weight', key: 'navbarFontShadowWeight', defaultValue: '0px', inputType: 'shadowsize' }
]
export const fixedNavgationOptionsSettingArr = [
    { label: 'fixed Navbar Brand', key: 'fixedNavbarBrand', defaultValue: '/logo-light.png', inputType: 'image' },
    { label: 'fixed Navbar Brand Text', key: 'fixedNavbarBrandText', defaultValue: '', inputType: 'inputtext' },
    { label: 'fixed Navbar Font Family', key: 'fixedNavbarFontFamily', defaultValue: 'NIXGONL-Vb', inputType: 'fontfamily' },
    { label: 'fixed Navbar Button Position', key: 'fixedNavbarButtonPosition', defaultValue: 'center', inputType: 'align' },
    { label: 'fixed Navbar Padding Y', key: 'fixedNavbarPaddingY', defaultValue: "py-0", inputType: 'padding' },
    { label: 'fixed Navbar Background Color', key: 'fixedNavbarBgColor', defaultValue: '#000000', inputType: 'color' },
    { label: 'fixed Navbar Hover Background Color', key: 'fixedNavbarHoverBgColor', defaultValue: '#000000', inputType: 'color' },
    { label: 'fixed Navbar Focus Background Color', key: 'fixedNavbarFocusBgColor', defaultValue: '#000000', inputType: 'color' },
    { label: 'fixed Navbar Color', key: 'fixedNavbarColor', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'fixed Navbar Hover Color', key: 'fixedNavbarHoverColor', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'fixed Navbar Focus Color', key: 'fixedNavbarFocusColor', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'fixed Navbar Font Size', key: 'fixedNavbarFontSize', defaultValue: '15px', inputType: 'fontsize' },
    { label: 'is Fixed Navbar Font Shadow', key: 'isFixedNavbarFontShadow', defaultValue: false, inputType: 'bool' },
    { label: 'fixed Navbar Font Shadow', key: 'fixedNavbarFontShadow', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'fixed Navbar Hover FontShadow', key: 'fixedNavbarHoverFontShadow', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'fixed Navbar Focus FontShadow', key: 'fixedNavbarFocusFontShadow', defaultValue: '#ffffff', inputType: 'color' },
    { label: 'fixed Navbar Font ShadowWeight', key: 'fixedNavbarFontShadowWeight', defaultValue: '0px', inputType: 'shadowsize' }
]
export const topOptionsSettingArr = [
    { label: 'isTopMenu', key: 'isTopMenu', defaultValue: false, inputType: 'bool' },
    { label: 'isWelcomMent', key: 'isWelcomMent', defaultValue: true, inputType: 'bool' },
    { label: 'isToday', key: 'isToday', defaultValue: true, inputType: 'bool' },
    { label: 'isWatch', key: 'isWatch', defaultValue: true, inputType: 'bool' },
    { label: 'isWeather', key: 'isWeather', defaultValue: true, inputType: 'bool' },
    { label: 'isQRCode', key: 'isQRCode', defaultValue: true, inputType: 'bool' },
    { label: 'isRSS', key: 'isRSS', defaultValue: true, inputType: 'bool' },
    { label: 'isSocialButtons', key: 'isSocialButtons', defaultValue: true, inputType: 'bool' }
]
export const headerOptionsSettingArr = [
    { label: 'isHead', key: 'isHead', defaultValue: false, inputType: 'bool', },
    { label: 'isHeadLogoText', key: 'isHeadLogoText', defaultValue: true, inputType: 'bool', },

    { label: 'headLogo', key: 'headLogo', defaultValue: '/logo-light.png', inputType: 'image', },
    { label: 'headLogoText', key: 'headLogoText', defaultValue: '', inputType: 'inputtext', },
    { label: 'headBackgroundColor', key: 'headBackgroundColor', defaultValue: '#ffffff', inputType: 'color', },
    { label: 'headBackgroundImage', key: 'headBackgroundImage', defaultValue: '', inputType: 'image', },
    { label: 'headFontSize', key: 'headFontSize', defaultValue: '3rem', inputType: 'fontsize', },
    { label: 'headTextColor', key: 'headTextColor', defaultValue: '#000000', inputType: 'color', },
]

export const bootstrapPaddingOptions = [
    { label: '0', value: 'py-0' },
    { label: '1', value: 'py-1' },
    { label: '2', value: 'py-2' },
    { label: '3', value: 'py-3' },
    { label: '4', value: 'py-4' },
    { label: '5', value: 'py-5' },
]



export const footerArray = [
    { label: 'footerLogo', key: 'footerLogo', inputType: 'image' },
    { label: 'isMap', key: 'isMap', inputType: 'bool' },
    { label: 'isContact', key: 'isContact', inputType: 'bool' },
    { label: 'isCompanyData', key: 'isCompanyData', inputType: 'bool' },
    { label: 'isTerms', key: 'isTerms', inputType: 'bool' },
    { label: 'isPrivacy', key: 'isPrivacy', inputType: 'bool' },
]
export const socialArray = [
    { label: 'kakao', key: 'sf_kakao' },
    { label: 'google', key: 'sf_google' },
    { label: 'naver', key: 'sf_naver' },
    // { label: 'naver_line', key: 'sf_naver_line' },
    { label: 'instagram', key: 'sf_instagram' },
    { label: 'facebook', key: 'sf_facebook' },
    { label: 'twitter', key: 'sf_twitter' },
    { label: 'pinterest', key: 'sf_pinterest' },
    { label: 'youtube', key: 'sf_youtube' },
    { label: 'github', key: 'sf_github' },
    { label: 'telegram', key: 'sf_telegram' },
    { label: 'twitch', key: 'sf_twitch' },
    { label: 'vimeo', key: 'sf_vimeo' },
]
export const companyArray = [
    { label: 'sc_company_owner', key: 'sc_company_owner' },
    { label: 'sc_company_name', key: 'sc_company_name' },
    { label: 'sc_company_saupja_no', key: 'sc_company_saupja_no' },
    { label: 'sc_company_tel', key: 'sc_company_tel' },
    { label: 'sc_company_fax', key: 'sc_company_fax' },
    { label: 'sc_tongsin_no', key: 'sc_tongsin_no' },
    { label: 'sc_company_zip', key: 'sc_company_zip' },
    { label: 'sc_company_addr', key: 'sc_company_addr' },
    { label: 'sc_company_privacy_admin_name', key: 'sc_company_privacy_admin_name' },
    { label: 'sc_company_privacy_admin_email', key: 'sc_company_privacy_admin_email' },
]