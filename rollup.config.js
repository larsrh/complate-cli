import sucrase from "@rollup/plugin-sucrase";
import executable from "rollup-plugin-executable";

export default {
    input: "src/index.ts",
    output: {
        file: "dist/index.js",
        format: "cjs",
        banner: "#!/usr/bin/env node"
    },
    plugins: [
        sucrase({
            exclude: ["node_modules/**"],
            transforms: ["typescript"]
        }),
        executable()
    ],
    external: [
        "acorn",
        "acorn-jsx",
        "astring",
        "complate-ast",
        "fs",
        "yargs"
    ]
}