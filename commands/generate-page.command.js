const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('../common/config');
const baseComponentTemplate = require('../templates/base-component.template');
const baseStyleTemplate = require('../templates/base-style.template');
const { decamelize } = require("../common/utils");

module.exports.run = (name = "", options = {}) => {
    const componentName = name || config.getConfig().defaultName;
    const brand = options.brand || config.getConfig().defaultBrand;
    const theme = options.theme || config.getConfig().theme;
    const scss = options.scss || config.getConfig().scss;
    const projectDir = config.getConfig().projectDir;

    const componentsDir = path.resolve(projectDir, brand, 'Pages');
    const componentDir = path.resolve(componentsDir, componentName);
    const componentPath = path.resolve(componentDir, 'index.js');
    const stylePath = path.resolve(componentDir, 'style.scss');

    if (fs.existsSync(componentDir)) {
        return console.log(`Component ${componentDir} already exists!`);
    }

    fs.mkdirSync(componentDir);
    fs.writeFileSync(componentPath, baseComponentTemplate({
        name: componentName,
        className: decamelize(componentName),
    }), { flag: 'wx' });

    fs.writeFileSync(stylePath, baseStyleTemplate({
        className: decamelize(componentName),
    }), { flag: 'wx' });

    execSync(`cd ${projectDir} && git add .`);

    console.log(`Created ${componentPath}`);
    console.log(`Created ${stylePath}`);
};
