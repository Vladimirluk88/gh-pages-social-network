import './App.css';
import React from 'react';
import Nav from './components/Nav/Nav';
import HeaderContainer from './components/Header/HeaderContainer';
import { Route, Switch } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import { withRouter } from "react-router";
import { Preloader } from './components/common/preloader';
import { AppStateType, store } from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import { withSuspense } from './hoc/withSuspense';
import { Redirect } from 'react-router-dom';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const FindUsersContainer = React.lazy(() => import('./components/FindUsers/FindUsersContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(FindUsersContainer);
const SuspendedLogin = withSuspense(Login);
const SuspendedUserProfile = withSuspense(ProfileContainer);

type PropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<PropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    console.warn("Some error occured")
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div>
        <div className="App">
          <div className="wrapper">
            <HeaderContainer />
            <Nav />
            <div className="main_content_wrapper">
              <Switch>
              <Route exact path='/'
                render={() => <Redirect to={"/profile"} />} />
              <Route path='/profile/:userId?'
                render={() => <SuspendedUserProfile />} />
              <Route path='/dialogs'
                render={() => <SuspendedDialogs />} />
              <Route path='/findUsers'
                render={() => <SuspendedProfile />} />
              <Route path='/login'
                render={() => <SuspendedLogin />} />
              <Route path='*'
                render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </div>


          </div>
        </div>

      </div >
    );
  }
};

let mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

let SamuraiJSApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}
export default SamuraiJSApp;
