import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Menu, Dropdown } from 'antd';
import { PlusOutlined, CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import './TableAdmisiones.css';
import { useAuth } from '../../hooks/useAuth';
import { admisionesService } from '../../services/admisones';
import Modals from '../../components/Modals';

const TableAdmisiones = () => {
    const { logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAdmisiones = async () => {
        try {
            const token = localStorage.getItem('token');
            const admisionesData = await admisionesService.admisiones(token);
            const formattedData = admisionesData.map((item, index) => ({
                ...item,
                key: index + 1,
            }));
            setData(formattedData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmisiones();
    }, []);

    const handleLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            render: status => (
                <Tag color={status.toString().toUpperCase() === 'TRUE' ? 'success' : 'error'}>
                    {status.toString().toUpperCase() === 'TRUE' ? 'Activa' : 'Inactiva'}
                </Tag>
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <>
                    <Modals type="delete" admisionId={record._id} fetchData={fetchAdmisiones} />
                    <Modals type="edit" admisionId={record._id} fetchData={fetchAdmisiones} />
                </>
            ),
        },
    ];

    return (
        <div className="table-header">
            <div className="table-header-title">
                <h2>Admisiones</h2>
                <Modals type="add" fetchData={fetchAdmisiones} />
            </div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default TableAdmisiones;
