import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from 'antd';
import FormProfile from '../../components/FormProfile';

const Profile = () => {
    const { user, logout } = useAuth();
    return (
        <>
        <div>
        <FormProfile />
        </div>
        </>
    );
};

export default Profile;