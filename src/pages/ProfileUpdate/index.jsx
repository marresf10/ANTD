import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from 'antd';
import FormUpdateProfile from '../../components/FormUpdateProfile';

const Profile = () => {
    const { user, logout } = useAuth();
    return (
        <>
        <div>
        <FormUpdateProfile />
        </div>
        </>
    );
};

export default Profile;