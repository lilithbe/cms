import React from 'react'
import GroupBasicSetupTemplate from './GroupBasicSetupTemplate'
import LevelSetupTemplate from './LevelSetupTemplate'
import ThumbNailSetupTemplate from './ThumbNailSetupTemplate'
import FileUploadSetupTemplate from './FileUploadSetupTemplate'
import { TabView, TabPanel } from 'primereact/tabview';
import {Button} from 'primereact/button'
import BoardBasicTemplate from './BoardBasicTemplate'
/**
 * 그룹 및 게시판 생성 업데이트 필수 템플릿
 * @param {} param0 
 * @returns 
 */
const ComunityWriteTemplate = ({state, setState , writeType, submitCallback}) => {

    const tabHeaderIIITemplate = (options) => {
          return (
            <div>
                <button type="button" onClick={options.onClick} className={options.className}>
              <i className= {options.leftIconElement.props.className} />
            {options.titleElement}
            </button>  
            </div>
          )
      };
     
    return (
<div>
<TabView 
            contentStyle={{
              minHeight: "700px",
              width: "auto",
              maxHeight: "700px",
              overflow: "hidden",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            >
              <TabPanel
              header="기본정보"  leftIcon='bi-bar-chart mr-2'
               headerTemplate={tabHeaderIIITemplate}
                headerClassName="p-d-flex p-ai-center">
                  <div className='row'>
                  {writeType.split("-")[0]==='group'?
                     <GroupBasicSetupTemplate  setState={setState} state={state} writeType={writeType}/>:
                     <BoardBasicTemplate  setState={setState} state={state} writeType={writeType}/>}
                   {writeType.split("-")[0]==='group'?
                    <LevelSetupTemplate setState={setState} state={state} />
                    :!state.groupLaw?
                    <LevelSetupTemplate setState={setState} state={state} />:
                    <div className='col text-center m-auto'>그룹의 그레이드 규칙을 적용합니다.</div>}                     
                  </div>
                  
              </TabPanel>
              {writeType.split("-")[0]==='group'?
              <TabPanel header="이미지 설정"   
              leftIcon='bi-image mr-2'
              headerTemplate={tabHeaderIIITemplate}
                headerClassName="p-d-flex p-ai-center">
                <ThumbNailSetupTemplate setState={setState} state={state} />               
              </TabPanel>
              :!state.groupLaw?
              <TabPanel header="이미지 설정"   
              leftIcon='bi-image mr-2'
              headerTemplate={tabHeaderIIITemplate}
                headerClassName="p-d-flex p-ai-center">
                <ThumbNailSetupTemplate setState={setState} state={state} />               
              </TabPanel>
              :null}
              
              {writeType.split("-")[0]==='group'?
              <TabPanel header="파일 설정" 
              leftIcon='bi-file-earmark-plus mr-2'
              headerTemplate={tabHeaderIIITemplate}  headerClassName="p-d-flex p-ai-center"
              >
                <FileUploadSetupTemplate setState={setState} state={state} />
              </TabPanel>
              :!state.groupLaw?
              <TabPanel header="파일 설정" 
              leftIcon='bi-file-earmark-plus mr-2'
              headerTemplate={tabHeaderIIITemplate}  headerClassName="p-d-flex p-ai-center"
              >
                <FileUploadSetupTemplate setState={setState} state={state} />
              </TabPanel>
              :null}
              

              

            </TabView>
            <Button className='w-100 p-button-lg' label="저장" onClick={submitCallback} icon="bi bi-save" />
</div>
          

    )
}

export default ComunityWriteTemplate
