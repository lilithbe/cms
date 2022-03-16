import React,{ useState, useEffect ,useMemo, useRef , useCallback} from 'react'
import { connect } from 'react-redux'
import { setConfig,setBoard,setGroup , setPopup} from '../../redux'
import AdminContainerTemplate from '../../components/template/AdminContainerTemplate'
import PageSelect from '../../components/formControl/PageSelect'
import { Calendar as PC } from 'primereact/calendar';
import moment from 'moment';
import { Dialog } from 'primereact/dialog';
import {BoolCheckBox} from '../../components/formControl'
import { Sidebar } from 'primereact/sidebar';

import ImageViewTemplate from '../../components/template/ImageViewTemplate'
import { postApi } from '../../api'
import { POPUP_CREATE, POPUP_DELETE, POPUP_UPDATE } from '../../common'
// import WriteEditor from '../../components/editor/WriteEditor'
import dynamic from 'next/dynamic'
const WriteEditor =  dynamic(()=>import('../../components/editor/WriteEditor'),
{ssr:false})


const PopupPage = ({configData , boardData,authData,groupData, setConfig, setBoard,setGroup, popupData , setPopup}) => {
    const selectInit ={ 
        label:"팝업의 이름을 작성합니다.",
        src:"",
        content:"",
        x:0,y:0,
        width:400,
        height:400,
        isTodayClose:true,
        start:new Date(),
        end:moment().add(10, 'days').toDate(),
        url:"",
        isUse:true,
        submitType:"create"
    }
   
    const [isLoading, setIsLoading] = useState(false)
    const [popupList, setPopupList] = useState([])

   const [isEditor, setIsEditor] = useState(false)
   const [isStartOpen, setIsStartOpen] = useState(false)
   const [isEndOpen, setIsEndOpen] = useState(false)
   const [isUrl, setIsUrl] = useState(false)
   const [isImageOpen, setIsImageOpen] = useState(false)
   const [selectItem, setSelectItem] = useState(selectInit)
   useEffect(() => {
    console.log(popupData)
    setPopupList(popupData.list)  
   }, [ popupData])
    const onAddPopupHandler = (e) => {
        e.preventDefault()
        setSelectItem(selectInit)
        setIsEditor(true)
    }
    
    const contentHandler = useCallback((value) => {
        setSelectItem({...selectItem,content:value})
      }, [selectItem]);

      const submitHandler = (e) => {
          e.preventDefault()
          postApi(setIsLoading,
            selectItem.submitType==='create'?
            POPUP_CREATE:POPUP_UPDATE,(res)=>{
            setPopupList(res.data.list)
            setPopup(res.data.list)
            setSelectItem(selectInit)
            setIsEditor(false)
          },selectItem,authData.userToken)
      }

    const deleteHandler = (itemValue) => {
      
        postApi(setIsLoading,POPUP_DELETE,(res)=>{
          setPopup(res.data.list)
          setPopupList(res.data.list)
          setSelectItem(selectInit)
          setIsEditor(false)
        },itemValue,authData.userToken)
    }
      const updateHandler = (itemValue) => {   
        setSelectItem({...itemValue,submitType:'update'})
        setIsEditor(true)
      }
      const toast = useRef(null)
      const [isInfo, setIsInfo] = useState(true)
 return (
   <AdminContainerTemplate toast={toast} adminKey="popupJ" isLoading={isLoading} icon={"bi bi-window-stack"} title="팝업 설정">
     <Dialog header="Infomation" visible={isInfo} onHide={()=>{setIsInfo(false)}} style={{width:"44rem"}}>
      <div className='fs-4 text-center mb-2'>팝업창 안내입니다.</div>
      <ol>
     <li> 팝업생성 버튼을 눌러 오브젝트를 활성화 합니다.</li>
     <li> 팝업의 이름을 정의합니다.</li>
     <li> 팝업의 시작과 종료일정을 정의합니다.</li>
     <li> 팝업창의 넓이와 높이를 정의합니다.</li>
     <li> 팝업창이 등장할 위치를 정의합니다. x : 가로축 y:세로축</li>
     <li> 오늘하루 그만보기 버튼의 생성을 설정 합니다. <br/>닫기 버튼은 항상 생성됩니다.<br/>
        오늘하루 그만보기 버튼이 없다면 새로고침을 할때 항상 등장 합니다.<br/> 
        가급정 오늘하루 그만보기 버튼을 활성화 하여 이용자의 편의를 높여주는것이 좋습니다.</li>
        <li> 팝업창을 클릭할경우 이동할 경로를 설정합니다. <br/>
        사이트 내에서 선택하기 버튼을 통해 자동입력을 추천합니다.<br/>
          타 사이트의 경우 직접 입력을 합니다.<br/> 이때 http 또는 https가 꼭 앞에 있는 완전한 URL 입력을 해야합니다.</li>
          <li> 팝업의 배경 이미지를 설정 합니다. 또는 배경색상을 설정합니다.</li>
          <li> 팝업의 이미지에 내용이 있을경우는 바로 생성합니다.</li>
          <li>  팝업의 글을 첨부하고자 할때에는 에디터를 이용하여 내용을 입력합니다.</li>
          <li>  끝으로 상단에 저장 버튼을 누르게 되면 좌측에 팝업 목록에 추가됩니다.</li>
          <li>  삭제는 리스트 목록을 통해 가능합니다.</li>
          <li>  리스트의 남은 일정을 클릭을 통해 편집이 가능합니다.</li>
      </ol>
      
     </Dialog>
     <div className="row">
       <div className="col-3 border-end" style={{minHeight:"calc(100vh - 12rem)"}}>
           {popupList.length >0?popupList.map((item,i)=>{
               console.log()
               return(
                   <div key={i} className='card theme-setup border'>
                  
                   <div className='row card-body'>
                   <div  className='col-12 fs-5 fw-bold fst-italic'>
                        {item.label}
                   </div>
                       <div  className='col' style={{fontSize:"11px"}}>
                       <div >{moment(item.start).format('YYYY-MM-DD a h:mm') } ~</div>
                     {moment(item.end).format('YYYY-MM-DD a h:mm') }
                       </div>
                       <div  className='col-4 '>
                           <div className=' btn-group w-100'>
                            <button className='btn btn-primary btn-sm '  onClick={()=>{updateHandler(item)}}>{Math.abs(moment.duration(moment(item.start).diff(moment(item.end))).asDays())}일</button>
                            <button className='btn btn-info btn-sm ' onClick={()=>{deleteHandler(item)}}><i className='bi bi-trash'/></button>
                           </div>
                      
                       </div>
                   </div>
                  
                   </div>
               )
           }):null}
       </div>
       <div className="col">
           <form>
           <div className='border-bottom'>
             <div className='btn-group mb-1'>
                 {isEditor?<button className='btn btn-primary btn-sm' onClick={submitHandler}><i className='bi bi-save' />저장</button>
                 :  <button className='btn btn-primary btn-sm' onClick={onAddPopupHandler}><i className='bi bi-plus' />팝업생성</button>}
               
             </div>
         </div>
        {isEditor?
          <div>
          <div className='card theme-setup'>
              <div className='card-body'>
              <div className='mb-1'>
                 <div className='input-group input-group-sm mb-1'>
                     <div className='btn btn-primary' >팝업 제목</div>
                     <input className='form-control form-control-sm' type={"text"} value={selectItem.label}
                      onChange={(e) => { setSelectItem({...selectItem,label:e.target.value}) }}
                       />
                 </div>
                 <div className='input-group'>
                     <button className='btn btn-primary btn-sm' onClick={(e)=>{
                      e.preventDefault();
                      setIsStartOpen(!isStartOpen)
                      }}><i className='bi bi-calendar' />{moment(selectItem.start).format("YYYY-MM-DD")}</button>
                         <span className='mx-3'>~</span>
                     <button className='btn btn-primary btn-sm' onClick={(e)=>{
                      e.preventDefault();
                      setIsEndOpen(!isEndOpen)
                         }}><i className='bi bi-calendar2'/>{moment(selectItem.end).format("YYYY-MM-DD")}</button>
                     <span className='mx-3'>넓이</span>
                     <input className='form-control form-control-sm' type={"number"}
                       value={selectItem.width} onChange={(e) => { setSelectItem({...selectItem,width:e.target.value}) }} />
                     <span className='mx-3'>높이</span>
                     <input className='form-control form-control-sm' type={"number"}
                       value={selectItem.height} onChange={(e) => { setSelectItem({...selectItem,height:e.target.value}) }} />
                     <span className='mx-3'>x 축</span>
                     <input className='form-control form-control-sm' type={"number"}
                       value={selectItem.x} onChange={(e) => { setSelectItem({...selectItem,x:e.target.value}) }} />
                     <span className='mx-3'>y 축</span>
                     <input className='form-control form-control-sm' type={"number"}
                       value={selectItem.y} onChange={(e) => { setSelectItem({...selectItem,y:e.target.value}) }} />
                 </div>
                 <div className='row mt-1'>
                     <div className='col-1 pt-0'>
                     <button className='btn btn-primary btn-sm w-100' onClick={(e)=>{
                        e.preventDefault()
                        setIsImageOpen(true)}}><i className='bi bi-image' />이미지</button>  
                     </div>
                     <div className='col-6 pt-0'>
                         <div className='input-group input-group-sm'>
                         <div className='btn btn-primary'><i className='bi bi-link'/></div>
                         <input className='form-control form-control-sm' type={"text"}
                         value={selectItem.url} onChange={(value) => { setSelectItem({...selectItem,url:value}) }}
                         />
                         <button className='btn btn-primary' onClick={(e)=>{
                            e.preventDefault()
                            setIsUrl(true)}}><i className='bi bi-save2' />사이트내에서 선택하기</button>
                         </div>
                     </div>
                     <div className='col-5 pt-0'>
                         <div className='row'>
                             <label className='col-5 p-0 text-center'>오늘하루 그만보기 버튼 생성</label>
                             <div className='col p-0'>
                                 <BoolCheckBox state={selectItem.isTodayClose} onChange={(value)=>{
                                     setSelectItem({...selectItem,isTodayClose:value}) }} />
                             
                             </div>
                         </div>
                     </div>
                    
                     
                 </div>
                
                 
                
            
                
              
                </div>
             
             
              </div>
              
          </div>
          <div 
          className='position-relative' 
          style={{
            height:"800px",width:"100%",paddingTop:"30px"
            }} >
            <div
            style={{
                position:"absolute",
                top:`${selectItem.y}px`,
                left:`${selectItem.x}px`,
                backgroundImage:`url("${selectItem.src}")`,
                backgroundSize:"cover",
                backgroundRepeat:"no-repeat",
                width:`${selectItem.width}px`,
                height:`${Number(selectItem.height)+(selectItem.width<521?88:selectItem.width<905?67:42)}px`,
            }}>
             <WriteEditor 
             mode="inline" 
             height={"auto"} 
             width={"auto"}
             minHeight={300}  
             authData={authData} 
             value={selectItem.content} 
             onChange={(html)=>{
               setSelectItem((prev)=>{
                 return {...prev,content:html}
               })
               }}/>
            </div>
        </div>
      
      </div>:null}
      <div>
     <Dialog header="시작일자" visible={isStartOpen} contentClassName='p-0' onHide={() => {setIsStartOpen(false)}}>
        <PC inline showTime value={selectItem.start} onChange={(e) =>{setIsStartOpen(false); setSelectItem({...selectItem,start:e.value})}}></PC>
    </Dialog>
    <Dialog header="마감일자" visible={isEndOpen} contentClassName='p-0' onHide={() => {setIsEndOpen(false)}}>
        <PC inline showTime value={selectItem.end} onChange={(e) => {setIsEndOpen(false); setSelectItem({...selectItem,end:e.value}) }}></PC>
    </Dialog>
    <Dialog header="주소모음" visible={isUrl} contentClassName='p-0' onHide={() => {setIsUrl(false)}}>
        <PageSelect value={selectItem.url} onChange={(value) => {setIsUrl(false); setSelectItem({...selectItem,url:value}) }}></PageSelect>
    </Dialog>
    <Sidebar fullScreen visible={isImageOpen} contentClassName='p-0' onHide={() => {setIsImageOpen(false)}}>
        <ImageViewTemplate isCallback imageCallback={(value) => {setIsImageOpen(false); setSelectItem({...selectItem,src:value.url}) }}></ImageViewTemplate>
    </Sidebar>
     </div>
           </form>
        
       </div>
     </div>
 
   
   </AdminContainerTemplate>
 );
}
const mapStateToProps = (state) => {
  return {
 configData: state.configData,
 boardData:state.boardData,
 authData: state.authData,
 groupData:state.groupData,
 popupData:state.popupData
};
  };
 const mapDispatchToProps = (dispatch) => {
 return {
 setConfig: (data) => dispatch(setConfig(data)),
 setBoard:(data)=>dispatch(setBoard(data)),
  setGroup:(data)=>dispatch(setGroup(data)),
  setPopup:(data)=> dispatch(setPopup(data))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(PopupPage)