export const BoolCheckBox =({state,onChange})=>{
    return (
        <div className="btn-group">
            <button className={`btn btn-${state===true?'primary px-5':'outline-primary px-3'} btn-sm `} onClick={(e)=>{
                e.preventDefault()
                onChange(true)}}>on</button>
            <button className={`btn btn-${state===false?'primary px-5':'outline-primary px-3'} btn-sm `} onClick={(e)=>{
                  e.preventDefault()
                onChange(false)}}>off</button>
        </div>
    )
}