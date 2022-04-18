import styles from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";
import React from "react";

type OwnPropsType = {
    key: number,
    name: string
}

const DialogItem: React.FC<OwnPropsType> = (props) => {
    let path = "/dialogs/" + props.key;
    return (
        <div className={styles.dialogs_item + ' ' + styles.dialogs_item_active}>
            <NavLink to={path} onClick={(e) => e.preventDefault()}>
                {props.name}
            </NavLink>
        </div>
    )
}

export default DialogItem;