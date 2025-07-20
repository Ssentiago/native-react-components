declare const _default: ({
    input: string;
    output: {
        file: string;
        format: string;
    };
    plugins: import("rollup").Plugin<any>[];
} | {
    input: string;
    external: string[];
    output: {
        file: string;
        format: string;
        exports: string;
    }[];
    plugins: import("rollup").Plugin<any>[];
})[];
export default _default;
