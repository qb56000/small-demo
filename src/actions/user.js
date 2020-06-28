import actionTypes from "./actionTypes";
import { loginRequest, loginCheck } from "../requests";

export const Login = (info) => {
  return (dispatch) => {
    dispatch(startLogin());
    loginRequest(info).then((resp) => {
      const { authToken, ...Info } = resp.data.data;
      console.log(resp.data.data);
      if (resp.data.code === 200) {
        if (info.remember === true) {
          window.localStorage.setItem("authToken", JSON.stringify(authToken));
          window.localStorage.setItem("info", JSON.stringify(Info));
        } else {
          window.sessionStorage.setItem("authToken", JSON.stringify(authToken));
          window.sessionStorage.setItem("info", JSON.stringify(Info));
        }
        dispatch(logSuccess(resp.data.data));
      } else {
        dispatch(logFailed());
      }
    });

    // dispatch(startLogin())
    // loginCheck(info.username).then(resp=>{
    //     if(resp.status===200){

    //         console.log("info",resp.data)
    //         if(resp.data.length!==0){
    //             if (resp.data[0].password===info.password){
    //                 if(info.remember===true){
    //                 window.localStorage.setItem("info",JSON.stringify(resp.data[0]))
    //                 }else{
    //                     window.sessionStorage.setItem("info",JSON.stringify(resp.data[0]))

    //                 }
    //                 dispatch(logSuccess(resp))

    //                 }else{
    //                     dispatch(logFailed())
    //                     window.alert("failed2")

    //                 }

    //         }else{
    //             dispatch(logFailed())
    //             window.alert("failed")
    //         }

    //     }else{
    //         dispatch(logFailed())
    //         window.alert("log failed")

    //     }

    //     console.log(resp)
    // }).catch(reason=>{
    //     console.log(reason)
    // })
  };
};
export const logFailed = () => {
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("info");
  window.sessionStorage.removeItem("authToken");
  window.sessionStorage.removeItem("info");
  return {
    type: actionTypes.LOG_FAIL,
  };
};

export const logSuccess = (data) => {
  console.log("success", data);
  return {
    type: actionTypes.LOG_SUCCESS,
    payload: {
      info: data,
    },
  };
};

export const startLogin = () => {
  return {
    type: actionTypes.START_lOG,
  };
};

export const avatarUpdate = (path) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.AVATAR_UPLOAD,
      payload: {
        avatar: path,
      },
    });
  };
};
