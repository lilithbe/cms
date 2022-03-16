import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useState } from 'react';

const MenuMultiSelectTable = ({authData,configData, parentType , groupData,boardData,callback}) => {
    const [selectList, setSelectList] = useState([])
    const headerTemplate = () => {
        return(
            <div>
                <Button label="선택된 내용 적용" onClick={()=>{
                    if(selectList.length>0){
                        const result=[]
                        for (let i = 0; i < selectList.length; i++) {
                            const item = selectList[i];
                            const childrenItem=[]
                            if(item.boardType===undefined){
                                for (let j = 0; j < boardData.board_config.length; j++) {
                                    const bItem = boardData.board_config[j];
                                    if(item.id===bItem.groupId){
                                        childrenItem.push({
                                            type:parentType==="mega-menu"?"mega-item":'dropdown-item',
                                            label: bItem.label,
                                            icon: "",
                                            hover: "",
                                            focus: "",
                                            hoverIcon: "",
                                            focusIcon: "",
                                            to: bItem.listUrl,
                                            children: []
                                        })
                                    }
                                    
                                }
                            }
                            result.push({
                                type:
                                        parentType === "dropdown-menu"
                                        ? "dropdown-item"
                                        : parentType === "mega-menu"
                                        ? "mega-group"
                                        : parentType === "mega-group"
                                        ? "mega-item"
                                        : parentType === "main"? item.boardType===undefined?'dropdown-menu':'nav-item'
                                        : "",
                                label: item.label,
                                icon: "",
                                hover: "",
                                focus: "",
                                hoverIcon: "",
                                focusIcon: "",
                                to: parentType==='mega-menu'?item.url:item.listUrl,
                                children: childrenItem
                            })
                        }
                        callback(result)
                        setSelectList([])
                    }
                }}/>
            </div>
        )
    }

    const urlTemplate = (row) => {
        return(
            <div>{row.url||row.listUrl}</div>
        )
    }
return (
    <div>
        <DataTable 
        header={headerTemplate} headerClass="p-0"
            value={parentType==='main'?[...groupData.group_config,...boardData.board_config]:parentType==='mega-menu'?groupData.group_config:boardData.board_config} 
            selectionMode="checkbox" 
            selection={selectList} 
            onSelectionChange={e => setSelectList(e.value)} 
            dataKey="id" 
            responsiveLayout="scroll">
          <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
          <Column field="label" header={parentType==='mega-menu'?'그룹이름':'게시판이름'} ></Column>
          {parentType==='main'?
             <Column body={urlTemplate} header="Url"></Column>:
             parentType==='mega-menu'?
             <Column field="url" header="Url"></Column>:
             <Column field="listUrl" header="Url"></Column>}
          <Column field="boardType" header="board Type"></Column>
      </DataTable>
    </div>
)
}
const mapStateToProps = (state) => {
return {
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
export default connect(mapStateToProps, mapDispatchToProps)(MenuMultiSelectTable);