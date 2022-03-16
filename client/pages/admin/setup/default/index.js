import React, { useState ,useRef} from 'react'
import { connect } from 'react-redux';
import {setMessageUpdate ,setConfig} from '../../../../redux'

import { TabView, TabPanel } from 'primereact/tabview';
import {  InputText } from 'primereact/inputtext';
import {SelectButton} from 'primereact/selectbutton'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Sidebar } from 'primereact/sidebar';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { confirmDialog } from 'primereact/confirmdialog';
import { ScrollPanel } from 'primereact/scrollpanel';

import {Toast} from 'primereact/toast'

import Link from 'next/link'

import {postApi} from '../../../../api'
import {ADMIN_CONFIG_UPDATE} from '../../../../common'

import AdminContainerTemplate from '../../../../components/template/AdminContainerTemplate'
import ImageViewTemplate from '../../../../components/template/ImageViewTemplate'

// import {fileSizeCalculator} from '../../../../lib'
const AdminBasicSetup = ({configData ,setConfig,authData}) => {

  
  const toast = useRef(null)
  const [active, setActive] = useState(0)
  const [state, setState] = useState(configData)

  const [isLoading, setIsLoading] = useState(false)
  const submitHandler = (e) => {
      e.preventDefault()
      postApi(setIsLoading,ADMIN_CONFIG_UPDATE,(res)=>{
        if(res.data.status){
          setConfig(state)
          toast.current.show({severity: 'success', summary: 'Success Message', detail: '저장완료',life:5000})
      }
      },state,authData.userToken)
      
  }
    
  const _arr=[
    {key:"dc_deleteContentDate" ,label:"오래된 컨텐츠 삭제 시간설정 (일)" },//오래된 일반게시판 컨텐츠 삭제 쿨타임(가급적..길게..2년쯤?)
    {key:"dc_userProfileChangeDate" ,label:"프로필 체인지 시간설정 (일)" },//프로필 체인지 쿨타임
    {key:"dc_joinUserLogDelete" ,label:"로그기록 삭제 시간설정 (분)" },//로그기록 삭제 쿨타임
    {key:"dc_hotSearchTextDelete" ,label:"검색기록 삭제 시간설정 (분)" }, //검색기록 삭제 쿨타임
    
    {key:"dc_reWriteSec",label:'글쓰기 시간설정 (초)' },
    {key:"dc_searchLimit",label:'검색 시간설정 (초)' },
  ]
 
  const __arr=[
    {key:"dc_imageExtention", label:'허용가능한 이미지 확장자', },//허용가능한 이미지 확장자
    {key: "dc_videoExtention", label:'허용가능한 비디오 확장자', },//허용가능한 비디오 확장자
    {key: "dc_fileExtention", label:'허용가능한 파일 확장자', },//허용가능한 파일 확장자
    {key:"dc_documentExtention", label:'허용가능한 문서 확장자', },//허용가능한 문서 확장자
  ]
  const ___arr=[
    {key:"dc_userImageWeight", label:'이미지 용량 제한 ',},
    {key:"dc_userFileWeight", label:'파일 용량 제한',},
    {key: "dc_userVideoWeight", label:'비디오 용량 제한',},    
    {key: "dc_userDocumentWeight", label:'문서파일 용량 제한',},
  ]
  const [test, setTest] = useState('단어를 테스트하세요.')
  return (
    <AdminContainerTemplate
    adminKey="adminJ"
      title="기본환경설정"
      icon="bi bi-gear-wide-connected"
      isLoading={isLoading}
    >
      <Toast ref={toast} />
      <form onSubmit={submitHandler}>
        <TabView activeIndex={active} onTabChange={(e) => setActive(e.index)} className='default-setting-wrapper'>
          <TabPanel header="기본설정">
            <DefaultSettingTemplate
              state={state}
              setState={setState}
              authData={authData}
            />
          </TabPanel>
          <TabPanel header="SEO설정">
            <MetaSettingTemplate
              state={state}
              setState={setState}
              authData={authData}
            />
          </TabPanel>
       
          <TabPanel header="데이터시간설정">
            <div className="card">
              <div className="card-body">
                {_arr.map((item, i) => {
                  return (
                    <div className="row" key={i}>
                      <div className="col-3 text-center">{item.label}</div>
                      <div className="col-3">
                        <input className='form-control form-control-sm' type="number" value={state[item.key]} onChange={(e)=>{setState({...state,[item.key]:e.target.value})}} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabPanel>
          <TabPanel header="텍스트필터링">
                 <div className='card'>
                   <div className='card-body'>
                     <div className='fs-5'>제한단어</div>
                    <textarea value={state.dc_textFilter} className='form-control mb-3' 
                    onChange={(e)=>{
                      let value = e.target.value.replace(',,',', ').replace(/, *,/,', ')
                      setState({...state,dc_textFilter:value})

                    }} />
                      <div className='fs-5'>제한 닉네임</div>
                    <textarea value={state.dc_nickNameFilter} className='form-control mb-3' 
                    onChange={(e)=>{
                      let value = e.target.value.replace(',,',', ').replace(/, *,/,', ')
                      setState({...state,dc_nickNameFilter:value})

                    }} />
                    <small className='text-danger '>
                      <i className='bi bi-exclamation-diamond mr-2' />
                      콤마 (,) 로 구분합니다.<br/> 적용되는 단어는 글쓰기,제목,아이디,이메일등 최고등급을 제외한 모든 유저(관리자 권한이 있어도 해당)의 글쓰기 단어를 제한합니다.<br/>
                    사용즉시 리플레이스 처리(해당 내용만 삭제) 됩니다.
                    </small>
                    <div className='fs-5'>테스트</div>
                    <textarea value={test} className='form-control mb-3'
                    onChange={(e)=>{
                      const errText = state.dc_textFilter.split(",")
                      const errNickName=state.dc_nickNameFilter.split(",")
                      let value=e.target.value
                      for (let i = 0; i < errText.length; i++) {
                        const t = new RegExp(errText[i].replace(" ",""), "gi") 
                        value=value.replace(t,"")
                      }
                      for (let i = 0; i < errNickName.length; i++) {
                        const t = new RegExp(errNickName[i].replace(" ",""), "gi") 
                        value=value.replace(t,"")
                      }
                      setTest(value)
                    }} />
                   </div>
                   </div> 

          </TabPanel>
          <TabPanel header="파일설정">
            <div className="card">
            <div className="card-body">
              {__arr.map((item,i)=>{
                return(
                  <div className='row' key={i}>
                  <div className='col-2'>{item.label}</div>
                  <div className='col-2'>
                  <AddArrayInput
                  onClick={(value)=>{setState({...state,[item.key]:[...state[item.key],{label:value}]})}}
                  />
                 
                  </div>
                  <div className='col-5'>
                    {state[item.key].map((data,ii)=>{
                      return(
                       <span key={ii}> <Button
                        onClick={(e)=>{
                          e.preventDefault()
                          confirmDialog({
                            message: `${data.label} 확작자를 삭제합니다.`,
                            header: 'Extention Delete!',
                            icon: 'pi pi-exclamation-triangle',
                            accept: () =>{
                              const result = Array.from(state[item.key]);
                              result.splice(ii, 1);
                              setState({...state,[item.key]:result})
                            },
                        });

                         
                        }}
                       className='btn btn-outline-link btn-sm' >
                       {data.label} 
                     </Button>{state[item.key].length=== ii+1?'':','} </span>
                      )
                    })}
                  </div>
                  </div>
                )
              })}
               
            </div>
            <div className="card-body">
              적용하신 이후에 반드시 저장을 눌러야 완벽히 적용됩니다.
            </div>
            </div>
            <div className="card">
            <div className="card-body">
            {___arr.map((item,i)=>{
                return(
                  <div className='row' key={i}>
                  <div className='col-2'>{item.label}</div>
                  <div className='col-2'>
                    <input className='form-control form-control-sm' type="number" value={state[item.key]} onChange={(e)=>{setState({...state,[item.key]:e.target.value})}}/>
                  </div>
                  <div className='col-2'>{state[item.key]} </div>
                  </div>
                )
              })}
            </div>
            </div>


          </TabPanel>
          <TabPanel header="등급설정">
            <GradeSetting state={state} setState={setState}authData={authData} />
          </TabPanel>
          <TabPanel header="폰트스타일">
            <AddFont state={state} setState={setState} />
          </TabPanel>
          <TabPanel header="레벨관리">
            <LevelRule state={state} setState={setState} />
          </TabPanel>
          <TabPanel header="아이피관리">
          <table className="table table-sm table-bordered">
<thead>
  <tr className="text-center">
    <th width="15%">key</th>
    <th>value</th>
    <th width="50%">description</th>
  </tr>
</thead>
          <tbody>
            <tr>
              <th>접속불가능 아이피</th>
              <th>
              <textarea 
              className='form-control'
              value={state.dc_impossibleIp} 
           onChange={(e)=>{
            let value = e.target.value==="" || e.target.value==="*"?'none':e.target.value
              value= value.replace(",*","").replace(" ","")
             setState({...state,dc_impossibleIp:value})}}/>
              </th>
              <th>콤마( , )로 구분합니다.<br/>ex) 12.1.5.* 123.*<br/>별표 ( * )는 와일드카드이며 와일드카드는 모두 포함입니다.<br/>와일드카드만 표기할수 없습니다.</th>
            </tr>
            <tr>
              <th>접속가능 아이피</th>
              <th>
              <textarea 
               className='form-control'
               value={state.dc_possibleIp} 
           onChange={(e)=>{
             const value = e.target.value===""?'*':e.target.value
             setState({...state,dc_possibleIp:value})}}/>
              </th>
              <th>콤마( , )로 구분합니다.<br/>ex) 12.1.5.* 123.*<br/>별표 ( * )는 와일드카드이며 와일드카드는 모두 포함입니다.<br/>와일드카드가 있을경우 다른 아이피는 모두 무효가 됩니다.</th>
            </tr>
          </tbody>
        </table>
           
          
          </TabPanel>
          <TabPanel header="구글Ad">
         
          <table className="table table-sm table-bordered">
<thead>
  <tr className="text-center">
    <th width="15%">key</th>
    <th>value</th>
    <th width="50%">description</th>
  </tr>
</thead>
          <tbody>
            <tr>
              <th>사용유무</th>
              <td><SelectButton
              value={state.dc_isGoogle_ad}
              optionLabel='label'
              optionValue='value'
               options={
                [
                  {label:'사용',value:true},
                  {label:'미사용',value:false},
                ]
              }onChange={(e)=>{
                setState({...state,dc_isGoogle_ad:e.value})
              }}
              
              /></td>
              <td></td>
            </tr>
            <tr>
              <th>클라이언트키</th>
              <td>
              <InputText 
              className='form-control'
              value={state.dc_google_ad_client} 
           onChange={(e)=>{
             setState({...state,dc_google_ad_client:e.target.value})}}/>
              </td>
              <d></d>
            </tr>
          </tbody>
        </table>

          </TabPanel>
        </TabView>
        <button className="btn btn-primary w-100" type="submit">
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
export default connect(mapStateToProps,mapDispatchToProps)(AdminBasicSetup)



const AddFont = ({state,setState}) => {
  const addFontInit={label:'',value:'',src:''}
  const [addFont, setAddFont] = useState(addFontInit)
  const onChangeHandler = (e)=>{
    e.preventDefault()
    let value=e.target.value.replace(";","").replace("src:","")
    
    setAddFont({...addFont,[e.target.name]:value})
  }
const __a=[{label:'별칭',value:'label',placeholder:''},{label:'영문입력값',value:'value',placeholder:''},{label:'주소',value:'src',placeholder:''}]
  const onSubmitHandler = (e) => {
    e.preventDefault()
    if(addFont.label.length<2) {return}
    if(addFont.value.length<3) {return}
    if(addFont.src.length<3) {return}
    setState({...state,dc_addFont:[addFont,...state.dc_addFont]})
  }
  
return(
    <div className="row">
      <div className='col'>
        <div>
        <div className='row'>
            <label className='col-3 text-center'>기본 폰트</label>
            <div className='col-9'> 
            <Dropdown value={state.dc_defaultFont} options={state.dc_addFont} optionLabel="label" optionValue='value' onChange={(e)=>{
            setState({...state,dc_defaultFont:e.value})
          }}/>
            </div>
          </div>

         
        </div>
          <div className='row'>
          <div className='col text-center'>
          <p className="m-0">font-family를 value값으로 입력하셔도 됩니다.</p>
          <p className="m-0">src는 그대로 복사하세요.</p>
          <p className="m-0">추가되는 폰트는 에디터에 적용됩니다.</p>
</div>
<div className='col-3 '>
<Link href="https://noonnu.cc/"><a className='btn btn-primary py-1 btn-sm w-100'  target="_blank">눈누폰트</a></Link>
            </div>
          </div>
          {__a.map((item,i)=>
        <div key={i} className='row'>
            <label className='col-3 text-center'>{item.label}</label>
            <div className='col-9'> <input autoComplete='off' placeholder={item.placeholder} className=' form-control form-control-sm' name={[item.value]} onChange={onChangeHandler} value={addFont[item.value]}/></div>
          </div>)}
          <div className='row'>
            <label className='col-3 text-center'></label>
            <div className='col-9'> 
            <Button onClick={onSubmitHandler} className='btn btn-primary btn-sm w-100'>Commit</Button>
            </div>
            <div className='col-12'>
              <div  className='card-body text-danger'>
              적용하신 이후에 반드시 저장을 눌러야 완벽히 적용됩니다.
              </div>
            </div>
           
          </div>
        
      </div>
      <div className='col'>
          {state.dc_addFont.map((item,i)=><button onClick={(e)=>{
            e.preventDefault()
            confirmDialog({
              message: `${item.label}를 삭제하시겠습니까?`,
              header: 'Font Delete?',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                     const result = Array.from(state.dc_addFont);
                           result.splice(i, 1);
               setState({...state,dc_addFont:result})},
              reject: () => {console.log('reject')}
          });
          }} key={i} className={`${item.value} btn btn-primary btn-sm py-1 m-1`}>{item.label}</button>)}
      </div>
    </div>
  )
}

const DefaultSettingTemplate = ({state,setState,authData}) => {
    const [isImageOpen, setIsImageOpen] = useState(false)
    return (
      <div>
        <table className="table table-sm table-bordered">
          <thead>
            <tr className="text-center">
              <th width="15%">key</th>
              <th>value</th>
              <th width="50%">description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>사이트이름</th>
              <td>
                <InputText
                  className="p-inputtext-sm"
                  value={state.dc_title}
                  onChange={(e) => {
                    setState({ ...state, dc_title: e.target.value });
                  }}
                />
              </td>
              <td></td>
            </tr>

            <tr>
              <th>로고선택</th>
              <td>
                <SelectButton
                  className="p-buttonset-sm"
                  options={[
                    { label: "이미지사용", value: true },
                    { label: "텍스트사용", value: false }
                  ]}
                  optionValue="value"
                  optionLabel="label"
                  value={state.dc_isLogoImage}
                  onChange={(e) => {
                    setState({ ...state, dc_isLogoImage: e.value });
                  }}
                />
                {state.dc_isLogoImage ? (
                  <>
                    <Button
                      label="이미지뷰 열기"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsImageOpen(true);
                      }}
                    />
                    <Sidebar visible={isImageOpen} fullScreen onHide={() => setIsImageOpen(false)}>
                      <ImageViewTemplate
                        authData={authData}
                        isCallback={true}
                        imageCallback={(value) => {
                          setIsImageOpen(false);
                          setState({ ...state, dc_logoImage: value.url });
                        }}
                      />
                    </Sidebar>
                  </>
                ) : null}
              </td>
              <td>
                {state.dc_logoImage !== "" ? (
                  <div className="mt-1">
                    {/* <Image src={state.dc_logoImage} alt={`${state.dc_title}-logo`} width={400} height={120} /> */}
                  </div>
                ) : null}
              </td>
            </tr>

            <tr>
              <th>대표이메일</th>
              <td>
                <InputText
                  className="p-inputtext-sm"
                  value={state.dc_mail}
                  onChange={(e) => {
                    setState({ ...state, dc_mail: e.target.value });
                  }}
                />
              </td>
              <td></td>
            </tr>

            <tr>
              <th>샌드메일 표시이름</th>
              <td>
                <InputText
                  className="p-inputtext-sm"
                  value={state.dc_mailName}
                  onChange={(e) => {
                    setState({ ...state, dc_mailName: e.target.value });
                  }}
                />
              </td>
              <td></td>
            </tr>

            <tr>
              <th>포인트제도</th>
              <td>
                <SelectButton
                  className="p-buttonset-sm"
                  options={[
                    { label: "사용", value: true },
                    { label: "미사용", value: false }
                  ]}
                  optionValue="value"
                  optionLabel="label"
                  value={state.dc_isPoint}
                  onChange={(e) => {
                    setState({ ...state, dc_isPoint: e.value });
                  }}
                />
              </td>
              <td></td>
            </tr>
            {state.dc_isPoint ? (
              <tr>
                <th>로그인 포인트</th>
                <td>
                  <InputNumber
                    value={state.dc_loginPoint}
                    onChange={(e) => {
                      setState({ ...state, dc_loginPoint: e.value });
                    }}
                  />
                </td>
                <td></td>
              </tr>
            ) : null}
               <JoinIPAddress  state={state} setState={setState}/>
          </tbody>
        </table>
      </div>
    );
}

const MetaSettingTemplate = ({state,setState,authData}) => {
    return (
      <div>
         <table className="table table-sm table-bordered">
          <thead>
            <tr className="text-center">
              <th width="15%">key</th>
              <th>value</th>
              <th width="50%">description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>is Meta</th>
              <th>
              <SelectButton 
                className='p-buttonset-sm'
                options={[
                    {label:'사용',value:true},
                    {label:'미사용',value:false},
                ]} 
                optionValue='value'
                optionLabel='label'
                value={state.dc_addMeta.isMeta} 
                 onChange={(e) =>
                    setState({
                      ...state,
                      dc_addMeta: {
                        ...state.dc_addMeta,
                        isMeta: e.target.value,
                      },
                    })
                  } />
              </th>
              <th>
              <small>
            root/content/write(글쓰기),
            <br />
            root/content/update(글수정),
            <br />
            root/admin/*(관리자페이지),
            <br />
            root/auth/*(계정관련페이지)
            <br />
            페이지등은 로봇이 검색할수 없는 페이지입니다.
            <br />
            root/(메인페이지),
            <br />
            root/content/list/*(리스트페이지),
            <br />
            root/content/view/*/*(게시글 뷰 페이지)
            <br />
            root/group/*(그룹 섹션 페이지)
            <br />
            페이지는 항시 검색을 허용하는 페이지 입니다.
            <br />
            그외 관리자님께서 생성하신 커스텀페이지의 자체 관리모드에서 해당
            기능을 사용할 수 있습니다.
          </small>
              </th>
            </tr>

            {state.dc_addMeta.isMeta?
            <tr>
              <th>Title</th>
              <th>
              <InputText
            className="form-control"
            value={state.dc_addMeta.defaultTitle}
            onChange={(e) =>
              setState({
                ...state,
                dc_addMeta: {
                  ...state.dc_addMeta,
                  defaultTitle: e.target.value,
                },
              })
            }
          />
              </th>
              <th></th>
            </tr>
            :null}
             {state.dc_addMeta.isMeta?
            <tr>
              <th>description text</th>
              <th>  
                <InputTextarea
              rows={5}
              cols={30}
              className="form-control"
              value={state.dc_addMeta.defaultDescription}
              onChange={(e) =>
                setState({
                  ...state,
                  dc_addMeta: {
                    ...state.dc_addMeta,
                    defaultDescription: e.target.value,
                  },
                })
              }
            />
            </th>
              <th>
              <small>
            root/(메인페이지)
            <br />
            페이지의 기본설명입니다.
            <br />
            해당 내용은 검색사이트에서 우리 사이트의 설명글에 보여집니다.
            <br />
            또한 적절한 문구는 특정 단어로 검색하였을때 상위검색이 될수
            있습니다.
            <br />
          </small>
              </th>
            </tr>
            :null}
             {state.dc_addMeta.isMeta?
            <tr>
              <th>구글</th>
              <th>
              <InputText
              className='form-control mb-1'
              value={state.dc_addMeta.googleVerification}
              onChange={(e) => {
                setState({
                  ...state,
                  dc_addMeta: {
                    ...state.dc_addMeta,
                    googleVerification: e.target.value,
                  },
                });
              }}
            />

            <Link href="https://search.google.com/search-console/welcome?hl=ko&utm_source=wmx&utm_medium=deprecation-pane&utm_content=home">
              <a className="btn btn-primary" target="_blank">
                Google Saerch Console
              </a>
            </Link>
              </th>
              <th></th>
            </tr>
            :null}
            {state.dc_addMeta.isMeta?
            <tr>
              <th>네이버</th>
              <th>
              <InputText
            className='form-control mb-1'
              value={state.dc_addMeta.naverVerification}
              onChange={(e) => {
                setState({
                  ...state,
                  dc_addMeta: {
                    ...state.dc_addMeta,
                    naverVerification: e.target.value,
                  },
                });
              }}
            />

            <Link href="https://searchadvisor.naver.com/console/board">
              <a className="btn btn-primary" target="_blank">
                네이버 웹마스터 도구{" "}
              </a>
            </Link>
              </th>
              <th></th>
            </tr>
            :null}
            {state.dc_addMeta.isMeta?
            <tr>
              <th>다음</th>
              <th>
              <Link href="https://register.search.daum.net/index.daum">
              <a className="btn btn-primary" target="_blank">
                다음 검색 등록
              </a>
            </Link>
              </th>
              <th></th>
            </tr>
            :null}
            {state.dc_addMeta.isMeta?
            <tr>
              <th>줌</th>
              <th>
              <Link href="https://help.zum.com/submit">
              <a className="btn btn-primary" target="_blank">
                Zum 검색등록
              </a>
            </Link>
              </th>
              <th></th>
            </tr>
            :null}
            {state.dc_addMeta.isMeta?
            <tr>
              <th>사이트맵</th>
              <th>
              <Link href="https://www.xml-sitemaps.com/details-www.lilith.co.kr-8ebd8da93.html">
              <a className="btn btn-primary" target="_blank">
                사이트맵 생성
              </a>
            </Link>
              </th>
              <th></th>
            </tr>
            :null}
          </tbody>
        </table>
      </div>
    );
}

const GradeSetting = ({state,setState ,authData}) => {
  const _arr =[
    {key:'isAdmin'},
    {key:'adminJ'},
    {key:'boardJ'},
    {key:'groupJ'},
    {key:'memberJ'},
    {key:'menuJ'},
    {key:'pointJ'},
    {key:'voteJ'},
    {key:'popupJ'},
    {key:'pageJ'},
  ]
  return(
    <table className='table table-sm'>
    <thead>
      <tr className='text-center'>
        <th width="7%">그레이드</th>
        <th width="10%">명칭</th>
        <th>관리권한</th>
        <th>기본설정 접근</th>
        <th>게시판관리 접근</th>
        <th>그룹관리 접근</th>
        <th>회원관리 접근</th>
        <th>메뉴관리</th>
        <th>포인트관리</th>
        <th>투표관리</th>
        <th>팝업관리</th>
        <th>페이지설정</th>
      </tr>
    </thead>
    <tbody>
    {state.dc_gradeObject.map((item,i)=>{
    return (
      <tr key={i}>
        <td className="text-center">{item.grade}</td>
        <td>
          {state.dc_gradeObject.filter((f) => f.grade === authData.grade)[0].adminJ ? (
            <input
              value={item.label}
              className="form-control form-control-sm"
              onChange={(e) => {
                const result = Array.from(state.dc_gradeObject);
                result.splice(i, 1, { ...state.dc_gradeObject[i], label: e.target.value });

                setState({ ...state, dc_gradeObject:result });
              }}
            />
          ) : (
            item.label
          )}
        </td>

        {_arr.map((a, d) => {
          return (
            <td key={d} className="text-center">
              {authData.grade < i ? (
                item[a.key] ? (
                  <i className="bi bi-check" />
                ) : (
                  <i className="bi bi-x-lg" />
                )
              ) : i + 1 < state.dc_gradeObject.length ? (
                <SelectButton
                  className="p-buttonset-sm"
                  options={[
                    { label: "on", value: true },
                    { label: "off", value: false }
                  ]}
                  optionValue="value"
                  optionLabel="label"
                  value={item[a.key]}
                  onChange={(e) => {
                    if (i + 1 < state.dc_gradeObject.length) {
                      const result = Array.from(arr);
                      result.splice(i, 1,  {
                        ...state.dc_gradeObject[i],
                        [a.key]: e.value
                      });


                      setState({
                        ...state,
                        dc_gradeObject:result
                      });
                    }
                  }}
                />
              ) : item[a.key] ? (
                <i className="bi bi-check" />
              ) : (
                <i className="bi bi-x-lg" />
              )}
            </td>
          );
        })}
        
      </tr>
    );
  })}
    </tbody>
  </table>
  )
}

const AddArrayInput = ({onClick}) => {
  const [state, setState] = useState('')
  return(
    <div className='input-group input-group-sm'>
        <input className='form-control form-control-sm' value={state} onChange={(e)=>setState(e.target.value)}/>
        <button
        className='btn btn-info'
         onClick={(e)=>{
          e.preventDefault()
          onClick(state)
          setState('')
        }}>적용</button>
    </div>
  )
}


const JoinIPAddress = ({ state, setState }) => {
  return (
    <>
      <tr>
        <th>접속 허가 아이피</th>
        <th>
          <textarea
            value={state.dc_possibleIp}
            onChange={(e) => {
              let value = e.target.value.replace(',,',', ').replace(/, *,/,', ').replace(/  */,' ')
              if(value===''){
                value='*.*.*.*,'
              }
              setState({ ...state, dc_possibleIp: value });
            }}
            className="w-100"
          />
        </th>
        <th>
          <small>,(콤마)로 구분합니다. * (와일드카드)는 모두 허용 입니다. </small>
          <br />
          <small>부분적 적용의 예) 123.*,123.123.*,123.123.123.*</small>
        </th>
      </tr>
      <tr>
        <th>접속 불가 아이피</th>
        <th>
          <textarea
            value={state.dc_impossibleIp}
            onChange={(e) => {
              let value = e.target.value.replace(',,',', ').replace(/, *,/,', ').replace(/  */,' ').replace(',*',', ').replace(' *',' ')

              if(value==='' ){
                value='none'
              }
              console.log(value)
             
              setState({ ...state, dc_impossibleIp:value });
            }}
            className="w-100"
          />
        </th>
        <th>
          <small>,(콤마)로 구분합니다. * (와일드카드)는 모두 허용 입니다. </small>
          <br />
          <small>부분적 적용의 예) 123.*,123.123.*,123.123.123.*</small>
        </th>
      </tr>
    </>
  );
};




