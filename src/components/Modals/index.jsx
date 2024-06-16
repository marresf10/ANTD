import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { deleteAdmissionsService } from '../../services/eliminarAdmision';

const Modals = ({ admisionId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = async () => {
        try {
            const token = localStorage.getItem('token');
            await deleteAdmissionsService.deleteAdmissions(token, admisionId);
            Modal.confirm({
                title: 'Admisión eliminada correctamente',
                onOk: () => {
                    setIsModalOpen(false);
                    window.location.reload();
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const openDeleteModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Modal
                title="Eliminar Admisión"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>¿Estás seguro que deseas eliminar la admisión {admisionId}?</p>
            </Modal>
            <Button>Editar</Button>
            <Button onClick={openDeleteModal}>Eliminar</Button>
        </>
    );
};

export default Modals;
