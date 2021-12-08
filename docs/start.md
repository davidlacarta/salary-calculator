## 🏗️ Technologies

- Handlebars (html)
- Tailwind (CSS)
- Typescript (Javascript)
- Vite (Tooling)
- Jest (Unit testing)
- Playwright (e2e testing)
- Lighthouse (performance testing)

## 📑 Requirements

- Node 16.13.0

### 🛠️ Environment configuration _\*not required_

1. Copy the example environment variables `.env.example` -> `.env`
2. Modify the environment variables if needed: `.env`

## 🌍 Run Locally

1. Install dependencies

```bash
  npm install
```

2. Run server

```bash
  npm run start
```

## ✅ Tests execution

- Unit tests

```bash
  npm test
```

- e2e tests

1. Install dependencies

```bash
  npm run test:e2e:install
```

2. Run e2e

```bash
  npm run test:build-concurrently-serve-e2e
```

- All tests

1. Install dependencies

```bash
  npm run test:e2e:install
```

2. Run unit and e2e

```bash
  npm run test:all
```

- VS code debug:

  Add this file `.vscode/launch.json`

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/.bin/jest",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
```
