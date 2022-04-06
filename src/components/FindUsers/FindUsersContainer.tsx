import { connect } from 'react-redux';
import { actions, getUsersThunkCreator, follow, unfollow, findUser, resetFind } from '../../redux/users-reducer';
import React from 'react';
import { FindUsers } from './FindUsers';
import { Preloader } from '../common/preloader';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getIsFetching, getUsersArraySuper, getIsFollowingInProgress } from "../../redux/users-selectors";
import { UserType } from '../../types/types';

type MapStateToPropsType = {
    isFollowingInProgress: Array<number>,
    usersArray: Array<UserType>,
    isFetching: boolean
}

type MapDispatchToPropsType = {
    getUsersThunkCreator: () => void,
    showMore: () => void,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    findUser: (term: string, friend: null | "true" | "false" | "null") => void,
    resetFind: () => void
}

type OwnPropsType = {
    PageTitle: string
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class FindUsersAPIComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsersThunkCreator();
    }
    render() {
        return (
            <div>
            {this.props.isFetching ? <Preloader /> : null}
            <FindUsers
                usersArray={this.props.usersArray}
                showMore={this.props.showMore}
                isFollowingInProgress={this.props.isFollowingInProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                findUser={this.props.findUser}
                resetFind={this.props.resetFind} />
        </div>
        )
    }
}

let mapStateToProps = (state: any): MapStateToPropsType => {
    let usersArray: Array<UserType> = getUsersArraySuper(state);
    return {
        isFollowingInProgress: getIsFollowingInProgress(state),
        usersArray,
        isFetching: getIsFetching(state)
    }
}

export default compose(connect<MapStateToPropsType, MapDispatchToPropsType>(mapStateToProps, { showMore: actions.showMore, getUsersThunkCreator, follow, unfollow, findUser, resetFind }), withAuthRedirect)(FindUsersAPIComponent) as React.ComponentType<any>;