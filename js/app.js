import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    //obtener datos del formulario
    const artista = document.querySelector('#artista').value,
        cancion = document.querySelector('#cancion').value;

        if(artista === '' || cancion === ''){
            //el usuario deja los campos vacios, se muestra el error
            UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
            UI.divMensajes.classList.add('error');
            setTimeout(() => {
                UI.divMensajes.innerHTML = '';
                UI.divMensajes.classList.remove('error');
            }, 3000)
        }else {
            //el formulario esta competo, se hace la consulta a la API :O
            const api = new API(artista, cancion);
            api.consultarAPI()
            .then(data => {
                if(data.respuesta.lyrics){
                    //La canción existe y se muestra la información
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                }else{
                    //el usuario deja los campos vacios, se muestra el error
                    UI.divMensajes.innerHTML = 'La canción o artista no coinciden prueba con otra busqueda';
                    UI.divMensajes.classList.add('error');
                    setTimeout(() => {
                    UI.divMensajes.innerHTML = '';
                    UI.divMensajes.classList.remove('error');
                    UI.formularioBuscar.reset();
                    }, 3000)
                }
            })

        }
    
})