// A. Estado e variáveis com referência de elementos do DOM
const nodeListaProdutos = document.querySelector('#lista-produtos');
const chaveProdutosSelecionados = 'produtos-selecionados';

// B. Funções utilitárias
function formatarPreco(preco) {
  return `${preco.toFixed(2).replace('.', ',')} €`;
}

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
  });

  article.append(title, image, category, price, description, rating, addButton);
  return article;
}

// C. Event handlers
function renderizarProdutos(listaProdutos) {
  nodeListaProdutos.textContent = '';

  listaProdutos.forEach((produto) => {
    nodeListaProdutos.append(criarProduto(produto));
  });
}

// D. Event listeners

// E. Inicialização
if (localStorage.getItem(chaveProdutosSelecionados) === null) {
  guardarProdutosSelecionados([]);
}

renderizarProdutos(produtos);
