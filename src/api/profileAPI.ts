import axios from 'axios';


const instance = axios.create({
    withCredentials: true,
    //baseURL: `http://localhost:7542/2.0/`,
    baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const profileAPI = {
    updateNameData(name: string) {
        return instance.put('auth/me', {name})
    },
    updateAvatarData(avatar: string) {
        return instance.put('auth/me', {avatar})
    },
};

// types
export type UpdateUserParamsType = {
    name?: string
    avatar?: string
}