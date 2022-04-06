import { InferActionsTypes } from "./redux-store";
export const actions = {
    sendMessageActionCreator: (message: string) =>
        ({ type: "SEND_MESSAGE", message } as const),
};

let initialState = {
    DialogsData: [
        { id: 1, name: "Andrew" },
        { id: 2, name: "Steve" },
    ] as Array<DialogType>,
    MessageData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How your" },
        { id: 3, message: "Learning?" },
    ] as Array<MessageType>,
};

let dialogsReducer = (
    state = initialState,
    action: ActionsTypes
): InitialStateType => {
    switch (action.type) {
        case "SEND_MESSAGE": {
            return {
                ...state,
                MessageData: [
                    ...state.MessageData,
                    {
                        id: state.MessageData.length + 1,
                        message: action.message,
                    },
                ],
            };
        }
        default:
            return state;
    }
};

export { dialogsReducer };

type ActionsTypes = InferActionsTypes<typeof actions>;

export type InitialStateType = typeof initialState;

type DialogType = {
    id: number;
    name: string;
};

type MessageType = {
    id: number;
    message: string;
};
