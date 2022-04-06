import { InferActionsTypes } from "./redux-store";
import { getAuthUserData } from "./auth-reducer";

let initialState = {
    initialized: false,
};

type initialStateType = typeof initialState;

let appReducer = (
    state = initialState,
    action: ActionsTypes
): initialStateType => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    initializedSuccess: () => ({ type: "INITIALIZED-SUCCESS" } as const),
};

let initializeApp = () => {
    return (dispatch: Function) => {
        let promise = dispatch(getAuthUserData());
        promise.then(() => {
            dispatch(actions.initializedSuccess());
        });
    };
};

export { appReducer, initializeApp };
