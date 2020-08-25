const fs = require('fs');
const { getConfigPath } = require('../common/config');

module.exports.run = (key, value, options = {}) => {
    const configPath = getConfigPath(options);

    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        config[key] = value;

        fs.unlinkSync(configPath);
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), { flag: 'wx' });

        console.log(`Config successfully updated!`);
        console.log(JSON.stringify(config, null, 2));
    } catch (e) {
        console.error(`Error: ${e.message}`);
    }
};
