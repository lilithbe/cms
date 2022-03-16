import { useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { IMAGE_UPLOAD } from '../../../../common';
import { Dialog } from 'primereact/dialog';
import ColorSelecter from '../../../formControl/ColorSelecter';


const DefaultSetup = ({ navConfig, setNavConfig, fontFamily  }) => {
 

    const [active, setActive] = useState(0);
    const [activeLabel, setActiveLabel] = useState('Default');
    const tableTemplate = (arr) => {
        return (
           <div className='card' style={{
            transition:"all 0.5s"
           }}>
                <div className='card-header'>
                    {activeLabel} Setup
                </div>
                <div className='card-body'>
                <table className='table table-sm table-bordered'>
                    <tbody>
                        {arr.map((item, i) => {
                            if (item.conditionKey === null || navConfig[item.conditionKey]) {
                                return (
                                    <tr key={i}>
                                        <td className='text-center' width="20%">{item.label}</td>
                                        <td width="40%">
                                            {item.inputType === 'fontFamily' ?
                                                <Dropdown options={fontFamily}
                                                    value={navConfig[item.key]}
                                                    onChange={(e) => {
                                                        setNavConfig((prev) => {
                                                            return {
                                                                ...prev,
                                                                [item.key]: e.value
                                                            }
                                                        })
                                                    }} />
                                                : item.inputType === 'colorPicker' ?
                                                    <ColorSelecter color={navConfig[item.key]} callback={(color)=>{
                                                        setNavConfig((prev) => {
                                                            return {
                                                                ...prev,
                                                                [item.key]: color
                                                            }
                                                        })
                                                    }}/>
                                                    :
                                                    <SelectButton className='p-buttonset-sm'
                                                        value={navConfig[item.key]}
                                                        options={item.options}
                                                        onChange={(e) => {
                                                            if (e.value !== null) {
                                                                setNavConfig((prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        [item.key]: e.value
                                                                    }
                                                                })
                                                            }
                                                        }} />}
                                        </td>
                                        <td><small>{item.description}</small></td>
                                    </tr>
                                )
                            } else {
                                return null
                            }


                        })}
                    </tbody>
                </table>
            </div>
           </div>
        )
    }
    const sideClickHandler = (index, label) => {
        setActiveLabel(label)
        setActive(index)
    };


    const modelItem = [
        {
            label: 'Default', 
            tooltip:'네비게이션 기본정보',
            description:'네비게이션 기본정보를 수정합니다.',
            command: (e) => {
                sideClickHandler(0, e.label)
            }
        },
        {
            label: 'Nav Bar',
            items: [
                {
                    label: 'Top Line', command: (e) => {
                        sideClickHandler(1, e.label)
                    }
                },
                {
                    label: 'Bottom Line', command: (e) => {
                        sideClickHandler(2, e.label)
                    }
                },
                {
                    label: 'Menu Buttons', command: (e) => {
                        sideClickHandler(3, e.label)
                    }
                }
            ]
        },
        {
            label: 'Nav Item',
            command: (e) => {
                sideClickHandler(4, e.label)
            }
        },
        { label: 'Fixed Nav Item', command: (e) => {
            sideClickHandler(5, e.label)
        } },
        {
            label: 'Top menu', items: [
                {
                    label: 'Top Menu Design',
                    command: (e) => {
                        sideClickHandler(6, e.label)
                    }
                },
                {
                    label: 'Menu items',
                    command: (e) => {
                        sideClickHandler(7, e.label)
                    }
                },
                {
                    label: 'Social Falow',
                    command: (e) => {
                        sideClickHandler(8, e.label)
                    }
                },
               
            ]
        }
    ]
    
 

    return (
        <div className='row'>
            <div className='col-xl-2 col-md-3'>

                <ListMenu items={modelItem} />

            </div>

            <div className='col-xl-10 col-md-9'>
                <TabView activeIndex={active} onTabChange={(e) => console.log(e.index)}>
                    <TabPanel header="기본설정" headerClassName='d-none'>
                        {tableTemplate(defaultArr)}
                    </TabPanel>

                    <TabPanel header="navbarTopArr" headerClassName='d-none'>
                        {tableTemplate(navbarTopArr)}
                    </TabPanel>
                    <TabPanel header="navbarBottomArr" headerClassName='d-none'>
                        {tableTemplate(navbarBottomArr)}
                    </TabPanel>
                    <TabPanel header="navItemButtonArr" headerClassName='d-none'>
                        {tableTemplate(navItemButtonArr)}
                    </TabPanel>

                    <TabPanel header="네비게이션 아이템" headerClassName='d-none'>
                        {tableTemplate(navItemArr)}
                    </TabPanel>
                    <TabPanel header="픽스 네비게이션 아이템" headerClassName='d-none'>
                        {tableTemplate(fixedNavItemArr)}
                    </TabPanel>


                    <TabPanel header="탑 메뉴 디자인" headerClassName='d-none'>
                    탑 메뉴 디자인
                    </TabPanel>
                    <TabPanel header="탑 메뉴 아이템" headerClassName='d-none'>
                    아이템
                    </TabPanel>
                    <TabPanel header="탑 메뉴 소셜 팔로우" headerClassName='d-none'>
                   
        
                    </TabPanel>
                </TabView>
            </div>
        </div>

    );
};

