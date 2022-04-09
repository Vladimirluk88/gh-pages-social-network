import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/selectors/users-selectors";

export type FriendFormType = null | "true" | "false" | "null";


type UserSearchFormObjectType = {
    search: string,
    friend: FriendFormType,
};

type UserSearchFormProps = {
    resetFind: () => void;
    setFilter: (term: string, friend: FriendFormType) => void
};

type SearchErrorsType = {
    search: string | null
};

export const UserSearchForm: React.FC<UserSearchFormProps> = React.memo(
    ({ resetFind, setFilter }) => {
        let [isUsersFromFind, showFindUsers] = useState(false);
        const filter = useSelector(selectFilter);

        const userSearchFormValidate = (values: UserSearchFormObjectType) => {
            const errors: SearchErrorsType = {
                search: null
            };
            if (!values.search) {
                if (isUsersFromFind) {
                    showFindUsers(false);
                    resetFind();
                    setFilter("", null);
                } else {
                    if(!values.friend){
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
            setFilter(values.search, values.friend);
            setSubmitting(false);
            showFindUsers(true);
        };

        return (
            <div>
                <Formik
                    enableReinitialize
                    initialValues={{ search: filter.term as string, friend: filter.friend as FriendFormType }}
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
