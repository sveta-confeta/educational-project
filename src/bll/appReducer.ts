const initialState = {
    status: false, //крутилка
    error: null as null | string,
    disabledStatus: false,
}


type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP-STATUS':
            return {...state, status: action.value}
        case 'APP-ERROR':
            return {...state, error: action.value}
        case 'APP-DISABLED':
            return {...state, disabledStatus: action.value}


        default:
            return state
    }
}

export const setStatusAC = (value: boolean) => ({type: 'APP-STATUS', value} as const);
export const setErrorAC = (value: string | null) => ({type: 'APP-ERROR', value} as const);
export const setDisabledAC = (value: boolean) => ({type: 'APP-DISABLED', value} as const);




export type ActionsType = ReturnType<typeof setStatusAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setDisabledAC>

