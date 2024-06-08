import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.js';
import './FormSignUp.css';

const FormSignUp = () => {
    const [registerError, setRegisterError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await authService.register(values.username, values.email, values.password);
            console.log('Registro exitoso');
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro:', error);
            if (error.response && error.response.data) {
                console.error('Error en el registro:', error.response.data);
            } else {
                console.error('Error desconocido en el registro');
            }
            setRegisterError(true);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
        setRegisterError(true);
    };

    return (
        <>
            <Card title="REGISTRATE!" bordered={false} className='responsive-card'>
                <Form
                    name="username"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='User' />
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
                        {registerError && <p style={{ color: 'red' }}> Falló el registro </p>}
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Registrarse
                        </Button>
                    </Form.Item>
                    ¿Ya tienes cuenta? <a href="">Inicia sesión</a>
                </Form>
            </Card>
        </>
    );
};

export default FormSignUp;
