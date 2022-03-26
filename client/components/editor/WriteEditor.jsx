import { useState, useRef } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { EDITOR_FILE_UPLOAD,  MY_FILE_LIST } from '../../common/path';

import CodeMirror from 'codemirror'

import dynamic from 'next/dynamic'
const SunEditor = dynamic(async () => {
    const { default: Editor } = await import('suneditor-react');
    return function comp({ forwardedRef, ...props }) {
        return <Editor {...props}
        />
    }
},{ ssr: false })


const WriteEditor = ({bgColor, configData, buttonList, authData, onChange, autoFocus, value, minHeight, height, mode, lang, width, editorFiles, setEditorFiles }) => {
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
        <div style={{backgroundColor:bgColor}}>

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
                    imageUploadUrl: `${EDITOR_FILE_UPLOAD}`,
                    // https://github.com/JiHong88/SunEditor
                    imageGalleryHeader: {
                        Authorization: authData.userToken,
                        "Access-Control-Allow-Methods": "GET"
                    },
                    imageUploadHeader: {
                        Authorization: authData.userToken,
                        "Access-Control-Allow-Methods": "POST"
                    },
                    imageGalleryUrl: MY_FILE_LIST+'image',
                    //  "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
                    getText: (e) => { console.log(e) },

                }}

                lang={lang}

                setDefaultStyle="font-size: 18px; background:unset;"
              

                


                getSunEditorInstance={getSunEditorInstance}

                onChange={(html) => {
                    const text = editor.current.getText()
                    const images=editor.current.getImagesInfo()
                    console.log(images)
                   
                    onChange(html, text, images)
                   
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
    bgColor:PropTypes.string
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
    bgColor:'#ffffff',
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

