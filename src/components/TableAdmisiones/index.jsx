import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Menu, Dropdown, FloatButton, Modal} from 'antd';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import './TableAdmisiones.css';
import { useAuth } from '../../hooks/useAuth';
import { admisionesService } from '../../services/admisones';
import Modals from '../../components/Modals';


const TableAdmisiones = () => {
    const { logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);

    const handleOk = () => {
        // Lógica para manejar el botón OK de la primera modal
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        // Lógica para manejar el botón Cancelar de la primera modal
        setIsModalOpen(false);
    };

    const handleOk2 = () => {
        // Lógica para manejar el botón OK de la segunda modal
        setIsModal2Open(false);
    };

    const handleCancel2 = () => {
        // Lógica para manejar el botón Cancelar de la segunda modal
        setIsModal2Open(false);
    };

    

    useEffect(() => {
        const fetchAdmisiones = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const admisionesData = await admisionesService.admisiones(token);
                // Añadir clave única a cada elemento de los datos
                const formattedData = admisionesData.map((item, index) => ({
                    ...item,
                    key: index + 1, //Asignar un id generico
                }));
                setData(formattedData);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

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
        /*
        {
            title: 'N°',
            dataIndex: 'key',
            key: 'key',
        },
        */
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
            render: () => (
              <>
               
            
               <Modals />
              </>
            ),
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
            <Table columns={columns} dataSource={data} loading={loading} />
        </div>
    );
};

export default TableAdmisiones;
