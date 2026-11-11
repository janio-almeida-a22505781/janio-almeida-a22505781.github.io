# DIW 26/27

Trabalhos da unidade curricular **Desenvolvimento de Interfaces Web** (2026-27), Licenciatura em Engenharia Informática, Universidade Lusófona.

Site estático em HTML, CSS e JavaScript simples, sem frameworks nem passo de compilação.

## Como abrir

- Abre o ficheiro `index.html` no browser, ou
- inicia um servidor local a partir desta pasta e abre `http://localhost:8000`:

```bash
python -m http.server 8000
```

O **Lab 8** vai buscar os dados à API `https://deisishop.pw.deisi.ulusofona.pt`, por isso precisa de ligação à Internet.

## Estrutura

| Pasta / ficheiro                | Conteúdo                                                       |
| ------------------------------- | -------------------------------------------------------------- |
| `index.html`, `styles.css`      | Página inicial com a ligação para todos os projetos            |
| `tutoriais.html`                | Página de tutoriais                                            |
| `labs/lab1` a `labs/lab6`       | Laboratórios 1 a 6 (HTML e CSS)                                |
| `labs/lab7`                     | Loja online com dados estáticos (`produtos.js`) e cesto        |
| `labs/lab8`                     | Loja online com API: filtro, pesquisa, ordenação e compra      |
| `demos/`                        | Demonstrações de CSS                                           |
| `videotutoriais/`               | Videotutoriais                                                 |
| `estudo/`                       | Material de estudo e apoio ao exame                            |

## Material de estudo (`estudo/`)

- [`guia-js-exame.md`](estudo/guia-js-exame.md): guia de HTML, CSS e JavaScript com explicações e exemplos.
- [`mapa-do-codigo.md`](estudo/mapa-do-codigo.md): onde encontrar cada padrão no código do Lab 8 (procurar `RECEITA:` em `labs/lab8/main.js`).
- [`exercicios-treino.md`](estudo/exercicios-treino.md): exercícios de treino com soluções e alterações prováveis ao Lab 8.

## Lab 8 em resumo

- Produtos e categorias vêm da API (`GET /products`, `GET /categories`).
- Filtro por categoria, pesquisa por nome e ordenação por preço.
- Cesto guardado no `localStorage` (chave `lab8-produtos-selecionados`), com remoção e preço total.
- Compra com `POST /buy` (estudante, cupão e nome), mostrando o total e a referência de pagamento.
- Mensagens de erro claras quando a API falha.
