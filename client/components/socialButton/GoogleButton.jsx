import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { postApi } from "../../api";
import { SOCIAL_JOIN, TOKEN_NAME, REMEMBER_NAME, PUBLIC_URL } from "../../common";
import Image from "next/image";
const GoogleButton = ({ callback, publicKey, isGoogle, type, loadingCallback, setLogin }) => {
  const [userData, setUserData] = useState(null);

  const [isRemeberOpen, setIsRemeberOpen] = useState(false);
  const loginCheckHandler = (e) => {
    setUserData({
      userId: e.googleId,
      joinType: type,
      type: "google",
      email: e.profileObj.email,
      nickName: e.profileObj.name,
      userImage: e.profileObj.imageUrl,
      socialData: e
    });
    setIsRemeberOpen(true);
  };
  const serverQueryHandler = (remember) => {
    postApi(
      loadingCallback,
      SOCIAL_JOIN,
      (req) => {
        console.log(req)
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
      {isGoogle ? (
        <GoogleLogin
          className="w-full "
          clientId={publicKey}
          onSuccess={loginCheckHandler}
          onFailure={(f) => {
            console.log(f.details);
          }}
          disabled={false}
          cookiePolicy={"single_host_origin"}
          render={({ onClick }) => {
            return (
              <Button className="bg-white p-p-0 w-full mb-1" onClick={(e)=>{
                  e.preventDefault()
                onClick()
              }}>
                <i className="p-px-2">
                  <Image src={`/social/google.png`} alt="google icon" width={25} height={25} />
                </i>

                <span className="p-px-3 text-dark text-center w-full  ">Sign in with Google</span>
              </Button>
            );
          }}
        />
      ) : null}
    </div>
  );
};

export default GoogleButton;
