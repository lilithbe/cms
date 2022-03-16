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

