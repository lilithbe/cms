import Sequelize from 'sequelize'
export const config = {
  no: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id:{
    type: Sequelize.STRING,
  },
  target: {
    type: Sequelize.STRING,
  },
  label: {
    type: Sequelize.STRING, 
  },
  userId: {
    type: Sequelize.STRING, 
  },
  prefix: {
    type: Sequelize.STRING,
  },

  dc_title: { type: Sequelize.STRING }, //사이트 이름
  dc_scale: { type: Sequelize.SMALLINT, defaultValue: 12 },
  dc_logoImage: { type: Sequelize.STRING, defaultValue: "/logo_dark.png" }, //사이트 로고
  dc_isLogoImage: { type: Sequelize.BOOLEAN, defaultValue: false }, //사이트 로고를 이미지로 대체할것인지 여부
  dc_mail: { type: Sequelize.STRING }, //대표이메일 주소
  dc_mailName: { type: Sequelize.STRING }, //보내는 이메일 하단에 표기될 이름
  dc_defaultFont: { type: Sequelize.STRING },
  dc_deleteContentDate: { type: Sequelize.INTEGER }, //오래된 일반게시판 컨텐츠 삭제 쿨타임(가급적..길게..2년쯤?)
  dc_userProfileChangeDate: { type: Sequelize.INTEGER }, //프로필 체인지 쿨타임
  dc_joinUserLogDelete: { type: Sequelize.INTEGER }, //로그기록 삭제 쿨타임
  dc_hotSearchTextDelete: { type: Sequelize.INTEGER }, //검색기록 삭제 쿨타임
  dc_captcha: { type: Sequelize.STRING }, //구글캡챠 키
  dc_reCaptchaKey: { type: Sequelize.STRING },
  dc_reCaptchaSecretKey: { type: Sequelize.STRING },
  dc_possibleIp: { type: Sequelize.STRING, defaultValue: "*.*.*.*" }, //접속가능 아이피
  dc_impossibleIp: { type: Sequelize.STRING, defaultValue: "none" }, //접속불가능 아이피
  dc_analytics: { type: Sequelize.STRING }, //아날리틱스
  dc_addMeta: {
    type: Sequelize.JSON,
    defaultValue: {
      isMeta: false,
      defaultTitle: "",
      defaultDescription: "",
      googleVerification: "",
      naverVerification: ""
    }
  }, //추가메타테그
  dc_naverSyndicationKey: { type: Sequelize.STRING }, //네이버 신디게이트 키
  dc_textFilter: { type: Sequelize.STRING }, //텍스트 필터링
  dc_nickNameFilter: { type: Sequelize.STRING }, //닉네임 필터링
  dc_reWriteSec: { type: Sequelize.INTEGER }, //글쓰기 쿨타임
  dc_searchLimit: { type: Sequelize.INTEGER }, //검색 쿨타임(과도한 검색 쿼리제한)

  dc_imageExtention: { type: Sequelize.JSON }, //허용가능한 이미지 확장자
  dc_videoExtention: { type: Sequelize.JSON }, //허용가능한 비디오 확장자
  dc_fileExtention: { type: Sequelize.JSON }, //허용가능한 파일 확장자
  dc_documentExtention: {
    type: Sequelize.JSON,
    defaultValue: [{ label: 'xlsx' }, { label: 'txt' }, { label: 'hwp' }, { label: 'hwpx' }, { label: 'docx' }, { label: 'dotx' }, { label: 'ppt' }, { label: 'pptx' }, { label: 'pdf' }],
  }, //허용가능한 문서파일
  dc_userImageWeight: { type: Sequelize.INTEGER, defaultValue: 50000 }, //유저이미지위젯?
  dc_userFileWeight: { type: Sequelize.INTEGER, defaultValue: 500000 },
  dc_userVideoWeight: { type: Sequelize.INTEGER, defaultValue: 5000000 },
  dc_userExcelWeight: { type: Sequelize.INTEGER, defaultValue: 500000 },
  dc_userDocumentWeight: { type: Sequelize.INTEGER, defaultValue: 500000 },
  dc_addFont: { type: Sequelize.JSON }, //추가할 폰트

  dc_gradeObject: {
    type: Sequelize.JSON,
    defaultValue: [
      { grade: 0, label: '언랭크', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 10, label: '아이언', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 20, label: '브론즈', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 30, label: '실버', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 40, label: '골드', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 50, label: '플래티넘', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 60, label: '다이아몬드', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },

      { grade: 70, label: '마스터', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 80, label: '그랜드마스터', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 90, label: '챌린저', isAdmin: false, adminJ: false, boardJ: false, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },



      { grade: 1000, label: '게시판관리자', isAdmin: true, adminJ: false, boardJ: true, groupJ: false, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 2000, label: '그룹관리자', isAdmin: true, adminJ: false, boardJ: true, groupJ: true, memberJ: false, menuJ: false, pointJ: false, voteJ: false, popupJ: false, pageJ: false },
      { grade: 3000, label: '부운영자', isAdmin: true, adminJ: false, boardJ: true, groupJ: true, memberJ: true, menuJ: true, pointJ: true, voteJ: true, popupJ: true, pageJ: true },
      { grade: 5000, label: '운영자', isAdmin: true, adminJ: true, boardJ: true, groupJ: true, memberJ: true, menuJ: true, pointJ: true, voteJ: true, popupJ: true, pageJ: true },
      { grade: 9999, label: '최고관리자', isAdmin: true, adminJ: true, boardJ: true, groupJ: true, memberJ: true, menuJ: true, pointJ: true, voteJ: true, popupJ: true, pageJ: true },
    ]
  },
  dc_colorObjectBT: { type: Sequelize.JSON },
  dc_levelUpRule: { type: Sequelize.JSON },

  dc_expContentWrite: { type: Sequelize.INTEGER, defaultValue: 10 },
  dc_expContentDelete: { type: Sequelize.INTEGER, defaultValue: -10 },
  dc_expCommentWrite: { type: Sequelize.INTEGER, defaultValue: 10 },
  dc_expCommentDelete: { type: Sequelize.INTEGER, defaultValue: -10 },
  dc_expGoodClick: { type: Sequelize.INTEGER, defaultValue: 10 },
  dc_expGoodCancle: { type: Sequelize.INTEGER, defaultValue: -10 },
  dc_expBadClick: { type: Sequelize.INTEGER, defaultValue: -10 },
  dc_expBadCancle: { type: Sequelize.INTEGER, defaultValue: 10 },
  dc_expEventClick: { type: Sequelize.JSON },//event Value , point

  // 회원가입시 필수조건
  dc_isPoint: { type: Sequelize.BOOLEAN, defaultValue: false }, //포인트 사용 여부
  dc_isReCommender: { type: Sequelize.BOOLEAN, defaultValue: false }, //추천인을 사용할것인가
  dc_loginPoint: { type: Sequelize.INTEGER }, //로그인시 지급 포인트
  dc_reCommenderAddPoint: { type: Sequelize.INTEGER }, //추천인사용시 회원가입자에게 줄 포인트
  dc_reCommenderRegisetAddPoint: { type: Sequelize.INTEGER }, //추천인사용시 추천인에게 줄 포인트
  dc_RegisterPoint: { type: Sequelize.INTEGER }, //회원가입시 줄 포인트

  dc_isHomepage: { type: Sequelize.BOOLEAN, defaultValue: false },
  dc_isTelephone: { type: Sequelize.BOOLEAN, defaultValue: false },
  dc_isAddress: { type: Sequelize.BOOLEAN, defaultValue: false },
  dc_isMobile: { type: Sequelize.BOOLEAN, defaultValue: false },
  dc_isAbout: { type: Sequelize.BOOLEAN, defaultValue: false },
  dc_isMail: { type: Sequelize.BOOLEAN, defaultValue: false }, //회원가입을 email타입으로 만들것인가

  dc_terms: { type: Sequelize.TEXT("long") }, //약관html
  dc_privacy: { type: Sequelize.TEXT("long") }, //개인정보취급방침html

  dc_isCert: { type: Sequelize.BOOLEAN, defaultValue: false }, //회원가입시 인증절차를 따를것인가
  dc_selectCert: { type: Sequelize.STRING }, //회원가입시 인증선택(몇가지 회사가 존재함)
  dc_certKey: { type: Sequelize.STRING }, //해당 인증회사의 인증비
  dc_certSecretKey: { type: Sequelize.STRING }, //해당 인증회사의 인증비밀키

  // auth
  dc_auth_isSocialLogin: { type: Sequelize.BOOLEAN, defaultValue: false },
  dc_auth_naver: { type: Sequelize.JSON }, //네이버회원가입 정보(키,비밀키)
  dc_auth_google: { type: Sequelize.JSON }, //구글회원가입 정보(키,비밀키)
  dc_auth_kakao: { type: Sequelize.JSON }, //카카오회원가입 정보(키,비밀키)
  dc_auth_fasebook: { type: Sequelize.JSON }, //페이스북회원가입 정보(키,비밀키)
  dc_auth_twiter: { type: Sequelize.JSON }, //트위터회원가입 정보(키,비밀키)
  dc_auth_fayco: { type: Sequelize.JSON }, //페이코회원가입 정보(키,비밀키)
  dc_auth_pass: { type: Sequelize.JSON }, //페스회원가입 정보(키,비밀키)
  dc_auth_instagrem: { type: Sequelize.JSON }, //인스타그램



  // 문자보내기
  dc_useSms: { type: Sequelize.BOOLEAN, defaultValue: false },
  dc_smsType: { type: Sequelize.STRING },
  dc_smsTokenKey: { type: Sequelize.STRING },

  dc_navgation: { type: Sequelize.JSON },

  dc_customPageData: { type: Sequelize.JSON },
  dc_mainPageData: { type: Sequelize.JSON },
  dc_authPageData: { type: Sequelize.JSON },

  dc_navConfig: { type: Sequelize.JSON },
  dc_footerConfig: { type: Sequelize.JSON },
  // 회사정보
  sc_company_owner: { type: Sequelize.STRING }, //대표자명
  sc_company_name: { type: Sequelize.STRING }, //회사명
  sc_company_saupja_no: { type: Sequelize.STRING }, //사업자번호
  sc_company_tel: { type: Sequelize.STRING }, //회사대표번호
  sc_company_fax: { type: Sequelize.STRING }, //회사대표팩스번호
  sc_tongsin_no: { type: Sequelize.STRING }, //통신판매번호
  sc_company_zip: { type: Sequelize.STRING }, //우편변호
  sc_company_addr: { type: Sequelize.STRING }, //주소
  sc_company_privacy_admin_name: { type: Sequelize.STRING }, //개인정보 관리자 이름
  sc_company_privacy_admin_email: { type: Sequelize.STRING }, //개인정보 관리자 이메일주소
  sc_delivery_company: { type: Sequelize.STRING }, //배송사 이름
  sc_delivery_start_time: { type: Sequelize.INTEGER }, //당일배송 마감시간
  sc_delivery_price: { type: Sequelize.TEXT }, //배송비
  sc_delivery_infomation: { type: Sequelize.STRING }, //배송정보
  sc_delivery_change_infomation: { type: Sequelize.STRING }, //배송지 변경 정보

  pc_mp_carousel_time_out: { type: Sequelize.INTEGER }, //케러셀 회전목마 롤링타임
  pc_mp_carousel_skin: { type: Sequelize.STRING }, //케러셀 회전목마 스킨

  dc_isGoogle_ad: { type: Sequelize.BOOLEAN, defaultValue: false },
  dc_google_ad_client: { type: Sequelize.STRING, defaultValue: '' },
  dc_social: { type: Sequelize.JSON },

  created: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
};
