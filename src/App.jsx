//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes';
import './App.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token:{
          colorPrimary: "#000000"
        }
      }}
      >
    <BrowserRouter>
    < AppRoutes/>
    </BrowserRouter>
    </ConfigProvider>
    /**<>
    <DatePicker />;
    </>*/
  )
}

export default App
