import { ChatMessageType } from './../redux/chat-reducer';

let subscribers = {
    "messages-received": [] as MessagesReceivedSubscriberType[],
    "status-changed": [] as StatusChangedSubscriberType[]
};

let ws: WebSocket | null;

const closeHandler = () => {
    notifySubscribersAboutStatus("pending");
    setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
    const newMesssages = JSON.parse(e.data);
    subscribers["messages-received"].forEach((s) => s(newMesssages));
};

const openHandler = () => {
    notifySubscribersAboutStatus("ready");
};
const errorHandler = () => {
    notifySubscribersAboutStatus("error");
    console.error("REFRESH PAGE")
};

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler);
    ws?.removeEventListener("message", messageHandler);
    ws?.removeEventListener("open", openHandler);
    ws?.removeEventListener("error", errorHandler);
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach((s) => s(status));
}

function createChannel() {
    cleanUp();
    ws?.close();
    notifySubscribersAboutStatus("pending");
    ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
    );
    ws.addEventListener("close", closeHandler);
    ws.addEventListener("message", messageHandler);
    ws.addEventListener("open", openHandler);
    ws.addEventListener("error", errorHandler);
}

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers["messages-received"] = [];
        subscribers["status-changed"] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
        };
    },
    unsubscribe(eventName: EventsNameType, callback: SubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
};

type SubscriberType = (messages: ChatMessageType[]) => void;
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

type EventsNameType = "messages-received" | "status-changed";

export type ChatMessageAPIType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export type StatusType = "pending" | "ready" | "error";