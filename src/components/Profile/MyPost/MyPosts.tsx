import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import styles from "./MyPosts.module.css";
import Post from "./Posts/Post";
import { maxLength, requiredFiled } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls";
import { PostType } from "../../../redux/profile-reducer";

const maxLength10 = maxLength(10);

type FormProps = {
    newPostText: string;
};

export type MapPropsType = {
    PostsData: Array<PostType>;
};

export type DispatchPropsType = {
    internalAddPost: (value: string) => void;
};

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = React.memo(
    (props) => {
        let AddNewPost = (values: FormProps) => {
            props.internalAddPost(values.newPostText);
        };
        let PostsData = props.PostsData;
        let postsArray = PostsData.map((elem) => (
            <Post message={elem.message} key={elem.id} />
        ));
        return (
            <div className={styles.my_posts}>
                <span>My posts</span>
                <div className={styles.my_post__make}>
                    <MyPostsRedux onSubmit={AddNewPost} />
                </div>
                <div className={styles.my_post__posts}>{postsArray}</div>
            </div>
        );
    }
);

let MyPostsNewPost: React.FC<InjectedFormProps<FormProps, {}> & {}> = (
    props
) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.my_posts__input}>
            <Field
                validate={[requiredFiled, maxLength10]}
                component={Textarea}
                name="newPostText"
                placeholder="Add new post text"
            />
            <button>Add post</button>
        </form>
    );
};
let MyPostsRedux = reduxForm<FormProps, {}>({ form: "MyPostsForm" })(
    MyPostsNewPost
);

export default MyPosts;
