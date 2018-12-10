const fs = require('fs');
const common = require('./common');

generateDocFile = (yamlFile) => {
    const object = common.parseYaml(yamlFile);
    const header = generateDocHeader(object);
    const tableOfContent = generateDocTableOfContent(object);
    const body = generateDocBody(object);

    const content = header + tableOfContent + body;
    fs.writeFile('README.md', content, function (err) {
        if (err) {
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
    for (action in object.actions) {
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
    for (action in object.actions) {
        const actionObj = object.actions[action];
        if (!actionObj) continue;

        docBody += `## ${action}\n`;
        if (actionObj.description !== undefined) {
            docBody += `${actionObj.description}\n`;
        }
        docBody += `### INPUTS:\n`;

        var baseInput = null;
        if (actionObj.inputs) {
            docBody += `(inputs.input is an array of objects)\n`;
            baseInput = actionObj.inputs;
        }
        else if (actionObj.input) {
            baseInput = actionObj.input;
        }

        if (baseInput) {
            baseInput.forEach(input => {
                let type = input.type === undefined ? `array of ${input.arrayOf}` : input.type;
                var description = (input.description !== undefined ? input.description : '');
                docBody += `· ${input.name} (${type} - ${input.required ? 'required' : 'optional'}): ${description}\n`;
                if (input.type === 'object' || input.arrayOf === 'object') {
                    docBody += objectProps(input.props, true, 1);
                }
            })
        }

        docBody += "### OUTPUTS:\n"
        var baseOutput = null;

        if (actionObj.outputs) {
            docBody += `(outputs.output is an array of objects)\n`;
            baseOutput = actionObj.outputs;
        }
        else if (actionObj.output) {
            baseOutput = actionObj.output;
        }

        if (baseOutput) {
            baseOutput.forEach(output => {
                let type = output.type === undefined ? `array of ${output.arrayOf}` : output.type;
                var description = (output.description !== undefined ? output.description : '');
                docBody += `· ${output.name} (${type}): ${description}\n`;
                if (output.type === 'object' || output.arrayOf === 'object') {
                    docBody += objectProps(output.props, false, 1);
                }
            })
        }
        docBody += '***\n';
    }
    return docBody;
}

objectProps = (props, isInput, tabTimes) => {
    let docBody = '';
    props.forEach(prop => {
        let type = prop.type === undefined ? `array of ${prop.arrayOf}` : prop.type;
        docBody += `${'\t'.repeat(tabTimes)}· ${prop.name} (${type}${
            isInput ?
                prop.required ? ' - required' : ' - optional'
                : ''
            }): ${prop.description}\n`;
        if (prop.type === 'object' || prop.arrayOf === 'object') {
            docBody += objectProps(prop.props, isInput, tabTimes + 1);
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