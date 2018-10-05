const fs = require('fs')
const archiver = require('archiver')
const rimraf = require('rimraf')

buildXML = (object, isInput) => {
    let baseXml = '<?xml version="1.0" encoding="utf-8"?><xs:schema xmlns="http://tempuri.org/XMLSchema1.xsd" xmlns:mstns="http://tempuri.org/XMLSchema1.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema" id="XMLSchema1" targetNamespace="http://tempuri.org/XMLSchema1.xsd" elementFormDefault="qualified">'
    let baseElement = 'output'
    if ( isInput ) {
        baseElement = 'input'
    }

    baseXml += `<xs:element name="${baseElement}s" type="xs:complexType"><xs:complexType><xs:sequence><xs:element name="${baseElement}" type="xs:complexType"><xs:complexType><xs:sequence>`

    if( object[`${baseElement}s`] )
        object[`${baseElement}s`].forEach(element => {
            // TODO: mostrar error cuando no se pasa ni 'type' ni 'arrayOf'

            if(element.type !== undefined && element.type !== 'object') {
                baseXml += `<xs:element name="${element.name}" type="xs:${element.type}" />`;
            } else if (element.type === 'object') {
                baseXml += xsdObject(element);
            }
            else {
                baseXml += xsdArray(element);
            }
        });

    baseXml += '</xs:sequence></xs:complexType></xs:element>';

    if( !isInput ) {
        // Errors
        baseXml += '<xs:element name="error" type="xs:complexType"><xs:complexType><xs:sequence><xs:element name="error" type="xs:string" /><xs:element name="message" type="xs:string" /><xs:element name="status" type="xs:integer" /></xs:sequence></xs:complexType></xs:element>'
    }

    baseXml += '</xs:sequence></xs:complexType></xs:element></xs:schema>'
    console.log(baseXml);
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
        if(property.type !== undefined && property.type !== 'object') {
            elementXml += `<xs:element name="${property.name}" type="xs:${property.type}" />`;
        } else if (property.type === 'object') {
            elementXml += xsdObject(property);
        } else {
            elementXml += xsdArray(property);
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

generateIO = (object, connectorDef) => {
    connectorDef.actions.forEach((action) => {
        const name = action.name
        const actionYml = object.actions[name]
        if ( actionYml ) {
            action.xsdinput = buildXML(actionYml, true)
            action.xsdoutput = buildXML(actionYml)
        } else {
            console.log(`Action '${name}' has no description in doc.yml, therefore it won't be updated `)
        }
    })

    return JSON.stringify(connectorDef, null, 4)
}

generateBizc = (bizcFile, zipFile, connectorName) => {
    var output = fs.createWriteStream(bizcFile);
    var archive = archiver('zip');

    output.on('close', function () {
        console.log('done with the bizc');
        tearDown(zipFile, connectorName);
    });

    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output)
    archive.directory(`data/${connectorName}/`, false);
    archive.finalize()
}

tearDown = (zipFile, connectorName) => {
    rimraf(`./data/${connectorName}/`, () => console.error('Removing folder. Done!'))
    rimraf(`./${zipFile}`, () => console.error('Removing zip file. Done!'))
}

exports.generateIO = generateIO
exports.generateBizc = generateBizc