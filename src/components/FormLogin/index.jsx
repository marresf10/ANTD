import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import authService from '../../services/auth';
import './FormLogin.css'

const FormLogin = () => {

    const useAuthData = useAuth();
    console.log(useAuthData);
    
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true); //establece el estado de carga a true al enviar el formulario
        setLoginError(false);
        try{
            const response = await authService.loginF(values.username, values.password);
            if (response && response.data){
                localStorage.setItem('token', response.data.token);
                console.log(response.data.token)
                navigate('/');
            } else {
                console.error('Error en el inicio de sesión: Respuesta inesperada');
                setLoginError(true);
            } 
        }catch (error) {
            console.error('Error en el inicio de sesión:', error.response ? error.response.data : error.message);
            setLoginError(true);
        } finally {
            setLoading(false);
        }
        //console.log('Success: ', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
        setLoginError(true);
    }
    
    return (
        <>
            <Card
                title="Bienvenido de nuevo!"
                bordered={false}
                className='responsive-card'
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su contraseña'
                        }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='Password'/>
                    </Form.Item>
                    <Form.Item>
                        {loginError && <p style={{ color: 'red' }}>Credenciales incorrectas. Intentalo de nuevo.</p>}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                    ¿Aún no tienes cuenta? <a href="">Registrate</a>
                </Form>
            </Card>
        </>
    );
}

export default FormLogin;