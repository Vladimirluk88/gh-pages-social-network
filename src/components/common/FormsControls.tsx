import styles from './FormsControl.module.css';
import React from 'react';
import { WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';

type FormsControlsPropsType = {
    meta: WrappedFieldMetaProps
}
const FormsControl: React.FC<FormsControlsPropsType> = ({ meta: {touched, error}, children , ...props }) => {
    const showError = touched && error;
    return (
        <div className={styles.form_control + " " + (showError && styles.error)}>
            <div>
                {children}
            </div>
            <div>
                {showError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...RestProps } = props;
    return (
        <FormsControl {...props}><textarea {...input} {...RestProps}></textarea></FormsControl>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...RestProps } = props;
    return (
        <FormsControl {...props}><input {...input} {...RestProps}></input></FormsControl>
    )
}