export default {
    'src/**/*.{ts,tsx}': [() => 'tsc -p tsconfig.json --noEmit', 'eslint --fix --max-warnings 0'],
    '*.{js,jsx,ts,tsx,css}': ['prettier --write .'],
};
