//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { DatePicker, Button, ConfigProvider } from 'antd';
import LayoutComponent from './components/Layout/index.jsx';
import './App.css'
import FormLogin from './components/FormLogin/index.jsx';
import ImageLogin from './components/ImageLogin/imginicio.jsx'
function App() {
  return (
    <ConfigProvider
      theme={{
        token:{
          colorPrimary: "#000000"
        }
      }}
      >
      <LayoutComponent
      leftColSize={{xs:0, sm:0, md:8, lg: 6}}
      rightColSize={{xs:24, sm:24, md:16, lg:18}}
      leftContent={<ImageLogin />}
      rightContent={<FormLogin />}
      />
    </ConfigProvider>
    /**<>
    <DatePicker />;
    </>*/
  )
}

export default App
