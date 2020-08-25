const fs = require('fs');
const { home } = require('../common/utils');
const { getConfigPath } = require('../common/config');

module.exports.run = (options = {}) => {
    const configPath = getConfigPath(options);

    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify({
            projectDir: `${home}/IdeaProjects/backend/www/app/react/`,
            defaultName: 'BaseComponent1',
            defaultBrand: 'Nectar',
            theme: false,
            scss: true,
            test: true,
        }, null, 2), { flag: 'wx' });
        console.log(`Default config was successfully initialized!`);
        console.log(`${configPath} `.padEnd(44, '='));
        console.log(fs.readFileSync(configPath, 'utf8'));
        console.log(`============================================`);
        console.log(`Please update project dir to your own!`)
    }
};
