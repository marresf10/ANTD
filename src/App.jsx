//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { DatePicker, Button, ConfigProvider } from 'antd';
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
      <DatePicker />
      <Button type="primary">Primary Button</Button>
    </ConfigProvider>
    /**<>
    <DatePicker />;
    </>*/
  )
}

export default App
