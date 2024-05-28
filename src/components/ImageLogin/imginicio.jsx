import React from 'react';
import miImagen from '../../assets/img/inicio.jpg';

const Imginicio = () => {
    return (
        <div>
            {/* Utiliza la imagen importada en el src de la etiqueta img */}
            <img src={miImagen} alt="UNPOLLO" />
        </div>
    );
};

export default Imginicio;

