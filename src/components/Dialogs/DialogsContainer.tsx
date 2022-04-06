import { actions } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    let dialogsPageData = state.DialogsPageData;
    return {
        dialogsPageData
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, {...actions}), withAuthRedirect)(Dialogs);