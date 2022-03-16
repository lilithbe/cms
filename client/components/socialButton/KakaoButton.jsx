import React, { useState } from "react";
import KaKaoLogin from "react-kakao-login";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from 'primereact/button';
import { postApi } from '../../api';
import { SOCIAL_JOIN, TOKEN_NAME, REMEMBER_NAME, PUBLIC_URL } from '../../common';
import Image from "next/image";
const KakaoButton = ({ callback, publicKey, isKakao, type, loadingCallback, setLogin }) => {
    const [userData, setUserData] = useState(null);
    const [isRemeberOpen, setIsRemeberOpen] = useState(false);
    const loginCheckHandler = (e) => {
        setUserData({
            userId:  e.profile.id,
            joinType:type,
            type: "kakao",
            email:e.profile.kakao_account.email,
            nickName:e.profile.kakao_account.profile.nickname,
            userImage:e.profile.kakao_account.profile.thumbnail_image_url,
            socialData:e
        })
        setIsRemeberOpen(true)
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
                    console.log(req.data);
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
                header="구글토큰 유효기간설정"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />
            {isKakao ? (
                <KaKaoLogin
                    className="w-full mb-1"
                    token={publicKey}
                    onSuccess={loginCheckHandler}
                    onFail={(e) => {
                        console.log(e);
                    }}
                    onLogout={(e) => {
                        console.log(e);
                    }}
                    render={({onClick})=>{
                        return(
                            <Button className="p-p-0 w-full mb-1" style={{backgroundColor:"#FEE500"}} onClick={onClick}>
                            <i className="p-px-2">
                            <Image src={`/social/kakao.png`}
                         
                         alt="kakao icon"
                         width={25}
                         height={25}
                         />
                        </i>
                            <span className="p-px-3 text-dark text-center w-full  ">Login with Kakao</span>
                    </Button>

                            
                        )
                    }}
                />
            ) : null}
        </div>
    );
};

export default KakaoButton;
