import {useRef , useState} from 'react'
import AdminContainerTemplate from "../../../components/template/AdminContainerTemplate";

const PointManagement = () => {
    const [isLoading, setIsLoading] = useState(false)
    const toast = useRef(null)
    return (
        <AdminContainerTemplate toast={toast} adminKey="isAdmin" isLoading={isLoading} icon="bi bi-calendar3" title="일정관리">
            포인트관리
        </AdminContainerTemplate>
    )
}

export default PointManagement
