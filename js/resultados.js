document.addEventListener('DOMContentLoaded', function () {
    // Obtener el puntaje almacenado
    var puntajeFinal = localStorage.getItem('puntajeFinal') || '0';
    var aciertos = localStorage.getItem('aciertos') ? JSON.parse(localStorage.getItem('aciertos')) : [];
    var errores = localStorage.getItem('errores') ? JSON.parse(localStorage.getItem('errores')) : [];

    // Almacenar resultados en localStorage
    var resultados = {
        aciertos: aciertos.length,
        errores: errores.length
    };
    localStorage.setItem('resultados', JSON.stringify(resultados));

    document.getElementById('puntajeFinal').textContent = puntajeFinal;
    document.getElementById('aciertos').textContent = 'Aciertos: ' + aciertos.length;
    document.getElementById('errores').textContent = 'Errores: ' + errores.length;
});

function volverAJugar() {
    // Borrar los datos de la partida
    localStorage.removeItem('aciertos');
    localStorage.removeItem('errores');
    localStorage.removeItem('puntajeFinal');

    // Redirigir a la página principal para volver a jugar
    window.location.href = 'vj_anuncio.html';
}

function regresarAlMenu() {
    // Borrar los datos de la partida
/*     localStorage.removeItem('aciertos');
    localStorage.removeItem('errores');
    localStorage.removeItem('puntajeFinal'); */

    // Redirigir al menú principal
    window.location.href = 'vj_menu.html';
}

//JS GRAFICA
document.addEventListener('DOMContentLoaded', function() {
    // Obtener datos de localStorage
    var aciertos = localStorage.getItem('aciertos') ? JSON.parse(localStorage.getItem('aciertos')) : [];
    var errores = localStorage.getItem('errores') ? JSON.parse(localStorage.getItem('errores')) : [];

    // Calcular porcentaje de aciertos y errores
    var totalPreguntas = aciertos.length + errores.length;
    var porcentajeAciertos = (aciertos.length / totalPreguntas) * 100;
    var porcentajeErrores = (errores.length / totalPreguntas) * 100;

    // Mostrar gráfico de pastel
    var ctx = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Aciertos', 'Errores'],
            datasets: [{
                data: [porcentajeAciertos, porcentajeErrores],
                backgroundColor: ['#7B22C2', '#FDBD19'],
            }],
        },
    });

    // Mostrar información adicional
    console.log('Porcentaje de aciertos:', porcentajeAciertos.toFixed(2) + '%');
    console.log('Porcentaje de errores:', porcentajeErrores.toFixed(2) + '%');
});

function descargarEstadisticas() {
    var canvas = document.getElementById('chart');
    var enlaceDescarga = document.createElement('a');

    // Convierte el contenido del canvas en una URL de datos
    var imagenDataURL = canvas.toDataURL('image/png');

    // Establece la URL de datos como el enlace de descarga
    enlaceDescarga.href = imagenDataURL;

    // Asigna un nombre de archivo para la descarga
    enlaceDescarga.download = 'estadisticas.png';

    // Simula un clic en el enlace de descarga para iniciar la descarga
    enlaceDescarga.click();
}

//ANIMACION
document.addEventListener("DOMContentLoaded", function() {
    var textContainer = document.querySelector('.animacion');

    // Agregar la clase 'fade-in' después de un breve retraso (100ms) para permitir la animación en la primera carga.
    setTimeout(function() {
        textContainer.classList.add('fade-in');
    }, 100);
});

// Eliminar y volver a agregar la clase 'fade-in' después de recargar la página.
window.addEventListener("beforeunload", function() {
    var textContainer = document.querySelector('.animacion');
    textContainer.classList.remove('fade-in');
});
