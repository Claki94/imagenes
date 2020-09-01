import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({guardarTerminoFinal}) => {

    // State del termino a buscar
    const [termino, guardarTermino] = useState('');

    // State del error
    const [error, guardarError] = useState(false);
    
    // Funcion que se ejecuta cuando se lanza el evento submit del formulario
    const handleSubmit = e => {
        e.preventDefault();

        // Validar el formulario
        if(!termino.trim()) {
            guardarError(true);
            return;
        }

        // Mandar el termino al componente principal para hacer la busqueda
        guardarError(false);
        guardarTerminoFinal(termino);
    }

    return (  
        <form 
            className="mt-5"
            onSubmit={handleSubmit}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen"
                        onChange={e => guardarTermino(e.target.value)}
                        value={termino}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        placeholder="Buscar"
                    />
                </div>
            </div>

            {
                error
                ? <Error mensaje="Agrega un término de búsqueda" />
                : null
            }
        </form>
    );
}
 
export default Formulario;