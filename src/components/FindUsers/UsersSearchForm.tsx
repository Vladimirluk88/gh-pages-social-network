import { Button } from "antd";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./UserSearchForm.module.css";
import { selectFilter } from "../../redux/selectors/users-selectors";

export type FriendFormType = null | "true" | "false" | "null";

type UserSearchFormObjectType = {
    search: string;
    friend: FriendFormType;
};

type UserSearchFormProps = {
    setFilter: (term: string, friend: FriendFormType) => void;
};

type SearchErrorsType = {
    search: string | null;
};

export const UserSearchForm: React.FC<UserSearchFormProps> = React.memo(
    ({ setFilter }) => {
        let [isUsersFromFind, showFindUsers] = useState(false);
        const filter = useSelector(selectFilter);

        const userSearchFormValidate = (values: UserSearchFormObjectType) => {
            const errors: SearchErrorsType = {
                search: null,
            };
            if (!values.search) {
                if (isUsersFromFind) {
                    showFindUsers(false);
                    setFilter("", null);
                } else {
                    if (!values.friend) {
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
                    initialValues={{
                        search: filter.term as string,
                        friend: filter.friend as FriendFormType,
                    }}
                    validate={() => userSearchFormValidate}
                    onSubmit={submit}
                >
                    {({ isSubmitting }) => (
                        <Form className={styles.user_search_form}>
                            <Field type="search" name="search" />
                            <Field name="friend" as="select" value="undefined">
                                <option value="null">All</option>
                                <option value="true">Only followed</option>
                                <option value="false">Only unfollowed</option>
                            </Field>
                            <ErrorMessage name="error" />
                            <Button htmlType="submit" disabled={isSubmitting}>
                                Find
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
);
