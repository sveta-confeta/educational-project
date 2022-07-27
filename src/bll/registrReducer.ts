import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {errorUtils} from "../common/utils/error-util";
import {setStatusAC} from "./appReducer";
import {RegDataType, registerAPI} from "../api/registerAPI";


const initialState = {
    isRegistered: false,
}


type InitialStateType = typeof initialState

export const registrReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTATION':
            return {...state, isRegistered: action.value}


        default:
            return state
    }
}

export const registrationAC = (value: boolean) => ({type: 'REGISTATION', value} as const);


// thunks
export const setRegistrTC = (data: RegDataType) => (dispatch:Dispatch) => {
    dispatch(setStatusAC(true))
    registerAPI.register({email: data.email, password: data.password})
        .then((res) => {
            dispatch(registrationAC(true))
        })
        .catch((error: AxiosError<{error: string }>) => {
           errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setStatusAC(false))
        })
}




export type ActionsType = ReturnType<typeof registrationAC>

