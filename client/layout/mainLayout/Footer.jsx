import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { socialArray } from '../../common/initList'
const Footer = ({configData}) => {
    const cd={
        addr : configData.sc_company_addr,
fax : configData.sc_company_fax,
name : configData.sc_company_name,
owner : configData.sc_company_owner,
privacy_admin_email : configData.sc_company_privacy_admin_email,
privacy_admin_name : configData.sc_company_privacy_admin_name,
saupja_no : configData.sc_company_saupja_no,
tel : configData.sc_company_tel,
zip : configData.sc_company_zip,
tongsin_no : configData.sc_tongsin_no,
    }
    const nullFunction=(str,label)=>{
        if(str!=='') return `${label} ${label===''?'':':'}  ${str}`
        else return null
    }
    return (
      <section className="footer-section text-light">
        <div className="container">
          <div className="footer-logo text-center">
            <Link href="/">
              <a><Image src={configData.dc_footerConfig.footerLogo} alt={"logo-dark"} width={171} height={30} /></a>
            </Link>
          </div>
        
        </div>
        <div className="social-links-warp">
          <div className="container">
            <div className="social-links text-center">
              {socialArray.map((item,i)=>{
                if(configData.dc_social[item.key]!==''){
                  return(
                    <Link href={configData.dc_social[item.key]} key={i}>
                    <a className={item.label} target="_blank">
                      {item.label==='naver'?<i style={{fontSize:'32px',fontStyle:'normal',fontWeight:'bolder'}} >N</i>:
                      item.label==='kakao'? <i className={`bi bi-chat`} />:
                      <i className={`bi bi-${item.label}`} />}
                      
                      <span>{item.label}</span>
                    </a>
                    </Link>
                  )
                }else{
                  return null
                }
              })}
            </div>
          </div>
        </div>
        <div className="social-links-warp">
          <div className="container">
            {configData.dc_footerConfig.isCompanyData?
             <div style={{fontSize:"10px"}}>
             <span className="me-3 fs-3">{nullFunction(cd.name, "")}</span>
               <span className="me-3">{nullFunction(cd.owner, "대표")}</span>
               <span className="me-3">{nullFunction(cd.saupja_no, "사업자번호")}</span>
               <span className="me-3">{nullFunction(cd.tongsin_no, "통신판매등록번호")}</span>
               <span className="me-3">{nullFunction(cd.tel, "대표번호")}</span>
               <span className="me-3">{nullFunction(cd.fax, "펙스")}</span>
               <span className="me-3">{nullFunction(cd.zip, "우편번호")}</span>
               <span className="me-3">{nullFunction(cd.addr, "주소")}</span>
          </div>:null}
          
            <div style={{ fontSize: "10px" }}>
              {configData.dc_footerConfig.isTerms ? <span className="me-3">{nullFunction(cd.privacy_admin_name, "개인정보 취급관리자")}</span> : null}
              {configData.dc_footerConfig.isPrivacy ? <span className="me-3">{nullFunction(cd.privacy_admin_email, "이메일")}</span> : null}

            </div>
            <p className="text-white text-center mt-5">
              Copyright © All rights reserved | This template is made with <i className="bi bi-heart-o" aria-hidden="true" /> by{" "}
              <Link href="http://lilith.co.kr" target="_blank">
                Lilith
              </Link>
            </p>
          </div>
        </div>
      </section>
    );
}

export default Footer
