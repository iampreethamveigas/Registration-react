import { Button, Col, Input, Row, Form, message } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import omit from 'omit.js';
import { getFakeCaptcha } from '@/services/login';
import ItemMap from './map';
import RegisterContext from './RegisterContext'
import styles from './index.less';

const FormItem = Form.Item;

const getFormItemOptions = ({ onChange, defaultValue, customProps = {}, rules }) => {
    const options = {
        rules: rules || customProps.rules,
    };

    if (onChange) {
        options.onChange = onChange;
    }

    if (defaultValue) {
        options.initialValue = defaultValue;
    }

    return options;
};

const RegisterItem = props => {
    const [count, setCount] = useState(props.countDown || 0);
    const [timing, setTiming] = useState(false);
    // This is written to prevent onChange, defaultValue, rules props tabUtil from being brought into restProps

    const {
        onChange,
        customProps,
        defaultValue,
        rules,
        name,
        getCaptchaButtonText,
        getCaptchaSecondText,
        updateActive,
        type,
        tabUtil,
        ...restProps
    } = props;
    const onGetCaptcha = useCallback(async mobile => {
        const result = await getFakeCaptcha(mobile);

        if (result === false) {
            return;
        }

        message.success('Successfully obtained the verification code! The verification code is: 1234');
        setTiming(true);
    }, []);
    useEffect(() => {
        let interval = 0;
        const { countDown } = props;

        if (timing) {
            interval = window.setInterval(() => {
                setCount(preSecond => {
                    if (preSecond <= 1) {
                        setTiming(false);
                        clearInterval(interval); // Reset seconds

                        return countDown || 60;
                    }

                    return preSecond - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timing]);

    if (!name) {
        return null;
    } // get getFieldDecorator props

    const options = getFormItemOptions(props);
    const otherProps = restProps || {};

    if (type === 'Captcha') {
        const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
        return (
            <FormItem shouldUpdate noStyle>
                {({ getFieldValue }) => (
                    <Row gutter={8}>
                        <Col span={16}>
                            <FormItem name={name} {...options}>
                                <Input {...customProps} {...inputProps} />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <Button
                                disabled={timing}
                                className={styles.getCaptcha}
                                size="large"
                                onClick={() => {
                                    const value = getFieldValue('mobile');
                                    onGetCaptcha(value);
                                }}
                            >
                                {timing ? `${count} second` : 'get verification code'}
                            </Button>
                        </Col>
                    </Row>
                )}
            </FormItem>
        );
    }

    return (
        <FormItem name={name} {...options}>
            <Input {...customProps} {...otherProps} />
        </FormItem>
    );
};

const RegisterItems = {};
Object.keys(ItemMap).forEach(key => {
    const item = ItemMap[key];

    RegisterItems[key] = props => (
        <RegisterContext.Consumer>
            {context => (
                <RegisterItem
                    customProps={item.props}
                    rules={item.rules}
                    name={item.name}
                    {...props}
                    type={key}
                    {...context}
                    updateActive={context.updateActive}
                />
            )}
        </RegisterContext.Consumer>
    );
});
export default RegisterItems;
