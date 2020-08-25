const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('../common/config');
const baseComponentTemplate = require('../templates/base-component.template');
const baseIndexTemplate = require('../templates/base-index.template');
const baseStyleTemplate = require('../templates/base-style.template');
const baseTestTemplate = require('../templates/base-test.template');
const { decamelize } = require("../common/utils");

module.exports.run = (name = "", options = {}) => {
    const componentName = name || config.getConfig().defaultName;
    const brand = options.brand || config.getConfig().defaultBrand;
    const projectDir = config.getConfig().projectDir;

    let componentsDir = path.resolve(projectDir, brand, 'Components');
    if (options.path && fs.existsSync(options.path)) {
        componentsDir = options.path;
    }
    const componentDir = path.resolve(componentsDir, componentName);
    const componentPath = path.resolve(componentDir, `${componentName}.ts`);
    const indexPath = path.resolve(componentDir, 'index.ts');
    const stylePath = path.resolve(componentDir, 'style.scss');
    const testPath = path.resolve(componentDir, 'index.snapshot.test.js');

    if (fs.existsSync(componentDir)) {
        return console.log(`Component ${componentDir} already exists!`);
    }

    fs.mkdirSync(componentDir);

    fs.writeFileSync(indexPath, baseIndexTemplate({
        name: componentName,
    }), { flag: 'wx' });

    fs.writeFileSync(componentPath, baseComponentTemplate({
        name: componentName,
        className: decamelize(componentName),
    }), { flag: 'wx' });

    fs.writeFileSync(stylePath, baseStyleTemplate({
        className: decamelize(componentName),
    }), { flag: 'wx' });

    fs.writeFileSync(testPath, baseTestTemplate({
        componentName
    }), { flag: 'wx' });

    execSync(`cd ${projectDir} && git add .`);

    console.log(`Created ${componentPath}`);
    console.log(`Created ${stylePath}`);
    console.log(`Created ${testPath}`);
};
