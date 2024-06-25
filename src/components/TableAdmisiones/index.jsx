import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { admisionesService } from '../../services/admisones';
import Modals from '../../components/Modals';
import './TableAdmisiones.css';

const TableAdmisiones = () => {
    const { user, logout } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const adminRoleId = '666b5995e842a28618ccfc95'; // ID del rol de admin

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
            console.error('Error al obtener las admisiones:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmisiones();
    }, []);

    const handleLogout = () => {
        logout();
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            align: 'left',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            align: 'left',
        },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            align: 'center',
            render: status => (
                <Tag color={status.toString().toUpperCase() === 'TRUE' ? 'success' : 'error'}>
                    {status.toString().toUpperCase() === 'TRUE' ? 'Activa' : 'Inactiva'}
                </Tag>
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            align: 'center',
            render: (_, record) => (
                user && user.roles && user.roles.includes(adminRoleId) ? (
                    <Space>
                        <Modals type="edit" admisionId={record._id} fetchData={fetchAdmisiones} />
                        <Modals type="delete" admisionId={record._id} fetchData={fetchAdmisiones} />
                    </Space>
                ) : null
            ),
        },
    ];

    return (
        <div className="table-header">
            <div className="table-header-title">
                <h3>Admisiones</h3>
                {user && user.roles && user.roles.includes(adminRoleId) && (
                    <Modals type="add" fetchData={fetchAdmisiones} />
                )}
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