// require all test files (files that ends with .spec.js)
const testsContext = require.context('.', true, /\.spec.js$/);
testsContext.keys().forEach(testsContext);
