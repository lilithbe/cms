import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Galleria } from "primereact/galleria";
import {InputNumber} from 'primereact/inputnumber'
import Link from "next/link";
import dynamic from "next/dynamic";

import { postApi } from "../../../api";
import { MY_IMAGE_LIST, IMAGE_UPLOAD, WRITE, MY_FILE_LIST, FILE_UPLOAD } from "../../../common";
import { authUpdate } from "../../../redux";
import { arrayAddFormat } from "../../../lib/array";
import ImageViewTemplate from "../ImageViewTemplate";

import FileViewTemplate from "../FileViewTemplate";
import { ScrollPanel } from "primereact/scrollpanel";
import { Image } from 'primereact/image';
import moment from "moment";
import HtmlParser from "react-html-parser";
const Editor = dynamic(() => import("../../editor/WriteEditor"), { ssr: false });

const korea = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
const spacial = /[~!@#\#$%<>^&*]/g;
const upercase = /[A-Z]/g;
const lowcase = /[a-z]/g;

const WriteTemplate = ({ setAuthUpdate, authData, configData, boardData, groupData }) => {
  const router = useRouter();
  const { board } = router.query;

  const isDesktop = window.innerWidth >= 992;
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDialog, setIsSubmitDialog] = useState(false);

  const boardConfig = boardData.board_config.filter((f) => f.value === board)[0];
  const groupConfig = groupData.group_config.filter((f) => f.id === boardConfig.groupId)[0];
  const law =
    boardConfig.groupId === "nongroup"
      ? "board"
      : groupData.group_config.filter((f) => f.id === boardConfig.groupId)[0].groupLaw
      ? "group"
      : boardConfig.groupLaw
      ? "group"
      : "board";
  const [lawData, setLawData] = useState(law === "group" ? groupConfig : boardConfig);
  useEffect(() => {
    setLawData(law === "group" ? groupConfig : boardConfig);
    return () => {
      setLawData({});
    };
  }, [boardConfig, groupConfig, law]);
  const contentWriteInit = {
    isVote: false,
    options: [],
    start: moment(),
    end: moment(),

    isNotice: false,
    isMobile: !isDesktop,
    subject: "",
    content: "",
    string: "",
    arrayContent: [],
    writeData: authData,
    writeId: authData.userId,
    thumbnail: "none",
    isThumbnail: false,
    uploadFiles: [],
    price: 0,
    unit: "point",
    editorFiles: [],
    imageBoardData: [],
    videoBoardData: [],
    saleBoardData: []
  };
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
        console.log(res);
        if (res.data.status) {
          setAuthUpdate(res.data.account);
          router.push(`/content/list/${board}`);
        }
      },
      { ...state, boardName: boardConfig.value, isLogin: true },
      authData.userToken
    );
  };

  return (
    <div className="content-write-wrapper">
      <WriteTitleDiv lawData={lawData} />
     

      {authData.grade > lawData.createGrade ? (
        <div>
         

          <AdminMenuTemplate state={state} setState={setState} authData={authData} law={law} lawData={lawData}/>
         
          <SubjectInput  state={state} setState={setState} />
          <ImageBoardTemplate authData={authData} state={state} setState={setState} grade={authData.grade} law={law} lawData={lawData} />
          <VideoBoardTemplate authData={authData} state={state} setState={setState} grade={authData.grade} law={law} lawData={lawData} />
          <SaleBoardTemplate authData={authData} state={state} setState={setState} grade={authData.grade} law={law} lawData={lawData} />
          <ThumbnailTemplate authData={authData} state={state} setState={setState} grade={authData.grade} law={law} lawData={lawData} />
          <WriteContent authData={authData} state={state} setState={setState} grade={authData.grade} law={law} lawData={lawData} />

          <VoteTemplate authData={authData} state={state} setState={setState} grade={authData.grade} law={law} lawData={lawData} />

          <FileUploaderTemplate authData={authData} state={state} setState={setState} grade={authData.grade} law={law} lawData={lawData} />

          <div className="card">
            <div className="card-footer d-flex justify-content-end">
              <Button className="px-5" color="primary" icon="bi bi-save" label="글등록" onClick={onSubmitHandler} />
            </div>
          </div>

          <Toast ref={toast} />
          <Dialog visible={isSubmitDialog} onHide={() => setIsSubmitDialog(false)}></Dialog>
        </div>
      ) : 
      authData.isLogin?<div>회원님의 등급으로는 이용하실수 없습니다.</div>:
      <div>글쓰기는 로그인 이후에 가능합니다.</div>}
    
    </div>
  );
};

