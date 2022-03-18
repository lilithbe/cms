import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { widgetList } from './widgetObject';
const WidgetSetting = ({ widget, onChange, widgetComponent, pageId,sectionId,colId }) => {
    return (
        <div style={{minWidth:"800px"}}>
            <TabView>
            <TabPanel header="Widget Setting">
                <InputText 
                value={widget.label} 
                placeholder="Widget 이름..."
                className='p-inputtext-sm'
                onChange={(e) => {
                    onChange({ ...widget, label: e.target.value })
                }} />
                <Dropdown 
                  className='p-inputtext-sm'
                value={widget.component} 
                options={[{ label: '위젯을 선택하세요.', value: '' }, ...widgetList]} 
                onChange={(e) => {
                    if(e.value!==''){
                        onChange({ ...widget, component: e.value,data:[], options:widgetList.filter(f=>f.value===e.value)[0].defaultOptions})
                    }
                }} />
            </TabPanel>
            <TabPanel header={`${widget.label} Setting`}>
                {widgetComponent.setting(widget,onChange,widgetComponent, pageId,sectionId,colId)}
            </TabPanel>
        </TabView>
        </div>
    )
}

export default WidgetSetting