import PropTypes from 'prop-types';
import React, { useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import { setConfig } from "../../../../redux";

import SideBarButtonTemplate from "../../SideBarButtonTemplate";
import IconTemplate from "../../IconTemplate";
import PageSelect from "../../../formControl/PageSelect";
import MenuMultiSelectTable from "../../admin_menu_setup/MenuMultiSelectTable";


import { arrayAddFormat, arrayDeleteFormat, arrayMove } from "../../../../lib/array";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";

import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
const _arr = [
    { label: "링크", value: "nav-item" },
    { label: "드롭다운 메뉴", value: "dropdown-menu" },
    { label: "메가메뉴", value: "mega-menu" }
  ];
const __arr = (parentType) => {
    return parentType === "dropdown-menu"
      ? [
          { label: "드롭다운 메뉴", value: "dropdown-menu" },
          { label: "드롭다운 링크", value: "dropdown-item" }
        ]
      : parentType === "mega-menu"
      ? [{ label: "메가 그룹", value: "mega-group" }]
      : [{ label: "메가 링크", value: "mega-item" }];
  };
const MainNavLinkSetup = ({
    configData, authData, setConfig ,navList, setNavList
}) => {

    // const [navList, setNavList] = useState(configData.dc_navgation);

    const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);
  

  
 
  
    const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
      setNavList((oldItems) => arrayMove(oldItems, oldIndex, newIndex));
    }, [setNavList]);
  

  
    const changeHandler = (item, v, i, key) => {
      setNavList(arrayAddFormat(navList, { ...item, [key]: v }, i));
    };
  
    const deleteHandler = (index) => {
      setNavList(arrayDeleteFormat(navList, index));
    };
    
  return <div className="card">
  <div className="card-header">
    <div className="btn-group">
      <button
        className="btn btn-primary btn-sm"
        onClick={(e) => {
          e.preventDefault();
          setIsNewMenuOpen(!isNewMenuOpen);
        }}
      >
        <i className="bi bi-plus" />
        메뉴생성
      </button>
    </div>
  </div>
  <div
    className="card-body"
    style={{
      height: "660px",
      overflow: "hidden",
      overflowY: "scroll",
      overflowX: "hidden"
    }}
  >
    <table className="table table-sm table-hover">
      <TheadTemplate />
      <SortableCont
        onSortEnd={onSortEnd}
        axis="y"
        lockAxis="y"
        lockToContainerEdges={true}
        lockOffset={["30%", "50%"]}
        helperClass="helperContainerClass"
        useDragHandle={true}
      >
        {navList.map((item, i) => {
          return <SortableItem key={`item-${i}`} i={i} index={i} item={item} changeHandler={changeHandler} deleteCallback={deleteHandler} />;
        })}
      </SortableCont>
    </table>
  </div>
</div>;
};

MainNavLinkSetup.propTypes = {};

