import {Dispatch} from "redux";
import {profileAPI, UpdateUserParamsType} from "../api/profileAPI";
import {setStatusAC} from "./appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../common/utils/error-util";

const initialState = {
    _id: '',
    email: '',
    name: 'Enter your name',
    avatar: '',
    publicCardPacksCount: 0,

}

export type infoProfileType = {
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number,
}


type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-PROFILE': {
            return {...state, ...action.profile}

        }
        default:
            return state
    }
}

export const setProfileAC = (profile: infoProfileType) =>
    ({type: 'SET-PROFILE', profile,} as const);


// thunks
export const updateNameDataTC = (name:string)=>(dispatch:Dispatch) => {
    dispatch(setStatusAC(true))
    profileAPI.updateNameData(name)
        .then((res) => {
            dispatch(setProfileAC(res.data.updatedUser))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setStatusAC(false))
        })
}

export type UpdateResponseType = { //то что нам приходит в ответ с сервера на запрос
    updatedUser: infoProfileType
    token: string
    tokenDeathTime: string
}

// export type UserDataType = {
//     _id: string
//     email: string
//     rememberMe?: boolean
//     isAdmin?: boolean
//     name: string
//     verified?: boolean
//     publicCardPacksCount: number
//     created?: Date
//     updated?: Date
//     __v?: number
//     token?: string
//     tokenDeathTime?: number
//     avatar: string
// }



export type ActionsType = ReturnType<typeof setProfileAC>


