import axios from 'axios'

const aixosFetch= async(req, loadingFuncion,callback) => {  
    let requestData = {
      ...req.request,
        headers: {
            requestType:req.requestType,
          "X-CSRF-TOKEN": "CSFR-Token",
          Authorization: req.token,
        },
        method: "post",
        url: req.url|| "",
        data: req.data|| "",
      }
  return await axios(requestData)
    .then((response) => {
      if (response.data.status === true) {
        loadingFuncion(false);
      }
      callback(response)
      return response;
    })
    .catch((error) => {
    callback(error)
      return error;
    });
};




export const postApi = (loadingFunction,api_address,callback,data,token,request)=>{
    const requestData = {    
      token:token,  
      url:api_address,
        data:data,
        request:request||null
    }
    aixosFetch(requestData, loadingFunction, (res) => {
      loadingFunction(true)
    if(res.status===200){
      loadingFunction(false)
      callback({
        data:res.data,
      })
    }else{
      loadingFunction(false)
      callback({
        error:true,
      })
    }
    })
}

export const  asyncPostApi =async (loadingFunction,api_address,callback,data,token)=>{
  const requestData = {    
    token:token,  
    url:api_address,
      data:data
  }
 await aixosFetch(requestData, loadingFunction, (res) => {
  if(res.status===200){
    callback({
      data:res.data,
    })
  }else{
    callback({
      error:true,
    })
  }
  })
}
