# Guia de estudo: HTML, CSS e JavaScript (DIW 26/27)

Versão melhorada do "Guia de Referência" da cadeira. Cada ponto tem uma explicação curta, um exemplo e a ligação ao Lab 8 (ver [`mapa-do-codigo.md`](mapa-do-codigo.md)). Os exercícios estão em [`exercicios-treino.md`](exercicios-treino.md).

## 0. O método para qualquer pedido de exame

Quase todos os exercícios de JavaScript desta cadeira seguem a mesma frase:

> **Elemento → Evento → Ação (handler)**

1. **Que elemento?** Escreve-o no HTML (ou cria-o) e dá-lhe um `id`.
2. **Selecionar:** `const node = document.querySelector('#id');`
3. **Que evento?** `click`, `dblclick`, `input`, `change`, `submit`...
4. **Que ação?** Uma função que altera o DOM (`textContent`, `append`, `style`...), o `localStorage` ou chama uma API.
5. **Testar** no browser (F12 → Consola) depois de cada passo pequeno.

Ordem de trabalho recomendada: HTML primeiro, depois só um passo de JavaScript de cada vez, sempre com `console.log` para confirmar.

## 1. Esqueleto base

```html
<!doctype html>
<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <title>Exame</title>
    <script defer src="main.js"></script>
  </head>
  <body>
    <h1 id="titulo">Olá!</h1>
    <button id="botao">Clica</button>
  </body>
</html>
```

- O `<script>` só encontra elementos que **já existem**. Há três soluções (usa uma):
  - `<script>` no **fim do `<body>`**;
  - `<script defer src="main.js">` no `<head>` (o que usamos nos labs);
  - código dentro de `document.addEventListener('DOMContentLoaded', () => { ... })`.
- Se vires `Cannot read properties of null`, o `querySelector` não encontrou o elemento: confirma o `id` e a posição do `<script>`.

## 2. Selecionar elementos

```js
const titulo = document.querySelector('#titulo'); // primeiro que corresponde (ou null)
const botoes = document.querySelectorAll('button'); // TODOS (NodeList)
const itens = document.querySelectorAll('ul li'); // seletor CSS qualquer

botoes.forEach((botao) => {
  console.log(botao.textContent);
});
```

- O argumento é um **seletor CSS**: `h1`, `.classe`, `#id`, `div > p`, `li:nth-child(2)`.
- `querySelectorAll` devolve uma `NodeList`: tem `forEach`, mas **não tem** `map`/`reduce`/`filter`. Converte com `Array.from(itens)` ou `[...itens]`.

## 3. Alterar elementos

| O que queres                      | Código                                                           |
| --------------------------------- | ---------------------------------------------------------------- |
| Mudar o texto                     | `node.textContent = 'Adeus!'`                                    |
| Inserir HTML (cuidado)            | `node.innerHTML = '<b>novo</b>'`                                 |
| Mudar estilo (camelCase)          | `node.style.color = 'green'`, `style.backgroundColor`            |
| Adicionar/remover/alternar classe | `node.classList.add('ativo')`, `.remove`, `.toggle`, `.contains` |
| Ler/escrever atributo             | `node.getAttribute('href')`, `node.setAttribute('href', '...')`  |
| Valor de input/select             | `node.value`                                                     |
| Checkbox marcada?                 | `node.checked` (`true`/`false`)                                  |
| Atributos `data-*`                | `<div data-cor="red">` → `node.dataset.cor`                      |

- `textContent` é **sempre texto** (string). Para contas, converte: `Number(node.textContent)`.
- Prefere `textContent` a `innerHTML`: é mais seguro (não interpreta HTML dos dados da API).

## 4. Criar e remover elementos

```js
const div = document.querySelector('#caixa');

const h1 = document.createElement('h1'); // 1. criar
h1.textContent = 'Olá!'; // 2. configurar
h1.style.color = 'purple';
div.append(h1); // 3. inserir (no fim)

div.insertBefore(novo, referencia); // inserir antes de outro elemento
h1.remove(); // remover
div.textContent = ''; // esvaziar o contentor
```

No Lab 8: `criarProduto(produto)` cria um `<article>` completo e devolve-o; `renderizarProdutos()` esvazia a lista e faz `append` de cada um.

## 5. Eventos

### 5.1 As três formas de associar

```html
<button onclick="contar()">A) atributo no HTML</button>
<button id="b2">B) propriedade no JS</button>
<button id="b3">C) addEventListener</button>
```

```js
document.querySelector('#b2').onclick = contar; // B
document.querySelector('#b3').addEventListener('click', contar); // C (recomendada)
```

