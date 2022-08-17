import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    withCredentials: true,
     baseURL: `http://localhost:7542/2.0`,
    //baseURL: 'https://neko-back.herokuapp.com/2.0',
})

export const packsAPI = {
    getPacks(params: RequestGetPacksType) {
        return instance.get<RequestGetPacksType, AxiosResponse<ResponseGetPacksType>>('/cards/pack', {params})
    },
    addPack(name: string, deckCover?: string, isPrivate?: boolean) {
        return instance.post('/cards/pack', {cardsPack: {name, deckCover, private: isPrivate}})
    },
    deletePack(id?: string) {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    updatePack(_id: string, name: string, deckCover:string) {
        return instance.put('/cards/pack', {cardsPack: {_id, name, deckCover}})
    }
};

// types
export type RequestGetPacksType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    pageCount?: number
    page?: number
    user_id?: string
}

export type PackType = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number,
    deckCover: string
}

export type ResponseGetPacksType = {
    cardPacks: PackType[],
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    sortPacks: string,
}