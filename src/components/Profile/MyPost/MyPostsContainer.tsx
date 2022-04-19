import MyPosts, { DispatchPropsType, MapPropsType } from "./MyPosts";
import { actions } from "../../../redux/profile-reducer";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        PostsData: state.ProfileData.PostsData,
    };
};

let MyPostsContainer = connect<
    MapPropsType,
    DispatchPropsType,
    {},
    AppStateType
>(mapStateToProps, { internalAddPost: actions.addPostActionCreator })(MyPosts);

export { MyPostsContainer };
