import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css"

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
                    Massages
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

export default Nav;