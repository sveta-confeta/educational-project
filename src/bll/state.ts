import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';

import thunk, {ThunkDispatch} from "redux-thunk";

import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {loginReducer} from "./authReducer";
import {registrReducer} from "./registrReducer";
import {appReducer} from "./appReducer";
import {profileReducer} from "./profileReducer";
import {recoverPasswordReducer} from "./recoverPasswordReducer";


const rootReducer = combineReducers({
    auth: loginReducer,
    registr: registrReducer,
    app:appReducer,
    profile:profileReducer,
    recovery:recoverPasswordReducer,

})

export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector //внутри типизация стейта всего приложения

export const useAppDispatch = () => useDispatch<AppDispatch>()


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;