import "antd/dist/antd.css";
import "./App.css";
import { Layout } from "antd";
import React from "react";
import Nav from "./components/Nav/Nav";
import HeaderComponent from "./components/Header/Header";
import { Route, Switch } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { compose } from "redux";
import { withRouter } from "react-router";
import { Preloader } from "./components/common/preloader";
import { AppStateType, store } from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { withSuspense } from "./hoc/withSuspense";
import { Redirect } from "react-router-dom";
const ChatPage = React.lazy(() => import("./pages/ChatPage"));
const DialogsContainer = React.lazy(
    () => import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(
    () => import("./components/Profile/ProfileContainer")
);
const FindUsersContainer = React.lazy(
    () => import("./components/FindUsers/FindUsersContainer")
);
const Login = React.lazy(() => import("./components/Login/Login"));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(FindUsersContainer);
const SuspendedLogin = withSuspense(Login);
const SuspendedUserProfile = withSuspense(ProfileContainer);
const SuspendedChat = withSuspense(ChatPage);

type PropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initializeApp: () => void;
};

const { Sider, Content } = Layout;

class App extends React.Component<PropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        console.warn("Some error occured");
    };
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener(
            "unhandledrejection",
            this.catchAllUnhandledErrors
        );
    }
    componentWillUnmount() {
        window.removeEventListener(
            "unhandledrejection",
            this.catchAllUnhandledErrors
        );
    }
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Nav />
                </Sider>
                <Layout className="site-layout">
                    <HeaderComponent
                        toggle={this.toggle.bind(App)}
                        collapsed={this.state.collapsed}
                    />
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to={"/profile"} />}
                            />
                            <Route
                                path="/profile/:userId?"
                                render={() => <SuspendedUserProfile />}
                            />
                            <Route
                                path="/dialogs"
                                render={() => <SuspendedDialogs />}
                            />
                            <Route
                                path="/findUsers"
                                render={() => <SuspendedProfile />}
                            />
                            <Route
                                path="/login"
                                render={() => <SuspendedLogin />}
                            />
                            <Route
                                path="/chat"
                                render={() => <SuspendedChat />}
                            />
                            <Route
                                path="*"
                                render={() => <div>404 NOT FOUND</div>}
                            />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

let mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);

let SamuraiJSApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};
export default SamuraiJSApp;
