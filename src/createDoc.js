const fs = require('fs');
const common = require('./common');

generateDocFile = (yamlFile) => {
    const object = common.parseYaml(yamlFile);
    const header = generateDocHeader(object);
    const tableOfContent = generateDocTableOfContent(object);
    const body = generateDocBody(object);

    const content = header + tableOfContent + body;
    fs.writeFile('README.md', content, function(err) {
        if ( err ) {
            console.error(`Error writing doc file: ${err}`);
        } else {
            console.log('README file was created successfully');
        }
    });
}

generateDocTableOfContent = (object) => {
    let body = '',
        actionsCount = 0,
        bodyList = '';
    for(action in object.actions){
        if (object.actions[action]) {
            bodyList += `- [${action}](#${action})\n`;
            actionsCount++;
        }
    }
    body = `## List of actions (${actionsCount})\n` + bodyList;
    body += '***\n'
    return body;
}

generateDocBody = (object) => {
    let docBody = '';
    for(action in object.actions){
        const actionObj = object.actions[action];
        if (!actionObj) continue;

        docBody += `## ${action}\n`;
        if(actionObj.description) {
            docBody += `${actionObj.description}\n`;
        }
        docBody += `### INPUTS:\n`;
        if(actionObj.inputs){
            actionObj.inputs.forEach(input => {
                let type = input.type === undefined ? `lista de ${input.arrayOf}` : input.type;
                docBody += `- ${input.name}(${type} - ${input.required ? 'requerido' : 'opcional'}): ${input.description}\n`;
                if(input.type === 'object' || input.arrayOf === 'object'){
                    docBody += objectProps(input.props, true, 1);
                }
            })
        }
        docBody += "### OUTPUTS:\n"
        if(actionObj.outputs){
            actionObj.outputs.forEach(input => {
                let type = input.type === undefined ? `lista de ${input.arrayOf}` : input.type;
                docBody += `- ${input.name}(${type}): ${input.description}\n`;
                if(input.type === 'object' || input.arrayOf === 'object'){
                    docBody += objectProps(input.props, false, 1);
                }
            })
        }
        docBody += '***\n';
    }
    return docBody;
}

objectProps = (props, isInput, tabTimes) => {
    let docBody = '';
    props.forEach( prop => {
        let type = prop.type === undefined ? `lista de ${prop.arrayOf}` : prop.type;
        docBody += `${'\t'.repeat(tabTimes)}- ${prop.name}(${type}${
            isInput ? 
                prop.required ? ' - requerido' : ' - opcional'
            : ''
        }): ${prop.description}\n`;
        if(prop.type === 'object' || prop.arrayOf === 'object') {
            docBody += objectProps(prop.props, tabTimes + 1);
        }
    })
    return docBody;
}

generateDocHeader = (object) => {
    let docBody = '';
    if (!object.name) return docBody;

    docBody += `# ${object.name}\n`;
    docBody += `[![](https://img.shields.io/badge/version-${object.version}-blue.svg)](https://www.bizagi.com/es/comunidad/global-xchange)\n\n`;
    docBody += `${object.description}\n`;
    docBody += '***\n';
    return docBody;
}

exports.generateDocFile = generateDocFile;