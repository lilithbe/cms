import {useEffect, useRef, useState} from 'react'
import { VOTE_LIST, VOTE_CREATE} from '../../../common';
import AdminContainerTemplate from "../../../components/template/AdminContainerTemplate";
import {postApi} from '../../../api'
import { TabPanel, TabView } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { arrayAddFormat } from '../../../lib/array';
import { connect } from 'react-redux';
import { Calendar } from 'primereact/calendar';
import { ScrollPanel } from 'primereact/scrollpanel';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import dynamic from 'next/dynamic'
const WriteEditor =  dynamic(()=>import('../../../components/editor/WriteEditor'),
{ssr:false})

const VotingManagement = ({authData}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const toast = useRef(null)
    const [voteList, setVoteList] = useState([])
    const voteInit ={
        
        id:'',
        label:'',
        voterId:authData.userId,
        voterData:authData,
        question:'',
        options:[],    
        start:'',
        end:'',
    }
    const [newVote, setNewVote] = useState(voteInit)
    useEffect(() => {
        postApi(setIsLoading,VOTE_LIST,(res)=>{
            setVoteList(res.data.list)
        })
    return()=>{
        setVoteList([])
    }
    }, [])
    const newSaveHandler = () => {
        postApi(setIsLoading ,VOTE_CREATE,(res)=>{
            if(res.data.status){
                setVoteList([...voteList,res.data.data])
                setNewVote(voteInit)
                setActiveIndex(0)
            }           
        },newVote)
    }
    
    const tableTemplate = () => {
        return(
            <table className='table'>
            <thead>
                <tr>
                    <th>key</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>label</th>
                    <td>
                    <InputText value={newVote.label} 
                    onChange={(e)=>{
                        setNewVote({...newVote,
                        label:e.target.value})
                    }}
                    className='p-inputtext-sm form-control'/>
                    </td>
                </tr>
                <tr>
                    <th>Question</th>
                    <td>
                        <WriteEditor height={"auto"} minHeight={100}
                        value={newVote.question} 
                    onChange={(e)=>{
                        setNewVote((prev)=>{
                            return {...prev,
                                question:e}
                        })
                    }}/>
                        
                       </td>
                    
                </tr>
                <tr>
                    <th>Options</th>
                    <td>
                        {newVote.options.map((item,i)=>{
                            return(
                                <div key={i}>
                                    <InputText 
                                    className='p-inputtext-sm form-control'
                                    value={item.label} onChange={(e)=>{
                                        setNewVote({...newVote,
                                            options:arrayAddFormat(newVote.options,{
                                                no:i+1,
                                                label:e.target.value
                                            },i)
                                        })
                                    }} />
                                </div>
                            )
                        })}
                        <div>
                            <Button icon="bi bi-plus"
                            className='p-button-sm'
                            label="옵션추가" onClick={()=>{
                                setNewVote({...newVote,
                                    options:[...newVote.options,
                                        {label:'',no:newVote.options.length+1}
                                    ]
                                })
                            }}/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>Start</th>
                    <td>
                    <Calendar className='p-buttonset-sm' showIcon id="newvote-start" value={newVote.start} onChange={(e) => {
                        setNewVote({...newVote,
                            start:e.value
                        })
                    }} showTime showSeconds />
                    </td>
                   
                </tr>
                <tr>
                    <th>End</th>
                    <td>
                    <Calendar showIcon  id="newvote-end" value={newVote.end} onChange={(e) => {
                         setNewVote({...newVote,
                            end:e.value
                        })
                    }} showTime showSeconds />
                    </td>
                    
                </tr>
            </tbody>
        </table>
        )
    }
    
    return (
        <AdminContainerTemplate className={"admin-tmplate"} toast={toast} adminKey="voteJ" isLoading={isLoading} icon="bi bi-calendar3" title="투표관리">
           <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="투표 목록">

                <DataTable 
                tableClassName='admin-table table table-sm'
                value={voteList} 
                responsiveLayout="scroll">
                    <Column field="label" header="Label"></Column>
                    <Column field="start" header="Start"></Column>
                    <Column field="end" header="End"></Column>
                </DataTable>

                </TabPanel>
                <TabPanel header="새로운 투표">
                    <ScrollPanel style={{width: '100%', height: '720px'}} >
                        {tableTemplate()}
                    <Button className='w-100 p-button-sm' label="저장" icon="bi bi-save" onClick={newSaveHandler}/>
                    </ScrollPanel>
                  
                </TabPanel>
           </TabView>
        </AdminContainerTemplate>
    )
}
const mapStateToProps = (state) => {
    return {
   authData: state.authData,
  };
    };
   const mapDispatchToProps = (dispatch) => {
   return {
      };
    };
    export default connect(mapStateToProps, mapDispatchToProps)(VotingManagement)
