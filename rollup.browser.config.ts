import * as fs from "fs";

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const banner = `/**
 * @module ${pkg.name}
 * @version ${pkg.version}
 * @file ${pkg.description}
 * @copyright ${pkg.author.name} ${new Date().getFullYear()}
 * @license ${pkg.license}
 * @see [Github]{@link ${pkg.homepage}}
*/`;

export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.exports.browser,
            format: "iife",
            banner,
            name: "DiagonalSDK",
            sourcemap: true,
            globals: {
                stream: "stream",
                http: "http",
                url: "url",
                https: "https",
                zlib: "zlib",
            },
        },
    ],
    plugins: [
        typescript({ tsconfig: "./tsconfig.json" }),
        json(),
        resolve({ browser: true }),
        replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
            preventAssignment: true,
        }),
        commonjs(),
        terser(),
    ],
};
