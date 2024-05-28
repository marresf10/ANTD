import React from 'react';
import LayoutComponent from '../../components/Layout/index.jsx';
import FormRegister from '../../components/FormSignIn/index.jsx';
import ImageLogin from '../../components/ImageLogin/imginicio.jsx'

const Register = () => {
    return (
        <LayoutComponent
        leftColSize={{xs:24, sm:24, md:16, lg: 18}}
        rightColSize={{xs:0, sm:0, md:8, lg:6}}
        leftContent={<ImageLogin />}
        rightContent={<FormRegister />}
      />
    );
};

export default Register;