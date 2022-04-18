import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessagesListener, stopMessagesListener } from "../redux/chat-reducer";
import { AppStateType } from "../redux/redux-store";

type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

const ChatPage: React.FC = (props) => {
    return (
        <>
            <Chat />
        </>
    );
};

const Chat: React.FC = () => {
    const dispatch = useDispatch();

    const status = useSelector((state: AppStateType) => state.chat.status);
    useEffect(() => {
        dispatch(startMessagesListener());
        return () => {
            dispatch(stopMessagesListener())
        }
    }, [dispatch])
    return (
        <div>
            {status === "error" && <div>Some error occured. Please refresh page</div>}
            <>
            <Messages />
            <AddMessageForm />
            </>
        </div>
    );
};

const Messages: React.FC = () => {
    const messageAnchorRef = useRef<HTMLDivElement>(null);
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const [autoScroll, setAutoScroll] = useState(true);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 50) {
            !autoScroll && setAutoScroll(true);
        } else {
            autoScroll && setAutoScroll(false);
        }
    }

    useEffect(() => {
        messageAnchorRef.current?.scrollIntoView();
    }, [])
    useEffect(() => {
        if(autoScroll) {
            messageAnchorRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages, autoScroll])
    return (
        <div style={{ height: "700px", overflowY: "auto" }} onScroll={scrollHandler}>
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
            <div ref={messageAnchorRef}></div>
        </div>
    );
};

type MessagePropsType = {
    message: ChatMessageType;
};

const Message: React.FC<MessagePropsType> = React.memo(({ message }) => {
    return (
        <div>
            <img alt="user"
                src={
                    message.photo ||
                    "https://www.pnglib.com/wp-content/uploads/2020/08/simple-user-icon_5f3407053cf89.png"
                }
                style={{ maxWidth: "50px" }}
            />{" "}
            <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    );
})

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status);

    const internalSendMessage = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
        setMessage("");
    };

    return (
        <div>
            <div>
                <textarea
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}
                ></textarea>
            </div>
            <div>
                <button
                    disabled={status !== "ready"}
                    onClick={internalSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage as React.ComponentType<any>;
