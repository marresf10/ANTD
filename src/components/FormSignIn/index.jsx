import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './FormSignIn.css'

const FormSignIn = () => {
    const onFinish = (values) => {
        console.log('Success: ', values);
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
    }
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
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Por favor ingrese su contraseña'
                        }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder='Password'/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
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