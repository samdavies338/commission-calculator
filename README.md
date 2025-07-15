# Commission Calculator

This project contains a simple commission calculator used by the HTML page in this repository. The core calculation logic lives in `calculator.js` so it can be tested separately from the DOM.

## Running Tests

The project uses [Jest](https://jestjs.io/) for unit tests. Install dependencies and run the tests with the following commands:

```bash
npm install
npm test
```

The tests in `calculator.test.js` verify representative "add" and "remove" scenarios for the calculation logic.
