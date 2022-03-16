import { useRef, useState } from "react";
import { connect } from "react-redux";
import { setLogin, setLogout } from "../../redux";

import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import GoogleButton from "../../components/socialButton/GoogleButton";
import KakaoButton from "../../components/socialButton/KakaoButton";
import NaverButton from "../../components/socialButton/NaverButton";
import Loading from "../../components/loading/Loading";
import { useRouter } from "next/router";
import { postApi } from "../../api";


import { LOGIN, TOKEN_NAME, REMEMBER_NAME, } from "../../common";
const LoginPage = ({ authData, setLogin, configData ,  socketData, }) => {
  const { isLogin } = authData;
  const router =useRouter()
  const toast = useRef(null);

  const loginInit = {
    email: "",
    password: "",
    remember: false,
  };

  const [formData, setFormData] = useState(loginInit);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    postApi(
      setIsLoading,
      LOGIN,
      (res) => {
        if (res.data.status) {
          setLogin(res.data.data)
          setFormData(loginInit);
          localStorage.setItem(TOKEN_NAME, res.data.token);
          localStorage.setItem(REMEMBER_NAME, res.data.data.remember);
          router.back()
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error!",
            detail: res.data.error,
          });
        }
      },
      formData
    );
  };

  const socialLoginHandler = (data) => {
    router.back()
    setFormData(loginInit);
  };

  const emailCheckHandler = (value) => {
    setFormData({
      ...formData,
      email: value,
    });
  };

  const passwordCheckHandler = (value) => {
    setFormData({
      ...formData,
      password: value,
    });
  };
  const rememberCheckHandler = (value) => {
    setFormData({
      ...formData,
      remember: value,
    });
  };

  return (
    <div className="auth-form">
  
      <Loading isLoading={isLoading} />
      <Toast ref={toast} />
      {isLogin ? (
        <div className="card">
         
        </div>
      ) : (
        <div className="login-form">
          <div className="card">
            <form onSubmit={onSubmitHandler}>
              <div className="flex align-items-center justify-content-center">
                <div className="p-2 pt-1 w-full">
                  <div className="text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">
                      로그인
                    </div>
                  </div>
                  <EmailFrom
                    emailCallback={emailCheckHandler}
                    email={formData.email}
                  />
                  <PasswordForm
                    passwordCallback={passwordCheckHandler}
                    password={formData.password}
                  />
                  <RememberForm
                    rememberCallback={rememberCheckHandler}
                    remember={formData.remember}
                  />
                  <Button
                    label="Local Login"
                    type="submit"
                    icon="pi pi-user"
                    className="w-full mb-1"
                  />
                  <hr />
                </div>
              </div>
            </form>
            <div>
              <GoogleButton
                publicKey={configData.dc_auth_google.publicKey}
                isGoogle={configData.dc_auth_google.isUse}
                callback={socialLoginHandler}
                type={"login"}
                loadingCallback={setIsLoading}
                setLogin={setLogin}
              />
              <KakaoButton
                publicKey={configData.dc_auth_kakao.publicKey}
                isKakao={configData.dc_auth_kakao.isUse}
                callback={socialLoginHandler}
                type={"login"}
                loadingCallback={setIsLoading}
                setLogin={setLogin}
              />
              <NaverButton
                publicKey={configData.dc_auth_naver.publicKey}
                isNaver={configData.dc_auth_naver.isUse}
                callback={socialLoginHandler}
                type={"login"}
                loadingCallback={setIsLoading}
                setLogin={setLogin}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    configData: state.configData,
    authData: state.authData,
    socketData:state.socketData,
    messageData:state.messageData
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (data) => dispatch(setLogin(data)),
    setLogout:(data)=>dispatch(setLogout(data))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);




const EmailFrom = ({ emailCallback, email }) => {
  return (
    <div>
      <label htmlFor="email-form" className="block text-900 font-medium mb-2">
        E-mail
      </label>
      <InputText
        type="email"
        value={email}
        id="email-form"
        className="w-full"
        onChange={(e) => {
          emailCallback(e.target.value);
        }}
      />
    </div>
  );
};

const PasswordForm = ({ passwordCallback, password }) => {
  return (
    <div>
      <label
        htmlFor="login-password-form"
        className="block text-900 font-medium mb-2"
      >
        Password
      </label>
      <InputText
        type="password"
        value={password}
        id="login-password-form"
        className="w-full mb-2"
        onChange={(e) => {
          passwordCallback(e.target.value);
        }}
      />
    </div>
  );
};

const RememberForm = ({ rememberCallback, remember }) => {
  return (
    <div className="flex align-items-center justify-content-between mb-2">
      <div className="flex align-items-center">
        <Checkbox
          className="mr-2"
          onChange={(e) => {
            rememberCallback(e.checked);
          }}
          id="rememberme"
          checked={remember}
        />
        <label htmlFor="rememberme">Remember me</label>
      </div>
    </div>
  );
};
