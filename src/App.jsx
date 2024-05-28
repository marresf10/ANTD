import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import LayoutComponent from './components/Layout/index.jsx';
import FormLogin from './components/FormLogin';
import FormSignIn from './components/FormSignIn';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000"
        }
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LayoutComponent />}>
            <Route path="/login" element={<FormLogin />} />
            <Route path="/register" element={<FormSignIn />} />
            <Route index element={<FormLogin />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;


