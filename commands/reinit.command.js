const fs = require('fs');
const { home } = require('../common/utils');
const { getConfigPath } = require('../common/config');

module.exports.run = (options = {}) => {
    const configPath = getConfigPath(options);

    fs.unlinkSync(configPath);
    fs.writeFileSync(configPath, JSON.stringify({
        projectDir: `${home}/IdeaProjects/backend/www/app/react/`,
        defaultName: 'BaseComponent1',
        defaultBrand: 'Nectar',
        theme: false,
        scss: true,
        test: true,
    }, null, 2), { flag: 'wx' });
    console.log(`Default config was successfully reinitialized!`);
};
