import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { Col, Layout, Row, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import {
    selectCurrentUserLogin,
    selectIsAuth,
} from "../../redux/selectors/auth-selectors";

export type OwnPropsType = {
    collapsed: boolean;
    toggle: () => void;
};

const { Header } = Layout;

const HeaderComponent: React.FC<OwnPropsType> = ({ collapsed, toggle }) => {
    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);
    const dispatch = useDispatch();

    return (
        <div className={styles.header}>
            <Header className="site-layout-background" style={{ padding: 0 }}>
                <Row>
                    <Col span={17}>
                        {collapsed ? (
                            <MenuUnfoldOutlined
                                onClick={toggle}
                                className="trigger menuTrigger"
                            />
                        ) : (
                            <MenuFoldOutlined
                                onClick={toggle}
                                className="trigger menuTrigger"
                            />
                        )}
                    </Col>
                    <Col span={7}>
                        <div className={styles.login_block}>
                            {isAuth ? (
                                <div>
                                    {login} -{" "}
                                    <Button onClick={dispatch(logout)}>
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Button>
                                    <NavLink to={"/login"}> login </NavLink>
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </Header>
        </div>
    );
};

export default HeaderComponent;
