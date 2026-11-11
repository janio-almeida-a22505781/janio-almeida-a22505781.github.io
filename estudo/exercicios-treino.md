# Exercícios de treino (formato de exame)

Tenta cada exercício **sem ver a solução**, com um cronómetro. Cria um `index.html` e um `main.js` (ou usa a consola do browser). Cada exercício indica o tempo-alvo e onde a mesma ideia aparece no Lab 8 (ver [`mapa-do-codigo.md`](mapa-do-codigo.md)). A teoria está em [`guia-js-exame.md`](guia-js-exame.md).

Os exercícios 1 a 8 vêm da aula de apoio (DOM, eventos, contador, `localStorage`, `reduce`).

---

## 1. Criar e inserir um elemento (5 min)

Cria um `h1` com o texto "Olá, exame!", com a cor roxa, e insere-o dentro de um `div`.

<details>
<summary>Solução</summary>

```html
<div id="caixa"></div>
<script defer src="main.js"></script>
```

```js
const caixa = document.querySelector('#caixa');
const h1 = document.createElement('h1');

h1.textContent = 'Olá, exame!';
h1.style.color = 'purple';
caixa.append(h1);
```

Lab 8: `criarProduto`.

</details>

## 2. Contador simples (5 min)

Um botão "Conta" e um `span` com o valor. Cada clique soma 1.

<details>
<summary>Solução</summary>

```html
<button id="botao">Conta</button>
<p>Valor: <span id="valor">0</span></p>
```

```js
let contador = 0;
const valor = document.querySelector('#valor');

document.querySelector('#botao').addEventListener('click', () => {
  contador++;
  valor.textContent = contador;
});
```

Alternativa sem variável: `valor.textContent = Number(valor.textContent) + 1;` (converter o texto para número!).

</details>

## 3. Contador que sobrevive ao recarregar (10 min)

Igual ao exercício 2, mas o valor deve manter-se depois de recarregar a página (`localStorage`). Lembra-te de inicializar a chave quando não existe.

<details>
<summary>Solução</summary>

```js
const valor = document.querySelector('#valor');

if (!localStorage.getItem('contador')) {
  localStorage.setItem('contador', 0);
}
valor.textContent = localStorage.getItem('contador');

document.querySelector('#botao').addEventListener('click', () => {
  const contador = Number(localStorage.getItem('contador')) + 1;

  localStorage.setItem('contador', contador);
  valor.textContent = contador;
});
```

Lab 8: `carregarProdutosSelecionados` / `guardarProdutosSelecionados`.

</details>

## 4. Clique e duplo clique (5 min)

Um botão que, ao clicar, escreve "Um clique" num `p`, e, ao fazer duplo clique, escreve "Duplo clique". Usa `addEventListener` e explica porque não se escrevem parênteses na função.

<details>
<summary>Solução</summary>

```js
const botao = document.querySelector('#botao');
const mensagem = document.querySelector('#mensagem');

function umClique() {
  mensagem.textContent = 'Um clique';
}

botao.addEventListener('click', umClique);
botao.addEventListener('dblclick', () => {
  mensagem.textContent = 'Duplo clique';
});
```

Sem parênteses porque passamos a **função** (para ser chamada quando o evento ocorrer). Com `umClique()` ela seria executada logo e o evento receberia o seu resultado (`undefined`). Nota: um duplo clique dispara também dois `click`.

</details>

## 5. Soma de uma lista com `reduce` (10 min)

Dada uma lista `<ul>` com números nos `<li>`, mostra a soma no elemento `<span id="soma">`. (Este foi o exercício que ficou a meio na aula.)

```html
<ul>
  <li>10</li>
  <li>20</li>
  <li>30</li>
</ul>
<p>Soma: <span id="soma"></span></p>
```

<details>
<summary>Solução</summary>

```js
const itens = document.querySelectorAll('li');
const soma = [...itens].reduce((total, li) => total + Number(li.textContent), 0);

document.querySelector('#soma').textContent = soma;
```

Passos: selecionar todos os `li` → converter a `NodeList` em array (`[...itens]`) → `reduce` com valor inicial `0` e `Number(...)` → escrever em `#soma`.