- **Só o HTML usa parênteses** (`onclick="contar()"`).
- Em JS passa-se a função **por referência**, sem parênteses: `addEventListener('click', contar)`.
  - `addEventListener('click', contar())` **executa logo** a função e regista o resultado (erro clássico!).
  - Se precisares de argumentos, usa uma função de flecha: `addEventListener('click', () => contar(5))`.
- `addEventListener` permite vários handlers no mesmo evento; `onclick = ...` só um (o último ganha).
- Nos atributos HTML os eventos têm `on` (`onclick`); em `addEventListener` não (`'click'`).

### 5.2 Eventos mais usados

| Evento                 | Quando dispara                                                  | Típico em              |
| ---------------------- | --------------------------------------------------------------- | ---------------------- |
| `click`                | clique                                                          | botões                 |
| `dblclick`             | duplo clique                                                    | "duplo clique para..." |
| `mouseover`/`mouseout` | rato entra/sai                                                  | efeitos de realce      |
| `keydown`/`keyup`      | tecla premida/libertada                                         | teclado                |
| `input`                | cada alteração num `input` (**enquanto escreves**)              | pesquisa em tempo real |
| `change`               | valor alterado e confirmado (`select`, checkbox, input ao sair) | filtros                |
| `submit`               | formulário submetido                                            | formulários            |
| `DOMContentLoaded`     | DOM pronto                                                      | arranque               |

### 5.3 Formulários: `submit` e `preventDefault`

```js
form.addEventListener('submit', (evento) => {
  evento.preventDefault(); // evita recarregar a página
  const nome = document.querySelector('#nome').value;
  document.querySelector('#frase').textContent = `Olá, ${nome}!`;
});
```

### 5.4 `this` e `evento.target`

Dentro de uma função normal usada como handler, `this` é o elemento que recebeu o evento. Em funções de flecha `this` **não** funciona assim: usa `evento.target`.

```js
input.addEventListener('input', function () {
  titulo.style.color = this.value; // this === input
});
input.addEventListener('input', (evento) => {
  titulo.style.color = evento.target.value; // equivalente
});
```

### 5.5 Funções de flecha

```js
function somar(a, b) {
  return a + b;
}
const somar = (a, b) => a + b; // equivalente
botoes.forEach((botao) => {
  botao.onclick = () => {
    /* ... */
  };
});
```

## 6. Linguagem: variáveis, condições, ciclos

```js
let n = 1; // variável (pode mudar)
const PI = 3.14; // constante (a referência não muda; um array/objeto const pode ter conteúdo alterado)
const texto = `Total: ${n} €`; // template string (acentos graves + ${expressão})

if (n === 1 && texto !== '') {
  /* ... */
} else if (!n) {
  /* ... */
} else {
  /* ... */
}
const resultado = n > 0 ? 'positivo' : 'não positivo'; // operador ternário

for (let i = 0; i < 5; i++) {}
for (const item of lista) {
}
while (n < 10) {
  n++;
}
```

- Usa sempre `===` e `!==` (comparam valor **e** tipo). `'5' === 5` é `false`.
- Tipos: `number`, `string`, `boolean`, `null`, `undefined`; compostos: `object` e `array`.
- Objeto: `const pessoa = { nome: 'João', idade: 30 }; pessoa.nome`.

## 7. Arrays: métodos essenciais

Dados de exemplo: `const nums = [1, 2, 3, 4];`

| Método                   | Para quê                            | Exemplo → resultado                          | Altera o original? |
| ------------------------ | ----------------------------------- | -------------------------------------------- | ------------------ |
| `forEach(fn)`            | fazer algo com cada item            | `nums.forEach(n => console.log(n))`          | não                |
| `map(fn)`                | **transformar** cada item           | `nums.map(n => n * 2)` → `[2,4,6,8]`         | não                |
| `filter(fn)`             | **escolher** itens                  | `nums.filter(n => n % 2 === 0)` → `[2,4]`    | não                |
| `find(fn)`               | primeiro item que cumpre            | `nums.find(n => n > 2)` → `3`                | não                |
| `reduce(fn, inicial)`    | **juntar tudo num valor** (soma...) | `nums.reduce((acc, n) => acc + n, 0)` → `10` | não                |
| `includes(valor)`        | contém?                             | `nums.includes(3)` → `true`                  | não                |
| `indexOf(valor)`         | posição (ou `-1`)                   | `nums.indexOf(3)` → `2`                      | não                |
| `join(sep)`              | array → texto                       | `nums.join(', ')` → `"1, 2, 3, 4"`           | não                |
| `push(x)`                | acrescentar no fim                  | `nums.push(5)`                               | **sim**            |
| `splice(i, n, ...novos)` | remover/inserir                     | `nums.splice(1, 1)` remove o índice 1        | **sim**            |
| `sort(fn)`               | ordenar                             | `nums.sort((a, b) => b - a)` (decrescente)   | **sim**            |

