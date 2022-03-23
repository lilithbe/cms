import { useState, useEffect, useRef , useMemo} from 'react';
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { SelectButton } from 'primereact/selectbutton';
import { Calendar } from "primereact/calendar";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import moment from "moment";
import { postApi } from "../../../api";
import { authUpdate } from "../../../redux";
import { MY_IMAGE_LIST, IMAGE_UPLOAD, WRITE, initPost, MY_LIST } from "../../../common";
import CodeEditor from '../../codemirror/CodeEditor';
import PropTypes from 'prop-types';
import JsonView from '../../admin/jsonView/JsonView';



const Editor = dynamic(() => import("../../editor/WriteEditor"), { ssr: false });

const WriteBody = ({ authData, configData, boardData, groupData, setAuthUpdate }) => {
    const router = useRouter();
    const { board } = router.query;
    const toast = useRef(null); 
    const isDesktop = window.innerWidth >= 992;
    const boardConfig = boardData.board_config.filter((f) => f.value === board)[0];
    const groupConfig = boardConfig.groupId==='nongroup'?boardConfig:groupData.group_config.filter((f) => f.id === boardConfig.groupId)[0];
    const law =
        boardConfig.groupId === "nongroup"
            ? "board"
            : groupData.group_config.filter((f) => f.id === boardConfig.groupId)[0].groupLaw
                ? "group"
                : boardConfig.groupLaw
                    ? "group"
                    : "board";
    const contentWriteInit = useMemo(() => {
    return {
        isSeries: false,
        sId:'',
        sIndex:0,
        sStart:moment(),
        isSeriesEnd:false,
        sEnd:moment(),

        isMobile: false,
        subject: "",
        content: "",
        string: "",
        arrayContent: [],
        writeData: authData,
        writeId: authData.userId,     
        thumbnail: {},
        isThumbnail: false,
        uploadFiles: [],
        goodUser: [],
        badUser: [],
        price: 0,
        unit: "point",
        isVote: false,
        options: [],
        start: moment(),
        end: moment(),
        isNotice: false,
        editorFiles: [],
        imageBoardData: [],
        videoBoardData: [],
        saleBoardData: [],
        buyBoardData: [],
        qnaBoardData: [],
        voteBoardData: [],
        codeBoardData:[
            {type:'defaultContent',content:''},
            {type:'code',content:'//Code Editor',mode:'xml',theme:'xq-dark',fileName:'',directory:''}
        ]
    };
    }, [authData]);
    const [lawData, setLawData] = useState(law === "group" ? groupConfig : boardConfig);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState({
        ...contentWriteInit,
        isVote:
            law === "group"
                ? groupConfig.boardType === "voteBoard"
                    ? true
                    : false
                : law === "board"
                    ? boardConfig.boardType === "voteBoard"
                        ? true
                        : false
                    : false
    });

    useEffect(() => {
        setLawData(law === "group" ? groupConfig : boardConfig);
        return () => {
            setLawData({});
        };
    }, [boardConfig, groupConfig, law]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (state.subject.length < 1) {
            toast.current.show({ severity: "error", summary: "error Message", detail: "제목이 너무 짧습니다." });
            return;
        }
      
        postApi(
            setIsLoading,
            `${WRITE}/${boardConfig.boardType}`,
            (res) => {
                console.log(res)
                if (res.data.status) {
                    setAuthUpdate(res.data.account);
                    router.push(`/content/list/${board}`);
                }
            },
            { ...state, boardName: boardConfig.value, isLogin: true },
            authData.userToken
        );
    };

    const template = (boardType) => {
        switch (boardType) {
            case 'freeBoard':
                return (
                    <FreeBoardTemplate
                        state={state}
                        setState={setState}
                        authData={authData}
                        law={law}
                        lawData={lawData} />
                )
            case 'videoBoard':
                return (
                    <VideoBoardTemplate
                        state={state}
                        setState={setState}
                        authData={authData}
                        law={law}
                        lawData={lawData} />
                )
            case 'imageBoard':
                return (
                    <ImageBoardTemplate
                        state={state}
                        setState={setState}
                        authData={authData}
                        law={law}
                        lawData={lawData} />
                )
            case 'saleBoard':
                return (
                    <SaleBoardTemplate
                        state={state}
                        setState={setState}
                        authData={authData}
                        law={law}
                        lawData={lawData} />
                )
            case 'buyBoard':
                return (
                    <BuyBoardTemplate
                        state={state}
                        setState={setState}
                        authData={authData}
                        law={law}
                        lawData={lawData} />
                )
            case 'qnaBoard':
                return (
                    <QnaBoardTemplate
                        state={state}
                        setState={setState}
                        authData={authData}
                        law={law}
                        lawData={lawData} />
                )
            case 'voteBoard':
                return (
                    <VoteBoardTemplate
                        state={state}
                        setState={setState}
                        authData={authData}
                        law={law}
                        lawData={lawData} />
                )
            case 'codeBoard':
                return (
                    <CodeBoardTemplate
                        state={state}
                        setState={setState}
                        authData={authData}
                        law={law}
                        lawData={lawData} />
                )
            default:
                return (
                    <div> </div>
                )
        }

    };
    return (
        <div>
            <AdminMenuTemplate  state={state} setState={setState} authData={authData} groupConfig={groupConfig} boardConfig={boardConfig} />
            {template(lawData.boardType)}
            <SeriesTemplate state={state} setState={setState} authData={authData} law={law} lawData={lawData} board={board} />
            <Toast ref={toast} />

            <div className="card">
                <div className="card-footer d-flex justify-content-end">
                    <JsonView json={state}/>
                    <Button className="px-5" color="primary" icon="bi bi-save" label="글등록" onClick={onSubmitHandler} />
                </div>
            </div>
        </div>
    )
};

