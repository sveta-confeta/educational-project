import {AxiosError} from 'axios';
import {packsAPI, PackType} from "../api/packsAPI";
import {setStatusAC} from "./appReducer";
import {errorUtils} from "../common/utils/error-util";
import {AppThunk} from "./state";


const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 110,
    params: {
        page: 1,
        pageCount: 5,
        min: 0,
        max: 110,
        packName: '',
        sortPacks: '',
    },
    isMyPack: false,

}

export const packsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS':
            return {...state, cardPacks: action.packs}
        case 'packs/PAGE':
            return {...state, params: {...state.params, page: action.page}}
        case 'packs/PAGE-COUNT':
            return {...state, params: {...state.params, pageCount: action.pageCount}}
        case 'packs/TOTAL-COUNT':
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case 'packs/MIN-MAX-COUNT':
            return {...state, minCardsCount: action.minCardsCount, maxCardsCount: action.maxCardsCount}
        case 'packs/MIN-MAX':
            return {...state, params: {...state.params, min: action.min, max: action.max}}
        case 'packs/IS-MY-PACK':
            return {...state, isMyPack: action.isMyPack}
        case 'packs/SEARCH-VALUE':
            return {...state, params: {...state.params, packName: action.packName}}
        case 'packs/SORT-PACKS':
            return {...state, params: {...state.params, sortPacks: action.sortPacks}}
        default:
            return state
    }
}

// thunks
export const getPacksTC = (): AppThunk => (dispatch, getState) => {
    const params = getState().packs.params;
    const isMyPack=getState().packs.isMyPack;
    const userId = getState().profile._id //достаем свою сохраненную в профайле id. именно туда она идет при сохранении моих данных
    dispatch(setStatusAC(true))
    packsAPI.getPacks({user_id: isMyPack ? userId : '', ...params})
        .then((res) => {
            dispatch(getPacksAC(res.data.cardPacks)) //получение всех паксов
            dispatch(pageAC(res.data.page))
            dispatch(pageCountAC(res.data.pageCount))
            dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
            dispatch(setMinMaxCountAC(res.data.minCardsCount, res.data.maxCardsCount))
        })
        .catch((error: AxiosError<{ error: string }>) => {
            errorUtils(error, dispatch)
        })
        .finally(() => {
            dispatch(setStatusAC(false))
        })
}

export const setParamsSortPack = (sortParams: string): AppThunk => dispatch => {
    dispatch(sortPackAC(sortParams));
    dispatch(getPacksTC());
}


export const addPackTC = (name: string, deckCover?: string, isPrivate?: boolean): AppThunk => {
    return (dispatch) => {
       // let name=getState().packs.name;// delete
        dispatch(setStatusAC(true))
        packsAPI.addPack(name, deckCover, isPrivate)
            .then(() => {
                dispatch(getPacksTC())
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setStatusAC(false))
            })
    }
}

export const deletePackTC = (id?: string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC(true))
        packsAPI.deletePack(id)
            .then(() => {
                dispatch(getPacksTC())
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setStatusAC(false))
            })
    }
}

export const updatePackTC = (id: string, name: string,deckCover:string): AppThunk => {
    return (dispatch) => {
        dispatch(setStatusAC(true))
        packsAPI.updatePack(id, name,deckCover)
            .then(() => {
                dispatch(getPacksTC())
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setStatusAC(false))
            })
    }
}

// actions
export const getPacksAC = (packs: PackType[]) => ({type: 'packs/SET-PACKS', packs} as const)
export const pageAC = (page: number) => ({type: 'packs/PAGE', page} as const)
export const pageCountAC = (pageCount: number) => ({type: 'packs/PAGE-COUNT', pageCount} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) => ({
    type: 'packs/TOTAL-COUNT',
    cardPacksTotalCount
} as const)
export const setMinMaxCountAC = (minCardsCount: number, maxCardsCount: number) => ({
    type: 'packs/MIN-MAX-COUNT',
    minCardsCount,
    maxCardsCount
} as const)
export const setMinMaxAC = (min: number, max: number) => ({
    type: 'packs/MIN-MAX',
    min,
    max
} as const)
export const searchAC = (packName: string) => ({
    type: 'packs/SEARCH-VALUE',
    packName
} as const)
export const isMyPackAC = (isMyPack: boolean) => ({
    type: 'packs/IS-MY-PACK',
    isMyPack
} as const)

export const sortPackAC = (sortPacks: string) => ({
    type: 'packs/SORT-PACKS',
    sortPacks,
} as const)

// types
export type InitialStateType = typeof initialState
type ActionType =
    ReturnType<typeof getPacksAC>
    | ReturnType<typeof pageAC>
    | ReturnType<typeof pageCountAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof setMinMaxCountAC>
    | ReturnType<typeof setMinMaxAC>
    | ReturnType<typeof searchAC>
    | ReturnType<typeof isMyPackAC>
    | ReturnType<typeof sortPackAC>