### `reduce` explicado

`reduce` percorre o array com um **acumulador** (`acc`) que começa no valor inicial e é atualizado em cada passo; o valor final é o que a função devolve no último passo.

```js
const total = precos.reduce((acc, preco) => acc + preco, 0);
//                           ^ acumulador  ^ item atual   ^ valor inicial
```

### Somar os `<li>` de uma lista e mostrar num `span` (exercício da aula)

```html
<ul>
  <li>10</li>
  <li>20</li>
  <li>30</li>
</ul>
<p>Soma: <span id="soma"></span></p>
```

```js
const itens = document.querySelectorAll('li');
const soma = [...itens].reduce((acc, li) => acc + Number(li.textContent), 0);
document.querySelector('#soma').textContent = soma; // 60
```

Os três passos que a aula deixou por resolver: (1) `querySelectorAll` para apanhar os `li`; (2) converter cada `textContent` com `Number`; (3) escrever o resultado com `textContent` no elemento com `id="soma"` (selecionado com `#soma`).

### Ordenar sem estragar o original

`sort` altera o array. Para não alterar a lista completa: `[...produtos].sort(...)` ou `.filter(...)` antes (devolve uma cópia nova), como em `filtrarProdutos`.

## 8. Texto e números

```js
Number('22.50'); // 22.5
Number('abc'); // NaN  (Number.isFinite(...) deteta)
(22.5).toFixed(2); // "22.50"  (devolve TEXTO)
'22.50'.replace('.', ','); // "22,50"
'Canecas'.toLowerCase().includes('can'); // true
```

- Valores vindos de `input`, `textContent`, `dataset` e da API (como o preço no Lab 8) são **texto**.
- `'5' + 5` dá `"55"`; `Number('5') + 5` dá `10`.

## 9. localStorage

Guarda pares chave/valor no browser, **só texto**, e mantém-nos depois de recarregar a página ou fechar o browser.

```js
localStorage.setItem('nome', 'João');
localStorage.getItem('nome'); // "João" (ou null se não existir)
localStorage.removeItem('nome');
localStorage.clear();
```

### Listas e objetos: JSON

```js
localStorage.setItem('cesto', JSON.stringify([{ id: 1 }])); // guardar
const cesto = JSON.parse(localStorage.getItem('cesto')) ?? []; // ler (null → [])
```

### Padrão: contador persistente

```js
const h1 = document.querySelector('h1');
const botao = document.querySelector('button');

if (!localStorage.getItem('contador')) {
  localStorage.setItem('contador', 0); // 1. inicializar a chave
}
h1.textContent = localStorage.getItem('contador'); // 2. restaurar ao carregar

botao.addEventListener('click', () => {
  const contador = Number(localStorage.getItem('contador')) + 1; // 3. converter para número!
  localStorage.setItem('contador', contador); // 4. guardar
  h1.textContent = contador; // 5. mostrar
});
```

Ver o conteúdo: F12 → separador **Application** → Local Storage.

No Lab 8: `carregarProdutosSelecionados()` / `guardarProdutosSelecionados()` fazem exatamente isto, com `JSON`.

## 10. fetch e APIs

`fetch` pede dados a um servidor sem recarregar a página (AJAX). Devolve uma **promessa** (o resultado chega mais tarde).

### GET com `then`/`catch`

```js
fetch('https://deisishop.pw.deisi.ulusofona.pt/products')
  .then((response) => response.json()) // converte o corpo para objeto
  .then((data) => console.log(data)) // usar os dados
  .catch((error) => console.error(error)); // erro de rede ou nos .then
```

### GET com `async`/`await` (o que usamos no Lab 8)

```js
async function fetchProdutos() {
  const response = await fetch(`${urlApi}/products`);

  if (!response.ok) {
    // 404, 500, ...
    throw new Error(`A API respondeu com o estado ${response.status}.`);
  }

  return await response.json();
}

async function carregar() {
  try {
    const produtos = await fetchProdutos();
    // ... mostrar produtos
  } catch (error) {
    // ... mostrar mensagem de erro ao utilizador
  }
}
```

- `await` só pode ser usado dentro de uma função `async`.
- `fetch` **só falha** por erro de rede. Um 404/500 **não** é erro: verifica `response.ok`.
- Uma função `async` devolve sempre uma promessa: quem a chama usa `await` (ou `.then`).

### POST (enviar dados)

