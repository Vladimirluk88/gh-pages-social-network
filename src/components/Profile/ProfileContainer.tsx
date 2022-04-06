import { ProfileType } from './../../types/types';
import { AppStateType } from './../../redux/redux-store';
import React from "react";
import { connect } from "react-redux";
import ProfileComponent from "./Profile";
import { getUserProfile, savePhoto } from "../../redux/profile-reducer";
import { withRouter } from "react-router";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { updateStatus, getStatus, saveProfile } from "../../redux/profile-reducer";
import { RouteComponentProps } from "react-router-dom";

type DispatchPropsType = {
    getUserProfile: (userId: number | null) => void,
    savePhoto: (image: File) => void,
    getStatus: (userId: number | null) => void,
    updateStatus: (status: string) => void,
    saveProfile: (formData: ProfileType) => void
};

type MapPropsType = ReturnType<typeof mapStateToProps>;

type PathParamsType = {
    userId: string,
};

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.loginedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps: PropsType, prevState: AppStateType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }
    render() {
        return (
            <ProfileComponent {...this.props} savePhoto={this.props.savePhoto} isOwner={!this.props.match.params.userId} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} saveProfile={this.props.saveProfile} />
        )
    }
}
//<ProfileComponent {...this.props} savePhoto={this.props.savePhoto} isOwner={!this.props.match.params.userId} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} saveProfile={this.props.saveProfile} />

let mapStateToProps = (state: AppStateType) => ({
    profile: state.ProfileData.profile,
    status: state.ProfileData.status,
    loginedUserId: state.auth.userId
});

export default compose(connect(mapStateToProps, { savePhoto, getUserProfile, getStatus, updateStatus, saveProfile }), withRouter, withAuthRedirect)(ProfileContainer) as React.ComponentType<any>;