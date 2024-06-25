import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { useAuth } from '../../hooks/useAuth';
import { admisionesService } from '../../services/admisones';
import Modals from '../../components/Modals';
import './TableAdmisiones.css'; // Asegúrate de tener tu archivo CSS importado correctamente

const TableAdmisiones = () => {
    const { logout } = useAuth();
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

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            align: 'left', // Centrar el texto en esta columna
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            align: 'left', // Centrar el texto en esta columna
        },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            align: 'center', // Centrar el texto en esta columna
            render: status => (
                <Tag color={status.toString().toUpperCase() === 'TRUE' ? 'success' : 'error'}>
                    {status.toString().toUpperCase() === 'TRUE' ? 'Activa' : 'Inactiva'}
                </Tag>
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            align: 'center', // Centrar el contenido en esta columna
            render: (_, record) => (
                <Space>
                    <Modals type="edit" admisionId={record._id} fetchData={fetchAdmisiones} />
                    <Modals type="delete" admisionId={record._id} fetchData={fetchAdmisiones} />
                </Space>
            ),
        },
    ];

    return (
        <div className="table-header">
            <div className="table-header-title">
                <h3>Admisiones</h3>
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
