
import NaverLogin from "react-naver-login";
import React, { useState , useEffect } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from 'primereact/button';
import { postApi } from '../../api';
import { SOCIAL_JOIN, TOKEN_NAME, REMEMBER_NAME, PUBLIC_URL } from '../../common';
import Image from "next/image";
import {useRouter} from 'next/router'
const NaverButton = ({ callback, publicKey, isNaver, type, loadingCallback, setLogin }) => {
    const route = useRouter()
    const isDev =  process.env.NEXT_PUBLIC_TYPE==='development'?true:false
    console.log(process.env.NEXT_PUBLIC_DOMAIN)
    const [userData, setUserData] = useState(null);
    const [isRemeberOpen, setIsRemeberOpen] = useState(false);
    const loginCheckHandler = (e) => {
        setIsRemeberOpen(true)
        setUserData({
            userId:  e.id,
            joinType:type,
            type: "naver",
            email:e.email,
            nickName:e.nickname,
            userImage:e.profile_image,
            socialData:e
        })
       
    };

    const serverQueryHandler = (remember) => {
        postApi(
            loadingCallback,
            SOCIAL_JOIN,
            (req) => {
                if (req.data.status) {
                    setLogin(req.data.data);
                    localStorage.setItem(TOKEN_NAME, req.data.token);
                    localStorage.setItem(REMEMBER_NAME, req.data.data.remember);
                    callback(userData);
                } else {
                    
                }
            },
            { ...userData, remember: remember }
        );
    };
    const accept = () => {
        serverQueryHandler(true);
    };

    const reject = () => {
        serverQueryHandler(false);
    };

    return (
        <div>
            <ConfirmDialog
                visible={isRemeberOpen}
                onHide={() => setIsRemeberOpen(false)}
                message="자동로그인을 사용하시겠습니까? 유효기간은 1년이며 로그아웃시 모든 토큰은 삭제됩니다. 공개된 장소에서는 사용을 금지합니다. 기본유효기간은 1시간입니다. "
                header="네이버로그인 유효기간설정"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />

            { isNaver && !isDev?
        <NaverLogin
            clientId={publicKey}
            callbackUrl="http://localhost:3120/auth/login"
            render={(props)=>{
                return(
                    <Button className="p-p-0 w-full mb-1" style={{backgroundColor:"#00c73c"}} onClick={props.onClick}>
                    <i className="p-px-2"> <Image src={`/social/naver2.png`}
                         
                         alt="naver icon"
                         width={25}
                         height={25}
                         />
                         </i>
                    <span className="p-px-3 text-light text-center w-full  ">Login with Naver</span>
            </Button>

                    
                )
            }}
            onSuccess={(e) => {
                console.log('onSuccess')
                loginCheckHandler(e)
            }}
            
            onFailure={(result) => {
                console.log('onFailure')
                console.log(result)
            }}
          
            
        />:null}
        </div>
    );
};

export default NaverButton;
