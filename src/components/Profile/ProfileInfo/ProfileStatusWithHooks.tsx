import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./ProfileInfo.module.css";

type PropsType = {
    status: string;
    updateStatus: (value: string) => void;
};

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div className={styles.profile_status}>
            {!editMode ? (
                <div className={styles.profile_status_text}>
                    <span onDoubleClick={activateEditMode}>{props.status}</span>
                </div>
            ) : (
                <input
                    autoFocus
                    onBlur={deactivateEditMode}
                    onChange={onStatusChange}
                    value={status}
                />
            )}
        </div>
    );
};

export default ProfileStatusWithHooks;
