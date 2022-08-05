import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    withCredentials: true,
     baseURL: `http://localhost:7542/2.0`,
    //baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const cardsAPI = {
    getCards(cardsPack_id: string, params?: RequestGetCardsType) {
        return instance.get<RequestGetCardsType, AxiosResponse<ResponseGetCardsType>>(`/cards/card/?cardsPack_id=${cardsPack_id}`, {params})
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card/?id=${id}`)
    },
    addCard(cardsPack_id: string,question: string,answer: string) {
        return instance.post(`/cards/card`, {card:{cardsPack_id,question,answer}})
    },
    updateCard(card: UpdatedCardType) {
        return instance.put(`/cards/card`, {card})
    },
    setCardGrade(data: UpdateGradeType) {
        return instance.put<UpdateGradeType, AxiosResponse<UpdatedGradeResponseType>>(`/cards/grade`, data)
    }
}

// types
export type RequestGetCardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type NewCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
}

export type UpdatedCardType = {
    _id: string
    question?: string
    answer?: string
}

export type CardType = {
    _id: string
    cardsPack_id: string
    user_id?: string
    answer: string
    question: string
    grade: number
    shots: number
    comments?: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v?: number
}

export type ResponseGetCardsType = {
    cards: CardType[],
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}

export type UpdateGradeType = {
    grade: number
    card_id: string
}

export type UpdatedGradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}

export type UpdateCardType = {
    _id: string
    question?: string
    comments?: string
    answer?: string
}