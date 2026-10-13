Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Tests

Install dependencies with `npm ci`. Install the browser for end-to-end tests:

```sh
npx playwright install chromium
```

On Linux/CI, use `npx playwright install --with-deps chromium` if browser system
libraries are missing.

- `npm test` — run Vitest component and Redux tests once.
- `npm run test:watch` — rerun unit tests as files change.
- `npm run test:coverage` — generate coverage in `coverage/`.
- `npm run test:e2e` — run Playwright tests in Chromium.
- `npm run test:e2e:ui` — open the interactive Playwright runner.
- `npm run test:all` — run both test suites.

Vitest 3 is used for compatibility with the project's Vite 5 and Node 20+.
Vitest reuses the Vite configuration and initializes Testing Library in jsdom.
`@testing-library/jest-dom` supplies DOM assertions for Vitest; it does not require Jest.

Playwright starts Vite automatically at `http://127.0.0.1:4173`. Tests intercept
API requests with isolated in-memory responses; no backend is needed. They cover
loading, saving, clearing, empty input, pending states, API errors and retries.
HTML reports are written to `playwright-report/`; failed tests retain screenshots
and traces in `test-results/`.
