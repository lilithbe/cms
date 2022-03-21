import { Dropdown } from 'primereact/dropdown'
import { SelectButton } from 'primereact/selectbutton'
import { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { postApi } from '../../api'
import { LIST } from '../../common/path'
import { Toast } from 'primereact/toast'
import HtmlParser from 'react-html-parser'
import Link from 'next/link'
import { howMushTime } from '../../lib/calculator'

const PageSelect = ({ configData, boardData, groupData, value, onChange }) => {
  const contentInit = {
    board: '',
    group: '',
    subject: '',
    content: '',
    id: null
  }
  const [type, setType] = useState('single')
  const toast = useRef(null)
  const [contentList, setContentList] = useState([])
  const [isSelectBoard, setIsSelectBoard] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectBoard, setSelectBoard] = useState('')
  const [content, setContent] = useState(contentInit)

  return (
    <div>
      <Toast ref={toast} />
      <div>
        <SelectButton
        className='p-buttonset-sm'
          options={[
            { label: "싱글페이지", value: "single" },
            { label: "그룹페이지", value: "group" },
            { label: "게시판 목록 페이지", value: "board-list" },
            { label: "게시판 글쓰기 페이지", value: "board-write" },
            { label: "게시판 뷰 페이지", value: "board-view" }
          ]}
          value={type}
          optionLabel="label"
          optionValue="value"
          onChange={(e) => {
            const value = e.value;
            setType(value);
            if (value === 'board-view') {
              setIsSelectBoard(true)
            } else {
              setIsSelectBoard(false)
            }
          }}
        />
      </div>
      <div>
        {type === "single" && isSelectBoard === false ? (
          <DropdownT value={value} options={configData.dc_pageConfig} optionLabel="label" optionValue={"url"} onChange={(v) => {
            onChange(v)
            setIsSelectBoard(false)
          }} />
        ) : null}

        {type === "group" && isSelectBoard === false ? <DropdownT value={value} options={groupData.group_config} optionLabel="label" optionValue={"url"} onChange={(v) => {
          onChange(v)
          setIsSelectBoard(false)
        }} /> : null}

        {type === "board-list" ? (
          <DropdownT value={value} options={boardData.board_config} optionLabel="label" optionValue={"listUrl"} onChange={(v) => {
            onChange(v)
            setIsSelectBoard(false)
          }} />
        ) : null}
        {type === "board-write" && isSelectBoard === false ? (
          <DropdownT value={value} options={boardData.board_config} optionLabel="label" optionValue={"writeUrl"} onChange={(v) => {
            onChange(v)
            setIsSelectBoard(false)
          }} />
        ) : null}
        {type === "board-view" ? (
          <DropdownT value={selectBoard} options={boardData.board_config} optionLabel="label" optionValue={"value"} onChange={(v) => {
            setIsSelectBoard(true)
            setSelectBoard(v)
            const board = boardData.board_config.filter(f => f.value === v)[0]
            const group = groupData.group_config.filter(f => f.id === board.groupId)[0]
            setContent({
              ...content,
              board: board.value,
              group: group.value
            })
            postApi(setIsLoading, LIST, (res) => {
              if (res.data.status) {
                if (res.data.boardCount === 0) {
                  setContentList([])
                  setContent(contentInit)
                  toast.current.show({ severity: 'error', summary: 'Warning Message', detail: `${v} 게시판에는 작성된 컨텐츠가 없습니다.` })
                } else {
                  setContentList(res.data.list)
                }
              } else {
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: `${v} 게시판의 데이터를 가져오는데 실패하였습니다.` })
              }

            }, { boardValue: v, offset: 0, limit: 50 })
          }} />
        ) : null}


      </div>
      {/* {isSelectBoard? (
            <DropdownT value={content.id} options={contentList} optionLabel="subject" optionValue={"id"} onChange={(v)=>{
                setContent({...content,...contentList.filter(f=>f.id===v)[0]})
            }} />
          ) : null} */}
      {isSelectBoard ? (
        <div>
          <table className='table table-sm'>
            <thead>
              <th>no</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성일</th>
            </thead>
            <tbody>
              {contentList.map((item, i) => {
                return (
                  <tr key={i}>
                    <th>{item.id}</th>
                    <td width="50%" >
                      <p className='cursor-pointer' onClick={() => {
                        setContent({ ...content, ...item })
                      }}>{item.subject}</p>
                    </td>
                    <td>{item.writeData.nickName}</td>
                    <td>{howMushTime(item.createdAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      {isSelectBoard && type === "board-view" && content.id !== null ?
        <div className='card'>
          <div className='card-header'>
            {content.subject}
          </div>
          <div className='card-body'>
            {HtmlParser(content.content)}
          </div>
          <div className='card-footer'>
            <div>
              <button className='btn btn-primary btn-sm' onClick={(e) => {
                e.preventDefault()
                onChange(`/content/view/${content.group}/${content.board}/${content.id}`)
              }}>적용하기</button>
              <Link href={`/content/view/${content.group}/${content.board}/${content.id}`}>
                <a className='btn btn-info btn-sm' target="_blank">페이지 확인</a>
              </Link>
            </div>
          </div>
        </div> : null}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    configData: state.configData,
    boardData: state.boardData,
    groupData: state.groupData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PageSelect)


const DropdownT = ({ options, optionLabel, optionValue, value, onChange }) => {
  return (
    <Dropdown options={options} optionLabel={optionLabel} optionValue={optionValue} value={value} onChange={(e) => {
      e.preventDefault()
      onChange(e.value)
    }} />
  )
}