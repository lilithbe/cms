import {useRef, useState} from 'react'
import AdminContainerTemplate from "../../../components/template/AdminContainerTemplate";

const VisitorSearch = () => {
    const [isLoading, setIsLoading] = useState(false)
    const toast = useRef(null)
    return (
        <AdminContainerTemplate toast={toast} adminKey="isAdmin" isLoading={isLoading} icon="bi bi-calendar3" title="VisitorSearch">
           VisitorSearch
        </AdminContainerTemplate>
    )
}

export default VisitorSearch
