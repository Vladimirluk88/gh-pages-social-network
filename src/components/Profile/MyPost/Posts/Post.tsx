import React from "react";
import styles from "./Post.module.css";

type OwnPropsType = { message: string };

const Post: React.FC<OwnPropsType> = (props) => {
    return <div className={styles.my_post__post_item}>{props.message}</div>;
};

export default Post;
