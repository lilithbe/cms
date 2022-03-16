import { TOKEN_NAME, REMEMBER_NAME, SESSION_CHECK } from "../common";
import { useEffect } from "react";
import decode from "jwt-decode";
import moment from "moment";
import { postApi } from "../api";

export const useSession = (setLogin, setIsLoading ) => {

  useEffect(() => {
    const userToken = localStorage.getItem(TOKEN_NAME);
    const remember = localStorage.getItem(REMEMBER_NAME);
   
      if (userToken !== null) {
        postApi(setIsLoading,SESSION_CHECK,(res)=>{
          if(res.data.status){
            if (remember !== null) {
              const dt = decode(userToken);
              dt.userToken = userToken;
              const t2 = moment(); 
              const t1 = moment(dt.exp * 1000).format("YYYY-MM-DD HH:mm:ss"); 
              const resultTime = moment.duration(t2.diff(t1)).asDays();               
              if (resultTime < 0) {
                setLogin(dt);  
              } else {
                deleteStorage()
              }
            }
          }else{
            deleteStorage()
          }
        },{},userToken)

        
      }else{
        
      }
    

    
   
  }, [setIsLoading, setLogin]);


};

export const logout = (reduxLogout) => {
  deleteStorage()
  reduxLogout();
};
const deleteStorage = ()=>{
  localStorage.removeItem(TOKEN_NAME);
  localStorage.removeItem(REMEMBER_NAME);
}

