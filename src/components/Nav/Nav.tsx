import { NavLink } from "react-router-dom";
import { Menu } from 'antd';
import {
  UserOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingFilled
} from '@ant-design/icons';

const Nav = () => {
    return (<Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
    >
              <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to="/profile">
                    Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2" icon={<MessageOutlined />}>
              <NavLink to="/dialogs">
                    Messages
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3" icon={<SearchOutlined />}>
              <NavLink to="/findUsers">
                    Find Users
                </NavLink>
              </Menu.Item>
              <Menu.Item key="4" icon={<MessageOutlined />}>
              <NavLink to="/chat">
                    Chat
                </NavLink>
              </Menu.Item>
              <Menu.Item key="5" icon={<SettingFilled />}>
              <NavLink to="/#">
                    Settings
                </NavLink>
              </Menu.Item>
              </Menu>
    )
}

/*
function Nav() {
    return (
        <nav className={styles.sidebar__menu}>
            <div className={styles.sidebar__item}>
                <NavLink to="/profile" activeClassName={styles.active_link}>
                    Profile
                </NavLink>
            </div>
            <div className={`${styles.sidebar__item} ${styles.sidebar__item_active}`}>
                <NavLink to="/dialogs" activeClassName={styles.active_link}>
                    Messages
                </NavLink>
            </div>
            <div className={styles.sidebar__item}>
                <NavLink to="/findUsers">
                    Find Users
                </NavLink>
            </div>
            <div className={styles.sidebar__item}>
                <NavLink to="/#">
                    Music
                </NavLink>
            </div>
            <div className={styles.sidebar__item}>
                <NavLink to="/#">
                    Settings
                </NavLink>
            </div>
        </nav>
    )
}
*/

export default Nav;