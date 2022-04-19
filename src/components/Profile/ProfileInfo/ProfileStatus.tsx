import React, { ChangeEvent } from "react";
import styles from "./ProfileInfo.module.css";

type PropsType = {
    status: string;
    updateStatus: (newStatus: string) => void;
};

type StateType = {
    editMode: boolean;
    status: string;
};

class ProfileStatus extends React.Component<PropsType, StateType> {
    constructor(props: PropsType & StateType) {
        super(props);
        this.state = {
            editMode: false,
            status: this.props.status,
        };
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };
    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    };
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (this.props.status !== prevProps.status) {
            this.setState({ status: this.props.status });
        }
    }
    render() {
        return (
            <div className={styles.profile_status}>
                {!this.state.editMode ? (
                    <div className={styles.profile_status_text}>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status}
                        </span>
                    </div>
                ) : (
                    <input
                        onChange={this.onStatusChange}
                        autoFocus
                        onBlur={this.deactivateEditMode}
                        value={this.state.status}
                    />
                )}
            </div>
        );
    }
}

export default ProfileStatus;
