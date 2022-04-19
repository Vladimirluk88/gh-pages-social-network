import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
    UserOutlined,
    MessageOutlined,
    SearchOutlined,
    SettingFilled,
} from "@ant-design/icons";

const Nav = () => {
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
                <NavLink to="/profile">Profile</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<MessageOutlined />}>
                <NavLink to="/dialogs">Messages</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<SearchOutlined />}>
                <NavLink to="/findUsers">Find Users</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<MessageOutlined />}>
                <NavLink to="/chat">Chat</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<SettingFilled />}>
                <NavLink to="/#">Settings</NavLink>
            </Menu.Item>
        </Menu>
    );
};

export default Nav;
