


const initialState = {
    status: false, //крутилка
}


type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP-STATUS':
            return {...state, status: action.value}


        default:
            return state
    }
}

export const setStatusAC = (value: boolean) => ({type: 'APP-STATUS', value} as const);


// // thunks
// export const loginTC = (data: DataLoginType) => (dispatch:Dispatch) => {
//     //dispatch(setAppStatusAC('loading'))
//     authAPI.login(data)
//         .then((res) => {
//             dispatch(loginAC(true))
//            // dispatch(setUserDataAC(res.data))
//         })
//         .catch((error: AxiosError<{error: string }>) => {
//            errorUtils(error, dispatch)
//         })
//         .finally(() => {
//            // dispatch(setAppStatusAC(false))
//         })
// }




export type ActionsType = ReturnType<typeof setStatusAC>

