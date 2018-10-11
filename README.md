# Bizagi Connector Utility (bizc)

This tool makes it easier and faster to create/modify/delete your Bizagi connector action's inputs and outputs. Simply specify your action's inputs and outputs from a [YAML file](#yaml-file-structure).
You can generate documentation for your connector as well!

## Installation

`npm i -g bizc` 

## Usage
`bizc ConnectorToModify.bizc -d -b UpdatedConnector.bizc -y ConnectorInputsOutputs.yaml`

### Options
* `-y` or `--yaml=PATH`: This option is used to specify the path where the YAML file will be loaded from. If this option is not specified, the tool will look for a file called `doc.yml` in the working directory.

    Take a look at a [sample YAML file](#yaml-file-structure).

* `-b` or `--bizc=PATH`: This option is used to specify the path where the updated connector file will be stored. If this option is not specified, the connector specified as input will be overwritten.

* `-d`: This option is used to generate documentation from the **description** attribute of each input/output in the YAML file. This documentation will be generated in a `README.md` file.


## YAML file structure

```yaml
# ConnectorInputsOutputs.yaml

actions:
  my-action:    # Action name
    inputs:    # Inputs of this action
      - name: first_name    # name of the input
        description: This is the first name of a person    # Description of the first_name input. Used for documentation purposes when the -d option is specified.
        type: string    # type of first_name
      - name: last_name    # another input named "last_name"
        description: This is the last name of a person
        type: string    # type of last_name
        required: true   # This input is required. Currently used for documentation purposes.
    outputs:    # Outputs of this action
      - name: id
        description: ID of the person
        type: string
      - name: person_info
        description: Information about a person
        type: object
        props:    # If type=object, then use props to specify the object's properties
          - name: first_name
            description: First name of a person    # Used for documentation when the -d option ins specified.
            type: string
          - name: last_name
            description: Last name of a person
            type: string
          - name: age
            description: Age of a person
            type: integer
      - name: children
        description: Name and age of this person's children
        arrayOf: object    # # If you wan't to specify an array, do not use 'type'. Instead use arrayOf. You can also specify arrays of basic types. For example, arrayOf: string.
        props:    # Since this is an array of objects, you specify the properties for each element of the array using props. Arrays of basic types (like strings, doubles, etc.) don't require the use of props.
          - name: name
            description: Name of this child
            type: string
          - name: age
            description: Age of this child
            type: integer

  other-action:
  # ....
```

* The YAML file must have a root *actions* object.
    
* Nested arrays and objects are supported.

* Supported types: `boolean`, `byte`, `date`, `decimal`, `double`, `integer`, `object`, `string`.