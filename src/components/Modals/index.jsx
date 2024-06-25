import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Switch } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'; // Importar los iconos necesarios
import { admisionesService } from '../../services/admisones';
import './Modals.css'; // Importar tu archivo CSS para los estilos específicos de Modals

const Modals = ({ admisionId, type, fetchData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Utiliza el hook useForm para obtener la instancia del formulario

    useEffect(() => {
        const fetchAdmissionData = async () => {
            try {
                const token = localStorage.getItem('token');
                const admissionData = await admisionesService.getAdmision(token, admisionId);
                // Establecer los valores en los campos del formulario solo en la modal de editar
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

    const handleOk = async () => {
        try {
            const token = localStorage.getItem('token');
            if (type === 'delete') {
                await admisionesService.deleteAdmissions(token, admisionId);
            } else {
                const values = await form.validateFields();
                if (type === 'add') {
                    // Añadir la admisión con el valor de activo
                    const admissionData = { nombre: values.nombre, activo: values.activo };
                    await admisionesService.addAdmision(token, admissionData);
                } else if (type === 'edit') {
                    // Actualizar la admisión con los nuevos valores
                    const updatedData = { nombre: values.nombre, activo: values.activo };
                    await admisionesService.updateAdmision(token, admisionId, updatedData);
                }
                form.resetFields(); // Restablecer el formulario después de agregar/editar
            }
            setIsModalOpen(false);
            fetchData(); // Actualizar los datos de la tabla
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Determinar qué icono y texto usar según el tipo de modal
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
                                initialValue={true} // Establece el valor inicial del Switch a true (activo por defecto)
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
