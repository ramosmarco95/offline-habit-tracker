module.exports = {
root: true,
parser: '@typescript-eslint/parser',
plugins: ['@typescript-eslint', 'prettier'],
extends: [
'eslint:recommended',
'plugin:@typescript-eslint/recommended',
'plugin:prettier/recommended'
],
env: { browser: true, es2023: true, node: true },
rules: { 'prettier/prettier': 'warn' }
};