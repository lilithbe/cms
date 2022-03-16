import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Toast } from "primereact/toast";
import { postApi } from "../../api";
import { IMAGE_UPLOAD, MY_IMAGE_LIST } from "../../common";

const ImageViewTemplate = ({ imageCallback, authData, isCallback }) => {
  const toast = useRef(null);

  const [imagePreviewState, setImagePreviewState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const imageSaveHandler = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const formData = new FormData();
    formData.append("upload", files[0]);
    postApi(
      setIsLoading,
      IMAGE_UPLOAD,
      (res) => {
        if (res.data.status) {
          setImagePreviewState([...imagePreviewState, res.data.data]);
          imageCallback(res.data.data)
        }
      },
      formData,
      authData.userToken
    );
  };

  useEffect(() => {
    postApi(
      setIsLoading,
      MY_IMAGE_LIST,
      (res) => {
        setImagePreviewState(res.data.result);
      },
      {},
      authData.userToken
    );
    return()=>{
      setImagePreviewState([])
    }
  }, [authData.userToken]);
  const [imageActive, setImageActive] = useState(0);
  const clickHandler = (index, imageData) => {
    setImageActive(index);
    imageCallback(imageData);
  };

  return (
    <div  className="component-list">
      <div className="file-list-info d-flex align-items-center ">
        <label htmlFor="imageUploadLabel" className="btn btn-info w-100 cursor-pointer">
          <i className="bi-image cursor-pointer" /> Add
        </label>
        <input
          className="files-text files-input"
          name="upload"
          accept="image/*"
          onChange={imageSaveHandler}
          type="file"
          id="imageUploadLabel"
      
          required
          
        />
      </div>
      <div  className="file-list">
        <ul>
        {imagePreviewState.map((img, i) => {
          return (
            <li key={i} >
              <div>
              <div className="image-wrapper" >
                <div style={{ backgroundImage: `url(${img.url})` }} 
                className="image-block">
                  {isCallback ? (
                    <button
                      className="btn btn-danger btn-sm mb-2 rounded-0"
                      onClick={(e) => {
                        e.preventDefault();
                        clickHandler(i, img);
                      }}
                    >
                      Get Image
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              </div>
             
            </li>
          );
        })}
        </ul>
      
      </div>
      <Toast ref={toast} />
    </div>
  );
};

ImageViewTemplate.propTypes = {
  imageCallback: PropTypes.func,
  isCallback: PropTypes.bool
};
ImageViewTemplate.defaultProps = {
  imageCallback: () => {
    console.log("notcallback");
  },
  isCallback: false
};

const mapStateToProps = (state) => {
  return {
    authData: state.authData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ImageViewTemplate);
