const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
const API =`${BASE_URL}/api`
export const PUBLIC_URL = BASE_URL
// 계정관련
const AUTH =`${API}/auth`
export const LOGIN = `${AUTH}/login`
export const REGISTER = `${AUTH}/register`
export const EMAIL_CHECK=`${AUTH}/email_check`
export const PROFILE = `${AUTH}/profile`
export const SOCIAL_JOIN= `${AUTH}/social_join`
export const PROFILE_UPDATE=`${AUTH}/profile-update`
export const SESSION_CHECK=`${AUTH}/session-check`
export const GET_IP=`${AUTH}/getip`
//사이트 진입시 컨피그 상태체크
const CHECK = `${API}/check`
export const CONFIG = `${CHECK}/config`
//콘텐츠관련
const CONTENT = `${API}/content`
export const GROUP_LIST = `${CONTENT}/group-list` //그룹의 모듵 컨피그 목록 요청
export const GROUP_CONTENT_LIST = `${CONTENT}/group-content-list` //그룹에 속한 모든 게시판의 게시물 목록 요청
export const BOARD_LIST = `${CONTENT}/board-list` //보드의 모든 컨피그 목록 요청
export const LIST = `${CONTENT}/list` //특정 게시판의 게시물 목록 요청
export const MY_LIST = `${CONTENT}/mylist` //접속자의 게시물 목록 요청

export const WRITE = `${CONTENT}/write` //특정 게시판의 게시물 작성 요청
export const UPDATE = `${CONTENT}/update`//특정 게시판의 게시물 수정 요청
export const CONTENT_DELETE = `${CONTENT}/delete`//특정 게시판의 게시물 삭제 요청
export const READ = `${CONTENT}/read` //특정게시물의 모든 정보 요청

export const COMMENTS_LIST = `${CONTENT}/comment-list` //특정게시물의 대댓글 리스트
export const COMMENTS_WRITE = `${CONTENT}/comment-write` //특정게시물의 대댓글 작정
export const COMMENTS_DELETE = `${CONTENT}/comment-delete` //특정게시물의 대댓글 삭제
export const COMMENTS_UPDATE = `${CONTENT}/comment-update` //특정게시물의 대댓글 수정

export const CONTENT_BG = `${CONTENT}/content-good-bad`// 좋아요 싫어요 이벤트
//page관련
const PAGE = `${API}/page`
export const PAGE_ADMIN_CREATE = `${PAGE}/create` //
export const PAGE_ADMIN_DELETE = `${PAGE}/delete` //
export const PAGE_ADMIN_UPDATE= `${PAGE}/update` //
export const PAGE_LIST = `${PAGE}/list` //
//콘텐츠관련
const WIDGET = `${API}/widget`
export const WIDGET_ADMIN_CREATE = `${WIDGET}/create` //
export const WIDGET_ADMIN_UPDATE = `${WIDGET}/update` //
export const WIDGET_ADMIN_DELETE = `${WIDGET}/delete` //
//파일관련
const FILE= `${API}/file` //
const UPLOAD = `${FILE}/upload` //
export const IMAGE_UPLOAD = `${UPLOAD}/azure/images` 
export const FILE_UPLOAD =`${FILE}/upload`




export const THUMNAIL_UPLOAD = `${UPLOAD}/thumnail` 
export const MY_IMAGE_LIST = `${FILE}/list/myimagelist`
export const MY_FILE_LIST = `${FILE}/list/`
export const XLSX_UPLOAD = `${FILE}/xlsx`
export const FILE_DOWNLOAD= `${FILE}/download/`

export const EDITOR_FILE_UPLOAD=`${FILE}/editor/upload`
export const EDITOR_FILE_DELETE=`${FILE}/editor/delete`



//일정관련
const CALENDAR =`${API}/calendar`
export const CALENDAR_EVENT_CREATE =`${CALENDAR}/event/create`
export const CALENDAR_EVENT_LIST =`${CALENDAR}/event/list`
export const CALENDAR_EVENT_DELETE =`${CALENDAR}/event/delete`
export const CALENDAR_EVENT_UPDATE =`${CALENDAR}/event/update`

