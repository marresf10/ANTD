import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, FileImageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.js';
import './FormSignUp.css';

const FormSignUp = () => {
    const [registerError, setRegisterError] = useState('');
    const [loading, setLoading] = useState(false);
    const [imgUrlError, setImgUrlError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); 
    };

    const validateImageURL = async (value) => {
        if (!value) {
            setImgUrlError('Por favor ingrese un link de imagen');
            return false;
        }
        try {
            const response = await fetch(value, { method: 'HEAD' });
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.startsWith('image/')) {
                setImgUrlError('');
                return true;
            } else {
                setImgUrlError('La URL no es una imagen válida');
                return false;
            }
        } catch (error) {
            setImgUrlError('No se pudo verificar la URL de la imagen');
            return false;
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        setRegisterError('');
        try {
            const isImageValid = await validateImageURL(values.imgurl);
            if (!isImageValid) {
                setLoading(false);
                return;
            }

            // Aquí asegúrate de que los nombres de los campos coincidan con lo que espera tu backend
            await authService.register(values.username, values.imgurl, values.email, values.password);
            console.log('Registro exitoso');
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro:', error);
            if (error.response && error.response.data) {
                console.error('Error en el registro:', error.response.data);
                setRegisterError(error.response.data.message || 'Error en el registro');
            } else {
                console.error('Error desconocido en el registro');
                setRegisterError('Error desconocido en el registro');
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
        setRegisterError('Error en el formulario, por favor revise los campos');
    };

    return (
        <>
            <Card title="REGISTRATE!" bordered={false} className='responsive-card'>
                <Form
                    name="register"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='User' />
                    </Form.Item>
                    <Form.Item
                        name="imgurl"
                        rules={[{ required: true, message: "Por favor ingrese un link de imagen" }]}
                        validateStatus={imgUrlError ? 'error' : ''}
                        help={imgUrlError}
                    >
                        <Input
                            prefix={<FileImageOutlined />}
                            placeholder="Link de imagen"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Por favor ingrese su correo' }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder='Correo' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='Password'/>
                    </Form.Item>
                    <Form.Item
                        name="password-confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Confirme su contraseña' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='Confirmar Password'/>
                    </Form.Item>
                    <Form.Item>
                        {registerError && <span style={{ color: 'red' }}>{registerError}</span>}
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Registrarse
                        </Button>
                    </Form.Item>
                    ¿Ya tienes una cuenta? <a href="#" onClick={handleLogin}>Inicia sesión</a>
                </Form>
            </Card>
        </>
    );
};

export default FormSignUp;
