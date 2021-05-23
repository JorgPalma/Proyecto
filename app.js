$(document).ready(function(){ 

    $("#ubicacion").click(locate)
    $("#cerrar-clima").click(function(){
        document.getElementById("ventana-clima").style.display = "none"
    })

    function locate() {
       const localizar = position => {
        let latitude = (position.coords.latitude).toFixed(6)
        let longitude = (position.coords.longitude).toFixed(6)

        $.get({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ed48c8d60ad404e828cd5b28de59dce5`,  
            success: function(datos) { 
                console.log(datos)
                const ciudad = {
                    nombre: datos.name,
                    min: datos.main.temp_min,
                    max: datos.main.temp_max,
                    actual: datos.main.temp,

                }
                document.querySelector('#nombre-ciudad').innerHTML = ciudad.nombre
                document.querySelector('#minima').innerHTML = (ciudad.min-273.15).toFixed(1) + "°C"
                document.querySelector('#maxima').innerHTML = (ciudad.max-273.15).toFixed(1) + "°C"
                document.querySelector('#actual').innerHTML = (ciudad.actual-273.15).toFixed(1) + "°C"
            },
            error: function() {
                console.error("Sin Respuesta"); 
            }
            })  
    }
    navigator.geolocation.getCurrentPosition(localizar) 
    }
    
})