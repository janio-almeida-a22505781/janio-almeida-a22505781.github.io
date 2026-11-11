// A. Estado e variáveis com referência de elementos do DOM
let produtos = [];
const nodeListaProdutos = document.querySelector('#lista-produtos');
const nodeProdutosSelecionados = document.querySelector('#produtos-selecionados');
const nodePrecoTotal = document.querySelector('#preco-total');
const nodePesquisa = document.querySelector('#pesquisa');
const nodeCategoria = document.querySelector('#categoria');
const nodeOrdenacao = document.querySelector('#ordenacao');
const nodeFormCompra = document.querySelector('#form-compra');
const nodeNome = document.querySelector('#nome');
const nodeEstudante = document.querySelector('#estudante');
const nodeCupao = document.querySelector('#cupao');
const nodeResultadoCompra = document.querySelector('#resultado-compra');
// Chave própria do Lab 8: o localStorage é partilhado com o Lab 7 (mesma origem)
// e os produtos da API têm uma estrutura diferente dos produtos estáticos.
const chaveProdutosSelecionados = 'lab8-produtos-selecionados';
const urlApi = 'https://deisishop.pw.deisi.ulusofona.pt';

// B. Funções utilitárias
// RECEITA: validar e converter dados da API (Number, new URL).
// A API devolve o preço como texto ("22.50") e a imagem como caminho relativo
// ("/media/..."), por isso os dados são validados e convertidos aqui.
function normalizarProduto(produto) {
  const preco = Number(produto?.price);

  if (
    typeof produto?.title !== 'string' ||
    typeof produto.image !== 'string' ||
    !Number.isFinite(preco) ||
    !produto.rating
  ) {
    throw new Error('Produto com formato inesperado.');
  }

  return { ...produto, price: preco, image: new URL(produto.image, urlApi).href };
}