export default DefaultSetup;




const ListMenu = ({ items, collapse }) => {
    const [active, setActive] = useState(0);
    return (
        <ul className={`list-group list-group-flush cursor-pointer ${collapse} `}
        style={{
            transition:"all 0.5s"
           }}
           >
            {items.map((item, i) => {
                return (
                    item.items && item.items.length > 0 ?
                        <ControllListItem key={i} item={item} index={i} setActive={setActive} active={active} />
                        :
                        <ListItem key={i} item={item} index={i} setActive={setActive} active={active} />
                )
            })}
        </ul>
    )
};
const ControllListItem = ({ item, index, active, setActive }) => {
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        if (active === index) {
            setIsShow(true)
        } else {
            setIsShow(false)
        }
        return () => {
            setIsShow(false)
        };
    }, [active, index]);

    return (
        <li  style={{
            transition:"all 0.5s"
           }}
            className="list-group-item" onClick={(e) => {
            e.preventDefault()
            setActive(index)
            setIsShow(true)
        }}>
            <span>
                <i className={`bi bi-chevron-${isShow ? 'down mx-2 ' : 'right mx-2 '}`} />
                {item.label}
            </span>

            <ListMenu items={item.items} collapse={`collapse ${isShow ? 'show' : ''}`} />
        </li>
    )
};
const ListItem = ({ item, index, active, setActive }) => {
    const [isFocus, setIsFocus] = useState(false);
    useEffect(() => {
        if (active === index) {
            setIsFocus(true)
        } else {
            setIsFocus(false)
        }
        return () => {
            setIsFocus(false)
        };
    }, [active, index]);
    return (
        <li
        style={{
            transition:"all 0.5s"
           }}
           className={`list-group-item`} onClick={() => {
            setActive(index)
            item.command(item)
        }}>
            {item.label}
        </li>
    )
};



const PDOPS = [
    { label: '0', value: 'py-0' },
    { label: '1', value: 'py-1' },
    { label: '2', value: 'py-2' },
    { label: '3', value: 'py-3' },
    { label: '4', value: 'py-4' },
    { label: '5', value: 'py-5' },
]
const WOS = [
    { label: '0', value: '0px' },
    { label: '1', value: '1px' },
    { label: '2', value: '2px' },
    { label: '3', value: '3px' },
]
const FSOS = [
    { label: '10px', value: '10px' },
    { label: '11px', value: '11px' },
    { label: '12px', value: '12px' },
    { label: '13px', value: '13px' },
    { label: '15px', value: '15px' },
    { label: '17px', value: '17px' },
    { label: '20px', value: '20px' }
]
const TFOS = [{ label: '예', value: true }, { label: '아니오', value: false }]
const POS = [{ label: '왼쪽', value: 'left' }, { label: '중앙', value: 'center' }, { label: '오른쪽', value: 'right' }]

