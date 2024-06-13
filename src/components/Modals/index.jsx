import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import { ReadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ModalEditarAdmision = ({ visible, onOk, onCancel }) => {
    const [form] = Form.useForm();

    return (
        <Modal title="Editar Admisión" open={visible} onOk={() => { form.submit(); }} onCancel={onCancel}>
            <Form
                form={form}
                name="normal_admision"
                initialValues={{ Estatus: 'Activa' }}
                onFinish={onOk}
            >
                <Form.Item
                    name="nombre"
                    rules={[{
                        required: true,
                        message: 'Por favor ingrese un nombre de admisión'
                    }]}
                >
                    <Input prefix={<ReadOutlined />} placeholder='Nombre de la admisión' />
                </Form.Item>
                <Form.Item name="Estatus" label="Estatus" rules={[{
                        required: true,
                        message: 'Por favor ingrese un estatus'
                    }]}>
                    <Select
                        placeholder="Selecciona un status por favor"
                        allowClear
                    >
                        <Option value="Activa">Activa</Option>
                        <Option value="Inactiva">Inactiva</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const ModalEliminarAdmision = ({ visible, onOk, onCancel }) => {
    return (
        <Modal title="Eliminar Admisión" visible={visible} onOk={onOk} onCancel={onCancel}>
            <p>¿Estás seguro que deseas eliminar esta admisión?</p>
        </Modal>
    );
};

const Modals = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);

    const handleOk = (values) => {
        console.log('Form values:', values);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk2 = () => {
        setIsModal2Open(false);
    };

    const handleCancel2 = () => {
        setIsModal2Open(false);
    };

    return (
        <>
            <ModalEditarAdmision visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
            <ModalEliminarAdmision visible={isModal2Open} onOk={handleOk2} onCancel={handleCancel2} />
            <Button onClick={() => setIsModalOpen(true)}>Editar</Button>
            <Button onClick={() => setIsModal2Open(true)}>Eliminar</Button>
        </>
    );
};

export default Modals;
