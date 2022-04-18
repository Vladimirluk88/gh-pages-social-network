import { StatusType } from './../api/chat-api';
import { Dispatch } from 'react';
import { chatAPI } from "../api/chat-api";
import { InferActionsTypes, ThunkType } from "./redux-store";
import { ChatMessageAPIType } from "../api/chat-api";
import { v1 } from 'uuid';

export type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as StatusType,
};

const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: "MESSAGES_RECIEVED",
        messages,
    }  as const),
    statusChanged: (status: StatusType) => ({
        type: "STATUS_CHANGED",
        status,
    }  as const),
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ChatThunkType = ThunkType<ActionsType>;

let chatReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "MESSAGES_RECIEVED": {
            return {
                ...state,
                messages: [...state.messages, ...action.messages.map(m => ({...m, id: v1()}))].filter((m, index, array) => index >= (array.length - 100)),
            };
        }
        case "STATUS_CHANGED": {
            return {
                ...state,
                status: action.status
            };
        }
        default:
            return state;
    }
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch<ActionsType>) => {
    if(_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status));
        }
    }
    return _statusChangedHandler
}

export const startMessagesListener = (): ChatThunkType => {
    return async (dispatch) => {
        chatAPI.start();
        chatAPI.subscribe("messages-received", newMessageHandlerCreator(dispatch));
        chatAPI.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
    };
};
export const stopMessagesListener = (): ChatThunkType => {
    return async (dispatch) => {
        chatAPI.stop();
        chatAPI.unsubscribe("messages-received", newMessageHandlerCreator(dispatch));
        chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch));
    };
};
export const sendMessage = (message: string): ChatThunkType => {
    return async (dispatch) => {
        chatAPI.sendMessage(message);
    };
};

export default chatReducer;
