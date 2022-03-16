import React from 'react'
import { useRouter } from 'next/router'
const ContentUpdate = () => {
  const router = useRouter()
  const {board,id} = router.query
  return (
    <div>
         {board}{id}
    </div>
  )
}

export default ContentUpdate
