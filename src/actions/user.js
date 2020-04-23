import actionTypes from "./actionTypes"
import {loginRequest} from '../requests'

export const Login=(info)=>{
return (dispatch=>{
    dispatch(startLogin())
    loginRequest(info).then(resp=>{
        const {authToken,...Info}=resp.data.data
        if(resp.data.code===200){
            if(info.remember===true){
                window.localStorage.setItem("authToken",JSON.stringify(authToken))
                window.localStorage.setItem("info",JSON.stringify(Info))
                // console.log(JSON.stringify(resp.data.data))
                
            }else{
                window.sessionStorage.setItem("authToken",JSON.stringify(authToken))
                window.sessionStorage.setItem("info",JSON.stringify(Info))
            }
            dispatch(logSuccess(resp.data.data))
        }else{
            dispatch(logFailed())
        }
        
    })
})
}
export const logFailed=()=>{
    window.localStorage.removeItem("authToken")
    window.localStorage.removeItem("info")
    window.sessionStorage.removeItem("authToken")
    window.sessionStorage.removeItem("info")
    return {
        type:actionTypes.LOG_FAIL
    }
}

export const logSuccess=(data)=>{
    console.log('success',data)
    return{
        type:actionTypes.LOG_SUCCESS,
        payload:{
            info:data
        }
    }

}

export const startLogin=()=>{
    return{
        type:actionTypes.START_lOG
    }

}


export const avatarUpdate=(path)=>{
    return dispatch=>{
        dispatch({
            type:actionTypes.AVATAR_UPLOAD,
            payload:{
                avatar:path
            }
        })
    }
}

