import Link from 'next/link'
import React ,{useState , useRef} from 'react'
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import {Ripple} from "primereact/ripple";
import Image from 'next/image';

const AppSubmenu = (props) => {
    const [activeIndex, setActiveIndex] = useState(null)
    const nodeRef = useRef(null)
    const onMenuItemClick = (event, item, index) => {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        if (index === activeIndex)
            setActiveIndex(null);
        else
            setActiveIndex(index);

        if (props.onMenuItemClick) {
            props.onMenuItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

    const renderLinkContent = (item) => {
        let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
        let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;

        return (
            <React.Fragment>
                <i className={item.icon}></i>
                <span>{item.label}</span>
                {submenuIcon}
                {badge}
                <Ripple/>
            </React.Fragment>
        );
    }

    const renderLink = (item, i) => {
        let content = renderLinkContent(item);

        if (item.to) {
            return (
                <Link href={item.to}>
                <a className="router-link-active router-link-exact-active" onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
                    {content}
                </a>
                </Link>
                
            )
        }
        else {
            return (
                <a href={item.url} className="p-ripple" onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
                    {content}
                </a>
            );
        }
    }

    let items = props.items && props.items.map((item, i) => {
        let active = activeIndex === i;
        let styleClass = classNames(item.badgeStyleClass, {'layout-menuitem-category': props.root, 'active-menuitem': active && !item.to });

        if(props.root) {
            return (
                <li className={styleClass} key={i}>
                    {props.root === true && <React.Fragment>
                        <div className="layout-menuitem-root-text">{item.label}</div>
                        <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
                    </React.Fragment>}
                </li>
            );
        } else {
            return (
                <li ref={props.ref} className={styleClass} key={i}>
                    {renderLink(item, i)}
                   
                   
                    <CSSTransition nodeRef={nodeRef} classNames="layout-submenu-wrapper" timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
                        <AppSubmenu items={item.items} onMenuItemClick={props.onMenuItemClick} />
                    </CSSTransition>
                </li>
            );
        }
    });

    return items ? <ul className={props.className}>{items}</ul> : null;
}

const SideAppMenu = (props) => {
    const {authData, configData}=props
    const ref = useRef(null)
    return (
        <div className="layout-menu-container">
            <div style={{height:"150px"}}>
               <div className='text-center pt-2'>
               <Image className='rounded-circle' src={authData.userImage} alt="user-image" width={70} height={70}/>
               </div>
              
               {authData.isAdmin?
               <div className='text-center pt-2 '>
                   <span className="mr-3">{configData.dc_gradeObject.filter(f=>f.grade===authData.grade)[0].label}
                   
                   </span><Image className="" src={`/level_icon/basic/admin.gif`} height={18} width={23} alt='level_gif' />
               </div>
                :
               <div className='text-center pt-2'>{authData.nickName} <Image src={`/level_icon/basic/${authData.level}.gif`} height={20} width={20} alt='level_gif' /></div>}
            </div>

      

        <AppSubmenu items={props.model} className="layout-menu" onMenuItemClick={props.onMenuItemClick} root={true} />
    </div>
    )
}

export default SideAppMenu
