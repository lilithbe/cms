
import { SelectButton } from 'primereact/selectbutton';
/**
 * 기본환경설정 에디터 설정템뷰
 * @param {*} param0 
 * @returns 
 */
const EditorSetupTemplate = ({state,setState}) => {
    const writeTypeOptions = [
        {label: '일반', value: 'normal'},
        {label: '멀티', value: 'array'},
    ];
    const imageOptions = [
        {label: '이미지사용', value: true},
        {label: '이미지사용안함', value:false},
    ];
     const videoOptions = [
        {label: '비디오업로드사용', value: true},
        {label: '비디오업로드사용안함', value:false},
    ];
    const tagOptions = [
        {label: '태그 사용', value: true},
        {label: '태그 사용안함', value:false},
    ];
   
 
    const onChangeSelectHandler = (value ,type) => {
        setState({...state,
            editorType:{
                ...state.editorType,
                [type]:value
            }
        })
    }
    return (
        <table className="table table-sm table-bordered">
        <thead>
          <tr className="text-center">
            <th width="15%">key</th>
            <th>value</th>
            <th width="40%" className=''>description</th>
          </tr>
        </thead>
            <tbody>
                <tr>
                    <th className="text-center">컨텐츠 타입</th>
                    <td>
                    <SelectButton className='p-buttonset-sm'  value={state.contentType} optionLabel='label'
                     optionValue='value' 
                    options={writeTypeOptions} 
                    onChange={(e) =>{
                      onChangeSelectHandler(e.value, 'contentType')
                        }} />
                    </td>
                    <td>일반:단일 에디터로 모든 컨텐츠를 제작합니다.<br/>
                        멀티:에디터,이미지,비디오,위젯등을 무제한 생성하여 복합적인 컨텐츠를 제작합니다.</td>
                </tr>
                <tr>
                    <th className="text-center">에디터 이미지</th>
                    <td>
                    <SelectButton className='p-buttonset-sm' value={state.editorType.isImage} 
                    optionLabel='label' optionValue='value' options={imageOptions} 
                    onChange={(e) => {
                        onChangeSelectHandler(e.value, 'isImage')
                        }
                    } />
                        
                    </td>
                    <td>일반모드의 이미지 사용은 에디터 내에서 이미지 업로드가 활성화됩니다.<br/>
                    멀티모드에서는 이미지버튼이 활성화 되어 컨텐츠 사이사이 이미지 업로드가 가능합니다.</td>
                </tr>
                <tr>
                    <th className="text-center">에디터 비디오</th>
                    <td><SelectButton className='p-buttonset-sm' value={state.editorType.isVideo} optionLabel='label' optionValue='value' options={videoOptions} onChange={(e) => onChangeSelectHandler(e.value, 'isVideo')} />
                        </td>
                    <td>에디터 이미지와 동일합니다.</td>
                </tr>
                <tr>
                    <th className="text-center">태그 사용</th>
                    <td><SelectButton className='p-buttonset-sm' value={state.editorType.isTag} optionLabel='label' optionValue='value' options={tagOptions} onChange={(e) => onChangeSelectHandler(e.value, 'isTag')} /></td>
                    <td># 을 통해 헤시태그를 추출합니다.</td>
                </tr>
            </tbody>
        </table>
    )
}

export default EditorSetupTemplate