const defaultArr = [
    { label: '메인로고생성', inputType: 'BoolCheckBox', options: TFOS, description: '메인로고를 생성하시겠습니까? ', key: 'isHead', conditionKey: null },
    { label: '탑메뉴 생성', inputType: 'BoolCheckBox', options: TFOS, description: '메인로고를 생성하였을경우 메인로고 위에 탑 메뉴를 생성하시겠습니까? ', key: 'isTopMenu', conditionKey: 'isHead' },
    { label: '계정버튼 위치', inputType: 'oneFixCheckBox', options: [{ label: '탑메뉴', value: 'top' }, { label: '네비게이션', value: 'navbar' }], description: '탑 메뉴가 생성되었다면 account 버튼의 위치를 설정하세요? 계정버튼에는 로그인,로그아웃,프로필 외에 관리자모드가 있습니다. ', key: 'accountButtonPosition', conditionKey: 'isTopMenu' },
    { label: '스크롤무빙액션', inputType: 'BoolCheckBox', options: TFOS, description: '스크롤 이동시 네비게이션 위치를 상단에 고정하시겠습니까?   ', key: 'isScrollMovingNavFixed', conditionKey: null },
    { label: '메뉴로고생성', inputType: 'BoolCheckBox', options: TFOS, description: '네비게이션에 로고를 생성하시겠습니까?', key: 'isNavBrand', conditionKey: null },
    { label: '검색버튼생성', inputType: 'BoolCheckBox', options: TFOS, description: '검색버튼 생성하시겠습니까?', key: 'isSearchButton', conditionKey: null },
    { label: '홈버튼생성', inputType: 'BoolCheckBox', options: TFOS, description: '메뉴버튼 앞에 홈버튼을 생성하시겠습니까?', key: 'isHomeButton', conditionKey: null },

]
const navbarTopArr = [
    { label: '메뉴탑라인두께 ', options: WOS, inputType: 'oneFixCheckBox', description: '네비게이션 윗쪽 선 두께를 설정하세요.', key: "navbarBorderTopLineWeight", conditionKey: null },
    { label: '메뉴탑라인색상 ', inputType: 'colorPicker', description: '네비게이션 윗쪽 선 색상을 설정하세요.', key: "navbarBorderTopLineColor", conditionKey: null },
    { label: '메뉴탑그림자두께 ', options: WOS, inputType: 'oneFixCheckBox', description: '네비게이션 윗쪽 그림자 두께를 설정하세요.', key: "navbarBorderTopShadowWeight", conditionKey: null },
    { label: '메뉴탑그림자색상 ', inputType: 'colorPicker', description: '네비게이션 윗쪽 그림자 색상을 설정하세요.', key: "navbarBorderTopShadowColor", conditionKey: null },

]
const navbarBottomArr = [
    { label: '메뉴바텀라인두께 ', options: WOS, inputType: 'oneFixCheckBox', description: '네비게이션 아래쪽 선 두께를 설정하세요.', key: "navbarBorderBottomLineWeight", conditionKey: null },
    { label: '메뉴바텀라인색상 ', inputType: 'colorPicker', description: '네비게이션 아래쪽 선 색상을 설정하세요.', key: "navbarBorderBottomLineColor", conditionKey: null },
    { label: '메뉴바텀그림자두께 ', options: WOS, inputType: 'oneFixCheckBox', description: '네비게이션 아래쪽 그림자 두께를 설정하세요.', key: "navbarBorderBottomShadowWeight", conditionKey: null },
    { label: '메뉴바텀그림자색상 ', inputType: 'colorPicker', description: '네비게이션 아래쪽 그림자 색상을 설정하세요.', key: "navbarBorderBottomShadowColor", conditionKey: null },

]
const navItemButtonArr = [
    { label: '메뉴버튼선두께 ', options: WOS, inputType: 'oneFixCheckBox', description: '메뉴버튼 테두리 선의 두께를 설정하세요.', key: "navItemBorderWeight", conditionKey: null },
    { label: '메뉴버튼선색상 ', inputType: 'colorPicker', description: '메뉴버튼 테두리 선의 색상을 설정하세요.', key: "navItemBorderColor", conditionKey: null },
    { label: '메뉴버튼상하여백 ', inputType: 'oneFixCheckBox', options: PDOPS, description: '메뉴버튼 상하 여백을 설정하세요.', key: "navItemPaddingY", conditionKey: null },

]

