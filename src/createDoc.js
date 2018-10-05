const fs = require('fs');

generateDocFile = (object) => {
    const tableOfContent = generateDocTableOfContent(object);
    const body = generateDocBody(object);

    const content = tableOfContent + body;
    fs.writeFile('./data/README.md', content, function(err) {
        if ( err ) {
            console.error(`Error writing doc file: ${err}`);
        } else {
            console.log('README file was created successfully');
        }
    });
}

generateDocTableOfContent = (object) => {
    let body = '#List of actions\n';
    for(action in object.actions){
        body += `- [${action}](#${action})\n`
    }
    body += '***\n'
    return body;
}

generateDocBody = (object) => {
    let docBody = '';
    for(action in object.actions){
        const actionObj = object.actions[action];
        docBody += `#${action}\n## INPUTS:\n`;
        if(actionObj.inputs){
            actionObj.inputs.forEach(input => {
                let type = input.type === undefined ? `lista de ${input.arrayOf}` : input.type;
                docBody += `- ${input.name}(${type} - ${input.required ? 'requerido' : 'opcional'}): ${input.description}\n`;
                if(input.type === 'object' || input.arrayOf === 'object'){
                    docBody += objectProps(input.props, true, 1);
                }
            })
        }
        docBody += "## OUTPUTS:\n"
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

exports.generateDocFile = generateDocFile;