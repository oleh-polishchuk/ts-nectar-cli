#!/usr/bin/env node

const fs = require('fs');
const argv = require('yargs').argv;
const { home } = require('./common/utils');

const action = argv._[ 0 ];
const instance = argv._[ 1 ];
const name = argv._[ 2 ];

const options = {
    theme: argv.theme && JSON.parse(argv.theme),
    scss: argv.scss && JSON.parse(argv.scss),
    test: argv.test && JSON.parse(argv.test),
    path: argv.path,
    brand: argv.brand,
    config: argv.config,
};

if (!fs.existsSync(`${home}/.nectar_config`)) {
    require('./commands/init.command').run(options);
}

if (action === 'set') {
    return require('./commands/set.command').run(instance, name, options);
}

const commandPath = instance
    ? `./commands/${action}-${instance}.command.js`
    : `./commands/${action}.command.js`;

try {
    require(commandPath).run(name, options);
} catch (e) {
    console.error(`Error: ${e.message}`);

    console.log(`Usage: ${argv.$0} [action] [instance] [name]`);
    console.log(`       ${argv.$0} init`);
    console.log(`       ${argv.$0} init --config=/Users/olehpolishchuk/.nectar_config`);
    console.log(`       ${argv.$0} reinit --config=/Users/olehpolishchuk/.nectar_config`);
    console.log(`       ${argv.$0} generate component HomeSlider`);
    console.log(`       ${argv.$0} generate component HomeSlider --theme=true --scss=false`);
    console.log(`       ${argv.$0} remove component HomeSlider`);
    console.log(`       ${argv.$0} generate page Home`);
    console.log(`       ${argv.$0} remove page Home`);
}
