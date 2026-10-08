let clickCount = 0;

const countButton = document.querySelector('#count-button');
const resetButton = document.querySelector('#reset-button');
const counter = document.querySelector('#counter');
const message = document.querySelector('#message');
const cityImage = document.querySelector('#city-image');
const interactionArea = document.querySelector('#interaction-area');
const coordinates = document.querySelector('#coordinates');

function updateCounter() {
  clickCount++;
  counter.textContent = clickCount;
  counter.style.color = clickCount % 2 === 0 ? '#2c70d6' : '#f06b45';
  message.textContent = `Já registou ${clickCount} clique${clickCount === 1 ? '' : 's'} no botão.`;
}

function resetCounter() {
  clickCount = 0;
  counter.textContent = clickCount;
  counter.style.color = '#f06b45';
  message.textContent = 'O contador foi reiniciado com um duplo clique.';
}

function highlightImage() {
  interactionArea.classList.add('is-active');
  message.textContent = 'A imagem está em destaque. O mouseover alterou o DOM.';
}

function restoreImage() {
  interactionArea.classList.remove('is-active');
  message.textContent = 'O cursor saiu da imagem. Passe novamente por cima para destacar.';
}

function showCoordinates(event) {
  const area = interactionArea.getBoundingClientRect();
  const x = Math.round(event.clientX - area.left);
  const y = Math.round(event.clientY - area.top);
  coordinates.textContent = `Posição do rato: ${x}px horizontal · ${y}px vertical`;
  coordinates.style.color = x % 2 === 0 ? '#8dc4ff' : '#fff';
}

countButton.addEventListener('click', updateCounter);
resetButton.addEventListener('dblclick', resetCounter);
cityImage.addEventListener('mouseover', highlightImage);
cityImage.addEventListener('mouseout', restoreImage);
interactionArea.addEventListener('mousemove', showCoordinates);
