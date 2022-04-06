import React, { ChangeEvent, useEffect, useState } from "react"

type PropsType = {
    status: string,
    updateStatus: (value: string) => void,
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div className="profile__status">
            {!editMode ? <div className="profile_stauts_text">
                <span onDoubleClick={activateEditMode}>{props.status}</span>

            </div> :
                <input autoFocus onBlur={deactivateEditMode} onChange={onStatusChange} value={status} />
            }

        </div>

    )
}

export default ProfileStatusWithHooks