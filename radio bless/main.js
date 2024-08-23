// Derechos de autor de Difusion GT 2024 - Todos los derechos reservados

$(document).ready(function () {
    // Carga la configuración inicial desde config.json
    $.getJSON('./assets/api/config.json', (query) => {
        const { info, background, colorText, lottie, borde, nombre } = query.config;
        aplicarConfig(background, colorText, lottie, borde, nombre);
        iniciarActualizacion(info);
    });
});

/**
 * Aplica la configuración inicial a los elementos de la página.
 * 
 * @param {string} background - El color de fondo de la página.
 * @param {string} color - El color del texto de la página.
 * @param {string} lottie - La URL de la animación Lottie.
 * @param {string} borde - El color del borde de la imagen del álbum.
 * @param {string} nombre - El nombre de la radio.
 */
function aplicarConfig(background, color, lottie, borde, nombre) {
    $('#animacion').html(`
        <lottie-player class="lottie" src="${lottie}" background="transparent" speed="1" style="width: 100%; margin-top: -60px;" loop autoplay>
        </lottie-player>
    `);
    $('#body').css({
        'background-color': background,
        'color': color
    });
    $('#album').css('border', `3px solid ${borde}`);
    $('#nombreRadio').text(nombre);
}

/**
 * Inicia la actualización periódica de los datos desde la URL proporcionada.
 * 
 * @param {string} infoUrl - La URL de donde se obtendrán los datos.
 */
function iniciarActualizacion(infoUrl) {
    // Obtener los datos inicialmente al cargar la página
    obtenerDatos(infoUrl);

    // Actualizar los datos cada cierto intervalo de tiempo
    setInterval(() => {
        obtenerDatos(infoUrl);
    }, 3000); // Intervalo ajustado a 3000 ms (3 segundos)
}

/**
 * Obtiene y actualiza los datos de los metadatos.
 * 
 * @param {string} infoUrl - La URL de donde se obtendrán los datos.
 */
function obtenerDatos(infoUrl) {
    $.getJSON(infoUrl, (data) => {
        const { art, title } = data;
        
        // Comprobar si la imagen del álbum necesita actualizarse
        actualizarImagen(art);

        // Actualizar el título del tema
        actualizarTitulo(title);
    }).fail((error) => {
        console.error('Error fetching data:', error);
    });
}

/**
 * Actualiza la imagen del álbum de manera suave y discreta.
 * 
 * @param {string} src - La URL de la imagen.
 */
function actualizarImagen(src) {
    const imgElement = $('#album');
    const newSrc = `${src}?${new Date().getTime()}`; // Agregar un timestamp para evitar caché

    // Crear una nueva imagen para precargar la nueva fuente
    const tempImg = new Image();
    tempImg.src = newSrc;
    tempImg.onload = function() {
        // Cuando la nueva imagen se haya cargado, actualizar la imagen visible sin animaciones abruptas
        imgElement.attr('src', newSrc);
    };
}

/**
 * Actualiza el título del tema.
 * 
 * @param {string} title - El título del tema.
 */
function actualizarTitulo(title) {
    $('#Tema').text(title);
}

/**
 * Maneja la carga de la imagen del álbum.
 */
function carga() {
    $('#album').removeClass('d-none').addClass('animate__zoomIn');
    $('#spinner').css('display', 'none');
}
// Derechos de autor de Difusion GT 2024 - Todos los derechos reservados
