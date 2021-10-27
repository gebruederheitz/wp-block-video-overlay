import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const babelConfig = {
    babelrc: false,
    exclude: [/\/core-js\//, 'node_modules/**'],
    sourceMaps: true,
    inputSourceMap: true,
    babelHelpers: 'runtime',
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
            }
        ],
    ],
    plugins: [
        '@babel/plugin-transform-react-jsx',
        '@babel/plugin-transform-runtime',
    ],
};

export default [
    {
        external: [
            'wp',
            /@babel\/runtime/,
        ],
         input: 'src/editor/index.js',
        output: {
            file: 'dist/editor.js',
            format: 'esm',
            globals: {
                wp: 'wp',
            },
        },
        plugins: [
            resolve(),
            babel(babelConfig),
            commonjs(),
        ],
    },
    {
        external: [
            /@babel\/runtime/,
        ],
        input: 'src/frontend/lightbox.js',
        output: {
            file: 'dist/frontend.js',
            format: 'esm',
        },
        plugins: [
            resolve(),
            babel(babelConfig),
            commonjs(),
        ],
    },
];
