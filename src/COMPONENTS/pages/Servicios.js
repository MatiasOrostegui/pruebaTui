import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Botones.css';
import '../Letras.css';
import '../../App.css';

const Servicios = () => {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);

  return (
    <div className='contenedorGeneral'>
      <div className='contenedor'>
        <Link to='/unico' className='btn-unico' onClick={closeMobileMenu}>
          <p className='p-btn-unico'>
            CARGA UNICA
          </p>
        </Link>
        <p className=''>
          ASDFGHJKLÑFDSARTYUIOUYTDFVBNM,.LKJHRGFGgfdhfgj
        </p>
        <Link to='/masivo' className='btn-masivo' onClick={closeMobileMenu}>
          <p className='p-btn-masivo'>
            CARGA MASIVA
          </p>
        </Link>
        <p className=''>
          dasfdghjklñjhgfdsasfghjkljhgfdsaDFGHJKLJHGFDSA
        </p>
    </div>  
  </div>
  );
}
 
export default Servicios;