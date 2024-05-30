import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FormLogin.css'

const FormLogin = () => {
    
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true); //establece el estado de carga a true al enviar el formulario
        try{
            const response = await axios.post('https://lizard-server.vercel.app/api/auth/signin', {
                email: values.username,
                password: values.password
            });
            console.log('Inicio de sesión exitoso:', response.data); //guarda el token en el almacenamiento local
            localStorage.setItem('token', response.data.token);
            navigate('/'); //redirige el usuario a la página principal
        } catch(error){
            console.error('Error en el inicio de sesión:', error.response.data);
            setLoginError(true);
        } finally {
            setLoading(false); //establece el estado de carga a false
        }
        //console.log('Success: ', values);
    }

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