//팝업
const POPUP =`${API}/popup`
export const POPUP_CREATE =`${POPUP}/create`
export const POPUP_USE_LIST =`${POPUP}/use_list`
export const POPUP_ALL_LIST =`${POPUP}/all_list`
export const POPUP_DELETE =`${POPUP}/delete`
export const POPUP_UPDATE =`${POPUP}/update`

//일정관련
const VOTE =`${API}/vote`
export const VOTE_CREATE =`${VOTE}/create`
export const VOTE_LIST =`${VOTE}/list`
export const VOTE_DELETE =`${VOTE}/delete`
export const VOTE_UPDATE =`${VOTE}/update`
export const VOTE_VIEW =`${VOTE}/view`


// 상품 카테고리
const shop = `${API}/shop`
export const ROOT_CATEGORY= `${shop}/category/root-list`
export const CHILDREN_CATEGORY= `${shop}/category/children-list`
export const PRODUCTION_CATEGORY_GETCOUNT= `${shop}/category/getcount`
export const PRODUCTION_LIST_DATEUP=`${shop}/list/dateup`

export const CTEGORY_PRODUCTION=`${shop}/list/category`

//상품 업로드
export const BULK_UPLOAD= `${shop}/upload/bulk`

//관리자 메뉴
const ADMIN = `${API}/admin`
const ADMIN_MEMBER = `${ADMIN}/member`
const ADMIN_CONFIG = `${ADMIN}/config`
const ADMIN_CONTENT = `${ADMIN}/content`


//회원관리
export const ADMIN_MEMBER_LIST =`${ADMIN_MEMBER}/list`
export const ADMIN_MEMBER_ADMIN_LIST =`${ADMIN_MEMBER}/admin_list`
export const ADMIN_MEMBER_PROFILE =`${ADMIN_MEMBER}/profile`
export const ADMIN_MEMBER_DELETE =`${ADMIN_MEMBER}/delete`
export const ADMIN_MEMBER_UPDATE_DATA =`${ADMIN_MEMBER}/update/data`
export const ADMIN_MEMBER_UPDATE_DATAS =`${ADMIN_MEMBER}/update/datas`
export const ADMIN_MEMBER_UPDATE_PASSWORD =`${ADMIN_MEMBER}/update/password`
//컨피그관리
export const ADMIN_CONFIG_DATA =`${ADMIN_CONFIG}/data`
export const ADMIN_CONFIG_UPDATE =`${ADMIN_CONFIG}/update`
export const ADMIN_CONFIG_NAVGATION =`${ADMIN_CONFIG}/navgation`
export const ADMIN_CONFIG_NAVGATION_UPDATE =`${ADMIN_CONFIG}/navgation-update`
//그룹,게시판 관리
export const ADMIN_CONTENT_GROUP_LIST =`${ADMIN_CONTENT}/group-list`
export const ADMIN_CONTENT_GROUP_CREATE =`${ADMIN_CONTENT}/group-create`
export const ADMIN_CONTENT_GROUP_DELETE =`${ADMIN_CONTENT}/group-delete`
export const ADMIN_CONTENT_GROUP_UPDATE =`${ADMIN_CONTENT}/group-update`
export const ADMIN_CONTENT_BOARD_LIST =`${ADMIN_CONTENT}/board-list`
export const ADMIN_CONTENT_BOARD_CREATE =`${ADMIN_CONTENT}/board-create`
export const ADMIN_CONTENT_BOARD_DELETE =`${ADMIN_CONTENT}/board-delete`
export const ADMIN_CONTENT_BOARD_UPDATE =`${ADMIN_CONTENT}/board-update`

//벌크업로드
export const ADMIN_BULK_UPDATE = `${ADMIN}/bulk/update`


// 
const page =`${API}/page`
export const GET_PAGE_DATA = `${page}/get_data/` //:path
export const SET_PAGE_DATA = `${page}/set_data/` //:path



const widget =`${API}/widget`
export const GET_WIDGET_DATA = `${widget}/get_data/` //:widget id
export const SET_WIDGET_DATA = `${widget}/set_data/` //:widget id
export const DELETE_WIDGET = `${widget}/delete/` //:widget id