import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { setLogin, setLogout } from "../../redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { EMAIL_CHECK, REGISTER } from "../../common";

import { postApi } from "../../api";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

import { Divider } from "primereact/divider";
import Loading from "../../components/loading/Loading";
import GoogleButton from "../../components/socialButton/GoogleButton";
import KakaoButton from "../../components/socialButton/KakaoButton";
import NaverButton from "../../components/socialButton/NaverButton";
import { useRouter } from "next/router";
const RegisterPage = ({configData, authData , setLogin}) => {
    const { isLogin } = authData;
    const router =useRouter()

    const toast = useRef(null);

    const loginInit = {
        email: "",
        password: "",
        nickName: "",
        homepage:"",
        mobile:"",
        address:{
            zip:"",
            state:"",
            city:"",
            street:"",
        },
        about:"",
        telephone:"",
        type: "local",
    };

    const [formData, setFormData] = useState(loginInit);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (isEmail || isPassword) {
            if (formData.nickName.length >= 2) {
                postApi(
                    setIsLoading,
                    REGISTER,
                    (req) => {
                        if(req.data.status){
                            setFormData(loginInit);
                            setIsEmail(false);
                            setIsPassword(false);
                            router.back()
                        }
                    },
                    formData
                );
            } else {
                toast.current.show({ severity: "error", summary: "Error!", detail: "닉네임을 조금 더 길게해주세요." });
            }
        }
    };

    const socialLoginHandler = (data) => {
        setFormData(loginInit);
        router.back()
    };

    const emailCheckHandler = (value) => {
        setIsEmail(true);
        setFormData({ ...formData, email: value });
    };

    const passwordCheckHandler = (value) => {
        setIsPassword(value.isCheck);
        setFormData({
            ...formData,
            password: value.password,
        });
    };

    const changeHandler = (e) => {       
        e.preventDefault()
        const errText = configData.dc_textFilter.split(",")
        let value=e.target.value
        const key=e.target.name
        for (let i = 0; i < errText.length; i++) {
          const t = new RegExp(errText[i].replace(" ",""), "gi") 
          value=value.replace(t,"")
        }
        setFormData({
            ...formData,
            [key]: value,
        });
    };


    const addressChangeHandler = (e) => {       
        e.preventDefault()        
        const errText = configData.dc_textFilter.split(",")
        let value=e.target.value
        const key=e.target.name       
        for (let i = 0; i < errText.length; i++) {
          const t = new RegExp(errText[i].replace(" ",""), "gi") 
          value=value.replace(t,"")
        }
        setFormData({
            ...formData,
            address:{
                ...formData.address,
                [key]: value,
            }
        });
    };

    return (
        <div className="auth-form" >
              <Loading isLoading={isLoading} />
            <Toast ref={toast} />
            {isLogin?
            <div className="card">
            <div className="card-body">
              <p>이미 로그인이 되어있습니다.</p>
            </div>
            <div className="card-footer">
              <Button onClick={()=>{setLogout()}} label="로그아웃"/>
                <Button onClick={()=>{router.back()}} label="뒤로가기" />
            </div>
          </div>
          :
            <div className="card">               
            <form onSubmit={onSubmitHandler}>           
            <div className="flex align-items-center justify-content-center">
                <div className="p-2 pt-1 w-full">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">회원가입</div>
                    </div>
                    <div>
                        <EmailFrom emailCallback={emailCheckHandler} toast={toast} isMail={configData.dc_isMail} textFilter={configData.dc_textFilter} />
                        <PasswordForm passwordCallback={passwordCheckHandler} />
                        <TextForm value={formData.nickName} callback={changeHandler} label="Nick Name" name="nickName" type="text" />
                            {configData.dc_isHomepage?
                             <TextForm value={formData.homepage} callback={changeHandler} label="홈페이지" name="homepage" type="text" />:null}                         
                            {configData.dc_isAbout?
                            <TextForm value={formData.about} callback={changeHandler} label="자기소개" name="about" type="textarea" />:null}
                            {configData.dc_isMobile?
                            <TextForm value={formData.mobile} callback={changeHandler} label="모바일" name="mobile" type="text" />:null}
                            {configData.dc_isTelephone?
                            <TextForm value={formData.telephone} callback={changeHandler} label="전화번호" name="telephone" type="text" />:null}
                            {configData.dc_isAddress?
                                <div>
                                <TextForm value={formData.address.zip} callback={addressChangeHandler} label="우편번호" name="zip" type="text" />
                                <TextForm value={formData.address.state} callback={addressChangeHandler} label="도 또는 시" name="state" type="text" />
                                <TextForm value={formData.address.city} callback={addressChangeHandler} label="시 군 구" name="city" type="text" />
                                <TextForm value={formData.address.street} callback={addressChangeHandler} label="상세주소" name="street" type="text" />
                                </div>
                            :null}
                        <Button label="Local Login" type="submit" icon="pi pi-user" className="w-full mb-1" disabled={!isPassword || !isEmail} />
                    </div>
                    <hr />
                    <GoogleButton publicKey={configData.dc_auth_google.publicKey} isGoogle={configData.dc_auth_google.isUse} callback={socialLoginHandler} type={"register"} loadingCallback={setIsLoading} setLogin={setLogin} />
                    <KakaoButton publicKey={configData.dc_auth_kakao.publicKey} isKakao={configData.dc_auth_kakao.isUse} callback={socialLoginHandler} type={"register"} loadingCallback={setIsLoading} setLogin={setLogin}/>
                    <NaverButton publicKey={configData.dc_auth_naver.publicKey} isNaver={configData.dc_auth_naver.isUse} callback={socialLoginHandler} type={"register"} loadingCallback={setIsLoading} setLogin={setLogin}/>
                </div>
            </div>
        </form>
            </div>
            }
            
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        configData: state.configData,
        authData: state.authData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setConfig: (data) => dispatch(setConfig(data)),
        setLogin: (data) => dispatch(setLogin(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);


const EmailFrom = ({ emailCallback ,toast ,isMail, textFilter}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailCheckModal, setIsEmailCheckModal] = useState(false);
    const [isLock, setIsLock] = useState(false);
    const [eMail, setEMail] = useState('')
    const idType = isMail?'이메일':'아이디'
    const onEmailChangeHandler = (e) => {
        e.preventDefault();
            const errText = textFilter.split(",")
            let value=e.target.value
            for (let i = 0; i < errText.length; i++) {
              const t = new RegExp(errText[i].replace(" ",""), "gi") 
              value=value.replace(t,"")
            }
            setEMail(value)
    };
    const onEmailCheckHandler = (e) => {
        e.preventDefault();
        if (eMail.length === 0) {
            toast.current.show({ severity: "error", summary: "Error!", detail: `${idType}를 입력해주세요.` });
        } else if (eMail.length <= 4) {
            toast.current.show({ severity: "error", summary: "Error!", detail: `입력한 ${idType}는(은) 너무 짧습니다.` });
        } else {
           
            postApi(
                setIsLoading,
                EMAIL_CHECK,
                (req) => {
                    if (req.data.status) {
                        setIsEmailCheckModal(true);
                    } else {
                        toast.current.show({ severity: "error", summary: "Error!", detail: `사용불가능한 ${idType} 입니다.` });
                    }
                },
                { email: eMail }
            );
        }
    };

    const accept = () => {
        //승인
        setIsLock(true);
        emailCallback(eMail);
        toast.current.show({ severity: "info", summary: `${idType} Save`, detail: "남은 절차를 진행하세요", life: 3000 });
    };

    const reject = () => {
        //취소
        setIsLock(false);
    };

   

    return (
        <div>
            <ConfirmDialog visible={isEmailCheckModal} onHide={() => setIsEmailCheckModal(false)} message={`사용가능한 ${idType}입니다. 이대로 사용하시겠습니까?`} header={`${idType} 중복검사 완료`} icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <div className="input-group">
                <InputText autoComplete="off" className="form-control form-control-sm" type={isMail?'emial':'text'} placeholder={`${idType}을 입력하세요`} onChange={onEmailChangeHandler} disabled={isLock} />
                <Button className="btn btn-primary" label="중복체크" onClick={onEmailCheckHandler} disabled={isLock}></Button>
            </div>
        </div>
    );
};

const PasswordForm = ({ passwordCallback }) => {
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [confilmPassword, setConfilmPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState({ isOpen: true, color: "info", message: "비밀번호를 입력하세요. 영문,특수문자,숫자포함 7글자이상" });
    const [passwordConfileMessage, setPasswordConfileMessage] = useState({ isOpen: false, color: "danger", message: "비밀번호를 한번더 입력하세요." });
    const header = <h6>비밀번호 설정 안내</h6>;
    const footer = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">이렇게 만들어주세요.</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
                <li>하나 이상의 소문자</li>
                <li>하나 이상의 대문자</li>
                <li>하나 이상의 숫자</li>
                <li>최소 8글자</li>
            </ul>
        </React.Fragment>
    );

    const passwordCheckHandler = (pw, pwch) => {
        if (pw === pwch) {
            passwordCallback({ isCheck: true, password: pw });
            setPasswordConfileMessage({ isOpen: true, color: "primari", message: "비밀번호가 일치합니다." });
        } else {
            passwordCallback({ isCheck: false, password: pw });
            if (confilmPassword.length !== 0) {
                setPasswordConfileMessage({ isOpen: true, color: "danger", message: "비밀번호가 일치하지 않습니다." });
            } else {
                setPasswordConfileMessage({ isOpen: true, color: "warning", message: "비밀번호를 한번더 입력하세요." });
            }
        }
    };

    return (
        <div>
            <label htmlFor="password" className="block text-900 font-medium mb-2">
                Password
            </label>
            <Password
                id="password"
                className="w-full p-inputtext-sm"
                inputClassName="w-full"
                header={header}
                footer={footer}
                value={password}
                onChange={(e) => {
                    passwordCheckHandler(e.target.value, confilmPassword);
                    const reg = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})./;
                    if (reg.test(e.target.value)) {
                        setPasswordCheck(true);
                        setPasswordMessage({ isOpen: false, color: "warning", message: "" });
                    } else {
                        setPasswordCheck(false);
                        setPasswordMessage({ isOpen: true, color: "danger", message: "비밀번호의 강도가 너무약합니다." });
                    }

                    setPassword(e.target.value);
                }}
                toggleMask
                promptLabel="비밀번호를 입력하세요"
                weakLabel="쉬움"
                mediumLabel="중간"
                strongLabel="어려움"
            />
            {/* <InputText type="password" value={password} id="password" className="w-full" onChange={(e)=>{setPassword(e.target.value)}} /> */}
            {passwordMessage.isOpen ? <small className={`mb-3 text-${passwordMessage.color}`}>{passwordMessage.message}</small> : null}

            <label htmlFor="passwordCheck" className="block text-900 font-medium mb-2">
                Password Check
            </label>
            <InputText
                type="password"
                value={confilmPassword}
                id="passwordCheck"
                className="w-full  p-inputtext-sm"
                onChange={(e) => {
                    passwordCheckHandler(e.target.value, password);
                    setConfilmPassword(e.target.value);
                }}
                disabled={!passwordCheck}
            />
            {passwordConfileMessage.isOpen ? <small className={`mb-3 text-${passwordConfileMessage.color}`}>{passwordConfileMessage.message}</small> : null}
        </div>
    );
};

const TextForm = ({ value, callback ,label ,name,type }) => {
    return (
        <div>
            <label htmlFor={`${name}-form`} className="block text-900 font-medium mb-2">
                {label}
            </label>
            {type==="textarea"?
            <textarea 
            name={name}
            value={value}
            id={`${name}-form`}
            className="form-control form-control-sm"
            onChange={callback}/>:
            <input
                type={type}
                name={name}
                value={value}
                id={`${name}-form`}
                className="form-control form-control-sm mb-2"
                onChange={callback}
            />}
        </div>
    );
};