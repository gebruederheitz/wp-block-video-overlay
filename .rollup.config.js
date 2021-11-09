import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const babelConfig = (bundledHelpers = false) => ({
    babelrc: false,
    exclude: [/\/core-js\//, 'node_modules/**'],
    sourceMaps: true,
    inputSourceMap: true,
    babelHelpers: bundledHelpers ? 'bundled' : 'runtime',
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
            }
        ],
    ],
    plugins: bundledHelpers ? ['@babel/plugin-transform-react-jsx'] : [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-react-jsx',
    ],
});

export default [
    {
        external: [
            'wp',
            /@babel\/runtime/,
        ],
        input: {
            'index': "src/index.js",
            'editor': "src/editor/index.js",
            'frontend': "src/frontend/lightbox.js",
        },
        output: {
            dir: 'dist/',
            format: 'esm',
            globals: {
                wp: 'wp',
            },
            entryFileNames: '[name].m.js',
        },
        plugins: [
            resolve(),
            babel(babelConfig()),
            commonjs(),
        ],
    },
    {
        external: [
            'wp',
        ],
        input: 'src/index.js',
        output: {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'ghWpBlockVideoOverlay',
            globals: {
                wp: 'wp',
            }
        },
        plugins: [
            resolve(),
            babel(babelConfig(true)),
            commonjs(),
        ],
    },
];
