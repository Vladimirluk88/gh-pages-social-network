import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

type UserSearchFormObjectType = {
    search: string,
    friend: null | "true" | "false" | "null",
};

type UserSearchFormProps = {
    findUser: (term: string, friend: null | "true" | "false" | "null") => void;
    resetFind: () => void;
};

export const UserSearchForm: React.FC<UserSearchFormProps> = React.memo(
    ({ findUser, resetFind }) => {
        let [isUsersFromFind, showFindUsers] = useState(false);

        const userSearchFormValidate = (values: UserSearchFormObjectType) => {
            const errors = {};
            if (!values.search) {
                if (isUsersFromFind) {
                    showFindUsers(false);
                    resetFind();
                } else {
                    if(!values.friend){
                    // @ts-ignore
                    errors.search = "Required";
                }
                }
            }
            return errors;
        };

        const submit = (
            values: UserSearchFormObjectType,
            {
                setSubmitting,
            }: { setSubmitting: (isSubmitting: boolean) => void }
        ) => {
            findUser(values.search, values.friend);
            setSubmitting(false);
            showFindUsers(true);
        };

        return (
            <div>
                <Formik
                    initialValues={{ search: "", friend: "null" }}
                    validate={userSearchFormValidate}
                    onSubmit={submit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="search" name="search" />
                            <Field name="friend" as="select">
                                <option value="null">All</option>
                                <option value="true">Only followed</option>
                                <option value="false">Only unfollowed</option>
                            </Field>
                            <ErrorMessage name="search" component="div" />
                            <button type="submit" disabled={isSubmitting}>
                                Find
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
);
