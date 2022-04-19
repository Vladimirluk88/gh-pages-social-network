import React from "react";
import styles from "./../Dialogs.module.css";

type OwnPropsType = {
    message: string;
};

const Message: React.FC<OwnPropsType> = (props) => {
    return <div className={styles.dialog_message_item}>{props.message}</div>;
};

export default Message;
