import { Tabs, Form } from 'antd';
import React, { useState } from 'react';
import useMergeValue from 'use-merge-value';
import classNames from 'classnames';
import RegisterContext from './RegisterContext';
import RegisterItem from './RegisterItem';
import RegisterSubmit from './RegisterSubmit';
import RegisterTab from './RegisterTab';
import styles from './index.less';

const Register = props => {

    const { className } = props;
    const [tabs, setTabs] = useState([]);
    const [active, setActive] = useState({});
    const [type, setType] = useMergeValue('', {
        value: props.activeKey,
        onChange: props.onTabChange,
    });
    const TabChildren = [];
    const otherChildren = [];
    React.Children.forEach(props.children, child => {
        if (!child) {
            return;
        }

        if (child.type.typeName === 'RegisterTab') {
            TabChildren.push(child);
        } else {
            otherChildren.push(child);
        }
    });
    return (
        <RegisterContext.Provider
            value={{
                tabUtil: {
                    addTab: id => {
                        setTabs([...tabs, id]);
                    },
                    removeTab: id => {
                        setTabs(tabs.filter(currentId => currentId !== id));
                    },
                },
                updateActive: activeItem => {
                    if (!active) return;

                    if (active[type]) {
                        active[type].push(activeItem);
                    } else {
                        active[type] = [activeItem];
                    }

                    setActive(active);
                },
            }}
        >
            <div className={classNames(className, styles.login)}>
                <Form
                    form={props.from}
                    onFinish={values => {
                        if (props.onSubmit) {
                            props.onSubmit(values);
                        }
                    }}
                >
                    {tabs.length ? (
                        <React.Fragment>
                            <Tabs
                                animated={false}
                                className={styles.tabs}
                                activeKey={type}
                                onChange={activeKey => {
                                    setType(activeKey);
                                }}
                            >
                                {TabChildren}
                            </Tabs>
                            {otherChildren}
                        </React.Fragment>
                    ) : (
                            props.children
                        )}
                </Form>
            </div>
        </RegisterContext.Provider>
    );
};

Register.Tab = RegisterTab;
Register.Submit = RegisterSubmit;
Register.FirstName = RegisterItem.FirstName;
Register.MiddleName = RegisterItem.MiddleName;
Register.LastName = RegisterItem.LastName;
Register.Dob = RegisterItem.Dob;
Register.Address = RegisterItem.Address;
Register.Zipcode = RegisterItem.Zipcode;
Register.Email = RegisterItem.Email;
Register.Mobile = RegisterItem.Mobile;
Register.Password = RegisterItem.Password;
Register.Gender = RegisterItem.Gender;
Register.Mrn = RegisterItem.Mrn;
Register.Month = RegisterItem.Month;
Register.Year = RegisterItem.Year;
Register.Cvv = RegisterItem.Cvv;
Register.CardNumber = RegisterItem.CardNumber;
export default Register;

