import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import * as fs from "fs";

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
            file: pkg.exports.require,
            format: "cjs",
            banner,
            exports: "auto",
            sourcemap: true,
        },
        { file: pkg.exports.import, format: "es", banner, sourcemap: true },
        { file: pkg.exports.browser, format: "iife", banner, name: 'DiagonalSDK', sourcemap: true, globals: {
            'ethers': 'ethers'
        }},
    ],
    external: Object.keys(pkg.dependencies),
    plugins: [
        typescript({ tsconfig: "./tsconfig.json" }), 
        json()
    ],
};
