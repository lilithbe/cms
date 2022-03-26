import { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { postApi } from "../../../api";
import { READ , initPost} from "../../../common";
import ContentLayout from "../../../layout/ContentLayout";
import Link from "next/link";
import Htmlparser from "react-html-parser";
import HandButton from "../../formControl/HandButton";
import PropTypes from "prop-types";
import { Image } from 'primereact/image';

import { Galleria } from 'primereact/galleria';
import CodeEditor from "../../codemirror/CodeEditor";
import HtmlParser from "react-html-parser";
import moment from "moment";

const ViewBody = ({boardData,authData, groupData}) => {
  const router = useRouter();
  const { board, id } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState([]);
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
              const [lawData, setLawData] = useState(law === "group" ? groupConfig : boardConfig);            
  const postInit = useMemo(() => {
    return {
      isSeries: false,
      isMobile: false,
      subject: "",
      content: "",
      string: "",
      arrayContent: [],
      writeData: {
          userImage:'',
      },
      writeId: "",
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
      codeBoardData:[]
    };
  }, []);

  const [post, setPost] = useState(postInit);
const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    postApi(
      setIsLoading,
      READ,
      (res) => {
        if (res.data.status) {
          setPost(res.data.post);
          setComment(res.data.comment);
        }
      },
      { boardValue: board, contentId: id, isLogin: authData.isLogin },
      authData.isLogin ? authData.userToken : null
    );
    return () => {
      setPost(postInit);
      setComment([]);
    };
  }, [authData.isLogin, authData.userToken, board, id, postInit]);
  const changeCallbackHandler = (data) => {
    setPost(data);
  };

  const saleBoarditemTemplate = (item) => {
    return(<div style={{ backgroundSize:"cover" ,backgroundImage:`url("${item.src}")`,minWidth:"100%",minHeight:"500px"}}>
    </div>)
  }


  const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
]
  return (!isLoading?
    <div className="card">
      <div className="card-header fw-bold bg-body">{post.subject}</div>
     



    {boardConfig.boardType==='saleBoard'?
    <div className="card-body">
      <div className="row"> 
          <div className="col-12 col-md-8">
            <Galleria value={post.saleBoardData}  
            showIndicators
            showThumbnails={false}
            showItemNavigators={true}
            circular={true}
            responsiveOptions={responsiveOptions} 
            numVisible={5} style={{maxWidth: '100%'}}
            
                        item={saleBoarditemTemplate} 
                        // thumbnail={saleBoardThumbnailTemplate}
                         />

          </div>
          <div className="col-12 col-md-4">
            가격 :{post.price} {post.unit}{activeIndex}
            구매신청
            수량
            판매갯수
            리뷰
          </div>
      </div>
     

     
     
    </div>:boardConfig.boardType==='codeBoard'?
    <div>{post.codeBoardData.map((item,i)=>{
      return(item.type==='code'?
        <div key={i}>
          <CodeEditor 
                    isCopy={false}
                    directory={item.directory}
                    fileName={item.fileName}
                    className={"auto-height"}
                    mode={item.mode}
                    theme={item.theme}
                    disable={true} 
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
        <div key={i} className="p-3">
          {HtmlParser(item.content)}
        </div>
      )
    })}</div>
    :<div></div>}
      

      <div className="card-body">{post.isMobile ? post.string : Htmlparser(post.content)}</div>
      <div className="card-body d-flex justify-content-center border-bottom pb-2 pb-lg-5">
        <HandButton className={"post-view-good-end-bad mb-5"} item={post} callback={changeCallbackHandler} boardValue={board} />
      </div>

      <div className="card-body row">
        <div className="col-sm-12 col-md-4 col-lg-2 text-center">
          <Image className="rounded-circle" src={post.writeData.userImage} alt={post.writeData[post.writeData.useName]} width={100} />
        </div>
        <div className="col-sm-12 col-md-8 col-lg-5">
          <div>
            <span>{post.writeData.grade}</span>
            <span className="fw-bold fs-4">{post.writeData[post.writeData.useName]}</span>
            <span className="fst-italic fw-bold fs-5 ml-2">{post.writeData.level} lv</span>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-5">작성했던 글 목록 5개정도만</div>
      </div>
    </div>
    :<div>Loading...</div>
  );
};

ViewBody.propTypes = {};
const mapStateToProps = (state) => {
    return {
      configData: state.configData,
      authData: state.authData,
      groupData:  state.groupData,
      boardData: state.boardData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  export default  connect(mapStateToProps, mapDispatchToProps)(ViewBody)
