import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from 'antd';
import FormPassword from '../../components/FormPassword';

const PasswordUpdate = () => {
    const { user, logout } = useAuth();
    return (
        <>
        <div>
        <FormPassword />
        </div>
        </>
    );
};

export default PasswordUpdate;