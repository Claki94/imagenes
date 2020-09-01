import React from 'react';
import Imagen from './Imagen';

const ListadoImagenes = ({busqueda}) => {

    if(!busqueda.length) return null;

    return (  
        <div className="col-12 p-5 row">
            {busqueda.map(imagen => (
                <Imagen
                    key={imagen.id}
                    imagen={imagen}
                />
            ))}
        </div>
    );
}
 
export default ListadoImagenes;