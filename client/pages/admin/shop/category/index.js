import {useState ,useRef, useEffect} from 'react'
import { connect } from 'react-redux'
import { CATEGORY_LIST_ALL } from '../../../../common'
import CategoryList from '../../../../components/admin/shop/category/CategoryList'
import AdminContainerTemplate from '../../../../components/template/AdminContainerTemplate'
import {postApi} from '../../../../api'
const CategoryListPage = ({authData}) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useRef(null)
  const [allCategory, setAllCategory] = useState([])
  const [mainCategory, setMainCategory] = useState([])
  const [childCategory, setChildCategory] = useState([])
  useEffect(() => {
    postApi(setIsLoading ,CATEGORY_LIST_ALL , (res)=>{
        if(res.data.status)setAllCategory(res.data.list)
        const __main = res.data.list.filter(f=>f.parentId==='main')
        setMainCategory(__main)
    })
  
    return () => {
        setAllCategory([])
        setMainCategory([])
    }
  }, [])
  
    return (
      <AdminContainerTemplate toast={toast} adminKey="isAdmin" isLoading={isLoading} icon={"bi bi-share"} title="Categorys">
         <CategoryList 
         toast={toast}
         mainCategory={mainCategory} 
         setMainCategory={setMainCategory}
         allCategory={allCategory} 
         setAllCategory={setAllCategory}
         />
      
        
      </AdminContainerTemplate>
    )
}
const mapStateToProps = (state) => {
    return {
      authData: state.authData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  export default  connect(mapStateToProps, mapDispatchToProps)(CategoryListPage)


