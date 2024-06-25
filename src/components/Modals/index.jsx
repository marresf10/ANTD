import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Switch, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { admisionesService } from '../../services/admisones';
import './Modals.css';

const Modals = ({ admisionId, type, fetchData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchAdmissionData = async () => {
            try {
                const token = localStorage.getItem('token');
                const admissionData = await admisionesService.getAdmision(token, admisionId);
                if (type === 'edit') {
                    form.setFieldsValue({
                        nombre: admissionData.nombre,
                        activo: admissionData.activo
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (isModalOpen && type === 'edit') {
            fetchAdmissionData();
        }
    }, [isModalOpen, type, admisionId, form]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const openNotificationWithIcon = (type, message, icon) => {
        notification.open({
            message: message,
            icon: icon,
            placement: 'bottomRight'
        });
    };

    const handleOk = async () => {
        try {
            const token = localStorage.getItem('token');
            if (type === 'delete') {
                await admisionesService.deleteAdmissions(token, admisionId);
                openNotificationWithIcon('success', 'Eliminado exitosamente', <DeleteOutlined style={{ color: 'red' }} />);
            } else {
                const values = await form.validateFields();
                if (type === 'add') {
                    const admissionData = { nombre: values.nombre, activo: values.activo };
                    await admisionesService.addAdmision(token, admissionData);
                    openNotificationWithIcon('success', 'Agregado exitosamente', <PlusOutlined style={{ color: 'green' }} />);
                } else if (type === 'edit') {
                    const updatedData = { nombre: values.nombre, activo: values.activo };
                    await admisionesService.updateAdmision(token, admisionId, updatedData);
                    openNotificationWithIcon('success', 'Editado exitosamente', <EditOutlined style={{ color: 'blue' }} />);
                }
                form.resetFields();
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    let icon;
    let buttonText;
    if (type === 'add') {
        icon = <PlusOutlined />;
        buttonText = 'Agregar';
    } else if (type === 'edit') {
        icon = <EditOutlined />;
        buttonText = '';
    } else if (type === 'delete') {
        icon = <DeleteOutlined />;
        buttonText = '';
    }

    return (
        <>
            <Button className={type === 'edit' ? 'edit-button' : type === 'delete' ? 'delete-button' : type === 'add' ? 'add-button' : ''} icon={icon} onClick={openModal}>
                {buttonText}
            </Button>
            <Modal
                title={type === 'add' ? 'Agregar Admisión' : type === 'delete' ? 'Eliminar Admisión' : 'Editar Admisión'}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={type === 'add' ? 'Agregar' : type === 'delete' ? 'Eliminar' : 'Guardar'}
            >
                {type === 'delete' ? (
                    <p>¿Estás seguro que deseas eliminar la admisión?</p>
                ) : (
                    <Form form={form}>
                        <Form.Item
                            label="Nombre"
                            name="nombre"
                            rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
                        >
                            <Input />
                        </Form.Item>
                        {type !== 'delete' && (
                            <Form.Item
                                label="Activo"
                                name="activo"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <Switch />
                            </Form.Item>
                        )}
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default Modals;
