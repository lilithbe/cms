import { useState, useRef, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { EDITOR_FILE_UPLOAD, EDITOR_FILE_DELETE, MY_IMAGE_LIST } from '../../common/path';
import { arrayDeleteFormat, arrayAddFormat } from '../../lib'
import { postApi } from '../../api'
import CodeMirror from 'codemirror'

import dynamic from 'next/dynamic'
const SunEditor = dynamic(async () => {
    const { default: Editor } = await import('suneditor-react');
    return function comp({ forwardedRef, ...props }) {
        return <Editor {...props}
        />
    }
},
    { ssr: false })
const WriteEditor = ({ configData, buttonList, authData, onChange, autoFocus, value, minHeight, height, mode, lang, width, editorFiles, setEditorFiles }) => {
    const [uploadFiles, setUploadFiles] = useState(editorFiles)
    const [isLoading, setIsLoading] = useState(false)
    const editor = useRef();
    const getSunEditorInstance = (sunEditor) => {
        editor.current = sunEditor;
    };
    const fonts = () => {
        const result = []
        for (let i = 0; i < configData.dc_addFont.length; i++) {
            const l = configData.dc_addFont[i];
            result.push(l.value)
        }
        return result
    }
    // useEffect(() => {
    //     console.log(value)
    // }, [value])

    return (
        <div  >

            <SunEditor


                autoFocus={autoFocus}
                setOptions={{
                    codeMirror: CodeMirror,
                    value: value,
                    mode: mode,
                    mathFontSize: [
                        {
                            "text": "1",
                            "value": "1em"
                        },
                        {
                            "text": "2",
                            "value": "2em",
                            "default": true
                        }
                    ],

                    "font": fonts(),
                    height: height,
                    width: width,
                    minHeight: minHeight,
                    katex: "window.katex",
                    buttonList: buttonList,
                    // Or Array of button list, eg. [['font', 'align'], ['image']]
                    // plugins: [font] set plugins, all plugins are set by default
                    // Other option
                    imageUploadUrl: `${EDITOR_FILE_UPLOAD}/images`,
                    // https://github.com/JiHong88/SunEditor
                    imageGalleryHeader: {
                        Authorization: authData.userToken,
                        "Access-Control-Allow-Methods": "POST"
                    },
                    imageUploadHeader: {
                        Authorization: authData.userToken,
                        "Access-Control-Allow-Methods": "POST"
                    },
                    imageGalleryUrl: MY_IMAGE_LIST,
                    //  "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
                    getText: (e) => { console.log(e) },

                }}

                lang={lang}

                setDefaultStyle="font-size: 18px; background:unset;"
                onImageUpload={(targetElement, index, state, info, remainingFilesCount, core) => {

                    let key
                    if (state === 'create') {
                        key = info.src.split("images/")[1].split("_")[0]
                        setUploadFiles((prev) => {
                            // setEditorFiles([...prev,{...info,key:key}])
                            return [...prev, { ...info, key: key }]
                        })
                    } else if (state === 'update') {
                        setUploadFiles((prev) => {
                            key = prev[index].key
                            let newKey = info.src.split("images/")[1].split("_")[0]
                            postApi(setIsLoading, `${EDITOR_FILE_DELETE}/images`, (res) => {
                            }, { key: key }, authData.userToken)
                            // setEditorFiles(arrayAddFormat(prev,{...info,key:newKey},index))
                            return arrayAddFormat(prev, { ...info, key: newKey }, index)
                        })
                    } else if (state === 'delete') {
                        setUploadFiles((prev) => {
                            key = prev[index].key
                            postApi(setIsLoading, `${EDITOR_FILE_DELETE}/images`, (res) => {
                            }, { key: key }, authData.userToken)
                            // setEditorFiles(arrayDeleteFormat(prev,index))
                            return arrayDeleteFormat(prev, index)
                        })
                    }

                }}



                getSunEditorInstance={getSunEditorInstance}

                onChange={(html) => {
                    const text = editor.current.getText()
                    onChange(html, text)
                }}
            />

        </div>
    )
}

WriteEditor.propTypes = {
    buttonList: PropTypes.array,
    editorFiles: PropTypes.array,
    setEditorFiles: PropTypes.func,
    autoFocus: PropTypes.bool,
}
WriteEditor.defaultProps = {
    lang: "ko",
    mode: "classic",
    autoFocus: true,
    buttonList: [
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
            "image",
            "video",
            "audio",

            "imageGallery",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            // "print",
            // "save",
            // "template"
        ]
    ],
    height: 500,
    minHeight: 300,
    width: "auto",
    editorFiles: [],
    setEditorFiles: () => { },
}


const mapStateToProps = (state) => {
    return {
        socketData: state.socketData,
        configData: state.configData,
        authData: state.authData,
        groupData: state.groupData,
        boardData: state.boardData,

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(WriteEditor)

