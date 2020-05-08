import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import RegisterContext from './RegisterContext';

const { TabPane } = Tabs;

const generateId = (() => {
    let i = 0;
    return (prefix = '') => {
        i += 1;
        return `${prefix}${i}`;
    };
})();

const RegisterTab = props => {
    useEffect(() => {
        const uniqueId = generateId('register-tab-');
        const { tabUtil } = props;

        if (tabUtil) {
            tabUtil.addTab(uniqueId);
        }
    }, []);
    const { children } = props;
    return <TabPane {...props}>{props.active && children}</TabPane>;
};

const WrapContext = props => (
    <RegisterContext.Consumer>
        {value => <RegisterTab tabUtil={value.tabUtil} {...props} />}
    </RegisterContext.Consumer>
); // Flag bit is used to judge whether it is a custom component

WrapContext.typeName = 'RegisterTab';
export default WrapContext;
