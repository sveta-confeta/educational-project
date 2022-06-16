


const initialState = {

}


type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}


        default:
            return state
    }
}

export const setAppStatusAC = (status: any) => ({type: 'APP/SET-STATUS', status,} as const);



// export const initializeAppTC = () => (dispatch: Dispatch) => {
//     dispatch(setAppStatusAC('loading')) //крутилка вкл
//     authAPI.me()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setAppStatusAC('failed')) //крутилка выкл
//                 dispatch(setIsLoggedInAC(true));
//             } else {
//                 dispatch(setAppStatusAC('failed'))
//                 dispatch(errorAppMessageAC(res.data.messages[0])); //достаем из массива сообщение об ошибке
//             }
//         })
//         .catch((err: AxiosError) => {
//             handleServerNetworkError(err,dispatch)
//         })
//         .finally(()=>{
//             dispatch(initializedAC(true));
//         })
// }


export type AppActionsType = ReturnType<typeof setAppStatusAC>

