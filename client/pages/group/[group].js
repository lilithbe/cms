import React from 'react'
import { useRouter } from 'next/router'
const GroupPage = () => {
    const router = useRouter()
    const {group} = router.query
    return (
        <div>
            {group} page
        </div>
    )
}

export default GroupPage
