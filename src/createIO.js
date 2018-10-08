const yaml = require('yaml');
const fs = require('fs')
const extract = require('extract-zip');
const archiver = require('archiver')
const rimraf = require('rimraf')
const common = require('./common');

init = (connectorName, inputYamlFileName, outputBizcFileName) => {
    if( connectorName.indexOf('.bizc') >= 0 ) {
        connectorName = connectorName.substr(0,connectorName.indexOf('.bizc'));
    }
    const inputBizcFile = `${connectorName}.bizc`;
    
    registerListeners(connectorName);

    try {
        var yamlObject = common.parseYaml(inputYamlFileName);

        console.log("Extracting bizc file...");

        extract(inputBizcFile, { dir: `${process.cwd()}/${connectorName}` }, (err) => {
            if (!err) {
                const connectorDefPath = `${process.cwd()}/${connectorName}/def/connector.json`;
                const connectorDef = require(connectorDefPath);
        
                const newConnectorDef = generateIO(yamlObject, connectorDef, inputYamlFileName);
                fs.writeFileSync(connectorDefPath, newConnectorDef);
                
                if (outputBizcFileName) {
                    generateBizc(outputBizcFileName, connectorName, true);
                }
                else {
                    generateBizc(inputBizcFile, connectorName);
                }
            } else {
                console.error(err);
            }
        });
    } catch (ex) {
        console.error(ex.message);
        process.exit(1);
    }
}

registerListeners = (connectorName) => {
    process.on('exit', () => {
        tearDown(connectorName)
    });
    process.on('SIGINT', () => process.exit());
    process.on('uncaughtException', (err) => {
        console.error(err);
        process.exit();
    });
}

generateIO = (object, connectorDef, inputYamlFile) => {
    connectorDef.actions.forEach((action) => {
        const name = action.name;
        const actionYml = object.actions[name];
        if ( actionYml ) {
            action.xsdinput = buildXML(actionYml, true);
            action.xsdoutput = buildXML(actionYml);
        } else {
            console.log(`Action '${name}' has no description in ${inputYamlFile}, therefore it won't be updated `);
        }
    })

    return JSON.stringify(connectorDef, null, 4);
}

buildXML = (object, isInput) => {
    let baseXml = '<?xml version="1.0" encoding="utf-8"?><xs:schema xmlns="http://tempuri.org/XMLSchema1.xsd" xmlns:mstns="http://tempuri.org/XMLSchema1.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema" id="XMLSchema1" targetNamespace="http://tempuri.org/XMLSchema1.xsd" elementFormDefault="qualified">'
    let baseElement = 'output'
    if ( isInput ) {
        baseElement = 'input'
    }

    baseXml += `<xs:element name="${baseElement}s" type="xs:complexType"><xs:complexType><xs:sequence><xs:element name="${baseElement}" type="xs:complexType"><xs:complexType><xs:sequence>`

    if( object[`${baseElement}s`] ) {
        object[`${baseElement}s`].forEach(element => {
            
            // Si no se especifica ni type ni arrayOf, entonces se considera como string
            if (element.type === undefined && element.arrayOf === undefined) {
                baseXml += `<xs:element name="${element.name}" type="xs:string" />`;
            }
            else {
                if (element.type !== undefined && element.type !== 'object') {
                    baseXml += `<xs:element name="${element.name}" type="xs:${element.type}" />`;
                } else if (element.type === 'object') {
                    baseXml += xsdObject(element);
                }
                else {
                    baseXml += xsdArray(element);
                }
            }
        });
    }

    baseXml += '</xs:sequence></xs:complexType></xs:element>';

    if( !isInput ) {
        // Errors
        baseXml += '<xs:element name="error" type="xs:complexType"><xs:complexType><xs:sequence><xs:element name="error" type="xs:string" /><xs:element name="message" type="xs:string" /><xs:element name="status" type="xs:integer" /></xs:sequence></xs:complexType></xs:element>'
    }

    baseXml += '</xs:sequence></xs:complexType></xs:element></xs:schema>'
    // console.log(baseXml);
    return new Buffer(baseXml).toString('base64');
}

xsdObject = (element, isInArray = false) => {
    let elementXml;
    if (isInArray) {
        elementXml = `<xs:element name="${element.name}" type="xs:complexType" minOccurs="0" maxOccurs="unbounded"><xs:complexType><xs:sequence>`;
    }
    else {
        elementXml = `<xs:element name="${element.name}" type="xs:complexType"><xs:complexType><xs:sequence>`;
    }

    element.props.forEach( property => {
        // Si no se especifica ni type ni arrayOf, entonces se considera como string
        if (property.type === undefined && property.arrayOf === undefined) {
            elementXml += `<xs:element name="${property.name}" type="xs:string" />`;
        }
        else {
            if(property.type !== undefined && property.type !== 'object') {
                elementXml += `<xs:element name="${property.name}" type="xs:${property.type}" />`;
            } else if (property.type === 'object') {
                elementXml += xsdObject(property);
            } else {
                elementXml += xsdArray(property);
            }
        }
    })
    elementXml += '</xs:sequence></xs:complexType></xs:element>';
    return elementXml;
}

xsdArray = (element) => {
    let elementXml;
    if (element.arrayOf === 'object') {
        elementXml = xsdObject(element, true);
    }
    else {
        elementXml = `<xs:element name="${element.name}" type="xs:${element.arrayOf}" minOccurs="0" maxOccurs="unbounded"/>`;
    }
    return elementXml;
}

generateBizc = (bizcFile, connectorName, customName = false) => {
    if(!customName) {
        var output = fs.createWriteStream(`NEW - ${bizcFile}`);
    } else {
        var output = fs.createWriteStream(`${bizcFile}`);
    }
    var archive = archiver('zip');

    output.on('close', function () {
        console.log('Done with the bizc');
    });

    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output);
    archive.directory(`${process.cwd()}/${connectorName}/`, false);
    archive.finalize();
}

tearDown = (connectorName) => {
    console.log('Removing temporal folder.')
    rimraf.sync(`./${connectorName}/`);
}

exports.init = init;