import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
              <a><Image src="/logo-dark.png" alt={"logo-dark"} width={171} height={30} /></a>
            </Link>
          </div>
        
        </div>
        <div className="social-links-warp">
          <div className="container">
            <div className="social-links text-center">
              <Link href="/">
              <a className="instagram">
                <i className="bi bi-instagram" />
                <span>instagram</span>
              </a>
              </Link>
              <Link href="/">
              <a className="google">
                <i className="bi bi-google" />
                <span>google</span>
              </a>
              </Link>
              <Link href="/">
              <a  className="pinterest">
                <i className="bi bi-pinterest" />
                <span>pinterest</span>
              </a>
              </Link>
              <Link href="/">
              <a  className="facebook">
                <i className="bi bi-facebook" />
                <span>facebook</span>
              </a>
              </Link>
              <Link href="/">
              <a  className="twitter">
                <i className="bi bi-twitter" />
                <span>twitter</span>
              </a>
              </Link>
              <Link href="/">
              <a  className="youtube">
                <i className="bi bi-youtube" />
                <span>youtube</span>
              </a>
              </Link>
             
            </div>
          </div>
        </div>
        <div className="social-links-warp">
          <div className="container">
           <div style={{fontSize:"10px"}}>
            <span className="me-3 fs-3">{nullFunction(cd.name, "")}</span>
                <span className="me-3">{nullFunction(cd.owner, "대표")}</span>
                <span className="me-3">{nullFunction(cd.saupja_no, "사업자번호")}</span>
                <span className="me-3">{nullFunction(cd.tongsin_no, "통신판매등록번호")}</span>
                <span className="me-3">{nullFunction(cd.tel, "대표번호")}</span>
                <span className="me-3">{nullFunction(cd.fax, "펙스")}</span>
                <span className="me-3">{nullFunction(cd.zip, "우편번호")}</span>
                <span className="me-3">{nullFunction(cd.addr, "주소")}</span>
           </div>
           <div style={{fontSize:"10px"}}>  
                <span className="me-3">{nullFunction(cd.privacy_admin_name, "개인정보 취급관리자")}</span>           
                <span className="me-3">{nullFunction(cd.privacy_admin_email, "이메일")}</span>
               
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
