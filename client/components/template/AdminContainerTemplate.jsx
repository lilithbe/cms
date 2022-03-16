import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../loading/Loading';
import { Toast } from 'primereact/toast';
const AdminContainerTemplate = ({authData,adminKey,configData,children, title, icon,isLoading ,toast,className }) => {
    const admin = configData.dc_gradeObject.filter(f=>f.grade===authData.grade)[0]    
    return (
        <div className={`${className} side-laout-container container-fluid`}>
            <Toast ref={toast}/>
            <Loading isLoading={isLoading}/>
            <div className="row">
                <div className="col col-lg-8">
                    <h3><i className={`${icon} mr-3`} />{title}</h3>
                    <hr className='mb-0'/>
                </div>
                <div className="col-12">
                    {authData.isAdmin && admin.isAdmin && admin[adminKey]?children:
                    <duv>
                        
                    </duv>}
                   
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      authData: state.authData,
      configData:state.configData,
      socketData:state.socketData,
      messageData:state.messageData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        setMessageUpdate:(data) => dispatch(setMessageUpdate(data)),
        setConfig:(data) => dispatch(setConfig(data)),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(AdminContainerTemplate)
AdminContainerTemplate.propTypes ={
   
     title:PropTypes.string, 
     icon:PropTypes.string,
     isLoading:PropTypes.bool,
}
AdminContainerTemplate.defaultProps ={
    title:'title 입력',
    icon:'bi bi-gear',
    isLoading:false,
}