WriteTemplate.propTypes = {};
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
export default connect(mapStateToProps, mapDispatchToProps)(WriteTemplate);

const AdminMenuTemplate = ({state,setState,law,lawData,authData}) => {
 return(
  <div className="admin-card card mb-2">
  <div className="card-header fw-bold">
    <i className="bi bi-tornado mr-2" />
    Admin Menu
  </div>
  <div className="card-body">
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

    {state.isNotice ? (
      <div className="col-12">
        <Checkbox inputId="admin-vote" onChange={(e) => setState({ ...state, isVote: e.checked })} checked={state.isVote}></Checkbox>
        <label htmlFor="admin-vote" className="p-checkbox-label ml-3">
          설문조사
        </label>
      </div>
    ) : null}
  </div>
</div>
 )
};

const SubjectInput = ({state,setState}) => {
  return(
    <div className="card mb-2">
    <div className="card-header fw-bold">
      <i className="bi bi-sunglasses mr-2" />
      Subject
    </div>
    <div className="card-body p-0">
      <InputText
        placeholder="제목을 입력하세요."
        value={state.subject}
        className={"form-control"}
        onChange={(e) => {
          setState({ ...state, subject: e.target.value });
        }}
      />
    </div>
  </div>
  )
};

const WriteContent = ({ state, setState, law, lawData, grade, authData }) => {
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
  return lawData.boardType !== "videoBoard" && lawData.boardType !== "imageBoard" ? writeTemplate : state.isNotice ? writeTemplate : null;
};

const FileUploaderTemplate = ({ state, setState, law, lawData, grade, authData }) => {
  return lawData.fileUploadConfig.map((item, i) => {
    return <FileUploader key={i} item={item} />;
  });
};

