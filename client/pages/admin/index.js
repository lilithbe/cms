import {useState ,useRef} from 'react'

import AdminContainerTemplate from '../../components/template/AdminContainerTemplate'
const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useRef(null)
    return (
      <AdminContainerTemplate toast={toast}adminKey="isAdmin" isLoading={isLoading} icon={"bi bi-lightning"} title="Dash board">
      따쉬보드를 꾸며볼끄낭?
     
      </AdminContainerTemplate>
    )
}

export default AdminDashboard
