import jwt from "jsonwebtoken";

const tokenVerify=(token)=>{
    return jwt.verify(token, process.env.SECRET_KEY)
}
export const adminCheck=(token)=>{
    if(tokenVerify(token).grade>1000){
        return true
    }else{
        return false
    }
}

export const tokenCheck = (token)=>{
    try {
        return tokenVerify(token)
    } catch (error) {
        return error
    }
}