const yaml = require('yaml');
const fs = require('fs');

var parsedYaml = null;

exports.parseYaml = (yamlFilePath) => {
    if (parsedYaml) {
        console.log("Returning an already parsed yaml");
        return parsedYaml;
    }

    try {
        const yamlString = fs.readFileSync(`${yamlFilePath}`, 'utf8');
        parsedYaml = yaml.parse(yamlString);
        return parsedYaml;
    } catch (ex) {
        console.error(ex.message);
        process.exit(1);
    }
}