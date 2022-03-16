import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useAnimateKeyframes } from 'react-simple-animate';
import moment from 'moment';
import Watch from '../../components/watch/Watch';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { useRouter } from 'next/router';
import { useState } from 'react';

const Header = ({ authData, configData, isSearch, setIsSearch }) => {
    const route = useRouter()
    const { play, style } = useAnimateKeyframes({
        iterationCount: 1,
        direction: 'alternate',
        duration: 2,
        keyframes: [
            { 0: 'opacity: 0' }, // 0%
            { 50: 'opacity: 0.5' }, // 50%
            { 100: 'opacity: 1' } // 100
        ]
    });
    useEffect(() => play(true));

    return (
        <div className='d-none d-md-block'>
            <Sidebar className='d-none-header d-none-scroll py-2' blockScroll 
                style={{ height: 'auto',overflow:"hidden" }} position='top' showCloseIcon={false} visible={isSearch} onHide={() => { setIsSearch(false) }}>
                <div className="p-inputgroup">
                    <InputText placeholder="Keyword" autoFocus={isSearch} />
                    <Button icon="pi pi-search" className="p-button-primary" />
                </div>
            </Sidebar>
            {configData.dc_navConfig.isTopMenu && configData.dc_navConfig.isHead ?
                <div className='container-md border-bottom d-flex justify-content-between'>
                    <div className='btn-group top-widget'>
                    {authData.isLogin ?
                            <button className='btn btn-outline-link btn-sm'>
                                {authData[authData.useName]} 님 어서오세요
                            </button> : null}

                        <button className='btn btn-outline-link btn-sm'>{moment().format('MM월DD일')}</button>
                        <button className='btn btn-outline-link btn-sm'><Watch /></button>
                        
                        <IconTemplate icon="bi bi-cloud-sun"  isFill tooltip={"Weather"}/>
                        <IconTemplate icon="bi bi-qr-code" tooltip={"QR Code"} />
                        <IconTemplate icon="bi bi-rss"isFill tooltip={"RSS"} />
                       

                    </div>
                    <div className='btn-group top-social' >
                        <SocialIconTemplate icon="bi bi-chat" isFill tooltip="Kakao" to={configData.dc_social.sf_kakao}/>
                        <SocialIconTemplate icon="bi bi-google" tooltip="Google" to={configData.dc_social.sf_google} />
                        <SocialIconTemplate label="N" buttonClass={"fw-bold"} tooltip="Naver" to={configData.dc_social.sf_naver} />
                        <SocialIconTemplate icon="bi bi-line" tooltip="Naver Line" to={configData.dc_social.sf_naver_line} />
                        <SocialIconTemplate icon="bi bi-instagram" tooltip="Instagram" to={configData.dc_social.sf_instagram} />
                        <SocialIconTemplate icon="bi bi-facebook" tooltip="Facebook" to={configData.dc_social.sf_facebook} />
                        <SocialIconTemplate icon="bi bi-twitter" tooltip="Twitter" to={configData.dc_social.sf_twitter} />
                        <SocialIconTemplate icon="bi bi-pinterest" tooltip="Pinterest" to={configData.dc_social.sf_pinterest} />
                        <SocialIconTemplate icon="bi bi-youtube" tooltip="Youtube" to={configData.dc_social.sf_youtube} />
                        <SocialIconTemplate icon="bi bi-github" tooltip="Github" to={configData.dc_social.sf_github} />
                        <SocialIconTemplate icon="bi bi-telegram" tooltip="Telegram" to={configData.dc_social.sf_telegram} />
                        <SocialIconTemplate icon="bi bi-twitch" tooltip="Twitch" to={configData.dc_social.sf_twitch} />
                        <SocialIconTemplate icon="bi bi-vimeo" tooltip="Vimeo" to={configData.dc_social.sf_vimeo} />
                    
                        {/* kakao */}
                      
                       

                    </div>
                    {authData.isLogin ?
                            <div className='btn-group top-account-menu'>
                                <IconTemplate icon="bi bi-envelope" isFill tooltip={"Message"}/>
                                <IconTemplate icon="bi bi-cart" isFill tooltip={"Shop"}/>
                                <IconTemplate icon="bi bi-chat-left-quote" isFill tooltip={"채팅"}/>
                                <IconTemplate icon="bi bi-bag" isFill tooltip={"쇼핑백"}/>
                                <IconTemplate icon="bi bi-person" isFill tooltip={"프로필"}/>

                                {authData.isAdmin ? <IconTemplate icon="bi bi-speedometer" to="/admin" /> : null}

                            </div>

                            :  <div className='btn-group top-account-menu'>
                                  <IconTemplate icon="bi bi-door-open" isFill label="Sign in" to="/auth/login"/>
                                  <IconTemplate icon="bi bi-person-plus" isFill label="Sign up" to="/auth/register"/>
                                </div>}

                </div> : null}
            {configData.dc_navConfig.isHead ?
                <div className={`text-center py-3 d-none d-md-block `}
                    style={style}
                >
                    {configData.dc_isLogoImage ?
                        <Link href={"/"}>
                            <a  >
                                <Image src={configData.dc_logoImage} width={180} height={32} alt="logo" />
                            </a></Link>
                        :
                        <h1><Link href={"/"}>{configData.dc_title}</Link></h1>}
                </div> : null}
        </div>
    )
}

export default Header

const IconTemplate = ({buttonClass, icon ,isFill, label,tooltip,to})=>{
    const route = useRouter()
    const [isHover, setIsHover] = useState(false);

    return(
        <Button 
        className={`p-button-text p-button-plain ${buttonClass}`}
        tooltip={tooltip}
        tooltipOptions={{position: 'bottom'}}
            onClick={()=>{
                if(to){
                    route.push(to)
                }
            }}
            onMouseEnter={()=>{
                setIsHover(true)
            }}
            onMouseLeave={()=>{
                setIsHover(false)
            }}
        ><i className={`${icon}${isFill&&isHover?'-fill':''} `} />{label}</Button>
    )
}


const SocialIconTemplate = ({buttonClass, icon ,isFill, label,tooltip,to})=>{
 
    const [isHover, setIsHover] = useState(false);

    return(
        to!==''?
        <Button className={`p-button-text p-button-plain ${buttonClass}`}
        tooltip={tooltip}
        onMouseEnter={()=>{
            setIsHover(true)
        }}
        onMouseLeave={()=>{
            setIsHover(false)
        }}
        >
           <Link to={to}>
        <a 
         target={"_black"}
        >
            <i className={`${icon}${isFill&&isHover?'-fill':''} `} />{label}
        </a>
        </Link>
        </Button>:null
    )
}
