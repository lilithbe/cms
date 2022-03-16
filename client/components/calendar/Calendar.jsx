import {useState , useRef} from 'react'
import PropTypes from 'prop-types'
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import { Toast } from 'primereact/toast';
import moment from 'moment';
/**
 * \pages\auth\profile\calendar
 * @param {*} param0 
 * @returns 
 */
const Calendar = ({dateClick, eventClick, select,events ,grid ,createEventCallback,isCallback,initialDate }) => {
    const calendarRef = useRef(null);
    const toast = useRef(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSelectable, setIsSelectable] = useState(false)
    return (
        <div >
        <Toast ref={toast} />
        <FullCalendar
initialDate={initialDate}
dayMaxEventRows={true}
dayMaxEvent={true}
views={{timeGrid:{
    dayMaxEventRows: 3 
}}}



defaultView={grid} //dayGridWeek /resourceTimeline


innerRef={calendarRef}
plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin , listPlugin]}
events={events}
locale="ko"
selectable={isSelectable}
height={"700px"}
editable={true}

dateClick={dateClick}
eventClick={eventClick}
select={(v)=>{
    select(v)
    setIsSelectable(false)
}}
buttonText={{
    today:    '오늘',
    month:    '월',
    week:     '주',
    day:      '일',
    list:     '목록'
  }}
buttonIcons={{
    createEventButton: isSelectable?'bi bi-check-lg':'bi bi-plus',
    prev: 'bi bi-chevron-left',
    next: 'bi bi-chevron-right',
    prevYear: 'bi bi-chevron-double-left',
    nextYear: 'bi bi-chevron-double-right'
  }}

headerToolbar={{
    left: isCallback ?'prev,next today createEventButton':'prev,next today',
center: 'title',
right: 'dayGridMonth,timeGridWeek,timeGridDay'
}}
customButtons={{
    createEventButton: {
        text: '새 일정',
        click: (e)=>{
            toast.current.show({severity: 'success', summary: 'new Event Create Message', detail: '달력을 클릭하세요.'});
            setIsSelectable(true)
        }
      }
}}
/>
        </div>
      
    );
}

Calendar.propTypes = {
    dateClick:PropTypes.func,
    eventClick:PropTypes.func,
    select:PropTypes.func,
    events:PropTypes.array,
    grid:PropTypes.oneOf(['dayGridMonth', 'timeGridWeek','listWeek', 'dayGridWeek']),
    isCallback:PropTypes.bool,
    createEventCallback:PropTypes.func,
    initialDate:PropTypes.string,
}
Calendar.defaultProps = {
    dateClick:()=>{console.log('dateClick')},
    eventClick:()=>{console.log('eventClick')},
    select:()=>{console.log('select')},
    events:[],
    grid:'dayGridMonth',
    createEventCallback:()=>{console.log('createEventCallback')},
    isCallback:false,
    initialDate:moment().format('YYYY-MM-DD')
}

 //dayGridWeek /resourceTimeline

export default Calendar
