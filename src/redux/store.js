import { dialogsReducer } from "./dialogs-reducer.ts";
import { profileReducer } from "./profile-reducer.ts";

let store = {
    _state: {
        ProfileData: {
            PostsData: [
                { id: 1, message: "Hello, i'm first post" },
                { id: 2, message: "I'm your 2 post" },
            ],
            newPostText: "new post text from fuction"
        },
        DialogsPageData: {
            DialogsData: [
                { id: 1, name: "Andrew" },
                { id: 2, name: "Steve" },

            ],
            MessageData: [
                { id: 1, message: "Hi" },
                { id: 2, message: "How your" },
                { id: 3, message: "Learning?" },
            ],
            newMessageText: '',
        }

    },
    _callSubscriber() { },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },
    dispatch(action) {
        this._state.ProfileData = profileReducer(this._state.ProfileData, action);
        this._state.DialogsPageData = dialogsReducer(this._state.DialogsPageData, action);
        this._callSubscriber(this);
    },
}




export { store };