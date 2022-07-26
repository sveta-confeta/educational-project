import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
     baseURL: 'http://localhost:7542/2.0',
   // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const registerAPI = {
    register: (regData: RegDataType) => {
        return instance.post<RegDataType, AxiosResponse<AddedUserType>>('/auth/register', regData)
    }
}

// types
export type RegDataType = {
    email: string
    password: string
}

type AddedUserType = {
    id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    error?: string
}