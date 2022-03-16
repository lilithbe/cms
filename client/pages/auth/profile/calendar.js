import {useState ,useEffect, useRef} from 'react'
import { connect } from 'react-redux';
import { Toast } from 'primereact/toast';
import SideContainerTemplate from '../../../components//template/SideContainerTemplate'
import Calendar from '../../../components/calendar/Calendar';
import HorizontalLayout from '../../../components/formControl/HorizontalLayout';
import { ColorPicker } from 'primereact/colorpicker';
import moment from 'moment';
import { Calendar as PC } from 'primereact/calendar';
import { postApi } from '../../../api';
import { CALENDAR_EVENT_CREATE , CALENDAR_EVENT_LIST ,CALENDAR_EVENT_UPDATE,CALENDAR_EVENT_DELETE} from '../../../common/path';
const CalendarPage = ({authData}) => {
    const selectItemInit={
        start:new Date(),
        end:new Date(),
        startStr:'',
        startTime:'',
        endTime:'',
        endStr:'',
        title:'',
        content:'',
        backgroundColor:'#000000',
        textColor:'#ffffff',
        borderColor:'#999',
        userId:authData.userId,
        submitType:'create'
    }
    const toast = useRef(false)
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [isEditor, setIsEditor] = useState(false)
    const [selectItem, setSelectItem] = useState(selectItemInit)
  
    const [eventsState, setEventsState] = useState([])
    useEffect(() => {
        console.log(eventsState)
    }, [eventsState])
    useEffect(() => {
        postApi(setIsLoading,CALENDAR_EVENT_LIST,(res)=>{
            console.log(res)
            if(res.data.status){
             
                if(res.data.list.length===0){
                    toast.current.show({severity: 'success', summary: 'Dont Event Message!', detail: '아직 일정을 안만드셨어요.'});
                }else{
                    toast.current.show({severity: 'success', summary: 'new Event Create Success!', detail: `${res.data.list.length} 개의 일정을 불러왔습니다.`});
                }
                setEventsState(res.data.list)
                toast.current.show({severity: 'success', summary: 'new Event Create Success!', detail: '저장완료하였습니다.'});
            }
           
                    },{},authData.userToken)
    }, [authData.userToken])

    // 데이트 클릭 핸들러
    const dateClickHandler = (value) => {   
  
    }
    // 기존 이벤트 클릭 핸들러
    const eventClickHandler = (value) => {
        const request={
            id:value.event._def.publicId,
            ...value.event._def,
            ...value.event._def.ui,
            ...value.event._def.extendedProps,
            submitType:'update',

            start:value.event.start,
            end:value.event.end,
            startStr:value.event.startStr,
            startTime:value.event.startTime,
            endTime:value.event.endTime,
            endStr:value.event.endStr,
            title:value.event._def.title,
    


            backgroundColor: value.event.backgroundColor,
            textColor:value.event.textColor,
            borderColor: value.event.borderColor,
            color:value.event.color}
        console.log(request)
        setVisible(true)
        setSelectItem(request)
     
    }
    // 드래그 셀렉트 핸들러
    const selectHandler=(value)=>{
// console.log(moment(value.end).subtract(11, 'hour').toDate())

        setSelectItem({...selectItem,...value,
            submit:'update',
            end:moment(value.end).subtract(11, 'hour').toDate()})
         setVisible(true)
         setIsEditor(true);
    }
 
    let n=[];
    let h=[];
    for (let i = 0; i < 60; i++) {
        n.push(i)
    };
    for (let i = 1; i < 13; i++) {
        h.push(i)
    };
    const onSubmitHandler = (e) => {
        e.preventDefault()
        if(selectItem.title.length<0) return
        postApi(setIsLoading,selectItem.submitType==='create'?CALENDAR_EVENT_CREATE:CALENDAR_EVENT_UPDATE,(res)=>{
          console.log(res)
            if(res.data.status){
                toast.current.show({severity: 'success', summary: 'new Event Create Success!', detail: '저장완료하였습니다.'});
                setEventsState(res.data.list)
                setVisible(false)
                setIsEditor(false)
                setSelectItem(selectItemInit)
            }else{
                toast.current.show({severity: 'error', summary: 'new Event Create Error!', detail: '저장에 실패하였습니다.'});
            }
           
        },selectItem,authData.userToken)
    }
    const delteHandler = (e) => {
        e.preventDefault()
        postApi(setIsLoading,CALENDAR_EVENT_DELETE,(res)=>{
            console.log(res)
            if(res.data.status){
                toast.current.show({severity: 'success', summary: 'new Event Create Success!', detail: '삭제 완료하였습니다.'});
                setEventsState(res.data.list)
                setVisible(false)
                setIsEditor(false)
                setSelectItem(selectItemInit)
            }else{
                toast.current.show({severity: 'error', summary: 'new Event Create Error!', detail: '삭제에 실패하였습니다.'});
            }
        },{id:selectItem.id},authData.userToken)
    }
    
    
    return (
      <SideContainerTemplate isLoading={isLoading} icon="bi bi-calendar3" title="일정관리">
        <Toast ref={toast} />
        <div className="row">
          {visible ? (
            <div className="col-3">
              <form className='card bg-black' onSubmit={onSubmitHandler}>
                  <div className='card-header fs-4'>{selectItem.submitType==='create'?'신규 일정':`${selectItem.title} 일정`}</div>
                  <div className='card-body'>
                  <div className="row">
                  <div className="col text-center">
                    <HorizontalLayout colSize={12} label={`시작시간 ${moment(selectItem.start).format("MM월DD일")} `} labelCenter={false}>
                      {isEditor ? (
                        <PC
                          timeOnly
                          inline
                          touchUI={false}
                          value={selectItem.start}
                          onChange={(e) => {
                            e.preventDefault();
                            setSelectItem({
                              ...selectItem,
                              start: e.value,
                              startStr: moment(e.value).format("YYYY-MM-DD h:mm a"),
                              startTime: moment(e.value).format("hh:mm")
                            });
                          }}
                        />
                      ) : (
                        <div>{moment(selectItem.start).format("MM월DD일 a h:mm")}</div>
                      )}
                    </HorizontalLayout>
                  </div>
                  <div className="col  text-center">
                    <HorizontalLayout colSize={12} label={`종료시간 ${moment(selectItem.end).format("MM월DD일")} `} labelCenter={false}>
                      {isEditor ? (
                        <PC
                          timeOnly
                          inline
                          touchUI={false}
                          value={selectItem.end}
                          onChange={(e) => {
                            e.preventDefault();
                            setSelectItem({
                              ...selectItem,
                              end: e.value,
                              endStr: moment(e.value).format("YYYY-MM-DD h:mm a"),
                              endTime: moment(e.value).format("hh:mm")
                            });
                          }}
                        />
                      ) : (
                        <div>{moment(selectItem.end).format("MM월DD일 a h:mm")}</div>
                      )}
                    </HorizontalLayout>
                  </div>
                </div>
                  </div>
                  
           

                <div className='card-body'>
                <HorizontalLayout colSize={12} label="일정 제목" labelCenter={false}>
                    <input
                    readOnly ={!isEditor}
                      value={selectItem.title}
                      className="form-control"
                      onChange={(e) => {
                        e.preventDefault();
                        setSelectItem({ ...selectItem, title: e.target.value });
                      }}
                    />
                </HorizontalLayout>
                <HorizontalLayout colSize={12} label="일정 내용" labelCenter={false}>
                        <textarea
                        readOnly ={!isEditor}
                        value={selectItem.content}
                        style={{ minHeight: "70px" }}
                        onChange={(e) => {
                            e.preventDefault();
                            setSelectItem({ ...selectItem, content: e.target.value });
                        }}
                        className="form-control"
                        />
                </HorizontalLayout>
                </div>

             

                {isEditor ? (
                  <div className='card-body row text-center'>

                    <HorizontalLayout className='col' colSize={12} label="배경색" labelCenter={false}>
                      <ColorPicker
                        readOnly={isEditor}
                        value={selectItem.backgroundColor.replace("#", "")}
                        onChange={(e) => {
                          setSelectItem({ ...selectItem, backgroundColor: e.value });
                        }}
                      ></ColorPicker>
                    </HorizontalLayout>

                    <HorizontalLayout className='col' colSize={12} label="글자색" labelCenter={false}>
                      <ColorPicker
                        value={selectItem.textColor.replace("#", "")}
                        onChange={(e) => {
                          setSelectItem({ ...selectItem, textColor: e.value });
                        }}
                      ></ColorPicker>
                    </HorizontalLayout>

                    <HorizontalLayout className='col' colSize={12} label="보드색" labelCenter={false}>
                      <ColorPicker
                        value={selectItem.borderColor.replace("#", "")}
                        onChange={(e) => {
                          setSelectItem({ ...selectItem, borderColor: e.value });
                        }}
                      ></ColorPicker>
                    </HorizontalLayout>
                  </div>
                ) : null}
<div className='card-footer'>
{isEditor ? (
                  <div className="btn-group w-100">
                    <button type="submit" className="btn btn-primary ">
                      {selectItem.submitType === "update" ? "수정한 일정 저장" : "신규 일정 저장"}
                    </button>
                    {selectItem.submitType === "update" ? (
                      <button type="button" className="btn btn-danger " onClick={delteHandler}>
                        삭제
                      </button>
                    ) : selectItem.submitType === "update"?(
                      <button
                        type="button"
                        className="btn btn-warning "
                        onClick={(e) => {
                            e.preventDefault()
                          setIsEditor(false);
                          setSelectItem(selectItemInit)
                          setVisible(false)
                        }}
                      >
                        수정취소
                      </button>
                    ):null}
                  </div>
                ) : (
                  <div className="btn-group w-100">
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={(e) => {
                          e.preventDefault()
                        setIsEditor(true);
                      }}
                    >
                      수정하기
                    </button>
                    <button type="button" className="btn btn-danger " onClick={delteHandler}>
                      삭제
                    </button>
                  </div>
                )}
</div>
               
              </form>
            </div>
          ) : null}

          <div className="col" style={{ height: "700px" }}>
            <Calendar
              isCallback
              grid="dayGridMonth"
              eventClick={eventClickHandler}
              dateClick={dateClickHandler}
              select={selectHandler}
              createEventCallback={() => {
                setVisible(true);
                
              }}
              events={eventsState}
            />
          </div>
        </div>
      </SideContainerTemplate>
    );
}

CalendarPage.propTypes = {

}
const mapStateToProps = (state) => {
    return {
      configData: state.configData,
      authData: state.authData,
      groupData:  state.groupData,
      boardData: state.boardData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  export default  connect(mapStateToProps, mapDispatchToProps)(CalendarPage)
  