const ThumbnailTemplate = ({ state, setState, law, lawData, grade, authData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [thumbnailState, setThumbnailState] = useState(lawData.defaultThumbnail);
  const imageSaveHandler = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    formData.append("upload", files[0]);
    postApi(
      setIsLoading,
      FILE_UPLOAD+'',
      (res) => {
        if (res.data.status) {
          setImageList([...imageList, res.data.data]);
          setThumbnailState(res.data.data.url);
          setState({ ...state, thumbnail: res.data.data.url });
        }
      },
      formData,
      authData.userToken
    );
  };

  useEffect(() => {
    postApi(
      setIsLoading,
      MY_FILE_LIST+'image',
      (res) => {
        setImageList(res.data.result);
      },
      {},
      authData.userToken
    );
    return () => {
      setImageList([]);
    };
  }, [authData.userToken]);

  if (lawData.isThumbnail) {
    return (
      <div className="card mb-2">
        <div className="card-header fw-bold ">
          <i className="bi bi-image mr-2" />
          Thumbnail
        </div>
        <div className="card-body p-0">
          <div className="row" style={{ height: "170px" }}>
            <div className=" col-12 col-md-5 col-lg-3 py-0 pr-0 pl-lg-0">
              <div className="d-flex justify-content-center align-items-center p-2" style={{ height: "140px" }}>
                <Image src={thumbnailState} width="100%" alt="thumbnail-image" />
              </div>
              <div>
                <label htmlFor="imageUploadLabel" className="btn btn-info btn-sm w-100">
                  <i className="bi-image mr-2" />
                  이미지 업로드
                </label>
                <input name="upload" accept="image/*" onChange={imageSaveHandler} type="file" id="imageUploadLabel" style={{ display: "none" }} required />
              </div>
            </div>
            <div className=" col-12 col-md-7 col-lg-9 py-0 pl-0 pr-lg-0">
              <div style={{ width: "100%", height: "170px", overflowY: "hidden", overflowX: "scroll", border: "1px solid #999999" }}>
                <div className="row py-0" style={{ padding: "1em", lineHeight: "1.5", width: `${imageList.length * 130 + 500}px` }}>
                  {imageList.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="col d-inline d-flex align-items-center"
                        style={{ width: "120px", height: "120px" }}
                        onClick={() => {
                          setThumbnailState(item.url);
                        }}
                      >
                        <Image className=" border border-danger mr-2 cursor-pointer" src={item.url} width="100%" alt="thumbnail-image" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const FileUploader = ({ item }) => {
  const [isFileOpen, setIsFileOpen] = useState(false);

  return (
    <div className="card mb-2">
      <div className="card-header fw-bold ">
        <i className="bi bi-file-earmark-arrow-up-fill mr-2" />
        {item.label}
      </div>
      <div className="card-body">
        <Button
          label={item.label}
          onClick={() => {
            setIsFileOpen(true);
          }}
        />

        <Sidebar
          header={item.label}
          fullScreen
          visible={isFileOpen}
          onHide={() => {
            setIsFileOpen(false);
          }}
        >
          <FileViewTemplate
            maxSize={item.maxSize}
            minSize={item.minSize}
            extention={item.extention}
            fileType={item.fileType}
            isCallback
            callback={(file) => {
              // setState({
              //   ...state,
              //   thumbnail:img
              // })
              setIsFileOpen(false);
            }}
          />
        </Sidebar>
      </div>
    </div>
  );
};

const VoteTemplate = ({ state, setState, law, lawData, grade, authData }) => {
  return state.isVote ? (
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
  ) : null;
};

const ImageBoardTemplate = ({ state, setState, law, lawData, grade, authData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemTemplate = (item) => {
    return <Image src={item.src} alt={item.alt} style={{ minWidth: "500px", width: item.width }} />;
  };
  const thumbnailTemplate = (item) => {
    return <Image src={item.thumbnail} alt={item.alt} style={{ width: "70px" }} />;
  };
  const caption = (item) => {
    return (
      <div>
        <InputText
          placeholder="Caption Title..."
          className="form-control"
          value={item.captionTitle}
          onChange={(e) => {
            setState((prev) => {
              return {
                ...prev,
                imageBoardData: arrayAddFormat(state.imageBoardData, { ...state.imageBoardData[activeIndex], captionTitle: e.target.value }, activeIndex)
              };
            });
          }}
        />
        <Editor
          height={60}
          minHeight={30}
          mode={"balloon"}
          value={item.captionContent}
          buttonList={[["font", "fontSize", "bold", "underline", "italic", "strike"]]}
          onChange={(html) => {
            setState((prev) => {
              return {
                ...prev,
                imageBoardData: arrayAddFormat(state.imageBoardData, { ...state.imageBoardData[activeIndex], captionContent: html }, activeIndex)
              };
            });
          }}
        />
      </div>
    );
  };
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 10
    },
    {
      breakpoint: "768px",
      numVisible: 5
    },
    {
      breakpoint: "560px",
      numVisible: 3
    }
  ];
  return lawData.boardType === "imageBoard" && !state.isNotice ? (
    <div className="card">
      <div className="card-header">
        <i className="bi bi-image mr-2" />
        이미지 등록
      </div>
      <div className="card-body">
        <div>
          <Galleria
            activeIndex={activeIndex}
            value={state.imageBoardData}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            style={{ maxWidth: "640px" }}
            caption={caption}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
            onItemChange={(e) => {
              setActiveIndex(e.index);
            }}
          />
        </div>
        <div></div>
      </div>
      <div className="card-footer">
        <ImageViewTemplate
          isCallback
          imageCallback={(res) => {
            setState((prev) => {
              return {
                ...prev,
                imageBoardData: [
                  ...prev.imageBoardData,
                  {
                    ...res,
                    alt: res.name,
                    captionTitle: "caption title",
                    captionContent: "caption Content"
                  }
                ]
              };
            });
            console.log(res);
          }}
        />
      </div>
    </div>
  ) : null;
};

const VideoBoardTemplate = ({ state, setState, law, lawData, grade, authData }) => {
  return lawData.boardType === "videoBoard" && !state.isNotice ? (
    <div className="card">
      <div className="card-header">
        <i className="" />
        메인 비디오 등록
      </div>
      <div className="card-body"></div>
    </div>
  ) : null;
};

const SaleBoardTemplate = ({ state, setState, law, lawData, grade, authData }) => {
  return lawData.boardType === "saleBoard" && !state.isNotice ? (
    <div>
      <div className="card">
        <div className="card-header fw-bold">
          <i className="bi bi-currency-dollar mr-2" />
          가격설정
         
        </div>
        <div className="card-body p-0">
        <InputNumber
      suffix={` ${state.unit}`}
          className="form-controll"
        value={state.price} onChange={(e)=>{
            let value = e.value

          setState((prev)=>{
            return {...prev,
            price:
            value}
          })
        }} />
        </div>
      </div>
      <div className="card">
        <div className="card-header  fw-bold">
          <i className="bi bi-images mr-2" />
          제품사진
        </div>
        <div className="card-body component-list-wrapper">
        

<ImageView images={state.saleBoardData} onChange={(data)=>{
  setState((prev)=>{
    return {...prev,
      saleBoardData:data
    }
  })
}}/>

{/* <div  className="component-list">
  <div className="file-list-info d-none d-md-block">
      <span className="xefu-btn text-center">
        <span className="files-text bi bi-images"></span>
      </span>
      <input type="file" accept="image/*" multiple="multiple" className="files-text files-input" />
      <span className="total-size text-small-2">0KB</span>
      <button className="btn btn-md btn-danger"  disabled 
      // onclick="deleteCheckedImages()"
      >Remove</button>
  </div>
  <div className="file-list">
    <ul>

      {state.saleBoardData.map((item,i)=>{
        return (
          <li key={i} className="checked">
          <div>
            <div className="image-wrapper">
              <img src={item.src} alt={item.alt} />
            </div>
            <a className="image-size">{(item.size / 1000).toFixed(1) * 1} KB</a>
            <div className="image-check">
              <i className="bi bi-check"/>
            </div>
          </div>
        </li>
        )
      })}
    </ul>
  </div>
</div> */}




        

        </div>
      </div>
    </div>
  ) :null
};



const ImageView = ({images,onChange }) => {
  const [checkItems, setCheckItems] = useState([])
  const [allSize, setAllSize] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  useEffect(() => {
    console.log(checkItems)
  }, [checkItems])
  useEffect(() => {
    let resultSize=0;
    for (let i = 0; i < images.length; i++) {
      const item = images[i];
      resultSize=resultSize+item.size
    }
    setAllSize((resultSize / 1000).toFixed(1) * 1)
  }, [images])
  return(
<div>
<div  className="component-list">
  <div className="file-list-info d-none d-md-block">

      <button htmlFor="image-add-input" className="btn btn-sm btn-outline-primary w-100" onClick={(e)=>{
        e.preventDefault()
        setIsDialogOpen(!isDialogOpen)
      }}>
       <i className="bi bi-card-image"></i>
      </button>
    
      {/* <input id="image-add-input" type="file" accept="image/*" multiple="multiple" className="files-text files-input" /> */}
      <span className="total-size text-small-2">{allSize}KB</span>
      <button className="btn btn-md btn-outline-danger w-100" 
       disabled={checkItems.length>0?false:true} 
      // onclick="deleteCheckedImages()"
      onClick={(e)=>{
        e.preventDefault()
        const result=  Array.from(images)
        for (let ci = 0; ci < checkItems.length; ci++) {
          const dItem = checkItems[ci];
          const index = result.findIndex(f=>f.idN===dItem.idN)
          result.splice(index,1)
        }
        console.log(result)
        onChange(result)
        setCheckItems([])
        
      }}
      >
         <i className="bi bi-trash"></i>
      </button>
  </div>
  <div className="file-list">
    <ul>

      {images.map((item,i)=>{
        return (
          <ImageItem key={i} item={item} index={i} onCheck={()=>{
            const result = Array.from(images)
            result.splice(i,1,{...item,checked:!item.checked})
            onChange(result)
            if(item.checked){
              const _result =  Array.from(checkItems)
              const idIndex = _result.findIndex(f=>f.idN===item.idN)
              _result.splice(idIndex,1)
              setCheckItems(_result)
            }else{
              setCheckItems([...checkItems,{...item,checked:!item.checked}])
            }
          }}/>
        )
      })}
    </ul>
  </div>
 
</div>
{isDialogOpen?
  <div className="mt-2">
    <ImageViewTemplate
          isCallback
          imageCallback={(res) => {
           
            if(images.length<10){
              onChange([...images, {...res,checked:false,idN:crypto.randomUUID()}]);
            }
           
          }}
        />
  </div>:
  null}

</div>
  )
}

const ImageItem = ({item,index,onCheck}) => {
  
  return(
    <li key={index} className={item.checked?'checked':''} onClick={(e)=>{
      e.preventDefault()
      onCheck()
    }}>
    <div>
      <div className="image-wrapper">
        <div className="image-block" style={{backgroundImage:`url("${item.src}")`}}/>
   
      </div>
      <a className="image-size">{(item.size / 1000).toFixed(1) * 1} KB ({index+1})</a>
      <div className="image-check">
        <i className="bi bi-check"/>
      </div>
    </div>
  </li>
  )
}


const WriteTitleDiv = ({lawData}) => {
  return(
    <div
    className="  d-flex align-items-center "
    style={{
      width: "100%",
      height: "120px",
      backgroundImage: `url("${lawData.defaultTitleImage}")`,
      backgroundSize: "cover",
      textShadow: "1px -1px 1px #ffffff",
      fontSize: "3rem",
      color: "#ffffff",
      display: "fixed"
    }}
  >
    <span className="text-center w-100">{lawData.label}</span>{" "}
  </div>
  )
};

