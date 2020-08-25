const fs = require('fs');
const { home } = require("./utils");

module.exports.getConfig = () => {
    try {
        return JSON.parse(fs.readFileSync(`${home}/.nectar_config`, 'utf8'));
    } catch (e) {
        console.error('Config file is corrupted!');
    }
};

module.exports.getConfigPath = (options = {}) => {
    return options.config || `${home}/.nectar_config`;
};

