
import {AxiosError} from 'axios';
import {cardsAPI, CardType} from "../api/cardsAPI";
import {AppThunk} from "./state";
import {setStatusAC} from "./appReducer";
import {errorUtils} from "../common/utils/error-util";

const initialState = {
    cards: [] as CardType[],
    card: {} as CardType,
    packUserId: '',
    params: {
        page: 1,
        pageCount: 10,
        cardsTotalCount: 0,
        cardQuestion: '',
        cardAnswer: '',
    },
    minGrade: 0,
    maxGrade: 6,
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'cards/GET-CARDS':
            return {...state, cards: action.cards}
        case 'cards/SET-PAGE':
            return {...state, params: {...state.params, page: action.page}}
        case 'cards/SET-PAGE-COUNT':
            return {...state, params: {...state.params, pageCount: action.pageCount}}
        case 'cards/SET-CARDS-TOTAL-COUNT':
            return {...state, params: {...state.params, cardsTotalCount: action.cardsTotalCount}}
        case 'cards/SEARCH-QUESTION':
            return {
                ...state,
                params: {...state.params, cardQuestion: action.cardQuestion}
            }
        case 'cards/SET-PACK-USER-ID':
            return {...state, packUserId: action.packUserId}
        case 'cards/SEARCH-ANSWER':
            return {...state, params: {...state.params, cardAnswer: action.cardAnswer}}
        // case 'cards/UPDATE-CARD-GRADE':
        //     return {
        //         ...state,
        //         cards: state.cards.map(card => card._id === action.data.updatedGrade.card_id ? {
        //             ...card,
        //             grade: action.data.updatedGrade.grade
        //         } : card)
        //     }
        default:
            return state
    }
}

// actions
export const getCardsAC = (cards: CardType[]) => ({type: 'cards/GET-CARDS', cards,} as const)
export const setPackUserIdAC = (packUserId: string) => ({type: 'cards/SET-PACK-USER-ID', packUserId,} as const)
export const setCardsPageAC = (page: number) => ({type: 'cards/SET-PAGE', page,} as const)
export const setCardsPageCountAC = (pageCount: number) => ({type: 'cards/SET-PAGE-COUNT', pageCount,} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) => ({
    type: 'cards/SET-CARDS-TOTAL-COUNT',
    cardsTotalCount,
} as const)
export const searchQuestionAC = (cardQuestion: string) => ({
    type: 'cards/SEARCH-QUESTION',
    cardQuestion,
} as const)
export const searchAnswerAC = (cardAnswer: string) => ({
    type: 'cards/SEARCH-ANSWER',
    cardAnswer,
} as const)
// export const updateCardGradeAC = (data: UpdatedGradeResponseType) => ({
//     type: 'cards/UPDATE-CARD-GRADE',
//     data
// } as const)

// thunks
export const getCardsTC = (cardsPack_id: string): AppThunk => {
    return (dispatch, getState) => {
        const {params} = getState().cards
        dispatch(setStatusAC(true))
        cardsAPI.getCards(cardsPack_id, params)
            .then((res) => {
                dispatch(getCardsAC(res.data.cards))
                // dispatch(setPackUserIdAC(res.data.packUserId))
                // dispatch(setCardsPageAC(res.data.page))
                // dispatch(setCardsPageCountAC(res.data.pageCount))
                // dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
            })
            .catch((error: AxiosError<{ error: string }>) => {
                errorUtils(error, dispatch)
            })
            .finally(() => {
                dispatch(setStatusAC(false))
            })
    }
}

// export const addCardTC = (newCard: NewCardType): AppThunk => {
//     return (dispatch) => {
//         dispatch(setAppStatusAC('loading'))
//         cardsAPI.addCard(newCard)
//             .then((res) => {
//                 dispatch(getCardsTC(newCard.cardsPack_id))
//             })
//             .catch((error: AxiosError<{ error: string }>) => {
//                 errorUtils(error, dispatch)
//             })
//             .finally(() => {
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }

// export const deleteCardTC = (cardId: string, packsId: string): AppThunk => {
//     return (dispatch) => {
//         dispatch(setAppStatusAC('loading'))
//         cardsAPI.deleteCard(cardId)
//             .then((res) => {
//                 dispatch(getCardsTC(packsId))
//             })
//             .catch((error: AxiosError<{ error: string }>) => {
//                 errorUtils(error, dispatch)
//             })
//             .finally(() => {
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }

// export const updateCardTC = (data: UpdateCardType, packId: string): AppThunk => {
//     return (dispatch) => {
//         dispatch(setAppStatusAC('loading'))
//         cardsAPI.updateCard(data)
//             .then(() => {
//                 dispatch(getCardsTC(packId))
//             })
//             .catch((error: AxiosError<{ error: string }>) => {
//                 errorUtils(error, dispatch)
//             })
//             .finally(() => {
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }

// export const setCardGradeTC = (data: UpdateGradeType): AppThunk => {
//     return (dispatch) => {
//         dispatch(setAppStatusAC('loading'))
//         cardsAPI.setCardGrade(data)
//             .then((res) => {
//                 dispatch(updateCardGradeAC(res.data))
//             })
//             .catch((error: AxiosError<{ error: string }>) => {
//                 errorUtils(error, dispatch)
//             })
//             .finally(() => {
//                 dispatch(setAppStatusAC('succeeded'))
//             })
//     }
// }

// types
export type InitialStateType = typeof initialState;
type ActionType =
    ReturnType<typeof getCardsAC>
    | ReturnType<typeof setPackUserIdAC>
    | ReturnType<typeof setCardsPageAC>
    | ReturnType<typeof setCardsPageCountAC>
    | ReturnType<typeof setCardsTotalCountAC>
    | ReturnType<typeof searchQuestionAC>
    | ReturnType<typeof searchAnswerAC>
     //| ReturnType<typeof updateCardGradeAC>