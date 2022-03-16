import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';
const Loading = ({isLoading}) => {
    if(isLoading){
        return (
            <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 999999,
                background: "rgba(0, 0, 0, 0.405)",
            }}>
                <ProgressSpinner style={{
                    position: "absolute",
                    top: "50%",
                    left: "43%",
                }} />
            </div>
        )
    }else{
        return null
    }
    
}

export default Loading