Lab 8: `atualizaCesto` (`reduce` para o preço total).

</details>

## 6. Números pares (10 min)

Com `const numeros = [3, 8, 12, 5, 6]`, mostra numa `<ul>` apenas os pares, cada um num `<li>`, multiplicado por 10.

<details>
<summary>Solução</summary>

```js
const numeros = [3, 8, 12, 5, 6];
const lista = document.querySelector('#lista');

numeros
  .filter((n) => n % 2 === 0)
  .map((n) => n * 10)
  .forEach((n) => {
    const li = document.createElement('li');
    li.textContent = n;
    lista.append(li);
  });
// 80, 120, 60
```

Lab 8: `filtrarProdutos` (`filter`) e `renderizarProdutos` (criar e inserir).

</details>

## 7. Pesquisa numa lista (10 min)

Um `input` e uma lista de `<li>` (nomes). Enquanto o utilizador escreve, mostra só os nomes que contêm o texto (sem distinguir maiúsculas/minúsculas). Dica: `classList.toggle('escondido', condição)` e uma regra CSS `.escondido { display: none; }`.

<details>
<summary>Solução</summary>

```js
const pesquisa = document.querySelector('#pesquisa');
const itens = document.querySelectorAll('li');

pesquisa.addEventListener('input', () => {
  const texto = pesquisa.value.trim().toLowerCase();

  itens.forEach((li) => {
    const contem = li.textContent.toLowerCase().includes(texto);

    li.classList.toggle('escondido', !contem);
  });
});
```

Lab 8: pesquisa por nome (`input` + `includes`).

</details>

## 8. Select que muda a cor de fundo (5 min)

Um `select` com três cores; ao escolher, muda a cor de fundo do `body`.

<details>
<summary>Solução</summary>

```html
<select id="cor">
  <option value="indigo">Índigo</option>
  <option value="dodgerblue">Azul</option>
  <option value="salmon">Salmão</option>
</select>
```

```js
document.querySelector('#cor').addEventListener('change', (evento) => {
  document.body.style.backgroundColor = evento.target.value;
});
```

Lab 8: filtro por categoria e ordenação (`change` num `select`).

</details>

## 9. Formulário de saudação (10 min)

Um formulário com um campo "nome" e um botão. Ao submeter, mostra "Olá, <nome>!" num `h2`, sem recarregar a página.

<details>
<summary>Solução</summary>

```html
<form id="form">
  <input id="nome" type="text" placeholder="nome" />
  <button type="submit">Enviar</button>
</form>
<h2 id="saudacao"></h2>
```

```js
document.querySelector('#form').addEventListener('submit', (evento) => {
  evento.preventDefault();
  document.querySelector('#saudacao').textContent =
    `Olá, ${document.querySelector('#nome').value}!`;
});
```

Lab 8: `comprar` (`submit` + `preventDefault`).

</details>

## 10. Botões com `data-*` (10 min)

Três botões (`Vermelho`, `Verde`, `Azul`) que mudam a cor de um `h1`, **sem repetir código**: a cor vem de `data-cor` em cada botão.

<details>
<summary>Solução</summary>

```html
<h1 id="titulo">Olá</h1>
<button data-cor="red">Vermelho</button>
<button data-cor="green">Verde</button>
<button data-cor="blue">Azul</button>
```

```js
const titulo = document.querySelector('#titulo');

document.querySelectorAll('button').forEach((botao) => {
  botao.addEventListener('click', () => {
    titulo.style.color = botao.dataset.cor;
  });
});
```

</details>

## 11. Temporizador (10 min)

Um `span` que começa em 5 e conta até 0, descendo 1 por segundo. Quando chega a 0, escreve "Terminou" e pára.

<details>
<summary>Solução</summary>

```js
let segundos = 5;
const span = document.querySelector('#tempo');
span.textContent = segundos;

const intervalo = setInterval(() => {
  segundos--;
  span.textContent = segundos;

  if (segundos === 0) {
    clearInterval(intervalo);
    span.textContent = 'Terminou';
  }
}, 1000);
```

</details>

## 12. Lista de produtos a partir da API (15 min)

