import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
     baseURL: 'http://localhost:7542/2.0',
   // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const authAPI = {
    authMe() {
        return instance.post<{}, AxiosResponse<UserResponseType>>('/auth/me')
    },
    login(data: DataLoginType) {
        return instance.post<DataLoginType, AxiosResponse<UserResponseType>>(`/auth/login`, data)
    },
    logout() {
        return instance.delete('/auth/me')
    }
}

// types
export type DataLoginType = {
    email: string
    password: string
    rememberMe: boolean
};

export type UserResponseType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: boolean,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    __v: any,
    token: string,
    tokenDeathTime: number,
    avatar: string,
};
