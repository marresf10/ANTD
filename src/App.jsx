//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { DatePicker, Button, ConfigProvider } from 'antd';
import LayoutComponent from './components/Layout/index.jsx';
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
      <LayoutComponent></LayoutComponent>
    </ConfigProvider>
    /**<>
    <DatePicker />;
    </>*/
  )
}

export default App
