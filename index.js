const yaml = require('yaml')
const fs = require('fs')
const extract = require('extract-zip')
const IO = require('./src/createIO')
const doc = require('./src/createDoc')

const generateIO = IO.generateIO
const generateBizc = IO.generateBizc

// TODO: posibilidad de especificar el nombre del archivo YAML de entrada
// TODO: posibilidad de especificar el nombre del archivo BIZC de salida

if (process.argv.length !== 3) {
    console.error('BIZC file name must be specified as an argument');
    process.exit(1);
}

const connectorName = process.argv[2]
const bizcFile = `./data/${connectorName}.bizc`
const zipFile = `./data/${connectorName}.zip`
try {
    fs.renameSync(bizcFile, zipFile)
} catch (ex) {
    console.error(ex)
    process.exit(1)
}

const descFile = fs.readFileSync('data/doc.yml', 'utf8')
const yamlFile = yaml.parse(descFile)

extract(zipFile, { dir: `${process.cwd()}/data/${connectorName}` }, (err) => {
    if (!err) {
        const connectorDefPath = `./data/${connectorName}/def/connector.json`
        const connectorDef = require(connectorDefPath)

        const newConnectorDef = generateIO(yamlFile, connectorDef)
        fs.writeFileSync(connectorDefPath, newConnectorDef)
        
        generateBizc(bizcFile, zipFile, connectorName);
    } else {
        console.error(err)
    }
})

// publish in smartsheet
console.log(doc.generateDocFile(yamlFile))