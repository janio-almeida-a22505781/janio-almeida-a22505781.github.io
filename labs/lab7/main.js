// A. Estado e variáveis com referência de elementos do DOM
const nodeListaProdutos = document.querySelector('#lista-produtos');

// B. Funções utilitárias
function formatarPreco(preco) {
  return `${preco.toFixed(2).replace('.', ',')} €`;
}

function criarProduto(produto) {
  const article = document.createElement('article');
  const title = document.createElement('h3');
  const image = document.createElement('img');
  const category = document.createElement('p');
  const price = document.createElement('p');
  const description = document.createElement('p');
  const rating = document.createElement('p');

  article.className = 'produto';
  title.textContent = produto.title;
  image.src = produto.image;
  image.alt = produto.title;
  category.textContent = `Categoria: ${produto.category}`;
  price.textContent = `Preço: ${formatarPreco(produto.price)}`;
  description.textContent = produto.description;
  rating.textContent = `Avaliação: ${produto.rating.rate}/5 (${produto.rating.count} avaliações)`;

  article.append(title, image, category, price, description, rating);
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
renderizarProdutos(produtos);
