import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import { dts } from 'rollup-plugin-dts';
import cssnano from 'cssnano';
const mainConfig = {
    input: 'src/index.ts',
    external: ['react', 'react-dom', 'preact', 'preact/compat', 'obsidian'],
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            exports: 'named',
        },
        {
            file: 'dist/index.js',
            format: 'es',
            exports: 'named',
        }
    ],
    plugins: [
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': '"production"',
        }),
        postcss({
            inject: false,
            extract: false,
            minimize: true,
            plugins: [cssnano({ preset: 'default' })]
        }),
        nodeResolve({
            preferBuiltins: false,
            extensions: ['.ts', '.tsx'],
            browser: true,
        }),
        commonjs(),
        esbuild({
            include: /\.tsx?$/,
            target: 'es2020',
            minify: true,
        }),
    ],
};
const typesConfig = {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'es' },
    plugins: [dts()],
};
export default [mainConfig, typesConfig];
