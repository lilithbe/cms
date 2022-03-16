import env from "dotenv";

env.config();
const sT = process.env.VER
const devUrl=process.env.DEV_PROTOCOL+'://'+process.env.DEV_DOMEIN+':'+process.env.DEV_PORT
const serviceUrl=process.env.PROTOCOL+'://'+process.env.DOMEIN+':'+process.env.PORT
const url=sT==='dev'?devUrl:serviceUrl

export const config = {
    apiUrl:url,
    imgUpload:url+'/upload/'
}
