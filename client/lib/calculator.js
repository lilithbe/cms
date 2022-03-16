import moment from 'moment'

/**
 * 
 * @param {*} fileSize 
 * @param {*} fixed  소수점
 * @returns 
 */
export const fileSizeCalculator = (_fileSize,_fixed) => {
    var str
    let fileSize=Number(_fileSize)
    let fixed=_fixed||0
    if(fileSize===null && fileSize=== undefined && fileSize===0 && fileSize==='0') return "0 b"
  
    if (fileSize >= 1024 * 1024 *1024 *1024) {
        fileSize = fileSize / (1024 * 1024 * 1024*1024);
        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
        str = fileSize + ' TB';
    }
    
    else if (fileSize >= 1024 * 1024 *1024) {
        fileSize = fileSize / (1024 * 1024 * 1024);
        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
        str = fileSize + ' GB';
    }
      //MB 단위 이상일때 MB 단위로 환산
    else if (fileSize >= 1024 * 1024) {
        fileSize = fileSize / (1024 * 1024);
        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
        str = fileSize + ' MB';
    }
    //KB 단위 이상일때 KB 단위로 환산
    else if (fileSize >= 1024) {
        fileSize = fileSize / 1024;
        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
        str = fileSize + ' KB';
    }
    //KB 단위보다 작을때 byte 단위로 환산
    else {
        fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
        str = fileSize + ' byte';
    }
    return str;
}
export const lifeCalc = (year,bonth,day) => {
    var today = new Date(); 
    var both_year = year
    var both_month = bonth
    var both_day =day
    var myBoth = new Date(); 
    myBoth.setFullYear(both_year, both_month, both_day);
    const today_Mili = Date.parse(today); 
    const both_Mili = Date.parse(myBoth); 
    const survival_Mili = today_Mili - both_Mili; 
    const survival_Day = survival_Mili/1000/60/60/24;
     const survival_time = survival_Mili/1000/60/60;
     const survival_week = survival_Mili/1000/60/60/24/7;
    return {day:survival_Day,time:survival_time,week:survival_week}; 
}

export const howMushTime = (time)=>{
    const inTime = moment(time)
    var now = moment();
    const base =  moment.duration(now.diff(inTime))//
    const asSeconds =base.asSeconds();
    const asMinutes = base.asMinutes();
    const asHours = base.asHours();
    const asDays = base.asDays();
    if(asSeconds<60) return '방금전'
    else if(asMinutes<60) return Math.floor(asMinutes)  +'분전'
    else if(asHours<24) return Math.floor(asHours)+'시간전'
    else if(asDays<7) return Math.floor(asDays)+'일전'
    else if(asDays<30) return Math.floor(asDays/7)+'주전'
    else if(asDays<365) return Math.floor(asDays*30)+'달전'
    else return Math.floor(asDays*365)+'년전'
}
export const celendarSelcetCheck =(start,end)=>{
    const _start = moment(start)
    const _end = moment(end)
    const cal =  moment.duration(_start.diff(_end)).asHours();
    console.log(_start ,_end )
   return cal=== -24 ?true:false
}