const mapStateToProps = (state) => {
    return {
      configData: state.configData,
      boardData: state.boardData,
      authData: state.authData,
      groupData: state.groupData
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      setConfig: (data) => dispatch(setConfig(data))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(MainNavLinkSetup);



const NewItemDialog = ({ isOpen, onHide, callback, parentType ,multiCallback }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const _newMenuArr = [
      { label: "메뉴이름", key: "label", p: "평소에 보여질 이름." },
      { label: "호버메뉴이름", key: "hoverLabel", p: "마우스가 올려지면 보여질 이름. 빈칸으로 남겨두면 변화없음" },
      { label: "포커스메뉴이름", key: "focusLabel", p: "마우스로 클릭하면 보여질 이름. 빈칸으로 남겨두면 변화없음" }
    ];
    const newMenuInit = {
      type:
        parentType === "main"
          ? "nav-item"
          : parentType === "dropdown-menu"
          ? "dropdown-item"
          : parentType === "mega-menu"
          ? "mega-group"
          : parentType === "mega-group"
          ? "mega-item"
          : "",
      label: "",
      icon: "",
      hoverLabel: "",
      focusLabel: "",
      hoverIcon: "",
      focusIcon: "",
      to: "",
      children: []
    };
    const [newMenuState, setNewMenuState] = useState(newMenuInit);
    return (
      <Dialog header="Create Menu" visible={isOpen} style={{ width: "50vw" }} onHide={() => onHide(false)}>
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="One Make">
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <label htmlFor={`new-menu-create-type`} className="col-sm-2 col-form-label col-form-label-sm">
                    Type
                  </label>
                  <div className="col-sm-10">
                    <DropdownTemplate
                      options={parentType === "main" ? _arr : __arr(parentType)}
                      value={newMenuState.type}
                      callback={(v) => {
                        setNewMenuState({ ...newMenuState, type: v });
                      }}
                    />
                  </div>
                </div>
                {_newMenuArr.map((item, i) => {
                  return (
                    <div className="row mb-3" key={i}>
                      <label htmlFor={`new-menu-create${i}`} className="col-sm-2 col-form-label col-form-label-sm">
                        {item.label}
                      </label>
                      <div className="col-sm-10">
                        <input
                          value={newMenuState[item.key]}
                          onChange={(e) => {
                            const value = e.target.value;
                            setNewMenuState({ ...newMenuState, [item.key]: value });
                          }}
                          type="text"
                          autoComplete="off"
                          className="form-control form-control-sm"
                          id={`new-menu-create${i}`}
                          placeholder={item.p}
                        />
                      </div>
                    </div>
                  );
                })}
                {newMenuState.type.split("-")[1] === "item" ? (
                  <div>
                    <p>{newMenuState.to}</p>
                    <PageSelect
                      value={newMenuState.to}
                      onChange={(v) => {
                        setNewMenuState({ ...newMenuState, to: v });
                      }}
                    />
                  </div>
                ) : null}
              </div>
              <div className="card-footer p-0 d-flex justify-content-end">
                <div className="btn-group">
                  <button
                    className="btn btn-primary btn-sm px-5"
                    onClick={(e) => {
                      e.preventDefault();
                      onHide(false);
                      if (newMenuState.label.length > 1) {
                        callback(newMenuState);
                        setNewMenuState(newMenuInit);
                      }
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger btn-sm px-5"
                    onClick={(e) => {
                      e.preventDefault();
                      setNewMenuState(newMenuInit);
                      onHide(false);
                    }}
                  >
                    Cansle
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Multi Make">
          <MenuMultiSelectTable parentType={parentType} callback={(list)=>{
              multiCallback(list)
              onHide(false)
            }} />
            
          </TabPanel>
        </TabView>
      </Dialog>
    );
  };
  
  const TheadTemplate = ({ parentType }) => {
    return (
      <thead style={{ fontSize: "9px" }}>
        <tr>
          <th width="50px"></th>
          {parentType === "nav-item" || parentType === "mega-item" || parentType === "mega-group" ? null : (
            <th className="text-center" width="80px">
              하위메뉴
            </th>
          )}
  
          <th width="170px">메뉴이름</th>
          <th width="170px">메뉴타입</th>
  
          <th width="170px">
            호버
            <br />
            메뉴명
          </th>
          {parentType==='mega-menu' ||parentType==='dropdown-menu'||parentType==='mega-group'?null:
          <th width="170px">
            포커스
            <br />
            메뉴명
          </th>
          }
  
          <th className="text-center" width="50px">
            아이콘
          </th>
          <th className="text-center" width="50px">
            호버
            <br />
            아이콘
          </th>
  
          {parentType==='mega-menu' ||parentType==='dropdown-menu'||parentType==='mega-group'?null:
           <th className="text-center" width="50px">
           포커스
           <br />
           아이콘
         </th>
         }
         
  
          <th>주소</th>
  
          <th width="4%" colSpan={2} className="text-center" style={{ backgroundColor: "#999999" }}>
            Control
          </th>
        </tr>
      </thead>
    );
  };
  const DropdownTemplate = ({ value, callback, options }) => {
    return (
      <div className="btn-group">
        <button className="btn btn-secondary btn-sm dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {value}
        </button>
        <ul className="dropdown-menu">
          {options.map((item, i) => {
            return (
              <li
                key={i}
                className="dropdown-item cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  callback(item.value);
                }}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  const ChangeTextTemplate = ({ value, callback }) => {
    return (
      <input
        className="form-control form-control-sm"
        value={value}
        onChange={(e) => {
          callback(e.target.value);
        }}
      />
    );
  };
  
  const SortableCont = SortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
  });
  const SortableItem = SortableElement((props) => <TableRow {...props} />);
  
  const RowHandler = SortableHandle(({ callback }) => <i className="bi bi-arrows-move" onMouseDown={callback} />);
  
  const SubSortableCont = SortableContainer(({ children }) => {
    return <tbody>{children}</tbody>;
  });
  
  const SubSortableItem = SortableElement((props) => <SubTableRow {...props} />);
  
  const AddressTemplate = ({ to, callback }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <span>
        <button
          className={to === "" ? "btn btn-warning btn-sm" : "btn btn-primary btn-sm"}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <i className={to === "" ? "bi bi-x-square" : "bi bi-check-square"} />
        </button>
        <Dialog header="주소 설정" visible={isOpen} onHide={() => setIsOpen(false)}>
          <p>{to}</p>
          <PageSelect
            value={to}
            onChange={(v) => {
              callback(v);
              setIsOpen(false);
            }}
          />
        </Dialog>
      </span>
    );
  };
  
  const SubTable = ({ item, changeCallback, parentType }) => {
    const [subItems, setSubItems] = useState(item);
    const onSortEnd = useCallback(
      ({ oldIndex, newIndex }) => {
        setSubItems((oldItems) => {
          const value = arrayMove(oldItems, oldIndex, newIndex);
          changeCallback(value);
          return value;
        });
      },
      [changeCallback]
    );
    const changeHandler = (subItem, v, i, key) => {
      const value = arrayAddFormat(subItems, { ...subItem, [key]: v }, i);
      setSubItems(value);
      changeCallback(value);
    };
    const deleteHandler = (index) => {
      const value = arrayDeleteFormat(subItems, index);
      setSubItems(value);
      changeCallback(value);
    };
    const addMenuHandler = (v) => {
      const value = setSubItems([...subItems, v]);
      setSubItems(value);
      changeCallback(value);
    };
  
    return (
      <table className="table table-sm table-hover">
        <TheadTemplate parentType={parentType} />
        <SubSortableCont
          onSortEnd={onSortEnd}
          axis="y"
          lockAxis="y"
          lockToContainerEdges={true}
          lockOffset={["30%", "50%"]}
          helperClass="helperContainerClass"
          useDragHandle={true}
        >
          {subItems.map((childItem, j) => {
            return (
              <SubSortableItem
                key={`item-${j}`}
                j={j}
                index={j}
                item={childItem}
                changeHandler={changeHandler}
                parentType={parentType}
                deleteCallback={deleteHandler}
                addMenuCallback={addMenuHandler}
              />
            );
          })}
        </SubSortableCont>
      </table>
    );
  };
  
  const TableRow = ({ item, i, changeHandler, deleteCallback }) => {
    const [isChildrenOpen, setIsChildrenOpen] = useState(false);
    const [isIconOpen, setIsIconOpen] = useState(false);
    const [isHIconOpen, sethIsIconOpen] = useState(false);
    const [isFIconOpen, setfIsIconOpen] = useState(false);
    const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    return (
      <>
        <tr>
          {/* drag menu move */}
          <th
            className="text-center cursor-move"
            onClick={() => {
              setIsChildrenOpen(false);
            }}
          >
            <RowHandler
              callback={() => {
                setIsChildrenOpen(false);
              }}
            />
          </th>
          {/* childten Item menu Open */}
          <td className="text-center py-0">
            {item.children.length > 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsChildrenOpen(!isChildrenOpen);
                }}
                className="btn btn-info btn-sm w-100"
              >
                <i className="bi bi-layout-text-window-reverse" />
              </button>
            ) : (
              <i className="bi bi-x-circle" />
            )}
          </td>
          {/* 메뉴 라벨 */}
          <td className="py-0 ">
            <ChangeTextTemplate
              value={item.label}
              callback={(v) => {
                changeHandler(item, v, i, "label");
              }}
            />
          </td>
          {/* 메뉴 타입 */}
          <td className="py-0 ">
            <DropdownTemplate
              options={_arr}
              value={item.type}
              callback={(v) => {
                changeHandler(item, v, i, "type");
              }}
            />
          </td>
          {/* 호버 라벨 */}
          <td className="py-0 ">
            <ChangeTextTemplate
              value={item.hoverLabel}
              callback={(v) => {
                changeHandler(item, v, i, "hoverLabel");
              }}
            />
          </td>
          {/* 포커스 라벨 */}
          <td className="py-0 ">
          <ChangeTextTemplate
            value={item.focusrLabel}
            callback={(v) => {
              changeHandler(item, v, i, "focusrLabel");
            }}
          />
           
            
          </td>
          {/* 아이콘 */}
          <td className="py-0 text-center">
            <SideBarButtonTemplate
              icon={item.icon || "bi bi-bootstrap"}
              visible={isIconOpen}
              btnClass="btn-sm"
              fullscreen
              onHide={(v) => {
                setIsIconOpen(v);
              }}
              tooltip="아이콘"
              id="navgation-icon-select"
            >
              <IconTemplate
                callback={(icon) => {
                  changeHandler(item, icon, i, "icon");
                  setIsIconOpen(false);
                }}
              />
            </SideBarButtonTemplate>
          </td>
          {/* 호버아이콘 */}
          <td className="py-0 text-center">
            <SideBarButtonTemplate
              icon={item.hoverIcon || "bi bi-bootstrap"}
              visible={isHIconOpen}
              btnClass="btn-sm"
              fullscreen
              onHide={(v) => {
                sethIsIconOpen(v);
              }}
              tooltip="마우스호버 아이콘"
              id="navgation-hovericon-select"
            >
              <IconTemplate
                callback={(icon) => {
                  changeHandler(item, icon, i, "hoverIcon");
                  sethIsIconOpen(false);
                }}
              />
            </SideBarButtonTemplate>
          </td>
          {/* 포커스아이콘 */}
          <td className="py-0 text-center">
            <SideBarButtonTemplate
              icon={item.focusIcon || "bi bi-bootstrap"}
              visible={isFIconOpen}
              btnClass="btn-sm"
              fullscreen
              onHide={(v) => {
                setfIsIconOpen(v);
              }}
              tooltip="포커스 아이콘"
              id="navgation-focusicon-select"
            >
              <IconTemplate
                callback={(icon) => {
                  changeHandler(item, icon, i, "focusIcon");
                  setfIsIconOpen(false);
                }}
              />
            </SideBarButtonTemplate>
          </td>
          {/* 주소 */}
          <td className="py-0">
            {item.type.split("-")[1] === "item" ? (
              <div>
                <span>
                  <AddressTemplate
                    to={item.to}
                    callback={(v) => {
                      changeHandler(item, v, i, "to");
                    }}
                  />
                </span>
                <span className="ml-2">
                  <small>{item.to}</small>
                </span>
              </div>
            ) : null}
          </td>
          {/* menu detail control button */}
  
  
          {/* menu control button */}
          <td className="p-0">
            <div className="btn-group w-100">
              <button
                className="btn btn-outline-info btn-sm"
                onClick={(e) => {
                  e.preventDefault();
                  deleteCallback(i);
                }}
              >
                <i className="bi bi-trash" />
              </button>
  
              {item.type !== "nav-item" ? (
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsNewMenuOpen(true);
                  }}
                >
                  <i className="bi bi-plus" />
                </button>
              ) : null}
            </div>
          </td>
        </tr>
  
        {isChildrenOpen && item.children.length > 0 ? (
          <tr>
            <td colSpan={11}>
              <div className="card" style={{ marginLeft: "20px" }}>
                <div className="card-body">
                  <SubTable
                    parentType={item.type}
                    item={item.children}
                    changeCallback={(childItem) => {
                      changeHandler(item, childItem, i, "children");
                    }}
                  />
                </div>
              </div>
            </td>
          </tr>
        ) : null}
  
        <NewItemDialog
          onHide={setIsNewMenuOpen}
          isOpen={isNewMenuOpen}
          parentType={item.type}
          multiCallback={(v)=>{
            const value = [...item.children, ...v];
            changeHandler(item, value, i, "children");
          }}
          callback={(v) => {
            const value = [...item.children, v];
            changeHandler(item, value, i, "children");
          }}
        />
      </>
    );
  };
  // 서브 테이블 가로
  const SubTableRow = ({ item, j, changeHandler, parentType, deleteCallback }) => {
    const [isChildrenOpen, setIsChildrenOpen] = useState(false);
    const [isIconOpen, setIsIconOpen] = useState(false);
    const [isHIconOpen, sethIsIconOpen] = useState(false);
    const [isFIconOpen, setfIsIconOpen] = useState(false);
    const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);
    return (
      <>
        <tr>
          {/* drag menu move */}
          <th className="text-center cursor-move">
            <RowHandler callback={() => {}} />
          </th>
          {/* childten Item menu Open */}
          {parentType === "mega-menu" || parentType === "dropdown-menu" ? (
            <td className="text-center py-0">
              {item.children.length > 0 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsChildrenOpen(!isChildrenOpen);
                  }}
                  className="btn btn-info btn-sm w-100"
                >
                  <i className="bi bi-layout-text-window-reverse" />
                </button>
              ) : (
                <i className="bi bi-x-circle" />
              )}
            </td>
          ) : null}
          {/* 메뉴 라벨 */}
          <td className="py-0 ">
            <ChangeTextTemplate
              value={item.label}
              callback={(v) => {
                changeHandler(item, v, j, "label");
              }}
            />
          </td>
          {/* 메뉴 타입 */}
          <td className="py-0 ">
            <DropdownTemplate
              options={__arr(parentType)}
              value={item.type}
              callback={(v) => {
                changeHandler(item, v, j, "type");
              }}
            />
          </td>
          {/* 호버 라벨 */}
          <td className="py-0 ">
            <ChangeTextTemplate
              value={item.hoverLabel}
              callback={(v) => {
                changeHandler(item, v, j, "hoverLabel");
              }}
            />
          </td>
         
          
          {/* 아이콘 */}
          <td className="py-0 text-center">
            <SideBarButtonTemplate
              icon={item.icon || "bi bi-bootstrap"}
              visible={isIconOpen}
              btnClass="btn-sm"
              fullscreen
              onHide={(v) => {
                setIsIconOpen(v);
              }}
              tooltip="아이콘"
              id="navgation-icon-select"
            >
              <IconTemplate
                callback={(icon) => {
                  changeHandler(item, icon, j, "icon");
                  setIsIconOpen(false);
                }}
              />
            </SideBarButtonTemplate>
          </td>
          {/* 호버 아이콘 */}
          <td className="py-0 text-center">
            <SideBarButtonTemplate
              icon={item.hoverIcon || "bi bi-bootstrap"}
              visible={isHIconOpen}
              btnClass="btn-sm"
              fullscreen
              onHide={(v) => {
                sethIsIconOpen(v);
              }}
              tooltip="마우스호버 아이콘"
              id="navgation-hovericon-select"
            >
              <IconTemplate
                callback={(icon) => {
                  changeHandler(item, icon, j, "hoverIcon");
                  sethIsIconOpen(false);
                }}
              />
            </SideBarButtonTemplate>
          </td>
          {/* 포커스 아이콘 */}
        
         
           
          {/* 주소 */}
          <td className="py-0">
            {item.type.split("-")[1] === "item" ? (
              <div>
                <span>
                  <AddressTemplate
                    to={item.to}
                    callback={(v) => {
                      changeHandler(item, v, j, "to");
                    }}
                  />
                </span>
                <span className="ml-2">
                  <small>{item.to}</small>
                </span>
              </div>
            ) : null}
          </td>
       
          {/* menu control button */}
          <td className="p-0">
            <div className="btn-group w-100">
              <button
                className="btn btn-outline-info btn-sm"
                onClick={(e) => {
                  e.preventDefault();
                  deleteCallback(j);
                }}
              >
                <i className="bi bi-trash" />
              </button>
              {item.type === "dropdown-item" ? null : (
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsNewMenuOpen(true);
                  }}
                >
                  <i className="bi bi-plus" />
                </button>
              )}
            </div>
          </td>
        </tr>
  
        {isChildrenOpen && item.children.length > 0 ? (
          <tr>
            <td colSpan={11}>
              <div className="card">
                <div className="card-body p-0">
                  <SubTable
                    parentType={item.type}
                    item={item.children}
                    changeCallback={(childItem) => {
                      changeHandler(item, childItem, j, "children");
                    }}
                  />
                </div>
              </div>
            </td>
          </tr>
        ) : null}
  
        <NewItemDialog
          onHide={setIsNewMenuOpen}
          isOpen={isNewMenuOpen}
          parentType={item.type}
          multiCallback={(v)=>{
            const value = [...item.children, ...v];
            changeHandler(item, value, j, "children");
            setIsChildrenOpen(false);
          }}
          callback={(v) => {
            const value = [...item.children, v];
            changeHandler(item, value, j, "children");
            setIsChildrenOpen(false);
          }}
        />
      </>
    );
  };
  
  