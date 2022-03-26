import {useState } from 'react'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
 const DialogButtonSet = (props)=>{
    const {children , buttonLabel, className , icon , header, footer, dismissableMask} = props
    const [isOpen, setIsOpen] = useState(false)
    return(
        <>
            <Button label={buttonLabel} className={className} icon={icon} onClick={() => { setIsOpen(true) }} />
            <Dialog header={header} footer={footer(setIsOpen)} visible={isOpen} onHide={() => setIsOpen(false)} dismissableMask={dismissableMask}>
                {children}
            </Dialog>
        </>
    )
}
export default DialogButtonSet