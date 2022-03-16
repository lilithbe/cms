import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Script from 'next/script'
import GoogleAd from 'react-google-ad'
const Ga = ({configData}) => {
    const isDev =  process.env.NEXT_PUBLIC_TYPE==='development'?true:false
    return (
       !isDev && configData.dc_isGoogle_ad && configData.dc_google_ad_client!=='' ?
        <div>
          <Script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"/>
           <div>google Ad<br/>
            {isDev?'dev mode':'product mode'}<br/>
            {!configData.dc_isGoogle_ad?'구글애드 비활성화':'true'}<br/>
            {configData.dc_google_ad_client===''?'클라이언트키 입력':configData.dc_google_ad_client}
        </div>

          <GoogleAd client={configData.dc_google_ad_client}  />
        </div>:
        <div>google Ad<br/>
            {isDev?'개발자모드':''}<br/>
            {!configData.dc_isGoogle_ad?'구글애드 비활성화':''}<br/>
            {configData.dc_google_ad_client===''?'클라이언트키 입력':''}
        </div>
    )
}

Ga.propTypes = {

}
const mapStateToProps = (state) => {
    return {
      configData: state.configData,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
    };
  };
  export default  connect(mapStateToProps, mapDispatchToProps)(Ga)
