const rounds = ['pronombres', 'adjetivos', 'verbos', 'sustantivos'];
let currentRound = 0;
let correctPairs = 0;
let totalCorrectPairs = 0;
let totalIncorrectPairs = 0;

const pairs = {
  pronombres: ['yo', 'tú', 'ellos', 'nosotros'],
  adjetivos: ['alta', 'contenta', 'buena', 'sucio'],
  verbos: ['dormir', 'comer', 'enseñar', 'olvidar'],
  sustantivos: ['alumno', 'profesor', 'clase', 'colegio']
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

let selectedImage = null;
let selectedWord = null;

const initializeGame = () => {
  const imagesContainer = document.getElementById('images-container');
  const wordsContainer = document.getElementById('words-container');
  const nextBtn = document.getElementById('next-btn');

  nextBtn.style.display = 'none';
  nextBtn.disabled = true;

  const currentRoundName = rounds[currentRound];
  const shuffledWords = shuffleArray(pairs[currentRoundName]);
  const shuffledImages = shuffleArray([...shuffledWords]);

  imagesContainer.innerHTML = '';
  wordsContainer.innerHTML = '';

  shuffledImages.forEach((image) => {
    const imgElement = document.createElement('img');
    imgElement.src = `img/gramatica/${image}.png`;
    imgElement.dataset.word = image;
    imgElement.addEventListener('click', () => selectImage(imgElement));
    imagesContainer.appendChild(imgElement);
  });

  shuffledWords.forEach((word) => {
    const wordButton = document.createElement('button');
    wordButton.textContent = word;
    wordButton.dataset.word = word;
    wordButton.addEventListener('click', () => selectWord(wordButton));
    wordsContainer.appendChild(wordButton);
  });
};

const selectImage = (imgElement) => {
  selectedImage = imgElement;
  checkMatch();
};

const selectWord = (wordButton) => {
  selectedWord = wordButton;
  checkMatch();
};

const checkMatch = () => {
  const imagesContainer = document.getElementById('images-container');
  const wordsContainer = document.getElementById('words-container');
  const nextBtn = document.getElementById('next-btn');

  if (selectedImage && selectedWord) {
    const isAlreadyMatched = selectedImage.classList.contains('matched');
    const isWordMatched = selectedWord.classList.contains('matched');

    if (!isAlreadyMatched && !isWordMatched) {
      if (selectedImage.dataset.word === selectedWord.dataset.word) {
        correctPairs++;

        selectedImage.classList.add('matched');
        selectedWord.classList.add('matched');
        selectedWord.disabled = true;

        console.log('¡Correcto!');
      } else {
        console.log('Incorrecto');
        totalIncorrectPairs++;
      }
    }

    selectedImage = null;
    selectedWord = null;

    // Verificar si todas las respuestas son correctas para mostrar el botón de siguiente ronda
    const totalPairsInRound = pairs[rounds[currentRound]].length;
    if (correctPairs === totalPairsInRound) {
      nextBtn.style.display = 'block';
      nextBtn.disabled = false; // Habilitar el botón
    } else {
      nextBtn.style.display = 'none';
      nextBtn.disabled = true; // Deshabilitar el botón
    }
  }
};

const nextRound = () => {
  currentRound++;
  totalCorrectPairs += correctPairs;

  correctPairs = 0;
  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.display = 'none';
  nextBtn.disabled = true;

  if (currentRound === rounds.length) {
    displayResults();
  } else {
    initializeGame();
  }
};

function displayResults() {
  var punFin = Math.abs(totalCorrectPairs - totalIncorrectPairs)
  // Almacenar el puntaje final
  localStorage.setItem('correcto', totalCorrectPairs);
  localStorage.setItem('incorrecto', totalIncorrectPairs);
  localStorage.setItem('puntajeFin', punFin);
        
  // Redirigir a la página de resultados
  window.location.href = 'resultados2.html';
}

initializeGame();
