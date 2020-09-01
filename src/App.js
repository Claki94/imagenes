import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  // State del término usado en la búsqueda de la API
  const [terminoFinal, guardarTerminoFinal] = useState('');
  const [antiguoTerminoFinal, guardarAntiguoTerminoFinal] = useState('');
  const [busqueda, guardarBusqueda] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  // Función que se ejecuta tras el primer renderizado y cada vez que se modifique el estado de terminoFinal
  useEffect(() => {

    if(!terminoFinal) return;

    const consultarPixabay = async () => {

      // Reiniciamos la página actual cuando se modifica el terminoFinal y este es diferente al antiguo
      if(terminoFinal !== antiguoTerminoFinal) {
        guardarPaginaActual(1);
        guardarAntiguoTerminoFinal(terminoFinal);
      }

      const imagenesPorPagina = 30;
      const key = '';
      let url = `https://pixabay.com/api/?key=${key}&q=${terminoFinal}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      let respuesta = await Axios.get(url);

      // Calcular el total de las páginas
      guardarTotalPaginas(Math.ceil(respuesta.data.totalHits / imagenesPorPagina));

      // Guardar el resultado de la búsqueda
      guardarBusqueda(respuesta.data.hits);
      
      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'});
    }

    consultarPixabay();

  }, [terminoFinal, paginaActual]);

  // Definir la pagina antrior
  const paginaAnterior = () => {
    if(paginaActual > 1) {
      let nuevaPaginaActual = paginaActual - 1;
      guardarPaginaActual(nuevaPaginaActual);
    }
  }

  // Definir la pagina siguiente
  const paginaSiguiente = () => {
    if(paginaActual < totalPaginas) {
      let nuevaPaginaActual = paginaActual + 1;
      guardarPaginaActual(nuevaPaginaActual);
    }
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes en Pixabay</p>
        <Formulario 
          guardarTerminoFinal={guardarTerminoFinal}
        />
      </div>
      <div className="row justify-content-center mb-5">
        <ListadoImagenes 
          busqueda={busqueda}
        />

        { 
          (paginaActual === 1) 
            ? null
            : <button
                type="button"
                className="btn btn-info mr-1"
                onClick={paginaAnterior}
              >
                &laquo; Anterior
              </button>
        }

        {
          (paginaActual === totalPaginas)
          ? null
          : <button
              type="button"
              className="btn btn-info"
              onClick={paginaSiguiente}
            >
              Siguiente &raquo;
            </button>
        }
      </div>
    </div>
  );
}

export default App;
