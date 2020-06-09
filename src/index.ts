import yargs from "yargs";
import {preprocess, runtimeModuleFromConfig, ESTreeBuilderConfig, esTreeBuilderFromConfig, Kind} from "complate-ast";
import fs from "fs";
import {Parser} from "acorn";
import {generate} from "astring";
// @ts-ignore
import jsx from "acorn-jsx";

const argv = yargs
    .options({
        m: {
            alias: "mode",
            choices: ["simple", "optimizing"],
            default: "optimizing"
        },
        t: {
            alias: "target",
            choices: ["raw", "stream", "structured"],
            default: "raw"
        },
        p: {
            alias: "prefix",
            type: "string"
        },
        import: {
            type: "string"
        }
    })
    .argv;

const kind = argv.t as Kind;

const config: ESTreeBuilderConfig = {
    mode: argv.m as any,
    target: kind
};

const runtimeConfig = {
    prefix: argv.p,
    importPath: argv.import
};

const esBuilder = esTreeBuilderFromConfig(runtimeModuleFromConfig(runtimeConfig), config);

function processFile(file: string | number): void {
    const code = fs.readFileSync(file, { encoding: "utf-8" });
    const parser = Parser.extend(jsx());
    const parsed = parser.parse(code);
    const processed = preprocess(parsed, esBuilder, runtimeConfig);
    console.log(generate(processed));
}

if (argv._.length > 0)
    for (const file of argv._)
        processFile(file);
else
    processFile(0);
