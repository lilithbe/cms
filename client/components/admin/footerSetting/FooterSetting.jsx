import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { boolOptions, companyArray, footerArray, socialArray } from '../../../common/initList';
import { setConfig } from '../../../redux';
import SingleFileUpload from '../../file/SingleFileUpload';
import { ADMIN_CONFIG_UPDATE } from '../../../common';
import { Button } from 'primereact/button';
import { postApi } from '../../../api';
const FooterSetting = ({authData, setConfig, configData, onHide,toast }) => {
  const [isLoading, setIsLoading] = useState(false)
  const saveHandler = () => {
    postApi(setIsLoading, ADMIN_CONFIG_UPDATE, (res) => {
        if(res.data.status){
            onHide()
            toast.current.show({ severity: 'success', summary: 'Save Success', detail: 'Footer data save Success' });
        }
    }, configData, authData.userToken)
}
  return (
    <div style={{ minWidth: "1200px" }}>
      <div className='row'>
        <div className='col-3'>
          <div className='card'>
            <div className='card-header'>Default Setting</div>
            <div className='card-body'>
              {footerArray.map((item, i) => {
                return (
                  <div key={i}>
                    <label htmlFor={item.key}>{item.label}</label>
                    {item.inputType === 'image' ?
                      <SingleFileUpload id={item.key} fileType="image" callback={(res) => {
                        setConfig({
                          dc_footerConfig: {
                            ...configData.dc_footerConfig,
                            [item.key]: res.data.result[0].src
                          }
                        })
                      }} /> :
                      item.inputType === 'bool' ?
                        <SelectButton id={item.key} className="p-buttonset-sm" options={boolOptions} value={configData.dc_footerConfig[item.key]}
                          onChange={(e) => {
                            if (e.value !== null) {
                              setConfig({
                                dc_footerConfig: {
                                  ...configData.dc_footerConfig,
                                  [item.key]: e.value
                                }
                              })
                            }
                          }} /> : ''}
                  </div>
                )
              })}
            </div>
            <div className='card-footer'><Button label="Save" icon="pi pi-save" className='py-1 w-100' onClick={saveHandler} /></div>
          </div>
        </div>
        <div className='col-4'>
          <div className='card' >
            <div className='card-header'>Social Setting</div>
            <div className='card-body'>
              {socialArray.map((item, i) => {
                return (
                  <div key={i}>
                    <label htmlFor={item.key}>{item.label}</label>
                    <div>
                      <InputText className="p-inputtext-sm w-100" value={configData.dc_social[item.key]} onChange={(e) => {
                        setConfig({
                          dc_social: {
                            ...configData.dc_social,
                            [item.key]: e.target.value
                          }
                        })
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='col-5'>
          <div className='card' >
            <div className='card-header'>Company Data Setting</div>
            <div className='card-body'>
              {configData.dc_footerConfig.isCompanyData ?
                <div >
                  {companyArray.map((item, i) => {
                    return (
                      <div key={i}>
                        <label htmlFor={item.key}>{item.label}</label>
                        <div>
                          <InputText className="p-inputtext-sm w-100" value={configData[item.key]} onChange={(e) => {
                            setConfig({ [item.key]: e.target.value })
                          }} />
                        </div>
                      </div>
                    )
                  })}

                </div> : '사용안함'}
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    configData: state.configData,
    authData: state.authData,
    boardData: state.boardData,
    groupData: state.groupData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setConfig: (data) => dispatch(setConfig(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FooterSetting);
