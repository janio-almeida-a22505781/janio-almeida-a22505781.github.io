# Mapa do código do Lab 8

Ficheiro principal: [`labs/lab8/main.js`](../labs/lab8/main.js). Procura no ficheiro por `RECEITA:` (Ctrl+F) para saltar entre os padrões reutilizáveis.

## Estrutura do `main.js`

O ficheiro segue sempre as mesmas secções. Numa alteração de última hora, decide primeiro em que secção mexes.

| Secção | O que contém                                                     | Linhas  |
| ------ | ---------------------------------------------------------------- | ------- |
| **A**  | Estado (`produtos`) e referências a elementos do DOM (`node...`) | 1–17    |
| **B**  | Funções utilitárias: API, filtros, localStorage, criar elementos | 19–191  |
| **C**  | Handlers: carregar/renderizar produtos, comprar, atualizar cesto | 193–287 |
| **D**  | `addEventListener` de cada controlo                              | 289–295 |
| **E**  | Inicialização (chave do localStorage, primeiro carregamento)     | 297–    |

> As linhas são aproximadas: confirma com Ctrl+F se acrescentares código.

## "Se o enunciado pedir X, procuro Y"

| Pedido do exame                       | Onde está no código                    | Receita / ideia                                               |
| ------------------------------------- | -------------------------------------- | ------------------------------------------------------------- |
| Obter dados de uma API                | `fetchProdutos`, `fetchCategorias`     | `fetch` + `response.ok` + `response.json()`                   |
| Enviar dados para uma API (POST)      | `fetchCompra`                          | `method`, `headers`, `body: JSON.stringify(...)`              |
| Converter texto em número             | `normalizarProduto`                    | `Number("22.50")`                                             |
| Filtrar por categoria                 | `filtrarProdutos`                      | `.filter(p => p.category === valor)`                          |
| Pesquisar por nome (enquanto escreve) | `filtrarProdutos` + `input`            | `.includes(texto)` e evento `input`                           |
| Ordenar por preço                     | `filtrarProdutos`                      | `.sort((a, b) => a.price - b.price)`                          |
| Mostrar uma lista no HTML             | `renderizarProdutos`                   | limpar com `textContent = ''` e `append` de cada item         |
| Criar um cartão/elemento              | `criarProduto`                         | `createElement` + `textContent` + `append`                    |
| Botão que faz algo ao clicar          | `criarProduto` (addButton)             | `addEventListener('click', () => { ... })`                    |
| Adicionar ao cesto                    | `criarProduto`                         | ler lista → `push` → guardar → `atualizaCesto()`              |
| Remover do cesto                      | `criaProdutoCesto`                     | `splice(indice, 1)`                                           |
| Somar valores (total)                 | `atualizaCesto`                        | `reduce((total, p) => total + p.price, 0)`                    |
| Guardar dados depois de recarregar    | `carregar/guardarProdutosSelecionados` | `localStorage` + `JSON.stringify` / `JSON.parse`              |
| Formulário (submit)                   | `comprar` + listener `submit`          | `evento.preventDefault()`                                     |
| Mostrar mensagem ao utilizador        | `comprar`, `carregarProdutos`          | criar `<p>`, `textContent`, `append`; `role="alert"` em erros |
| Tratar erros da API                   | `try/catch` em `comprar`               | `throw new Error(...)` e `catch (error)`                      |

## Como acrescentar uma funcionalidade nova (3 passos)

Quase todos os pedidos de alteração seguem o mesmo caminho: **HTML → referência → evento/ação**.

### Exemplo: novo filtro "preço máximo"

1. **HTML** (`index.html`, dentro de `#filtros`):
   ```html
   <label for="preco-maximo">Preço máximo</label> <input type="number" id="preco-maximo" min="0" />
   ```
2. **Referência** (secção A):
   ```js
   const nodePrecoMaximo = document.querySelector('#preco-maximo');
   ```
3. **Lógica** (`filtrarProdutos`, secção B):
   ```js
   const precoMaximo = Number(nodePrecoMaximo.value);
   // ... depois dos outros filtros:
   .filter((produto) => precoMaximo === 0 || produto.price <= precoMaximo)
   ```
   Nota: `nodePrecoMaximo.value` é texto; vazio dá `Number('') === 0`.
4. **Evento** (secção D):
   ```js
   nodePrecoMaximo.addEventListener('input', renderizarProdutos);
   ```

### Exemplo: botão "Limpar cesto"

```js
// HTML: <button type="button" id="limpar-cesto">Limpar cesto</button>
const nodeLimparCesto = document.querySelector('#limpar-cesto');

nodeLimparCesto.addEventListener('click', () => {
  guardarProdutosSelecionados([]);
  atualizaCesto();
});
```

### Exemplo: mostrar o número de produtos no cesto

Em `atualizaCesto()`, depois de ler `produtosSelecionados`:

```js
document.querySelector('#titulo-cesto').textContent = `Cesto (${produtosSelecionados.length})`;
```

## Dados da API (para não ter surpresas)

- `GET /products` → lista de `{ id, title, price, description, category, image, rating: { rate, count } }`
  - `price` vem como **texto** (`"22.50"`) → converter com `Number`.
  - `image` vem como caminho relativo (`/media/...`) → `new URL(image, urlApi).href`.
  - `category` é o **nome** da categoria (texto), não o id.
- `GET /categories` → lista de `{ id, name }`.
- `POST /buy` com `{ products: [ids], student: boolean, coupon: texto, name: texto }`
  - Resposta: `{ totalCost, reference, message, error }` (`totalCost` é texto).
  - Erros 400/404: `{ error: "..." }` (por exemplo, cupão inválido).
  - Estudante: desconto aplicado pela API (42,50 € → 31,88 € nos testes).

## Chaves do localStorage

- Lab 8: `lab8-produtos-selecionados` (lista de produtos do cesto).
- Lab 7: `produtos-selecionados`. As chaves são diferentes porque o `localStorage` é partilhado por todas as páginas da mesma origem.