const navItemArr = [
    { label: '메뉴위치', inputType: 'oneFixCheckBox', options: POS, description: '네비게이션 메뉴버튼들의 위치를 설정하세요.', key: 'navbarButtonPosition', conditionKey: null },
    { label: '상하여백값', inputType: 'oneFixCheckBox', options: PDOPS, description: '네비게이션의 상하 여백을 설정하세요.', key: 'navbarPaddingY', conditionKey: null },
    { label: '네비게이션 배경색', inputType: 'colorPicker', description: '네비게이션의 배경색을 설정하세요.', key: 'navbarBgColor', conditionKey: null },
    { label: '버튼 호버 배경색상', inputType: 'colorPicker', description: '네비게이션 메뉴버튼 호버 배경색을 설정하세요. 마우스가 올라가면 배경색이 변경됩니다.', key: 'navbarHoverBgColor', conditionKey: null },
    { label: '버튼 포커스 배경색상', inputType: 'colorPicker', description: '네비게이션 메뉴버튼 포커스 배경색을 설정하세요. 현재 머물고 있는 페이지의 메뉴 배경색이 변경됩니다.', key: 'navbarFocusBgColor', conditionKey: null },

    { label: '폰트스타일', inputType: 'fontFamily', description: '네비게이션의 기본 폰트페밀리를 설정하세요.', key: 'navbarFontFamily', conditionKey: null },

    { label: '글자색상', inputType: 'colorPicker', description: '네비게이션의 기본 글자색을 설정하세요.', key: 'navbarColor', conditionKey: null },
    { label: '호버 글자색상', inputType: 'colorPicker', description: '네비게이션의 호버 글자색을 설정하세요.', key: 'navbarHoverColor', conditionKey: null },
    { label: '포커스 글자색상', inputType: 'colorPicker', description: '네비게이션의 포커스 글자색을 설정하세요.', key: 'navbarFocusColor', conditionKey: null },
    { label: '글자 크기', inputType: 'oneFixCheckBox', options: FSOS, description: '네비게이션의 폰트크기', key: 'navbarFontSize', conditionKey: null },
    { label: '글자 테두리 사용', inputType: 'BoolCheckBox', options: TFOS, description: '네비게이션의 글자 테두리 사용하시겠습니까?', key: 'isNavbarFontShadow', conditionKey: null },
    { label: '글자 테두리색상', inputType: 'colorPicker', description: '네비게이션의 폰트테두리 색상을 설정하세요.', key: 'navbarFontShadow', conditionKey: null },
    { label: '호버 글자 테두리색상', inputType: 'colorPicker', description: '네비게이션의 호버 폰트테두리 색상을 설정하세요.', key: 'navbarHoverFontShadow', conditionKey: null },
    { label: '포커스 글자 테두리색상', inputType: 'colorPicker', description: '네비게이션의 포커스 폰트테두리 색상을 설정하세요.', key: 'navbarFocusFontShadow', conditionKey: null },
    { label: '글자 테두리 두께', inputType: 'oneFixCheckBox', options: WOS, description: '네비게이션의 폰트테두리 두께', key: 'navbarFontShadowWeight', conditionKey: null },

]
const fixedNavItemArr = [
    { label: '픽스메뉴설정', inputType: 'BoolCheckBox', options: TFOS, description: '스크롤무빙액션을 활성화 하였다면 메뉴옵션의 값을 별도로 설정하시겠습니까?', key: 'isFixedValueCopy', conditionKey: null },

    { label: '픽스_메뉴위치', inputType: 'oneFixCheckBox', options: POS, description: '네비게이션 메뉴버튼들의 위치를 설정하세요.', key: 'fixedNavbarButtonPosition', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_상하여백값', inputType: 'oneFixCheckBox', options: PDOPS, description: '네비게이션의 상하 여백을 설정하세요.', key: 'fixedNavbarPaddingY', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_네비게이션 배경색', inputType: 'colorPicker', description: '네비게이션의 배경색을 설정하세요.', key: 'fixedNavbarBgColor', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_버튼 호버 배경색상', inputType: 'colorPicker', description: '네비게이션의 호버 배경색을 설정하세요.', key: 'fixedNavbarHoverBgColor', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_버튼 포커스 배경색상', inputType: 'colorPicker', description: '네비게이션의 포커스 배경색을 설정하세요.', key: 'fixedNavbarFocusBgColor', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_글자색상', inputType: 'colorPicker', description: '네비게이션의 기본 글자색을 설정하세요.', key: 'fixedNavbarColor', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_호버 글자색상', inputType: 'colorPicker', description: '네비게이션의 호버 글자색을 설정하세요.', key: 'fixedNavbarHoverColor', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_포커스 글자색상', inputType: 'colorPicker', description: '네비게이션의 포커스 글자색을 설정하세요.', key: 'fixedNavbarFocusColor', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_글자 크기', inputType: 'oneFixCheckBox', options: FSOS, description: '네비게이션의 폰트크기', key: 'fixedNavbarFontSize', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_글자 테두리 사용', inputType: 'BoolCheckBox', options: TFOS, description: '네비게이션의 글자 테두리 사용하시겠습니까?', key: 'isFixedNavbarFontShadow', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_글자 테두리색상', inputType: 'colorPicker', description: '네비게이션의 폰트테두리 색상을 설정하세요.', key: 'fixedNavbarFontShadow', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_호버 글자 테두리색상', inputType: 'colorPicker', description: '네비게이션의 호버 폰트테두리 색상을 설정하세요.', key: 'fixedNavbarHoverFontShadow', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_포커스 글자 테두리색상', inputType: 'colorPicker', description: '네비게이션의 포커스 폰트테두리 색상을 설정하세요.', key: 'fixedNavbarFocusFontShadow', conditionKey: 'isFixedValueCopy' },
    { label: '픽스_글자 테두리 두께', inputType: 'oneFixCheckBox', options: WOS, description: '네비게이션의 폰트테두리 두께', key: 'fixedNavbarFontShadowWeight', conditionKey: 'isFixedValueCopy' },
]





