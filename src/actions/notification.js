import actionTypes from "./actionTypes"
import {getNotificaions,} from '../requests'
export const markNotificationAsReadyById=(id)=>{
    return dispatch=>{
        dispatch(startMark())

        setTimeout(()=>{
            dispatch(
                {
                    type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                    payload:{
                        id
                    }
                }
            )
            dispatch(endMark())

        },2000)

    }
}

export const markAllAsRead=()=>{
    return dispatch=>{
        dispatch(startMark())
        setTimeout(()=>{
            dispatch(
                {
                    type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ
                }
            )
            dispatch(endMark())
        },2000)
   
    }
}

export const getNotification=()=>{
    return (dispatch=>{
        dispatch(startMark())
            getNotificaions().then(resp=>{
                dispatch(
                    {
                        type:actionTypes.RECEIVE_NOTIFICATION,
                        payload:{
                            list:resp
                        }
                    }
                )
                dispatch(endMark())
            })
           
        

   
    })
}






export const startMark=()=>{
    return       {
                    type:actionTypes.Begin_MARK
                }

}

export const endMark=()=>{
    return       {
                    type:actionTypes.END_MARK
                }

}

