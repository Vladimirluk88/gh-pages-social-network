import React, { ChangeEvent } from "react"

type PropsType = {
    status: string,
    updateStatus: (newStatus: string) => void,
}

type StateType = {
    editMode: boolean,
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status,
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })

    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (this.props.status !== prevProps.status) {
            this.setState({ status: this.props.status })
        }
    }
    render() {
        return (
            <div className="profile__status">
                {!this.state.editMode ? <div className="profile_stauts_text">
                    <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>

                </div> :
                    <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode} value={this.state.status} />
                }

            </div>

        )
    }
}

export default ProfileStatus