import { Form, Steps, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { Link, connect, history, FormattedMessage, formatMessage, Dispatch } from 'umi';
import { PhCodes as phcodes } from '@/constants/statics'
import { Tabs, Modal } from 'antd';

import {
  LockTwoTone,
  MobileTwoTone, UserOutlined,
  HomeOutlined, QqOutlined,
  PushpinOutlined,
  SolutionOutlined,
  EnvironmentOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
  CalendarOutlined,
  DeliveredProcedureOutlined
} from '@ant-design/icons';

import styles from './style.less';
// import { Alert, Checkbox } from 'antd';

const { TabPane } = Tabs;
const { Step } = Steps

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="userandregisteruser.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="userandregisteruser.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="userandregisteruser.strength.short" />
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

interface RegisterUserProps {
  dispatch: Dispatch<any>;
  userAndRegisterUser: StateType;
  submitting: boolean;
}

export interface UserRegisterParams {
  mail: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
  prefix: string;
}
const steps = [
  {
    title: "First",
    content: "First-content"
  },
  {
    title: "Second",
    content: "First-content"
  },
  {
    title: "Third",
    content: "First-content"
  },
  {
    title: "Third",
    content: "First-content"
  },
];
const RegisterUser: FC<RegisterUserProps> = ({
  submitting,
  dispatch,
  userAndRegisterUser,
}) => {
  const [count, setcount]: [number, any] = useState(0);
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [prefix, setprefix]: [string, any] = useState('1');
  const [popover, setpopover]: [boolean, any] = useState(false);
  const [current, setcurrent]: [number, any] = useState(0);
  let confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();
  useEffect(() => {
    if (!userAndRegisterUser) {
      return;
    }
    const account = form.getFieldValue('mail');
    if (userAndRegisterUser.status === 'ok') {
      message.success('registration success!');
      history.push({
        pathname: '/chatcenter',
        state: {
          account,
        },
      });
    }
  }, [userAndRegisterUser]);
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [],
  );
  const onGetCaptcha = () => {
    let counts = 59;
    setcount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setcount(counts);
      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };
  const onFinish = (values: { [key: string]: any }) => {
    delete values['confirm']
    dispatch({
      type: 'userAndRegisterUser/submit',
      payload: {
        ...values,
        mobile: values.mobile,
        gender: ('male|Male|MALE|').split('|').includes(values.gender) ? 1 : 2,
        MRN: values.mrn ? values.mrn : '',
        year: Number(values.year),
        month: Number(values.month),
      },
    });
  };
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(formatMessage({ id: 'userandregisteruser.password.twice' }));
    }
    return promise.resolve();
  };
  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // When there is no value
    if (!value) {
      setvisible(!!value);
      return promise.reject(formatMessage({ id: 'userandregisteruser.password.required' }));
    }
    // Valuable case
    if (!visible) {
      setvisible(!!value);
    }
    setpopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    else {
      confirmDirty = true
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };
  const changePrefix = (value: string) => {
    setprefix(value);
  };
  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };


  const next = () => {

  }
  const prev = () => {
    setcurrent((e: number) => e - 1)
  }

  // const onChange = (key: number, field: string) => {
  //   const { isFieldTouched, getFieldError, getFieldsError } = form
  //   console.log(form)
  //   // middle_name
  //   console.log(getFieldsError(['first_name', 'middle_name', 'last_name']))
  //   if (current === 0) {
  //     getFieldsError(['first_name', 'middle_name', 'last_name']).map(item => {
  //       if(item.errors.length > 0){

  //       }
  //     })
  //   }
  // }

  return (
    <div className={styles.main}>


      <Tabs>
        <TabPane tab={<FormattedMessage id="userandregisteruser.register.register" />} key="1" />
      </Tabs>

      {/* <Steps current={current} onChange={(e) => onChange(e, 'steps')}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps> */}


      <Form form={form} name="UserRegister" onFinish={onFinish}>

        {/* {current === 0 && (
         
        )} */}
        <FormItem
          name="first_name"
          rules={[
            {
              required: true,
              message: 'Please enter first name!',
            },
            {
              pattern: /^[a-zA-Z]*$/,
              message: 'Please enter a valid first name'
            }
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'firstName',
            prefix: (
              <UserOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'First name',
          }} />
        </FormItem>


        <FormItem
          name="middle_name"
          rules={[
            {
              required: false,
              message: 'Please enter middle name!',
            },
            {
              pattern: /^[a-zA-Z]*$/,
              message: 'Please enter a valid middle name'
            }
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'middleName',
            prefix: (
              <UserOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Middle name',
          }} />
        </FormItem>
        <FormItem
          name="last_name"
          rules={[
            {
              required: true,
              message: 'Please enter last name!',
            },
            {
              pattern: /^[a-zA-Z]*$/,
              message: 'Please enter a valid last name'
            }
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'lastName',
            prefix: (
              <UserOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Last name',
          }} />
        </FormItem>


        {/* {current === 1 && (
          <>
         
          </>
        )} */}

        <FormItem
          name="address"
          rules={[
            {
              required: true,
              message: 'Please enter your address!',
            },
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'address',
            prefix: (
              <HomeOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Address',
          }} />
        </FormItem>

        <FormItem
          name="dob"
          rules={[
            {
              required: true,
              message: 'Please enter your date of birth!',
            },
            {
              pattern: /^(\d{2})(-)(\d{2})(-)\d{4}$/,
              message: "Please enter the correct dob ex: 01-02-1999",
            },
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'dob',
            prefix: (
              <SolutionOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Date of birth ex: 19-11-1996',
          }} />
        </FormItem>

        <FormItem
          name="zipcode"
          rules={[
            {
              required: true,
              message: 'Please enter zipcode!',
            },
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'zipcode',
            prefix: (
              <EnvironmentOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Zipcode ',
          }} />
        </FormItem>


        <FormItem
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please enter your gender!',
            },
            {
              pattern: /^(?:male|Male|MALE|female|Female|FEMALE)$/,
              message: 'Please enter a correct gender male | female'
            }
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'gender',
            prefix: (
              <UserOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Gender',
          }} />
        </FormItem>

        {/* {current === 2 && (
          <>
            

          </>
        )} */}

        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'userandregisteruser.email.required' }),
            },
            {
              type: 'email',
              message: formatMessage({ id: 'userandregisteruser.email.wrong-format' }),
            },
          ]}
        >
          <Input size="large"
            {...{
              size: 'large',
              id: 'email',
              prefix: (
                <MailOutlined
                  style={{
                    color: '#1890ff',
                  }}
                  className={styles.prefixIcon}
                />
              ),
            }}
            placeholder={formatMessage({ id: 'userandregisteruser.email.placeholder' })}
          />
        </FormItem>


        <Popover
          getPopupContainer={(node) => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            visible && (
              <div style={{ padding: '4px 0' }}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{ marginTop: 10 }}>
                  <FormattedMessage id="userandregisteruser.strength.msg" />
                </div>
              </div>
            )
          }
          overlayStyle={{ width: 240 }}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              {...{
                size: 'large',
                id: 'password',
                prefix: (
                  <LockOutlined
                    style={{
                      color: '#1890ff',
                    }}
                    className={styles.prefixIcon}
                  />
                ),
              }}
              placeholder={formatMessage({ id: 'userandregisteruser.password.placeholder' })}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'userandregisteruser.confirm-password.required' }),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            {...{
              size: 'large',
              id: 'confirm',
              prefix: (
                <LockOutlined
                  style={{
                    color: '#1890ff',
                  }}
                  className={styles.prefixIcon}
                />
              ),
            }}
            placeholder={formatMessage({ id: 'userandregisteruser.confirm-password.placeholder' })}
          />
        </FormItem>
        <InputGroup compact>
          <Select size="large"
            value={prefix}
            onChange={changePrefix}
            style={{ width: '30%' }}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {Object.keys(phcodes).flatMap(item => <Option key={phcodes[item]} value={phcodes[item]}>{`${item} + ${phcodes[item]}`}</Option>)}
          </Select>
          <FormItem
            style={{ width: '70%' }}
            name="mobile"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'userandregisteruser.phone-number.required' }),
              },
              {
                pattern: /^\d{10}$/,
                message: formatMessage({ id: 'userandregisteruser.phone-number.wrong-format' }),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={formatMessage({ id: 'userandregisteruser.phone-number.placeholder' })}
            />
          </FormItem>
        </InputGroup>


        <FormItem
          name="mrn"
          rules={[
            {
              required: false,
              message: 'Please enter your medical records number!',
            },
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'mrn',
            prefix: (
              <IdcardOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Mrn ',
          }} />
        </FormItem>
        <FormItem
          name="card_number"
          rules={[
            {
              required: true,
              message: 'Please enter your card number',
            },
            {
              pattern: /^\d{16}$/,
              message: 'Please enter a valid card number having 16 digits'
            }
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'card',
            prefix: (
              <IdcardOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Card Number ',
          }} />
        </FormItem>

        <FormItem
          name="month"
          rules={[
            {
              required: true,
              message: 'Please enter your card expiry month',
            },
            {
              pattern: /^\d{2}$/,
              message: 'Please enter a valid card expiry month ex: 01'
            }
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'cardmonth',
            prefix: (
              <CalendarOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Card Month ex: 01',
          }} />
        </FormItem>

        <FormItem
          name="year"
          rules={[
            {
              required: true,
              message: 'Please enter your card expiry year',
            },
            {
              pattern: /^\d{4}$/,
              message: 'Please enter a valid year'
            }
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'cardyear',
            prefix: (
              <CalendarOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Card year',
          }} />
        </FormItem>

        <FormItem
          name="cvv"
          rules={[
            {
              required: true,
              message: 'Please enter your card ccv',
            },
            {
              pattern: /^\d{3}$/,
              message: 'Please enter a valid ccv'
            }
          ]}
        >
          <Input {...{
            size: 'large',
            id: 'cardccv',
            prefix: (
              <DeliveredProcedureOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />
            ),
            placeholder: 'Card CCV',
          }} />
        </FormItem>


        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <FormattedMessage id="userandregisteruser.register.register" />
          </Button>
          <Link className={styles.login} to="/user/login">
            <FormattedMessage id="userandregisteruser.register.sign-in" />
          </Link>
        </FormItem>

      </Form>
    </div>
  );
};
export default connect(
  ({
    userAndRegisterUser,
    loading,
  }) => ({
    userAndRegisterUser,
    submitting: loading.effects['userAndRegisterUser/submit'],
  }),
)(RegisterUser);



 