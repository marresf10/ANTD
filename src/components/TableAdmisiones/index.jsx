import React, { useState } from 'react';
import { Space, Table, Tag, Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './TableAdmisiones.css';
import { useAuth } from '../../hooks/useAuth';

const TableAdmisiones = () => {
    const { logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const columns = [
        {
            title: 'N°',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: status => (
                <Tag color={status === 'activo' ? 'green' : 'volcano'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'ENE-FEB 2022',
            status: 'activo',
        },
        {
            key: '2',
            name: 'MAR-ABR 2022',
            status: 'inactivo',
        },
        {
            key: '3',
            name: 'MAY-JUN 2022',
            status: 'activo',
        },
    ];

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a onClick={handleLogout}>Logout</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a>Profile</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="table-header">Admisiones
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default TableAdmisiones;
