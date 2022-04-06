import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLength, requiredFiled } from "../../utils/validators/validators";
import { Textarea } from "../common/FormsControls";
import styles from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import { InitialStateType } from "../../redux/dialogs-reducer"

let maxLength100 = maxLength(100);

type OwnPropsType = {
    dialogsPageData: InitialStateType,
    sendMessageActionCreator: (messageText: string) => void,
}

type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<OwnPropsType> = (props) => {
    let messageArray = props.dialogsPageData.MessageData.map(elem => <Message key={elem.id} message={elem.message} />);
    let dialogsArray = props.dialogsPageData.DialogsData.map(elem => <DialogItem key={elem.id} name={elem.name} />);
    let addNewMessage = (values: NewMessageFormType) => {
        props.sendMessageActionCreator(values.newMessageBody);
    };

    return (
        <div className={styles.dialogs_content}>
            <div className={styles.dialogs_items}>
                {
                    dialogsArray
                }

            </div>
            <div className={styles.dialog_messages}>
                <div>
                    {
                        messageArray
                    }
                </div>
                <div className="new-messages-textarea">
                    <AddMessageFormRedux onSubmit={addNewMessage} />

                </div>
            </div>
        </div>
    )
}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, {}> & {}> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    validate={[requiredFiled, maxLength100]}
                    component={Textarea}
                    name="newMessageBody"
                    placeholder='Enter your message'
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormType>({ form: "dialogAddmessageForm" })(AddMessageForm);

export default Dialogs;