const LevelRule =({state,setState})=>{
 
  const [newLevelRulCalc, setNewLevelRulCalc] = useState(1000)
  const [pumpValue, setPumpValue] = useState(-1)
  const ____all = [
    { label: "게시글 작성", key: "dc_expContentWrite" },
    { label: "게시글 삭제", key: "dc_expContentDelete" },
    { label: "코멘트 작성", key: "dc_expCommentWrite" },
    { label: "코멘트 삭제", key: "dc_expCommentDelete" },
    { label: "좋아요 클릭", key: "dc_expGoodClick" },
    { label: "좋아요 클릭해제", key: "dc_expGoodCancle" },
    { label: "싫어요 클릭", key: "dc_expBadClick" },
    { label: "싫어요 클릭해제", key: "dc_expBadCancle" },
    // { label: "이벤트 클릭", key: "dc_expEventClick" }
  ];
  const leveluppointInit=(_val,_pump)=>{
    const result=[]
    const max=100
    let total=0
    const pump=_pump||-1
    for (let i = 1; i < max; i++) {
        const value=i*_val
        const exp=(i*pump)*value
        total+=exp
        result.push({level:i,nextExp: exp,totalExp:total})
    }
    return result
}
  return (
    <div className='row'>
       <div className='col-sm-12 col-md-6 col-lg-8'>

      <table className="table table-sm table-bordered">
        <thead>
          <tr className="text-center">
            <th width="25%">key</th>
            <th>value</th>
            <th width="30%">description</th>
          </tr>
        </thead>
          <tbody>
            <tr>
              <th></th>
              <td><InputNumber 
               className='p-inputtext-sm'
              placeholder='input value'
              value={newLevelRulCalc} 
              onChange={(e)=>{              
                setState({...state,
                  dc_levelUpRule:leveluppointInit(e.value,pumpValue)})
                setNewLevelRulCalc(e.value)
              }}/>
              <InputNumber  
               className='p-inputtext-sm'
              placeholder='input pump'
              value={pumpValue} 
              onChange={(e)=>{              
                setState({...state,
                  dc_levelUpRule:leveluppointInit(newLevelRulCalc,e.value)})
                  setPumpValue(e.value)
              }}/>
              </td>
              <td>(level x pump) x (level x value)</td>
            </tr>
          {____all.map((item,i)=>{
            return(
              <tr key={i}>
                <th>{item.label}</th>
                <td>
                  <InputNumber 
                  className='p-inputtext-sm'
                  value={state[item.key]} 
                  onChange={(e)=>{
                    setState({...state,
                    [item.key]:e.value
                    })
                  }}/>
                  </td>
                <td>{item.key}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
          
      </div>
      <div className='col-sm-12 col-md-6 col-lg-4'>
      <ScrollPanel style={{ width: '100%', height: '600px' }}>
        <table className="table table-sm table-bordered">
          <thead>
            <tr className="text-center d-md-none d-lg-table-row">
              <th width="10%">Level</th>
              <th width="45%">Next Exp</th>
              <th width="45%">Total Exp</th>
            </tr>
          </thead>
            <tbody>
            {state.dc_levelUpRule.map((item,i)=>{
                return(
                  <tr key={i} >
                    <th className="text-center">{item.level}</th>
                    <td className="text-right">{item.nextExp} </td>
                    <td className="text-right">{item.totalExp}</td>
                  </tr>
                )
              })}
            </tbody>
          </table> 
      </ScrollPanel>
     
      </div>
     
    </div>
  
  )
}