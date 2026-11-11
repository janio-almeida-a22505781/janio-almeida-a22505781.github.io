# AGENTS.md

## Project overview
This repository is a static web project for a university course on web interfaces. It contains a landing page, grouped laboratory work, CSS demos and videotutorial pages: [index.html](index.html), [labs](labs/), [demos](demos/), and [videotutoriais](videotutoriais/). The site is built with plain HTML, CSS and small JavaScript exercises, without an application framework or build step.

## Key conventions
- Keep changes simple and static: prefer HTML and CSS edits over introducing JavaScript or build tooling unless the task explicitly requires it.
- Preserve the existing multi-page navigation structure and relative links between pages.
- Prefer semantic HTML and accessible attributes such as `alt`, `lang`, and descriptive headings.
- Use Portuguese content and labels when working in the existing exercise pages, as the site content is written in Portuguese.
- Keep file references relative to the current page/folder so links continue to work when opened locally.
- Keep each lab self-contained in its own folder and follow its existing HTML/CSS/JavaScript split.
- Do not commit `.mcp.json`; it is local MCP configuration and is intentionally untracked.

## File structure
- Root pages: [index.html](index.html), [styles.css](styles.css)
- Labs 1–8: [labs/](labs/)
- Completed online store: [labs/lab7/](labs/lab7/)
- In-progress API version of the store: [labs/lab8/](labs/lab8/)
- CSS demos: [demos/](demos/)
- Videotutorial catalogue and pages: [videotutoriais/](videotutoriais/)
- Project overview: [README.md](README.md)

## Editing guidance
- Match the current visual style before adding new styles; most pages use simple, direct CSS without complex frameworks.
- Reuse existing patterns for navigation, headings, and footer blocks rather than inventing a new structure.
- When adding images, keep them in the appropriate `images/` folder and use a local relative path.
- Do not assume a build step exists. If previewing is needed, use a plain local static server such as `python3 -m http.server` from the repository root.

## Validation
The CI workflow runs Prettier, HTML Validate, Stylelint and ESLint. The usual local validation is also visual checking in a browser or a local preview server. Verify that:
- page links still resolve correctly;
- relative paths work from each page;
- the HTML remains valid and the CSS still applies without broken selectors.

Useful local commands:

```powershell
npm run preview
npm run format:check
npm run check
node --check labs/lab7/main.js
node --check labs/lab7/produtos.js
```

## Useful context
This repository is a coursework site focused on learning HTML/CSS fundamentals, especially page structure, semantic markup, tables, lists, media, and simple styling. Keep the solutions educational and lightweight rather than introducing framework-heavy patterns.

## Handoff status
- Lab 7 is complete: static product data, product rendering, styling, `localStorage` cart, removal, total and homepage link are implemented.
- Lab 8 is not complete: it has the store page and API-oriented `main.js`, but `labs/lab8/produtos.js` is missing even though `index.html` still references it, and `fetchProdutos()` currently does not return the fetched data to `renderizarProdutos()`.
- Do not silently rewrite Lab 8. First verify the API response shape and then implement the smallest educational fix, preserving the existing Lab 7 behavior as the reference.
