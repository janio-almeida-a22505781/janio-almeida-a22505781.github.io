// =========================
// Estado inicial da página
// =========================
// A mesma paleta é usada pelos botões, pelo teclado e pelo select.
const pageColours = ['#2c70d6', '#f06b45', '#3b9b72', '#9a5bc7'];
let colourIndex = 0;
let timerValue = 0;
let counterValue = Number(localStorage.getItem('lab5-counter')) || 0;

// Elementos que serão atualizados pelo JavaScript.
const eventMessage = document.querySelector('#event-message');
const persistentCounter = document.querySelector('#persistent-counter');
const timer = document.querySelector('#timer');

// =========================
// Funções reutilizáveis
// =========================
function setPanelColour(panel, colour) {
  panel.style.backgroundColor = colour;
  eventMessage.textContent = `A cor do painel foi alterada para ${colour}.`;
}

// Arrow function: atualiza o contador e guarda o valor no Local Storage.
const updateCounterDisplay = () => {
  persistentCounter.textContent = counterValue;
  localStorage.setItem('lab5-counter', counterValue);
};

function count() {
  timerValue++;
  timer.textContent = timerValue;
}

// =========================
// Eventos de cores e teclado
// =========================
// querySelectorAll + forEach permitem ligar o mesmo evento a todos os botões.
document.querySelectorAll('button.color').forEach((button) => {
  button.addEventListener('click', () => {
    // dataset.color lê o valor guardado no atributo data-color.
    setPanelColour(button.closest('.panel'), button.dataset.color);
  });
});

// Cada tecla avança uma posição no array de cores.
document.addEventListener('keydown', () => {
  colourIndex = (colourIndex + 1) % pageColours.length;
  setPanelColour(document.querySelector('.colour-panel'), pageColours[colourIndex]);
  document.querySelector('#colour-explanation').textContent =
    `Tecla detetada: cor ${colourIndex + 1} de ${pageColours.length}. O operador % faz a sequência recomeçar no início.`;
});

// =========================
// Selects e contexto this
// =========================
// Numa função normal, this representa o select que originou o evento.
document.querySelector('#background-colour').addEventListener('change', function () {
  setPanelColour(this.closest('.panel'), this.value);
});

document.querySelector('#flex-direction').addEventListener('change', function () {
  document.querySelector('#balls').style.flexDirection = this.value;
});

// =========================
// Formulário
// =========================
document.querySelector('#user-form').onsubmit = (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const age = document.querySelector('#age').value;
  document.querySelector('#form-message').textContent = `Olá, o ${name} tem ${age}!`;
  event.currentTarget.reset();
};

// =========================
// Contador com Local Storage
// =========================
document.querySelector('#increment').addEventListener('click', () => {
  counterValue++;
  updateCounterDisplay();
});
document.querySelector('#decrement').addEventListener('click', () => {
  counterValue--;
  updateCounterDisplay();
});
document.querySelector('#reset').addEventListener('click', () => {
  counterValue = 0;
  updateCounterDisplay();
});

// =========================
// Inicialização e temporizador
// =========================
updateCounterDisplay();
setInterval(count, 1000);