```js
const response = await fetch(`${urlApi}/buy`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ products: [1, 2], student: true, coupon: '', name: 'Ana' }),
});
const data = await response.json();
```

### Métodos HTTP

| Método | Uso                  |
| ------ | -------------------- |
| GET    | obter dados          |
| POST   | criar / enviar dados |
| PUT    | substituir           |
| PATCH  | alterar parcialmente |
| DELETE | apagar               |

## 11. Execuções automáticas

```js
const id = setInterval(contar, 1000); // repete a cada 1000 ms
clearInterval(id); // para o intervalo
setTimeout(() => clearInterval(id), 5000); // executa UMA vez ao fim de 5 s
```

## 12. HTML e CSS: resumo rápido

**HTML semântico:** `header`, `nav`, `main`, `section`, `aside`, `footer`. Formulários: `form`, `label for="id"`, `input`, `select`/`option`, `textarea`, `button`. Atributos: `alt`, `class`, `id`, `href`, `src`, `target`.

**Seletores CSS:** `p`, `.classe`, `#id`, `div > p`, `li:nth-child(even)`, `p:nth-of-type(2)`, `div:first-child`, `a:hover`.

**Caixa:** `box-sizing: border-box; margin: 0 auto; padding: 5px 10px; border: 1px solid black;`

**Flexbox** (1 dimensão):

```css
.contentor {
  display: flex;
  flex-direction: row; /* ou column */
  justify-content: center; /* eixo principal: flex-start, flex-end, space-between, space-around */
  align-items: center; /* eixo secundário */
  flex-wrap: wrap;
  gap: 10px;
}
```

**Grid** (2 dimensões):

```css
body {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas:
    'header header'
    'nav main';
}
header {
  grid-area: header;
}
```

**Responsivo:**

```css
@media (min-width: 600px) {
  body {
    background: purple;
  }
}
```

**Posição:** `position: static | relative | absolute | fixed | sticky`; `display: block | inline | inline-block | flex | none`.

## 13. Erros comuns (e como os reconhecer)

| Sintoma                                        | Causa provável                                                          |
| ---------------------------------------------- | ----------------------------------------------------------------------- |
| `Cannot read properties of null (reading ...)` | seletor errado, ou `<script>` antes do elemento (usa `defer`)           |
| A função corre logo ao carregar a página       | escreveste `addEventListener('click', f())` em vez de `f`               |
| O contador faz `"1" + 1 = "11"`                | falta `Number(...)` (valores do `textContent`/`localStorage` são texto) |
| `x.map is not a function` numa `NodeList`      | usa `[...nodeList]` ou `Array.from(nodeList)`                           |
| `x.forEach is not a function` / `undefined`    | a função `async` não devolveu dados (falta `return`) ou falta `await`   |
| A página recarrega ao submeter o formulário    | falta `evento.preventDefault()`                                         |
| Valor do `select`/`input` sempre vazio         | leste `.value` antes de o utilizador escolher; lê dentro do handler     |
| `price.toFixed is not a function`              | o preço é texto (vem da API): `Number(price)`                           |
| O cesto não persiste                           | esqueceste `JSON.stringify`/`localStorage.setItem` depois de alterar    |
| O `sort` mudou a lista original                | `sort` altera o array: copia antes com `[...lista]`                     |

## 14. Pedido → técnica (resumo para consulta rápida)

| O enunciado diz...                          | Usa                                            |
| ------------------------------------------- | ---------------------------------------------- |
| "ao clicar"                                 | `addEventListener('click', ...)`               |
| "ao fazer duplo clique"                     | `addEventListener('dblclick', ...)`            |
| "enquanto escreve" / "em tempo real"        | evento `input` (ou `keyup`)                    |
| "ao escolher uma opção"                     | evento `change` num `select`                   |
| "ao submeter"                               | evento `submit` + `preventDefault()`           |
| "criar um elemento e inseri-lo"             | `createElement` + `textContent` + `append`     |
| "somar" / "total"                           | `reduce`                                       |
| "mostrar só os que..."                      | `filter`                                       |
| "transformar cada..." / "criar lista de..." | `map`                                          |
| "ordenar"                                   | `sort((a, b) => a.x - b.x)`                    |
| "guardar mesmo depois de recarregar"        | `localStorage` (+ `JSON`)                      |
| "ir buscar a uma API"                       | `fetch` + `await response.json()`              |
| "enviar para a API"                         | `fetch` com `method: 'POST'` e `body`          |
| "a cada segundo"                            | `setInterval`                                  |
| "mudar a cor" / "esconder"                  | `style.color`, `classList.toggle('escondido')` |
