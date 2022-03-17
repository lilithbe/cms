import {useState} from 'react'
import { BI_ICONS } from '../../common/bi-icon'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const IconSelect = ({ tip, callback, icon, buttonClass }) => {
    const [isIconOpen, setIsIconOpen] = useState(false)
    return (
        <>
            <Button tooltip={`${tip} Icon Select`} tooltipOptions={{ position: 'bottom' }}
                className={`p-button-sm ${buttonClass}`} icon={icon === '' ? 'bi bi-pentagon' : icon} onClick={() => { setIsIconOpen(true) }} />
            <Dialog header={`${tip} Selectr`} visible={isIconOpen} onHide={() => setIsIconOpen(false)} dismissableMask>
                <IconPanel callback={(value) => {
                    callback(value)
                    setIsIconOpen(false)
                }} />
            </Dialog>

        </>
    )
}

export default IconSelect

export const IconPanel= ({callback}) => {

    return (
        <div>
            <div className='row'>
            {BI_ICONS.map((item,i)=>{
                return <div key={i} className='col-1'>
                    
                   <div className='card text-center' style={{height:"150px"}}>
                   <div className={`card-body fs-1 cursor-pointer ${i===0?'border bg-dark':''}`} 
                   onClick={(e)=>{
                       e.preventDefault()
                       callback(item.icon)}}>
                        <i className={item.icon}/>
                    </div>
                    <div className='card-body' style={{fontSize:'7px'}}>{item.label}</div>
                   </div>
                </div>
            })}
        </div>
        </div>
        
    )
}



