import actionTypes from "../actions/actionTypes";

const isLogin=window.localStorage.getItem("authToken") || window.sessionStorage.getItem("authToken")

const info=JSON.parse(window.localStorage.getItem("info") )|| JSON.parse(window.sessionStorage.getItem("info"))

const initState={
    ...info,
    isLogin:true,
    isLoading:false
}


export default(state=initState,action)=>{
     console.log("state",state)
    switch(action.type){
        case actionTypes.START_lOG:
                return {
                ...state,
                isLoading:true
            }
        case actionTypes.LOG_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isLogin:true
            }
        case actionTypes.LOG_FAIL:
            return{
                id: "",
                avatar: "",
                role: "",
                displayName: "",
                authToken:'',
                isloading:false,
                isLogin:false
            }
            case actionTypes.AVATAR_UPLOAD:
                return{
                    ...state,
                    avatar:action.payload.avatar
                }
        default:
            return initState
    }
}