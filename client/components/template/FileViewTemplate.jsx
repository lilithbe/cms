import { useState, useEffect } from "react";
import { postApi } from "../../api";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { MY_FILE_LIST, FILE_UPLOAD, FILE_DOWNLOAD } from "../../common";
import fileDownload from "file-saver";
import { Image } from 'primereact/image';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
//FILE_UPLOAD//MY_FILE_LIST
const FileViewTemplate = ({ fileType, authData, configData, isCallback, callback }) => {
  const [fileListState, setFileListState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptState, setAcceptState] = useState("");
  const [acceptArray, setAcceptArray] = useState([]);
  const [imageActive, setImageActive] = useState(0);
  const [buttonLabel, setButtonLabel] = useState("이미지업로드");

  const [layout, setLayout] = useState("grid");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const sortOptions = [
    { label: "Size High to Low", value: "!size" },
    { label: "Size Low to High", value: "size" }
  ];

  const clickHandler = (index, imageData) => {
    setImageActive(index);
  };

  useEffect(() => {
    postApi(
      setIsLoading,
      `${MY_FILE_LIST}/${fileType}`,
      (res) => {
        if (res.data.status) {
          console.log(res.data.list);
          setFileListState(res.data.list);
        }
      },
      {},
      authData.userToken
    );
    return () => {
      setFileListState([]);
    };
  }, [authData.userToken, fileType]);
  useEffect(() => {
    let result = "";
    let fileKey = "";
    switch (fileType) {
      case "document":
        fileKey = "dc_documentExtention";
        setButtonLabel("문서업로드");
        break;
      case "video":
        fileKey = "dc_videoExtention";
        setButtonLabel("비디오업로드");
        break;
      case "file":
        fileKey = "dc_fileExtention";
        setButtonLabel("파일업로드");
        break;
      case "flash":
        fileKey = "dc_flashExtention";
        setButtonLabel("파일업로드");
        break;

      default:
        fileKey = "dc_imageExtention";
        setButtonLabel("이미지업로드");
        break;
    }

    for (let i = 0; i < configData[fileKey].length; i++) {
      result += `.${configData[fileKey][i].label},`;
    }
    setAcceptArray(configData[fileKey]);
    console.log(result);
    setAcceptState(result);
    return () => {
      setAcceptArray([]);
      setAcceptState(0);
      setButtonLabel("이미지업로드");
    };
  }, [configData, fileType]);

  const fileSaveHandler = (e) => {
    const files = e.target.files;
    const formData = new FormData();

    formData.append("upload", files[0]);
    postApi(
      setIsLoading,
      `${FILE_UPLOAD}/${fileType}`,
      (res) => {
        if (res.data.status) {
          setFileListState([...fileListState, res.data.data]);
        }
      },
      formData,
      authData.userToken
    );
  };
  const onDownloadHandler = async (value) => {
    postApi(
      setIsLoading,
      `${FILE_DOWNLOAD}key_${value.key}_${value.name}`,
      async (res) => {
        if (res) {
          fileDownload(await (await new Response(res.body)).blob(), `key_${value.key}_${value.name}`);
        }
      },
      {},
      authData.userToken,
      { responseType: "blob" }
    );
  };

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const renderImageListItem = (data) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <Image src={`${data.thumbnail}`} style={{width:"80px"}} alt={data.alt} />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{data.size}</span>
          </div>
          <div className="product-list-action"></div>
        </div>
      </div>
    );
  };

  const renderImageGridItem = (data) => {
    return (
      <div className="col-12 md:col-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-content">
            <Image src={`${data.url}`} alt={data.alt} />
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.size}</div>
          </div>
          <div className="product-grid-item-bottom">
            <Button icon="pi pi-shopping-cart" label="Dwonload" onClick={()=>{onDownloadHandler(data)}}></Button>
            <Button icon="pi pi-shopping-cart" label="Callback" onClick={()=>{callback(data)}}></Button>
          </div>
        </div>
      </div>
    );
  };

  const itemImageTemplate = (file, layout) => {
    if (!file) {
      return;
    }

    if (layout === "list") return renderImageListItem(file);
    else if (layout === "grid") return <div className="row">{renderImageGridItem(file)}</div>;
  };

  const renderImageHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <div className="col-6" style={{ textAlign: "left" }}>
          <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} />
        </div>
        <div className="col-6" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
      </div>
    );
  };

  const imageHeader = renderImageHeader();





  const renderVideoeListItem = (data) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
            <video width={"200px"} controls>
                <source src={data.url} type="video/mp4" />이 문장은 여러분의 브라우저가 video 태그를 지원하지 않을 때 화면에 표시됩니다!
               </video>
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{data.size}</span>
          </div>
          <div className="product-list-action"></div>
        </div>
      </div>
    );
  };

  const renderVideoGridItem = (data) => {
    return (
      <div className="col-12 col-md-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-content">
              <video width={"100%"} controls >
                <source src={data.url} type="video/mp4" />이 문장은 여러분의 브라우저가 video 태그를 지원하지 않을 때 화면에 표시됩니다!
               </video>
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.size}</div>
          </div>
          <div className="product-grid-item-bottom">
            <Button icon="pi pi-shopping-cart" label="Dwonload" onClick={()=>{onDownloadHandler(data)}}></Button>
            <Button icon="pi pi-shopping-cart" label="Callback" onClick={()=>{callback(data)}}></Button>
          </div>
        </div>
      </div>
    );
  };



  const itemVideoTemplate = (file, layout) => {
    if (!file) {
      return;
    }

    if (layout === "list") return renderVideoeListItem(file);
    else if (layout === "grid") return renderVideoGridItem(file);
  };


  const renderVideoeHeader = () => {
    return (
      <div className="grid grid-nogutter">
        <div className="col-6" style={{ textAlign: "left" }}>
          <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} />
        </div>
        <div className="col-6" style={{ textAlign: "right" }}>
          <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
      </div>
    );
  };

  const videoHeader = renderVideoeHeader();



  return (
    <div className="preview-image-wrapper mb-3">
      <div className="col-md-12 col-lg-2 col-xxl-2">
        <label htmlFor={`fileUpload-${fileType}`} className="btn btn-info btn-sm">
          <i className="bi-image mr-2" /> {buttonLabel}
        </label>
        <input
          name="upload"
          accept={acceptState}
          onChange={fileSaveHandler}
          type="file"
          id={`fileUpload-${fileType}`}
          style={{ visibility: "hidden" }}
          required
        />
      </div>
      <hr />

      {fileType === "video" ? (
        <div className="dataview-file">
        <DataView
           value={fileListState}
           layout={layout}
           header={videoHeader}
           itemTemplate={itemVideoTemplate}
           paginator
           rows={9}
           sortOrder={sortOrder}
           sortField={sortField}
         />
     </div>

        // <div className="row">
        //   {fileListState.map((item, i) => {
        //     return (
        //       <div key={i} className="col col-lg-2 col-sm-12 col-md-6 mx-2">
        //         <video width={"100%"} controls>
        //           <source src={item.url} type="video/mp4" />이 문장은 여러분의 브라우저가 video 태그를 지원하지 않을 때 화면에 표시됩니다!
        //         </video>
        //         {isCallback ? (
        //           <div className="text-center">
        //             <div className=" btn-group">
        //               <button
        //                 className="btn btn-outline-danger btn-sm py-0"
        //                 onClick={() => {
        //                   onDownloadHandler(item);
        //                 }}
        //               >
        //                 Download
        //               </button>
        //               <button
        //                 className="btn btn-outline-primary btn-sm py-0"
        //                 onClick={() => {
        //                   callback(item);
        //                 }}
        //               >
        //                 Callback
        //               </button>
        //             </div>
        //           </div>
        //         ) : (
        //           <div className="text-center">
        //             <button
        //               className="btn btn-outline-primary btn-sm"
        //               onClick={() => {
        //                 onDownloadHandler(item);
        //               }}
        //             >
        //               Callback
        //             </button>
        //           </div>
        //         )}
        //       </div>
        //     );
        //   })}
        // </div>
      ) : fileType === "image" ? (
        <div className="dataview-file">
           <DataView
              value={fileListState}
              layout={layout}
              header={imageHeader}
              itemTemplate={itemImageTemplate}
              paginator
              rows={9}
              sortOrder={sortOrder}
              sortField={sortField}
            />
        </div>
      ) : (
        <DataTable value={fileListState} responsiveLayout="scroll">
          <Column field="no" header="No"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="size" header="Size"></Column>
        </DataTable>
      )}
      <hr/>
    </div>
  );
};

FileViewTemplate.PropTypes = {
  fileType: PropTypes.string,
  callback: PropTypes.func,
  isCallback: PropTypes.bool
};
FileViewTemplate.defaultProps = {
  callback: () => {
    console.log("notcallback");
  },
  isCallback: false,
  fileType: "image"
};

const mapStateToProps = (state) => {
  return {
    configData: state.configData,
    authData: state.authData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(FileViewTemplate);