Com `fetch` e `async`/`await`, vai buscar `https://deisishop.pw.deisi.ulusofona.pt/products` e mostra os títulos numa `<ul>`. Se falhar, mostra "Não foi possível carregar os produtos." Mostra também o número de produtos.

<details>
<summary>Solução</summary>

```js
const lista = document.querySelector('#lista');
const total = document.querySelector('#total');

async function carregar() {
  try {
    const response = await fetch('https://deisishop.pw.deisi.ulusofona.pt/products');

    if (!response.ok) {
      throw new Error(`Estado ${response.status}`);
    }

    const produtos = await response.json();

    produtos.forEach((produto) => {
      const li = document.createElement('li');
      li.textContent = produto.title;
      lista.append(li);
    });
    total.textContent = produtos.length;
  } catch (error) {
    lista.textContent = 'Não foi possível carregar os produtos.';
  }
}

carregar();
```

Lab 8: `fetchProdutos` e `carregarProdutos`.

</details>

---

# Alterações prováveis no Lab 8

O exame pode pedir uma alteração ao **teu** projeto. Treina estas (cada uma em 10 a 15 minutos). Os passos genéricos estão em [`mapa-do-codigo.md`](mapa-do-codigo.md).

## A. Ordenar também por nome

No `select#ordenacao` acrescenta "Nome (A-Z)" e "Nome (Z-A)".

<details>
<summary>Solução</summary>

```html
<option value="nome-asc">Nome (A-Z)</option>
<option value="nome-desc">Nome (Z-A)</option>
```

Em `filtrarProdutos`:

```js
} else if (ordenacao === 'nome-asc') {
  resultado.sort((a, b) => a.title.localeCompare(b.title));
} else if (ordenacao === 'nome-desc') {
  resultado.sort((a, b) => b.title.localeCompare(a.title));
}
```

</details>

## B. Botão "Limpar cesto"

<details>
<summary>Solução</summary>

```html
<button type="button" id="limpar-cesto">Limpar cesto</button>
```

```js
document.querySelector('#limpar-cesto').addEventListener('click', () => {
  guardarProdutosSelecionados([]);
  atualizaCesto();
});
```

</details>

## C. Mostrar a quantidade de produtos no cesto

<details>
<summary>Solução</summary>

Em `atualizaCesto`, depois de ler a lista:

```js
document.querySelector('#titulo-cesto').textContent = `Cesto (${produtosSelecionados.length})`;
```

</details>

## D. Filtro por preço máximo

Ver o exemplo completo em [`mapa-do-codigo.md`](mapa-do-codigo.md#exemplo-novo-filtro-preço-máximo).

## E. Mostrar o preço médio dos produtos visíveis

<details>
<summary>Solução</summary>

```html
<p>Preço médio: <span id="preco-medio">-</span></p>
```

Em `renderizarProdutos`, depois de `const listaProdutos = filtrarProdutos();`:

```js
const nodePrecoMedio = document.querySelector('#preco-medio');
const soma = listaProdutos.reduce((total, produto) => total + produto.price, 0);

nodePrecoMedio.textContent =
  listaProdutos.length === 0 ? '-' : formatarPreco(soma / listaProdutos.length);
```

</details>

## F. Mostrar só produtos com avaliação mínima

Um `select` com "Todas", "4 ou mais", "4.5 ou mais". Em `filtrarProdutos` acrescenta `.filter((produto) => produto.rating.rate >= avaliacaoMinima)`, com `const avaliacaoMinima = Number(nodeAvaliacao.value);` (valor `0` para "Todas") e `change` na secção D.

## G. Remover todos os itens iguais do cesto

No `criaProdutoCesto`, em vez de `splice(indice, 1)`, usa:

```js
const restantes = carregarProdutosSelecionados().filter((p) => p.id !== produto.id);
guardarProdutosSelecionados(restantes);
atualizaCesto();
```

## H. Mostrar o desconto (poupança) após a compra

A resposta de `/buy` traz `totalCost`. Compara-o com o preço total do cesto antes de comprar:

```js
const totalSemDesconto = produtosSelecionados.reduce((total, p) => total + p.price, 0);
const poupanca = totalSemDesconto - Number(compra.totalCost);
// ... na mensagem: `Poupou ${formatarPreco(poupanca)}`
```
