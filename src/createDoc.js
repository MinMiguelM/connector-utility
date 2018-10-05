generateDocFile = (object) => {
    let docBody = ''
    for(action in object.actions){
        const actionObj = object.actions[action]
        docBody += `${action}:\nINPUTS:\n`
        if(actionObj.inputs){
            actionObj.inputs.forEach(input => {
                docBody += `- ${input.name}(${input.type}${input.required ? ' - requerido' : ''}): ${input.description}\n`
            })
        }
        docBody += "OUTPUTS:\n"
        if(actionObj.outputs){
            actionObj.outputs.forEach(input => {
                docBody += `- ${input.name}(${input.type}${input.required ? ' - requerido' : ''}): ${input.description}\n`
            })
        }
        docBody += '\n'
    }
    return docBody
}

exports.generateDocFile = generateDocFile