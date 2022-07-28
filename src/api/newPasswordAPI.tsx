import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})

export const newPasswordAPI = {
    sendEmail: (email: string, message: string) => {
        return instance.post<{email: string,message: string}, AxiosResponse<ResponseType>>('/auth/forgot', {email, message})
    },
    sendNewPassword: (newPasswordData: newPasswordType) => {
        return instance.post<newPasswordType, AxiosResponse<ResponseType>>('/auth/set-new-password', newPasswordData)
    }
}

// types
type ResponseType = {
    info: string
    error: string;
}
export type newPasswordType = {
    password: string
    resetPasswordToken: string
}

