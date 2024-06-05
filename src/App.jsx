import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#000000"
            }
          }}
        >
          <AppRoutes />
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
