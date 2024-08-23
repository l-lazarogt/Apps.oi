//Creado por © MOx Innovation 2023 - Derechos Reservados - licencia MIT

$.getJSON('./assets/api/config.json', (query)=>{
    var info = query.config.info
    var background = query.config.background
    var color = query.config.colorText
    var lottie = query.config.lottie 
    var borde = query.config.borde
    var nombre = query.config.nombre
    config(info, background, color, lottie, borde, nombre)    
})

function config(info, background, color, lottie, borde, nombre){
    setInterval(() => {
        $.getJSON(info, (data) => {
            var img = data.art
            var nombre = data.title
            $('#album').attr('src', img);
            $('#Tema').text(nombre);
        })
    }, 300)
    $('#animacion').html(`<lottie-player class="lottie" src="${lottie}" background="transparent" speed="1" style="width: 100%;  margin-top: -60px;" loop autoplay></lottie-player>`)
    $('#body').css('background-color', background)
    $('#body').css('color', color)
    $('#album').css('border', `5px solid ${borde}`)
    $('#nombreRadio').text(nombre)
}

function carga() {
    $('#album').removeClass('d-none');               
    $('#album').addClass('animate__zoomIn');
    $('#spinner').css('display', 'none');
} 