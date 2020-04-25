#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const readPkgUp = require("read-pkg-up");
const manage_module_1 = require("./manage-module");
const questions_1 = require("./questions");
function main(cwd = process.cwd()) {
    const { packageJson } = readPkgUp.sync({ cwd });
    return inquirer_1.prompt(questions_1.questions(packageJson.name, packageJson.description, packageJson.private !== false))
        .then(({ pkgname, description, isPrivate, registry, pkgname1 }) => {
        const [scope, name] = [
            "tufan-io",
            ...(pkgname1 || pkgname).split("/"),
        ].slice(-2);
        return manage_module_1.manageModule(scope, name, description, isPrivate, registry, cwd);
    });
}
exports.main = main;
if (!module.parent) {
    process.on("SIGINT", () => process.exit(-1));
    // tslint:disable: no-console
    main(process.cwd())
        .then(() => {
        console.log(`\nSuccessfully configured 'simple-ci'. To finish, execute\n  npm run build`);
    })
        .catch(console.error);
}
//# sourceMappingURL=index.js.map