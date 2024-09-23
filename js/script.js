fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbarContainer').innerHTML = data;
    });

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-50px"; /* Oculta la barra al desplazarse hacia abajo */
    }
    prevScrollpos = currentScrollPos;
}

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");

    startButton.addEventListener("click", function() {
        // Aquí puedes agregar código para desplazarte suavemente a la sección 2
        document.getElementById('section2').scrollIntoView({behavior: 'smooth'});
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const arrowDown = document.getElementById("arrowDown");

    arrowDown.addEventListener("click", function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        document.getElementById('section2').scrollIntoView({ behavior: 'smooth' });
    });

    arrowUp.addEventListener("click", function(e) {
        e.preventDefault(); // Evita el comportamiento predeterminado del enlace
        document.getElementById('section1').scrollIntoView({ behavior: 'smooth' });
    });
});

var puntaje = 0;
var letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // Agrega más letras según sea necesario
var index = 0;
var currentOptions = [];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function mostrarRespuestaMensaje(esCorrecta) {
    var mensajeElement = document.getElementById('respuestaMensaje');
    var ronda = index + 1;

    if (esCorrecta) {
        localStorage.setItem('aciertos', JSON.stringify([...JSON.parse(localStorage.getItem('aciertos') || '[]'), ronda]));
        mensajeElement.innerHTML = '<span style="color: green; font-weight: bold;">¡Correcto!</span> +1pt';
    } else {
        localStorage.setItem('errores', JSON.stringify([...JSON.parse(localStorage.getItem('errores') || '[]'), ronda]));
        mensajeElement.innerHTML = 'Incorrecto. La respuesta correcta es: ' + letras[index - 1] + ' <span style="color: red; font-weight: bold;">-1pt</span>';
    }
}


function verificarRespuesta(opcionSeleccionada) {
    var letraCorrecta = letras[index - 1];
    var puntajeElement = document.getElementById('puntaje');
    var continuarDiv = document.getElementById('continuarDiv');
    var botones = document.getElementsByClassName('btn1');

    for (var i = 0; i < botones.length; i++) {
        botones[i].setAttribute('disabled', 'true');
    }

    if (letraCorrecta === currentOptions[opcionSeleccionada]) {
        puntaje++;
        mostrarRespuestaMensaje(true);
        console.log('bien: '+puntaje);
    } else {
        if (puntaje > 0) {
            puntaje--;
        }
        mostrarRespuestaMensaje(false);
        console.log('mal: '+puntaje);
    }

    continuarDiv.style.display = 'block';
}

function cambiarLetra() {
    var continuarDiv = document.getElementById('continuarDiv');
    continuarDiv.style.display = 'none';

    var botones = document.getElementsByClassName('btn1');
    for (var i = 0; i < botones.length; i++) {
        botones[i].removeAttribute('disabled');
    }

    if (index < letras.length) {
        var imagen = document.getElementById('imagenLetra');
        imagen.src = `img/abecedario/${letras[index]}.png`;

        currentOptions = [letras[index]];
        for (var i = 0; i < 2; i++) {
            var randomIndex = Math.floor(Math.random() * letras.length);
            while (currentOptions.includes(letras[randomIndex])) {
                randomIndex = Math.floor(Math.random() * letras.length);
            }
            currentOptions.push(letras[randomIndex]);
        }

        currentOptions = shuffle(currentOptions);

        var botones = document.getElementsByClassName('btn1');
        for (var i = 0; i < botones.length; i++) {
            botones[i].innerHTML = `<span>${i + 1}</span><span style="flex: 1; text-align: center;">${currentOptions[i]}</span>`;
            botones[i].setAttribute('onclick', `verificarRespuesta(${i})`);
        }
        index++;
    } else {
        if (index >= letras.length) {
            // Almacenar el puntaje final
            localStorage.setItem('puntajeFinal', puntaje);
        
            // Redirigir a la página de resultados
            window.location.href = 'resultados.html';
        }
    }
}


document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.key) {
        case '1':
            verificarRespuesta(0);
            break;
        case '2':
            verificarRespuesta(1);
            break;
        case '3':
            verificarRespuesta(2);
            break;
        default:
            break;
    }
};

shuffle(letras);
cambiarLetra();