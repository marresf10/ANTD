import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormSignIn.css'

const FormSignIn = () => {
    //Estado de error de registro
    const [registerError, setRegisterError] = useState(false);
    //Estado de carga
    const [loading, setLoading] = useState(false);
    //importar rutas
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);//establece el estado de carga true al enviar el formulario
        try{
            const response = await axios.post('https://lizard-server.vercel.app/api/auth/signup', {
                username: values.username,
                email: values.email,
                password: values.password,
                roles: ['moderador']
            });
            console.log('Registro exitoso:', response.data);
            navigate('/login');
        }catch(error){
            console.error('Error en el registro:', error.response.data);
            setRegisterError(true);
        }finally{
            setLoading(false);
        }
        //console.log('Success: ', values);
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
        setRegisterError(true);
    }

    const validatePassword = ({ getFieldValue }) => ({
        validator(_, value){
            if(!value || getFieldValue('password') === value){
                return Promise.resolve();
            }
            return Promise.reject(new Error('Las contraseñas no coinciden'));
        }
    });
    return (
        <>
            <Card
                title="REGISTRATE!"
                bordered={false}
                className='responsive-card'
            >
                <Form
                    name="username"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su usuario'
                        }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='User' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su correo'
                        }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder='Correo' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su contraseña'
                        }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='Password'/>
                    </Form.Item>
                    <Form.Item
                        name="password-confirm"
                        rules={[{
                            required: true,
                            message: 'Confirme su contraseña'
                        }]}
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
}

export default FormSignIn;