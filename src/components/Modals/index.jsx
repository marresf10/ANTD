import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { admisionesService } from '../../services/admisones';

const Modals = ({ admisionId, type, fetchData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const token = localStorage.getItem('token');
            if (type === 'delete') {
                await admisionesService.deleteAdmissions(token, admisionId);
            } else if (type === 'add') {
                const values = await form.validateFields();
                const admissionData = { nombre: values.nombre };
                await admisionesService.addAdmision(token, admissionData);
            }
            setIsModalOpen(false);
            fetchData(); // Fetch data again to update the table
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={openModal}>
                {type === 'add' ? 'Agregar' : type === 'delete' ? 'Eliminar' : 'Abrir'}
            </Button>
            <Modal
                title={type === 'add' ? 'Agregar Admisión' : 'Eliminar Admisión'}
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={type === 'add' ? 'Agregar' : 'Eliminar'}
            >
                {type === 'delete' ? (
                    <p>¿Estás seguro que deseas eliminar la admisión {admisionId}?</p>
                ) : (
                    <Form form={form}>
                        <Form.Item
                            label="Nombre"
                            name="nombre"
                            rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default Modals;