// RECEITA: fetch GET com async/await (response.ok, response.json()).
async function fetchProdutos() {
  const response = await fetch(`${urlApi}/products`);

  if (!response.ok) {
    throw new Error(`A API respondeu com o estado ${response.status}.`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('A API não devolveu uma lista de produtos.');
  }

  return data.map(normalizarProduto);
}

async function fetchCategorias() {
  const response = await fetch(`${urlApi}/categories`);

  if (!response.ok) {
    throw new Error(`A API respondeu com o estado ${response.status}.`);
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.some((categoria) => typeof categoria?.name !== 'string')) {
    throw new Error('A API não devolveu uma lista de categorias.');
  }

  return data;
}

// RECEITA: fetch POST com JSON (method, headers, body: JSON.stringify).
// POST /buy: envia os ids dos produtos do cesto, o estatuto de estudante, o cupão e o nome.
async function fetchCompra(ids, estudante, cupao, nome) {
  const response = await fetch(`${urlApi}/buy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products: ids, student: estudante, coupon: cupao, name: nome }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `A API respondeu com o estado ${response.status}.`);
  }

  return data;
}

// RECEITA: filtrar (filter), pesquisar (includes) e ordenar (sort).
// Aplica a categoria, a pesquisa por nome e a ordenação por preço (por esta ordem).
function filtrarProdutos() {
  const categoria = nodeCategoria.value;
  const pesquisa = nodePesquisa.value.trim().toLowerCase();
  const ordenacao = nodeOrdenacao.value;

  const resultado = produtos
    .filter((produto) => categoria === '' || produto.category === categoria)
    .filter((produto) => produto.title.toLowerCase().includes(pesquisa));

  if (ordenacao === 'asc') {
    resultado.sort((a, b) => a.price - b.price);
  } else if (ordenacao === 'desc') {
    resultado.sort((a, b) => b.price - a.price);
  }

  return resultado;
}

function formatarPreco(preco) {
  return `${preco.toFixed(2).replace('.', ',')} €`;
}

// RECEITA: localStorage com JSON (getItem + JSON.parse / setItem + JSON.stringify).
function carregarProdutosSelecionados() {
  const dados = localStorage.getItem(chaveProdutosSelecionados);

  if (!dados) {
    return [];
  }

  try {
    const lista = JSON.parse(dados);
    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    console.error('Não foi possível carregar os produtos selecionados.', error);
    return [];
  }
}

function guardarProdutosSelecionados(lista) {
  localStorage.setItem(chaveProdutosSelecionados, JSON.stringify(lista));
}

// RECEITA: criar elementos (createElement, textContent, append) e addEventListener.
function criarProduto(produto) {
  const article = document.createElement('article');
  const title = document.createElement('h3');
  const image = document.createElement('img');
  const category = document.createElement('p');
  const price = document.createElement('p');
  const description = document.createElement('p');
  const rating = document.createElement('p');
  const addButton = document.createElement('button');

  article.className = 'produto';
  title.textContent = produto.title;
  image.src = produto.image;
  image.alt = produto.title;
  category.textContent = `Categoria: ${produto.category}`;
  price.textContent = `Preço: ${formatarPreco(produto.price)}`;
  description.textContent = produto.description;
  rating.textContent = `Avaliação: ${produto.rating.rate}/5 (${produto.rating.count} avaliações)`;
  addButton.type = 'button';
  addButton.textContent = '+ Adicionar ao cesto';
  addButton.addEventListener('click', () => {
    const produtosSelecionados = carregarProdutosSelecionados();

    produtosSelecionados.push(produto);
    guardarProdutosSelecionados(produtosSelecionados);
    atualizaCesto();
  });

  article.append(title, image, category, price, description, rating, addButton);
  return article;
}

// RECEITA: remover um item de um array pelo índice (splice).
function criaProdutoCesto(produto, indice) {
  const article = document.createElement('article');
  const title = document.createElement('h3');
  const image = document.createElement('img');
  const price = document.createElement('p');
  const removeButton = document.createElement('button');

  article.className = 'produto';
  title.textContent = produto.title;
  image.src = produto.image;
  image.alt = produto.title;
  price.textContent = `Preço: ${formatarPreco(produto.price)}`;
  removeButton.type = 'button';
  removeButton.textContent = '- Remover do cesto';
  removeButton.addEventListener('click', () => {
    const produtosSelecionados = carregarProdutosSelecionados();

    produtosSelecionados.splice(indice, 1);
    guardarProdutosSelecionados(produtosSelecionados);
    atualizaCesto();
  });

  article.append(title, image, price, removeButton);
  return article;
}

// C. Event handlers
async function carregarProdutos() {
  nodeListaProdutos.textContent = 'A carregar produtos...';

  try {
    const [listaProdutos, categorias] = await Promise.all([fetchProdutos(), fetchCategorias()]);

    produtos = listaProdutos;
    categorias.forEach((categoria) => {
      const opcao = document.createElement('option');
      opcao.value = categoria.name;
      opcao.textContent = categoria.name;
      nodeCategoria.append(opcao);
    });
    renderizarProdutos();
  } catch (error) {
    console.error('Não foi possível obter os produtos.', error);

    const mensagem = document.createElement('p');
    mensagem.setAttribute('role', 'alert');
    mensagem.textContent = 'Não foi possível carregar os produtos. Tente novamente mais tarde.';
    nodeListaProdutos.textContent = '';
    nodeListaProdutos.append(mensagem);
  }
}

function renderizarProdutos() {
  const listaProdutos = filtrarProdutos();

  nodeListaProdutos.textContent = '';

  if (listaProdutos.length === 0) {
    const mensagem = document.createElement('p');
    mensagem.textContent = 'Nenhum produto encontrado.';
    nodeListaProdutos.append(mensagem);
    return;
  }

  listaProdutos.forEach((produto) => {
    nodeListaProdutos.append(criarProduto(produto));
  });
}

async function comprar(evento) {
  evento.preventDefault();

  const produtosSelecionados = carregarProdutosSelecionados();
  const mensagem = document.createElement('p');

  nodeResultadoCompra.textContent = '';

  if (produtosSelecionados.length === 0) {
    mensagem.textContent = 'O cesto está vazio. Adicione produtos antes de comprar.';
    nodeResultadoCompra.append(mensagem);
    return;
  }

  try {
    const ids = produtosSelecionados.map((produto) => produto.id);
    const compra = await fetchCompra(
      ids,
      nodeEstudante.checked,
      nodeCupao.value.trim(),
      nodeNome.value.trim(),
    );

    mensagem.textContent = `${compra.message} Total: ${formatarPreco(Number(compra.totalCost))}. Referência de pagamento: ${compra.reference}`;
  } catch (error) {
    console.error('Não foi possível concluir a compra.', error);
    mensagem.setAttribute('role', 'alert');
    mensagem.textContent = `Não foi possível concluir a compra: ${error.message}`;
  }

  nodeResultadoCompra.append(mensagem);
}

// RECEITA: somar valores de uma lista com reduce e escrever o resultado num elemento.
function atualizaCesto() {
  const produtosSelecionados = carregarProdutosSelecionados();

  nodeProdutosSelecionados.textContent = '';

  if (produtosSelecionados.length === 0) {
    const mensagem = document.createElement('p');
    mensagem.textContent = 'O cesto está vazio.';
    nodeProdutosSelecionados.append(mensagem);
  } else {
    produtosSelecionados.forEach((produto, indice) => {
      nodeProdutosSelecionados.append(criaProdutoCesto(produto, indice));
    });
  }

  const precoTotal = produtosSelecionados.reduce((total, produto) => total + produto.price, 0);
  nodePrecoTotal.textContent = formatarPreco(precoTotal);
}

// D. Event listeners
// RECEITA: input (a escrever), change (select), submit (formulário, com preventDefault).
// Passa-se a função sem parênteses: renderizarProdutos e não renderizarProdutos().
nodePesquisa.addEventListener('input', renderizarProdutos);
nodeCategoria.addEventListener('change', renderizarProdutos);
nodeOrdenacao.addEventListener('change', renderizarProdutos);
nodeFormCompra.addEventListener('submit', comprar);

// E. Inicialização
if (localStorage.getItem(chaveProdutosSelecionados) === null) {
  guardarProdutosSelecionados([]);
}

carregarProdutos();
atualizaCesto();
