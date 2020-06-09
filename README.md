# complate-cli
CLI preprocessor for complate-ast

## Usage

```
$ npm run build
# if you want to look at the processed output
$ ./dist/index.js < foo.jsx
# if you want to execute it directly
$ ./dist/index.js --import complate-ast < foo.jsx | node
```
