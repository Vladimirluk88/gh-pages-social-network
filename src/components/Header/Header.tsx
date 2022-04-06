import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export type HeaderMapPropsType = {
    isAuth: boolean;
    login: string | null;
};
export type HeaderDispatchPropsType = {
    logout: () => void;
};

let Header: React.FC<HeaderMapPropsType & HeaderDispatchPropsType> = ({
    isAuth,
    login,
    logout,
}) => {
    return (
        <header className={styles.header}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                alt=""
            ></img>
            <div className={styles.login_block}>
                {isAuth ? (
                    <div>
                        {login} - <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <NavLink to={"/login"}> login </NavLink>
                )}
            </div>
        </header>
    );
};

export default Header;
