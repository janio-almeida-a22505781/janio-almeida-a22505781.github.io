# Claude handoff

## Repository

- Repository: `janio-almeida-a22505781/janio-almeida-a22505781.github.io`
- Project type: static Portuguese university coursework site
- Main page: [index.html](./index.html)
- Local preview: `npm run preview`
- CI workflow: [.github/workflows/ci.yaml](./.github/workflows/ci.yaml)

## Working conventions

- Keep the implementation simple and educational: plain HTML, CSS and JavaScript.
- Preserve relative links and the multi-page navigation.
- Use Portuguese labels and semantic HTML.
- Do not introduce frameworks or build tooling unless explicitly required.
- Make small, testable changes and suggest a semantic commit message after each phase.
- Never commit `.mcp.json`.
- Before pushing, verify the authenticated GitHub account and the remote repository.

## Current state

### Completed

- Labs 1–6 are present.
- Lab 7 is complete in [labs/lab7/](./labs/lab7/):
  - `index.html`, `styles.css`, `main.js`, `produtos.js`;
  - 12 products rendered from data;
  - `localStorage` key `produtos-selecionados`;
  - add, remove, persistence and total price;
  - link from the homepage;
  - static checks and browser checks completed.
- The homepage responsive layout was fixed:
  - hero navigation no longer overlaps the hero text;
  - project sections use `min-height` so cards do not cover the curriculum section;
  - all project cards use the same white background;
  - external Moodle link has `rel="noopener noreferrer"`.
- CI fixes for Lab 7 were applied:
  - `produtos.js` is Prettier-formatted;
  - ESLint understands the browser global used between `produtos.js` and `main.js`.

### Current unfinished work: Lab 8

Files currently present:

- [labs/lab8/index.html](./labs/lab8/index.html)
- [labs/lab8/main.js](./labs/lab8/main.js)
- [labs/lab8/styles.css](./labs/lab8/styles.css)

Known blockers:

1. `index.html` still references `produtos.js`, but [labs/lab8/produtos.js](./labs/lab8/produtos.js) does not exist.
2. `fetchProdutos()` calls the API but does not return the response data to `renderizarProdutos()`.
3. `renderizarProdutos()` therefore receives `undefined` and cannot call `forEach`.
4. The API response shape and CORS behavior still need to be verified in the browser.
5. The selected-card code still contains an old `/* global produtos */` comment and should be cleaned up once the API flow is finalized.

Do not assume the API shape. Confirm it first. Keep error handling explicit and avoid silent fallback data.

## Recommended next steps

1. Inspect and run Lab 8 through the local server.
2. Verify `https://deisishop.pw.deisi.ulusofona.pt/products` in the browser network/console.
3. Decide whether the API fully replaces `produtos.js`; remove the obsolete script reference only after confirming the decision.
4. Make `fetchProdutos()` return validated product data or surface a clear user-facing error.
5. Test rendering, cart persistence, removal and total in Lab 8.
6. Run:

```powershell
npm run format:check
npm run check
node --check labs/lab8/main.js
```

7. Review `git diff`, exclude `.mcp.json`, commit, and push only after validation.

## Important references

- Lab 7 GitBook tutorial: <https://ulusofona-interfaces-web.gitbook.io/2026-2027/lab-7>
- Product rendering section: <https://ulusofona-interfaces-web.gitbook.io/2026-2027/lab-7/4.-lista-de-produtos>
- Moodle course: <https://moodle.ensinolusofona.pt/course/view.php?id=11232>
- Product API currently referenced by Lab 8: <https://deisishop.pw.deisi.ulusofona.pt/products>
- Repository CI: <https://github.com/janio-almeida-a22505781/janio-almeida-a22505781.github.io/actions>

## Prompt for the next agent

You are taking over a Portuguese university Web Interfaces coursework repository. Work directly in the existing static project and keep it simple: plain HTML, CSS and JavaScript only. Preserve relative links, Portuguese labels, semantic HTML and the existing multi-page structure. Do not introduce frameworks or build tools. Make surgical changes, validate them, and suggest a Conventional Commit message after each coherent phase. Never commit `.mcp.json`.

Read `AGENTS.md` and this handoff first. Lab 7 is complete and is the reference implementation for the online store. Lab 8 is the next task but is incomplete: `labs/lab8/index.html` references a missing `produtos.js`, while `labs/lab8/main.js` calls the API `https://deisishop.pw.deisi.ulusofona.pt/products` but `fetchProdutos()` currently does not return the fetched data. Verify the API response shape and browser/CORS behavior before editing. Then implement the smallest reliable fix, preserving the cart behavior and Portuguese UI. Surface errors explicitly; do not silently fall back to fake data.

Use the following references when needed:

- GitBook Lab 7: https://ulusofona-interfaces-web.gitbook.io/2026-2027/lab-7
- Product rendering: https://ulusofona-interfaces-web.gitbook.io/2026-2027/lab-7/4.-lista-de-produtos
- Moodle: https://moodle.ensinolusofona.pt/course/view.php?id=11232
- API: https://deisishop.pw.deisi.ulusofona.pt/products

Before any push, run the relevant Prettier, HTML Validate, Stylelint and JavaScript checks, inspect `git diff`, verify the authenticated GitHub account and remote, and keep `.mcp.json` out of commits.
