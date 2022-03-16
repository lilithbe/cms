import {useRef} from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
const ColorPicker = dynamic(async () => {
    const { Sketch: Sketch } = await import('@uiw/react-color');
    return function comp({ forwardedRef, ...props }) {
        return <Sketch {...props}
        />
    }
},
    { ssr: false })
const ColorSelecter = ({color,callback}) => {
    const op = useRef(null);
  return (
    <div>
    <Button className="p-button-sm"
        icon={"bi bi-color"}
        style={{ backgroundColor: color }}
        onClick={(e) => {
            e.preventDefault()
            op.current.toggle(e)
        }} />
    <OverlayPanel showCloseIcon ref={op}>
        <ColorPicker color={color} onChange={(color)=>{
            callback(color.hexa)
        }} />
    </OverlayPanel>

</div>
  )
}

export default ColorSelecter