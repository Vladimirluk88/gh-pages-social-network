import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { dialogsReducer } from "./dialogs-reducer";
import { profileReducer } from "./profile-reducer";
import { userReducer } from "./users-reducer";
import { authReducer } from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import { appReducer } from "./app-reducer";
import { ThunkAction } from "redux-thunk";

let reducers = combineReducers({
    ProfileData: profileReducer,
    DialogsPageData: dialogsReducer,
    UserPageData: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type ThunkType<AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>;
type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export { store };