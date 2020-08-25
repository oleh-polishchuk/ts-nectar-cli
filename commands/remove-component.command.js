const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const config = require('../common/config');

module.exports.run = (name = "", options = {}) => {
    const componentName = name || config.getConfig().defaultName;
    const brand = options.brand || config.getConfig().defaultBrand;
    const projectDir = config.getConfig().projectDir;

    const componentsDir = path.resolve(projectDir, brand, 'Components');
    const componentDir = path.resolve(componentsDir, componentName);
    const componentPath = path.resolve(componentDir, 'index.js');
    const stylePath = path.resolve(componentDir, 'style.scss');

    if (!fs.existsSync(componentDir)) {
        return console.log(`Component ${componentDir} does not exist!`);
    }

    execSync(`rm -rf ${componentDir}`);
    execSync(`cd ${projectDir} && git add .`);

    console.log(`Removed ${componentPath}`);
    console.log(`Removed ${stylePath}`);
};
