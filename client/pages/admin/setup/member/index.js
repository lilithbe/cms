import React, { useState ,useRef} from 'react'
import { connect } from 'react-redux';
import {setMessageUpdate ,setConfig} from '../../../../redux'
import AdminContainerTemplate from '../../../../components/template/AdminContainerTemplate'
import { TabView, TabPanel } from 'primereact/tabview';
import {postApi} from '../../../../api'
import {ADMIN_CONFIG_UPDATE} from '../../../../common'
import {Toast} from 'primereact/toast'
import {BoolCheckBox} from '../../../../components/formControl'
const AdminMemberPage = ({configData ,setConfig,authData}) => {
  const power = configData.dc_gradeObject.filter(f=>f.grade===authData.grade)[0]
  const toast = useRef(null)
    const [active, setActive] = useState(0)
    const [state, setState] = useState(configData)
    const [isLoading, setIsLoading] = useState(false)
    const submitHandler = (e) => {
      postApi(setIsLoading,ADMIN_CONFIG_UPDATE,(res)=>{
        if(res.data.status){
          setConfig(state)
          toast.current.show({severity: 'success', summary: 'Success Message', detail: '저장완료',life:5000})
      }
      },state,authData.userToken)
    
    }
    const onChangeHandler = (e) => {
        e.preventDefault()
        const key= e.target.name
        const value =e.target.value
        setState({...state,[key]:value})
    }

const _arr=[
    {key:"dc_isMail", label:'이메일',p:'아이디형식을 이메일혁식으로 설정'},
    {key:"dc_isHomepage", label:'홈페이지',p:'홈페이지 입력칸 추가'},
    {key:"dc_isTelephone", label:'연락처',p:'연락처 입력칸 추가'},
    {key:"dc_isAddress", label:'주소',p:'주소입력칸 추가'},
    {key:"dc_isMobile", label:'모바일',p:'모바일 입력칸 추가'},
    {key:"dc_isAbout", label:'자기소개',p:'자기소개 입력칸 추가'},
]

const __arr=[
// {key:"dc_auth_isSocialLogin", label:'소셜로그인 사용'},
{key:"dc_auth_naver", label:'네이버'},
{key:"dc_auth_google", label:'구글'},
{key:"dc_auth_kakao", label:'카카오'},
{key:"dc_auth_fasebook", label:'페이스북'},
{key:"dc_auth_twiter", label:'트위터'},
{key:"dc_auth_fayco", label:'페이코'},
{key:"dc_auth_pass", label:'Pass'},
{key:"dc_auth_instagrem",label:'인스타그램'},
]
return (
  <AdminContainerTemplate
    adminKey="adminJ"
    title="회원가입 설정"
    icon="bi bi-gear-wide-connected"
    isLoading={isLoading}
    isAdmin={authData.isAdmin && power.isAdmin && power.adminJ?true:false}
  >
    <Toast ref={toast} />
    <form onSubmit={submitHandler}>
      <TabView activeIndex={active} onTabChange={(e) => setActive(e.index)}>
        <TabPanel header="기본설정">
          <div className="card">
            <div className="card-body">
              {_arr.map((item, i) => {
                return (
                  <div className="row" key={i}>
                    <div className="col-2 text-center">{item.label}</div>
                    <div className="col-2">
                      <BoolCheckBox
                        state={state[item.key]}
                        onChange={(value) => {
                          setState({ ...state, [item.key]: value });
                        }}
                      />
                    </div>
                    <div className="col-6">
                      {" "}
                      <small>{item.p}</small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabPanel>
        <TabPanel header="소셜 로그인">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-2 text-center">소셜로그인 사용</div>
                <div className="col-2">
                  <BoolCheckBox
                    state={state.dc_auth_isSocialLogin}
                    onChange={(value) => {
                      setState({ ...state, dc_auth_isSocialLogin: value });
                    }}
                  />
                </div>
              </div>
              {state.dc_auth_isSocialLogin? __arr.map((item,i)=>{
                //    isUse: true, publicKey: 'Vjpx2IbpGwKxZMwL7exj', secretKey: ''
                  return(
                      <div key={i} className="row">
                           <div className="col-2 text-center">{item.label}</div>
                           <div className="col-2">
                            <BoolCheckBox
                                    state={state[item.key].isUse}
                                    onChange={(value) => {
                                        setState({ ...state, [item.key]:{
                                            ...state[item.key],
                                            isUse:value
                                        }});
                                    }}
                                />
                           </div>
                           {state[item.key].isUse?
                             <div className="col-4">
                             <input
                                 className='form-control form-control-sm'
                                 value={state[item.key].publicKey}
                                 onChange={(e) => {
                                 setState({ ...state, [item.key]:{
                                     ...state[item.key],
                                     publicKey:e.target.value
                                 }});
                                 }}
                             />
                         </div>
                         :null}
                         
                            {/* <div className="col-4">
                                <input
                                    className='form-control form-control-sm'
                                    value={state[item.key].secretKey}
                                    onChange={(e) => {
                                    setState({ ...state, [item.key]:{
                                        ...state[item.key],
                                        secretKey:e.target.value
                                    }});
                                    }}
                                />
                            </div> */}
                      </div>
                  )
              })
            :null
            }


            </div>
          </div>
        </TabPanel>
        <TabPanel header="포인트설정">
          <PointTemplrate state={state} setState={setState} />
        </TabPanel>
        <TabPanel header="..."></TabPanel>
      </TabView>
      <button className="btn btn-primary btn-sm w-100" type="submit">
        저장
      </button>
    </form>
  </AdminContainerTemplate>
);
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

export default connect(mapStateToProps,mapDispatchToProps)(AdminMemberPage)

const PointTemplrate =({state,setState})=>{
    const _arr=[
        {key:"dc_loginPoint",label:"로그인시 지급 포인트"},
        {key:"dc_RegisterPoint",label:"회원가입시 지급 포인트"},
    ]
    const __arr=[
        {key:"dc_reCommenderAddPoint",label:"추천인사용시 회원가입자에게 지급 포인트"},
        {key:"dc_reCommenderRegisetAddPoint",label:"추천인사용시 추천인에게 지급 포인트"},
    ]
    return(
        <div className="card" style={{width:"800px"}}>
        <div className="card-body">

          <div className="row">
            <div className="col-3 text-center">포인트사용</div>
            <div className="col-9">
                <BoolCheckBox
                    state={state.dc_isPoint}
                    onChange={(value) => {
                    setState({ ...state, dc_isPoint: value });
                    }}
                />
            </div>
          </div>
          {state.dc_isPoint? <div className="row">
            <div className="col-3 text-center">추천인 제도 사용</div>
            <div className="col-9">
                <BoolCheckBox
                    state={state.dc_isReCommender}
                    onChange={(value) => {
                    setState({ ...state, dc_isReCommender: value });
                    }}
                />
            </div>
          </div>:null}
         
          {/* dc_isReCommender */}

                    {state.dc_isPoint?
                    _arr.map((item,i)=>{
                        return (
                          <div className="row" key={i}>
                            <div className="col-6 text-center">
                              {item.label}
                            </div>
                            <div className="col-6">
                              <input type="number"
                                className='form-control form-control-sm '
                                value={state[item.key]}
                                onChange={(e) => {
                                  setState({
                                    ...state,
                                    [item.key]: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        );
                    }):null}
                       {state.dc_isReCommender && state.dc_isPoint?
                    __arr.map((item,i)=>{
                        return (
                          <div className="row" key={i}>
                            <div className="col-6 text-center">
                              {item.label}
                            </div>
                            <div className="col-6">
                              <input type="number"
                               className='form-control form-control-sm '
                                value={state[item.key]}
                                onChange={(e) => {
                                  setState({
                                    ...state,
                                    [item.key]: e.target.value,
                                  });
                                }}
                              />
                            </div>
                          </div>
                        );
                    }):null}
          

        </div>
      </div>
    )
}


