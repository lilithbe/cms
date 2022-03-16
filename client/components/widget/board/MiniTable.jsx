import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { postApi } from "../../../api";
import { LIST } from "../../../common";
import {useRouter} from 'next/router'
import Link from "next/link";
export const MiniTable = ({ boardValue,title,icon ,offset,limit }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [boardCount, setBoardCount] = useState(0);
    const [items, setItems] = useState([]);
    const router = useRouter()
    useEffect(() => {
      postApi(
        setIsLoading,
        LIST,
        (res) => {
          if (res.data.status) {
            setBoardCount(res.data.boardCount);
            if (res.data.boardCount > 0) {
              setItems(res.data.list);
            }
          }
        },
        { boardValue: boardValue, offset: offset, limit: limit }
      );
      return () => {
        setItems([])
      }
    }, [boardValue, limit, offset])
  
    return (
      <div className="card mb-2">
          <div className="card-header p-0">
              <div className="d-flex justify-content-between">
              <span className="btn btn-outline-link btn-sm"><i className={`${icon} mr-2`}></i>{title}</span>
                <button className="btn btn-outline-link btn-sm" onClick={(e)=>{
                    router.push(`/content/list/${boardValue}`)
                }} >+moer</button>
              </div>
           
          </div>
          <div className="card-body p-0">
          <table className="table table-sm mb-0">
          <tbody>
            {boardCount > 0 ? (
              isLoading ? (
                "loading..."
              ) : (
                items.map((item, i) => {
                  return <MiniTableTr key={i} item={item} board={boardValue} />;
                })
              )
            ) : (
              <tr>
                <th colSpan={5}>게시글이 없습니다. 첫글을 작성하세요.</th>
              </tr>
            )}
          </tbody>
        </table>
          </div>
      </div>
    );
  };
  MiniTable.propTypes = {
    boardValue: PropTypes.string.isRequired,
    limit:PropTypes.number,
    offset: PropTypes.number,
  };
  MiniTable.dafaultProps = {
    limit:5,
    offset: 0
  };

const MiniTableTr = ({ item, board }) => {
   console.log(item)
  return (
    <tr>
        <td className="td-subject">
            <Link href={`/content/view/${board}/${item.id}`}>
            <a className=" " >
            <span className="d-inline-block text-truncate" style={{maxWidth:"350px"}}>{item.subject}dddddddddddddddddddd</span>
                {item.commentCount>0?<small className="pl-2 ">{item.commentCount}</small>:null}
            </a>
            </Link>
        </td>
        <td className="d-none d-md-table-cell">{item.writeData[item.writeData.useName]}</td>
    </tr>
  );
};




