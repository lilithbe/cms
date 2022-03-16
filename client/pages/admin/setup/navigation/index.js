import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { setConfig } from "../../../../redux";
import AdminContainerTemplate from "../../../../components/template/AdminContainerTemplate";
import PageSelect from "../../../../components/formControl/PageSelect";
import MenuMultiSelectTable from "../../../../components/template/admin_menu_setup/MenuMultiSelectTable";

import DefaultSetup from "../../../../components/template/setup/navgation/DefaultSetup"
import MainNavLinkSetup from '../../../../components/template/setup/navgation/MainNavLinkSetup'
import { postApi } from "../../../../api";
import { ADMIN_CONFIG_UPDATE } from "../../../../common";

import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";



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

const Navgation = ({ configData, authData, setConfig }) => {
  const [navConfig, setNavConfig] = useState(configData.dc_navConfig);
  const [navList, setNavList] = useState(configData.dc_navgation);
  const [socialList, setSocialList] = useState(configData.dc_social);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);

  const toast = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    postApi(
      setIsLoading,
      ADMIN_CONFIG_UPDATE,
      (res) => {
        if (res.data.status) {
          setConfig(res.data.data);
          toast.current.show({ severity: "success", summary: "Success Message", detail: "저장완료", life: 2000 });
        }
      },
      { ...configData, dc_navgation: navList, dc_navConfig: navConfig, dc_social:socialList },
      authData.userToken
    );
  };



  const addNewMenuHandler = (value) => {
    setNavList([...navList, value]);
  };
  const addNewMenuMultiHandler = (value) => {
    setNavList([...navList, ...value]);
  };






  return (
    <AdminContainerTemplate adminKey="menuJ" icon="bi bi-window-dock" title="메뉴설정" isLoading={isLoading}>
      <Toast ref={toast} />
      <NewItemDialog onHide={setIsNewMenuOpen} isOpen={isNewMenuOpen} callback={addNewMenuHandler} parentType={"main"} multiCallback={addNewMenuMultiHandler} />
      <form onSubmit={submitHandler}>
        <TabView>
          <TabPanel header="메뉴링크설정">
            <MainNavLinkSetup navList={navList} setNavList={setNavList}/>
         
          </TabPanel>

          <TabPanel  header="메뉴디자인">
           <DefaultSetup navConfig={navConfig} setNavConfig={setNavConfig} 
           fontFamily={configData.dc_addFont} 
           socialData={socialList}
           setSocialList={setSocialList}/>
          </TabPanel>
       
        </TabView>
        <button type="submit" className="btn btn-primary w-100 mb-5">
          저장
        </button>
      </form>
    </AdminContainerTemplate>
  );
};

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
export default connect(mapStateToProps, mapDispatchToProps)(Navgation);

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

