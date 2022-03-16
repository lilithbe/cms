import { useRouter } from 'next/router'
import React from 'react'

const CustomPage = () => {
    const router = useRouter()
    const {pageName} = router.query
    return (
        <div className='text-center'>
            {pageName}
        </div>
    )
}

export default CustomPage