WriteBody.propTypes = {};

const mapStateToProps = (state) => {
    return {
        configData: state.configData,
        authData: state.authData,
        groupData: state.groupData,
        boardData: state.boardData
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setAuthUpdate: (data) => dispatch(authUpdate(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(WriteBody);

const AdminMenuTemplate = ({ state, setState, groupConfig, boardConfig, authData }) => {
    if (boardConfig.adminData.userId === authData.userId ||boardConfig.groupId!=='nongroup'? groupConfig.adminData.userId === authData.userId || authData.grade >= 9 :true) {
        return (
            <WriteSectionCard icon='bi bi-tornado' title=" Admin Menu" className=' mb-sm-1 mb-md-3 mb-lg-5'>
                    <div className='row'>
                        <div className="col-12">
                            <Checkbox
                                inputId="admin-notice"
                                onChange={(e) => setState({ ...state, isNotice: e.checked, isVote: e.checked === false ? false : state.isVote })}
                                checked={state.isNotice}
                            ></Checkbox>
                            <label htmlFor="admin-notice" className="p-checkbox-label ml-3">
                                공지사항
                            </label>
                        </div>

                        {state.isNotice? (
                            <div className="col-12">
                                <Checkbox inputId="admin-vote" onChange={(e) => setState({ ...state, isVote: e.checked })} checked={state.isVote}></Checkbox>
                                <label htmlFor="admin-vote" className="p-checkbox-label ml-3">
                                    설문조사
                                </label>
                            </div>
                        ) : null}
                    </div>
            </WriteSectionCard>
        )
    } else {
        return null
    }
};

const WriteSectionCard =({children , icon, title ,bodyClass, headerClass , className})=>{
    return(
    <div className={`card ${className}`}>
          <div className={`card-header ${headerClass}`}>
                <i className={`${icon} mr-2`} />{title}
            </div>
        <div className={`card-body ${bodyClass}`}>
            {children}
        </div>
    </div>
    )
}
WriteSectionCard.propTypes = {
    icon: PropTypes.string, 
    title: PropTypes.string,
    bodyClass: PropTypes.string, 
    headerClass : PropTypes.string,
    className: PropTypes.string,
};
WriteSectionCard.defaultProps = {
    bodyClass:"p-0", 
    headerClass :"fw-bold", 
    className:""
};

const SubjectInput = ({ state, setState }) => {
    return (
        <WriteSectionCard title="Subject" icon="bi bi-sunglasses" className=' my-sm-1 my-md-3 my-lg-5'>
            <InputText
                placeholder="제목을 입력하세요."
                value={state.subject}
                className={"form-control"}
                onChange={(e) => {
                    setState({ ...state, subject: e.target.value });
                }}
            />
        </WriteSectionCard>
    )
};
const WriteContent = ({ state, setState, lawData, authData }) => {
    const writeTemplate = (
        <div className="card mb-2">
            <div className="card-header fw-bold ">
                <i className="bi bi-suit-heart-fill mr-2" />
                {lawData.boardType === "qnaBoard"
                    ? "Question"
                    : lawData.boardType === "voteBoard"
                        ? "Vote Question"
                        : lawData.boardType === "saleBoard"
                            ? "Sale Content"
                            : "Content"}
            </div>
            <div className="card-body p-0">
                {state.isMobile ? (
                    <textarea
                        className="form-control"
                        style={{ minHeight: "400px" }}
                        value={state.string}
                        onChange={(e) => {
                            setState({
                                ...state,
                                string: e.target.value
                            });
                        }}
                    />
                ) : (
                    <Editor
                        autoFocus={false}
                        editorFiles={state.editorFiles}
                        setEditorFiles={(data) => {
                            setState((prev) => {
                                return { ...prev, editorFiles: data };
                            });
                        }}
                        authData={authData}
                        value={state.content}
                        height="auto"
                        minHeight={300}
                        onChange={(html, str) => {
                            setState((prev) => {
                                return { ...prev, content: html, string: str };
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
    return writeTemplate
};

const SeriesTemplate = ({state, setState,board, authData, law, lawData}) => {
    const [userPosts, setUserPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState({});
    const [oldSelected, setOldSelected] = useState({});
    useEffect(() => {
      postApi(setIsLoading,MY_LIST,(res)=>{
        console.log(res)
          if(res.data.status){
           
            setUserPosts(res.data.list)
          }
      },{boardValue:board},authData.userToken);    
      return () => {
        setUserPosts([])
      };
    }, [authData.userToken, board]);
    const onoffOptions = [
        {label: 'On', value: true},
        {label: 'Off', value: false},
    ];
    const seriesBeT = (row) => {
      return(
          <div>{row.isSeries?'연재중':''}</div>
      )
    };


    useEffect(() => {
      console.log(state);
    }, [state]);
    
    
    return(
        <div className='card  my-sm-1 my-md-3 my-lg-5'>
            <div className='card-header'>연재 설정</div>
            <div className='card-body'>
            <SelectButton value={state.isSeries} options={onoffOptions} onChange={(e) =>{
                setState((prev)=>{
                    let result={
                        isSeries:e.value
                    }
                    if(e.value===true){
                        result.sId=crypto.randomUUID()
                    }else{
                        result.sId=''
                        result.isSeries=false
                    }
                    return {...prev,...result}
                })
            }}  />
            </div>
            {state.isSeries?
             <div className='card-body'>
                 {userPosts.length===0?
                 <div>
                     게시판에 작성한 컨텐츠가 없습니다.
                     컨텐츠로 연재를 시작하시겠습니까?
                 </div>:
                <DataTable 
                    value={userPosts} 
                    responsiveLayout="scroll" 
                    className='p-datatable-sm'
                    selectionMode="radiobutton"
                    selection={selected} 
                    onSelectionChange={(e) => {              
                        setState((prev)=>{
                            let sId=crypto.randomUUID()
                            if(e.value!==null){   
                                sId=e.value.sId
                            }
                            return {
                                ...prev,sId:sId
                            }
                        })    
                       
                        setSelected(e.value)
                    }} 
                    dataKey="id" >
                <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
                <Column field="no" header="No"></Column>
                <Column field="subject" header="제목"></Column>
                <Column body={seriesBeT} header="연재컨텐츠"></Column>
            </DataTable>
                }
          
         </div>:null}

   
           
        </div>
    )
};


const FreeBoardTemplate = ({ state, setState, authData, law, lawData }) => {
    return (
        <div>
            <SubjectInput state={state} setState={setState} />
            <WriteContent
                state={state}
                setState={setState}
                authData={authData}
                lawData={lawData} />
        </div>
    )
};
const VideoBoardTemplate = ({ state, setState, authData, law, lawData }) => {
    return (
        <div>
            <SubjectInput state={state} setState={setState} />
            비디오게시판
        </div>
    )
};
const ImageBoardTemplate = ({ state, setState, authData, law, lawData }) => {
    return (
        <div>
            <SubjectInput state={state} setState={setState} />
            이미지 앨범 게시판
        </div>
    )
};
const SaleBoardTemplate = ({ state, setState, authData, law, lawData }) => {
    return (
        <div>
            <SubjectInput state={state} setState={setState} />
            판매자유게시판
        </div>
    )
};
const BuyBoardTemplate = ({ state, setState, authData, law, lawData }) => {
    return (
        <div>
            <SubjectInput state={state} setState={setState} />
            구매시판

        </div>
    )
};
const QnaBoardTemplate = ({ state, setState, authData, law, lawData }) => {
    return (
        <div>
            <SubjectInput state={state} setState={setState} />
            질문게시판
        </div>
    )
};
const VoteBoardTemplate = ({ state, setState, authData, law, lawData }) => {
    return (
        state.isVote?
        <div>
            <SubjectInput state={state} setState={setState} />
            <div className="card mb-2">
                <div className="card-header  fw-bold">
                    <i className="bi bi-ticket-detailed mr-2" />
                    Voting Options
                </div>
                <div className="card-body">
                    <table className="table">
                    <tbody>
                        <tr>
                        <th className="text-center">Options</th>
                        <td>
                            {state.options.map((item, i) => {
                            return (
                                <div key={i} className="p-inputgroup p-buttonset-sm mb-1">
                                <InputText
                                    className="p-inputtext-sm form-control"
                                    value={item.label}
                                    onChange={(e) => {
                                    setState({
                                        ...state,
                                        options: arrayAddFormat(
                                        state.options,
                                        {
                                            no: i + 1,
                                            label: e.target.value
                                        },
                                        i
                                        )
                                    });
                                    }}
                                />
                                <Button icon="bi bi-trash" className="p-button-danger" />
                                </div>
                            );
                            })}
                            <div>
                            <Button
                                icon="bi bi-plus"
                                className="p-button-sm"
                                label="옵션추가"
                                onClick={() => {
                                setState({ ...state, options: [...state.options, { label: "", no: state.options.length + 1 }] });
                                }}
                            />
                            </div>
                        </td>
                        </tr>
                        <tr>
                        <th className="text-center">Start</th>
                        <td>
                            <Calendar
                            className="p-buttonset-sm"
                            showIcon
                            id="newvote-start"
                            value={state.start}
                            onChange={(e) => {
                                setState({ ...state, start: e.value });
                            }}
                            showTime
                            showSeconds
                            />
                        </td>
                        </tr>
                        <tr>
                        <th className="text-center">End</th>
                        <td>
                            <Calendar
                            showIcon
                            id="newvote-end"
                            value={state.end}
                            onChange={(e) => {
                                setState({ ...state, end: e.value });
                            }}
                            showTime
                            showSeconds
                            />
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>

      
        </div>
        :null
    )
};
const CodeBoardTemplate = ({ state, setState, authData, law, lawData }) => {
    
    return (
        <div>
            <SubjectInput state={state} setState={setState} />
            {state.codeBoardData.map((item,i)=>{
                return(item.type==='code'?
                <div key={i} className="py-2">
                    <CodeEditor 
                    isCopy={false}
                    directory={item.directory}
                    fileName={item.fileName}
                    className={""}
                    mode={item.mode}
                    theme={item.theme}
                    disable={false} 
                    value={item.content} 
                    onModeChange={(e)=>{
                        const value=e.value
                        setState((prev) => {
                            const result = Array.from(prev.codeBoardData);
                            result.splice(i, 1,{...item, mode:value});
                            return { ...prev, codeBoardData:result };
                        });
                    }}
                    onThemeChange={(e)=>{
                        const value=e.value
                        setState((prev) => {
                            const result = Array.from(prev.codeBoardData);
                            result.splice(i, 1,{...item, theme:value});
                            return { ...prev, codeBoardData:result };
                        });
                    }}
                    onChange={(value)=>{
                        setState((prev) => {
                            const result = Array.from(prev.codeBoardData);
                            result.splice(i, 1,{...item, content:value});
                            return { ...prev, codeBoardData:result };
                        });
                    }}/>
                </div>:
                <div key={i} className="py-2">
                    <Editor
                autoFocus={false}
                // editorFiles={item.editorFiles}
                // setEditorFiles={(data) => {
                //     setState((prev) => {
                //         const result = Array.from(item.editorFiles);
                //         result.splice(i, 1, data);
                //         return { ...prev, codeBoardData: result };
                //     });
                // }}
                buttonList={[[
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
                    "list",
                    "link",
                    "align",
                ]]}
                authData={authData}
                value={item.content}
                height="auto"
                minHeight={80}
                onChange={(html, str) => {
                    setState((prev) => {
                        const result = Array.from(prev.codeBoardData);
                        result.splice(i, 1,{...item, content:html});
                        return { ...prev, codeBoardData:result };
                    });
                }}
            />
                </div>
                )
            })}
            <Button icon="bi bi-plus" label="Add Code"
            onClick={()=>{

                setState((prev)=>{
                    return {...prev,codeBoardData:[...prev.codeBoardData,
                        {type:'code',content:'//Code Editor',mode:'xml',theme:'xq-dark',fileName:'app.js',directory:'root/file/app.js'}
                    ]}
                })
            }}
            />
            <Button icon="bi bi-plus" label="Add Text"
             onClick={()=>{
                setState((prev)=>{
                    return {...prev,codeBoardData:[...prev.codeBoardData,{type:'content',content:''}]}
                })
            }}/>



            
        </div>
    )
};