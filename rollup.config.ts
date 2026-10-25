import { execSync } from 'node:child_process';

import commonjs from '@rollup/plugin-commonjs';
import deletePlugin from 'rollup-plugin-delete';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { dts } from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import type { Plugin, RollupOptions } from 'rollup';

const external: string[] = [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react-dom/client',
    'obsidian',
];

/**
 * Pack npm tarball after all bundles are written.
 * Runs only from the last config so index.d.ts is already in dist/.
 */
function packDistPlugin(): Plugin {
    return {
        name: 'pack-dist',
        writeBundle() {
            execSync(
                'npm pack --pack-destination dist && mv dist/obsidian-lib-native-react-components-*.tgz dist/native-react-components.tgz',
                { stdio: 'inherit' },
            );
        },
    };
}

const config: RollupOptions[] = [
    // ESM + CJS JS bundles (unminified — consumers bundle their plugins)
    {
        input: 'src/index.ts',
        external,
        output: [
            {
                file: 'dist/index.js',
                format: 'es',
                sourcemap: true,
                exports: 'named',
            },
            {
                file: 'dist/index.cjs',
                format: 'cjs',
                sourcemap: true,
                exports: 'named',
            },
        ],
        plugins: [
            deletePlugin({ targets: 'dist/*' }),
            replace({
                preventAssignment: true,
                'process.env.NODE_ENV': JSON.stringify('production'),
                'process.env.OSETTING_DISABLE_STYLES': 'undefined',
            }),
            nodeResolve({
                browser: true,
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                preferBuiltins: false,
            }),
            commonjs(),
            esbuild({
                include: /\.[jt]sx?$/,
                exclude: /node_modules/,
                target: 'es2022',
                jsx: 'automatic',
                tsconfig: 'tsconfig.json',
                minify: false,
                sourceMap: true,
            }),
        ],
    },

    // Single bundled declaration file + npm pack
    {
        input: 'src/index.ts',
        external,
        plugins: [dts({ tsconfig: 'tsconfig.json' }), packDistPlugin()],
        output: {
            file: 'dist/index.d.ts',
            format: 'es',
        },
    },
];

export default config;
