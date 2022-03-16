import React, { useState,useRef } from 'react'
import { connect } from 'react-redux';
import {setConfig} from '../../../../redux'

import AdminContainerTemplate from '../../../../components/template/AdminContainerTemplate'
import Loading from '../../../../components/loading/Loading'
import { TabView, TabPanel } from 'primereact/tabview';
import {postApi} from '../../../../api'
import {ADMIN_CONFIG_UPDATE} from '../../../../common'
// import QuillEditor from '../../../../components/QuillEditor/QuillEditor';
import {Toast} from 'primereact/toast'

import dynamic from 'next/dynamic'

const WriteEditor =  dynamic(()=>import('../../../../components/editor/WriteEditor'),
{ssr:false})

const CompanyPage = ({configData,authData}) => {
  
    const [active, setActive] = useState(0)
    const [state, setState] = useState(configData)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useRef(null)
    const _arr = [
        {key:"sc_company_name", label :"회사이름"},
        {key:"sc_company_saupja_no", label :"사업자번호"},
        {key:"sc_company_owner", label :"대표명"}, 
        {key:"sc_tongsin_no",label :"통신판매번호"},
        {key:"sc_company_zip" ,label :"사업자 우편번호"},
        {key:"sc_company_addr", label :"사업장 주소"},
        {key:"sc_company_tel", label :"사업자 전화번호"},
        {key:"sc_company_fax", label :"사업자 펙스"},
    ]
    const __arr=[
        {key:"sc_company_privacy_admin_email", label :"개인정보취급관리자 이메일"},
        {key:"sc_company_privacy_admin_name", label :"개인정보 취급관리자 이름"},
        
    ]
    const ___arr=[
        {key:"dc_privacy",label:'개인정보취급방침'},
        {key:"dc_terms",label:"이용약관"}
    ]
const onChangeHandler = (e) => {
    e.preventDefault()
    const key= e.target.name
    const value =e.target.value
    setState({...state,[key]:value})
}
const submitHandler = (e) => {
    e.preventDefault()
    postApi(setIsLoading,ADMIN_CONFIG_UPDATE,(res)=>{
      if(res.data.status){
          setConfig(state)
          toast.current.show({severity: 'success', summary: 'Success Message', detail: '저장완료',life:5000})
      }
      },state,authData.userToken)
      
    }
    return (
      <AdminContainerTemplate adminKey="adminJ" title="회사정보설정" icon="bi bi-building" isLoading={isLoading}>
        <form onSubmit={submitHandler}>
          <TabView activeIndex={active} onTabChange={(e) => setActive(e.index)}>
            <TabPanel header="회사정보">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      {_arr.map((item, i) => {
                        return (
                          <div className="row" key={i}>
                            <div className="col-5 text-center">
                              {item.label}
                            </div>
                            <div className="col-7">
                              <input
                                name={item.key}
                                className="form-control form-control-sm"
                                value={state[item.key]}
                                onChange={onChangeHandler}
                              />
                            </div>
                          </div>
                        );
                      })}
                    
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      {_arr.map((item, i) => {
                        if (state[item.key].length > 0) {
                          return (
                            <div key={i}>
                              {item.label} :{state[item.key]}
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel header="개인정보취급관련">
              <div className="card" style={{ width: "600px" }}>
                <div className="card-body">
                  {__arr.map((item, i) => {
                    return (
                      <div className="row" key={i}>
                        <div className="col-5 text-center">{item.label}</div>
                        <div className="col-7">
                          <input
                            name={item.key}
                            className="form-control form-control-sm"
                            value={state[item.key]}
                            onChange={onChangeHandler}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  {___arr.map((item, i) => {
                    return (
                      <div className="row mb-5" key={i}>
                        <div className="col-2 text-center">{item.label}</div>
                        <div className="col-10">
                          <WriteEditor
                           buttonList={[
                            [
                                "undo",
                                "redo",
                                "font",
                                "fontSize",
                                "formatBlock",
                                "paragraphStyle",
                                "blockquote",
                                "bold",
                                "underline",
                                "italic",
                                "strike",
                                "subscript",
                                "superscript",
                                "fontColor",
                                "hiliteColor",
                                "textStyle",
                                "removeFormat",
                                "outdent",
                                "indent",
                                "align",
                                "horizontalRule",
                                "list",
                                "lineHeight",
                                "table",
                                "link",
                                "fullScreen",
                                "showBlocks",
                                "codeView",
                                "preview",
                                "print",
                                "save",
                            ]
                        ]}
                                autoFocus={false}
                          value={state[item.key]}
                          minHeight={100} height={200}
                          onChange={(html)=>{
                            setState((prev)=>{
                              return {...prev,[item.key]:html}
                            })
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabPanel>
          </TabView>
          <button type="submit" className='btn btn-primary w-100 btn-sm' >저장</button>
        </form>
        <Toast ref={toast} />
      </AdminContainerTemplate>
    );
}
const mapStateToProps = (state) => {
    return {
      authData: state.authData,
      configData:state.configData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        setConfig:(data) => dispatch(setConfig(data)),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(CompanyPage)
