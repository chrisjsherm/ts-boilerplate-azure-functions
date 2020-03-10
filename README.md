# TS Boilerplate

A boilerplate template for NodeJS TypeScript projects.

## Directory structure

Configuration goes in the root directory.
Source code goes in the `src` directory along with test files. The `main` file
is `src/index.ts`.

## TypeScript

[TypeScript Node](https://github.com/TypeStrong/ts-node) acts as a TypeScript
NodeJS runtime environment. TypeScript Node registers the
[TypeScript](https://www.typescriptlang.org/) compiler to handle files with
TypeScript and JavaScript file extensions. TypeScript Node loads the
TypeScript configuration file, `tsconfig.json`, automatically.

## Development

To run the project, execute the command `npm start`. This command uses TypeScript
Node to start a NodeJS runtime environment that executes `src/index.ts`. To
enhance productivity, [nodemon](https://www.npmjs.com/package/nodemon)
monitors TypeScript and JavaScript files for changes and restarts TypeScript
Node when it detects a change. The nodemon configuration file is
`nodemon.config.json`.

### Tests

Test files sit in the same directory as their corresponding source files. The
test filename should match the source filename with the addition of `.spec` e.g.
`app.ts` would have an `app.spec.ts` test file. This project uses the
[Jest Testing Framework](https://jestjs.io/). Configuration for Jest exists
in the `jest.config.js` file.

To execute tests, run `npm test`. To execute tests in watch mode, run
`npm test -- --watch`.

### Linting

We utilize [ESLint](https://eslint.org/) to find problems and enforce rules. We
use the [Prettier](https://prettier.io/) ESLint plugin to format code. Both tools
fix problems automatically when possible.

Configuration for ESLint exists in the `.eslintrc.js` file. The configuration
includes plugins to support linting TypeScript and JSDoc comments, as well as
integration with Prettier. These plugins are NPM packages.
Configuration for Prettier exists in the `.prettierrc.js` file.

To execute the linter, run `npm run lint`.

For VS Code users, install the `dbaeumer.vscode-eslint` and
`esbenp.prettier-vscode` VS Code extensions to lint as you code.

### Git hooks

To enhance code quality, the [Husky Git hook library](https://github.com/typicode/husky)
runs linting and test scripts upon the execution of certain Git commands.
Configuration for Husky exists in the `.huskyrc.js` file.

### Logging

The project is configured to use the
[log4js](https://github.com/log4js-node/log4js-node) logging library. Import
the pre-configured logger into your module:

```
// From the ./src/index.ts file.
import logger from './core/logger.service';

logger.trace('Entering testing');
logger.debug('Received response.');
logger.info('Config is 10.');
logger.warn('Not looking good.');
logger.error('Something bad happened');
logger.fatal('Uh-oh.');
```

The logger will log to standard output as well as the `logs` directory.
