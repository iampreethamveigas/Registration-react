import {
    LockTwoTone,
    MobileTwoTone, UserOutlined
} from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

export default {
    FirstName: {
        props: {
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
            placeholder: 'Johan',
        },
        rules: [
            {
                required: true,
                message: 'Please enter First Name!',
            },
        ],
    },
    MiddleName: {
        props: {
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
            placeholder: 'Brain',
        },
        rules: [
            {
                required: false,
                message: 'Please enter Middle Name!',
            },
        ],
    },
    LastName: {
        props: {
            size: 'large',
            id: 'LastName',
            prefix: (
                <UserOutlined
                    style={{
                        color: '#1890ff',
                    }}
                    className={styles.prefixIcon}
                />
            ),
            placeholder: 'Doe',
        },
        rules: [
            {
                required: true,
                message: 'Please enter Last Name!',
            },
        ],
    },
    Dob: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'dob',
            placeholder: '19-11-1996',
        },
        rules: [
            {
                required: true,
                message: 'Please enter password!',
            },
        ],
    },
    Address: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'address',
            placeholder: 'South College Street, Auburn AL 36830.',
        },
        rules: [
            {
                required: true,
                message: 'Please enter Address!',
            },
        ],
    },
    Zipcode: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'zipcode',
            placeholder: '36830',
        },
        rules: [
            {
                required: true,
                message: 'Please enter zipcode!',
            },
        ],
    },
    Email: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'email',
            placeholder: 'Johan@domain.com',
        },
        rules: [
            {
                required: true,
                message: 'Please enter email!',
            },
        ],
    },
    Password: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            type: 'password',
            id: 'password',
            placeholder: '888888',
        },
        rules: [
            {
                required: true,
                message: 'Please enter password!',
            },
        ],
    },
    Mobile: {
        props: {
            size: 'large',
            prefix: <MobileTwoTone className={styles.prefixIcon} />,
            placeholder: 'mobile number',
        },
        rules: [
            {
                required: true,
                message: 'Please enter mobile number!',
            },
            {
                pattern: /^1\d{10}$/,
                message: 'Wrong mobile number format!',
            },
        ],
    },
    Gender: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'gender',
            placeholder: 'Male',
        },
        rules: [
            {
                required: true,
                message: 'Please enter gender!',
            },
        ],
    },
    Mrn: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'mrn',
            placeholder: '1234567',
        },
        rules: [
            {
                required: true,
                message: 'Please enter mrn!',
            },
        ],
    },
    CardNumber: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'cardnumber',
            placeholder: '4242424242424242',
        },
        rules: [
            {
                required: true,
                message: 'Please enter card number!',
            },
        ],
    },
    Month: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'cardmonth',
            placeholder: '11',
        },
        rules: [
            {
                required: true,
                message: 'Please enter card month!',
            },
        ],
    },
    Year: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'cardyear',
            placeholder: '2021',
        },
        rules: [
            {
                required: true,
                message: 'Please enter card year!',
            },
        ],
    },
    Cvv: {
        props: {
            size: 'large',
            prefix: <LockTwoTone className={styles.prefixIcon} />,
            id: 'cvv',
            placeholder: '314',
        },
        rules: [
            {
                required: true,
                message: 'Please enter card cvv!',
            },
        ],
    },
};
