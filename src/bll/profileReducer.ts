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






export type ActionsType = ReturnType<typeof setProfileAC>


