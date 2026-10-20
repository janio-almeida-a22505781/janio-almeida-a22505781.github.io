// declaração de variáveis
const nodeInputNumero = document.querySelector('#colecao input[type="number"]');
const nodeInputSubmit = document.querySelector('#colecao button[type="submit"]');
const nodeUlColecao = document.querySelector('#colecao ul');
const nodeUlRepetidos = document.querySelector('#repetidos ul');
const nodeTotalColecao = document.querySelector('#colecao #total-colecao');
const nodeTotalRepetidos = document.querySelector('#repetidos #total-repetidos');
const form = document.querySelector('#colecao form');
const colecao = carregarLista('colecao');
const repetidos = carregarLista('repetidos');

// B. event handlers
function carregarLista(chave) {
  const dados = localStorage.getItem(chave);

  if (!dados) {
    return [];
  }

  try {
    const lista = JSON.parse(dados);
    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    console.error(`Não foi possível carregar a lista "${chave}".`, error);
    return [];
  }
}

function guardaDados() {
  localStorage.setItem('colecao', JSON.stringify(colecao));
  localStorage.setItem('repetidos', JSON.stringify(repetidos));
}

function guardaCarta() {
  const numero = Number(nodeInputNumero.value);

  if (!Number.isInteger(numero) || numero < 1) {
    return;
  }

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
  }

  guardaDados();
  atualizaLista(colecao, nodeUlColecao);
  atualizaLista(repetidos, nodeUlRepetidos);
  nodeInputNumero.value = '';
}

function atualizaLista(lista, nodeUl) {
  nodeUl.textContent = '';

  lista.forEach((numero) => {
    const item = document.createElement('li');
    item.textContent = `Cromo ${numero}`;

    if (lista === repetidos) {
      item.innerHTML = `Cromo ${numero} <button type="button" data-numero="${numero}">Eliminar</button>`;
    }

    nodeUl.append(item);
  });

  if (lista === colecao) {
    nodeTotalColecao.textContent = lista.length;
  } else if (lista === repetidos) {
    nodeTotalRepetidos.textContent = lista.length;
  }

  associaBotoesEliminar();
}

function associaBotoesEliminar() {
  nodeUlRepetidos.querySelectorAll('button').forEach((botao) => {
    botao.addEventListener('click', () => {
      const numero = Number(botao.dataset.numero);
      const indice = repetidos.indexOf(numero);

      if (indice !== -1) {
        repetidos.splice(indice, 1);
        repetidos.sort((a, b) => a - b);
        guardaDados();
        atualizaLista(repetidos, nodeUlRepetidos);
      }
    });
  });
}

// C. event listeners
form.onsubmit = (event) => {
  event.preventDefault();
  guardaCarta();
};

nodeInputSubmit.addEventListener('click', () => {
  nodeInputNumero.focus();
});

atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);
