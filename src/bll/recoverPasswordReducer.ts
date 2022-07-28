import {Dispatch} from "redux";
import {setStatusAC} from "./appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../common/utils/error-util";
import {newPasswordAPI} from "../api/newPasswordAPI";


const initialState: InitialStateType = {
    info: '',
}

export const recoverPasswordReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'recover/CONFIRM-STATUS':
            return {...state, info: action.info}
        default:
            return state
    }
}

// thunks
export const recoverTC = (email: string, message: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC(true))
    newPasswordAPI.sendEmail(email, message)
        .then((res) => {
            dispatch(recoverAC(res.data.info))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setStatusAC(false))
        })
}


// actions
export const recoverAC = (info: string) => ({type: 'recover/CONFIRM-STATUS', info} as const)

// types
type ActionsType = ReturnType<typeof recoverAC>

type InitialStateType = {
    info: string
}