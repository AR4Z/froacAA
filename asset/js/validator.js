class Validator {
  constructor(form, fields, customRules, customMessages) {
    this.rules = {
      minLength: (value, params) => {
        console.log(value, params)
        return value.length >= params
      },

      maxLength: (value, params) => {
        return value.length <= params
      },
      ...customRules
    }

    this.errorMessages = {
      minLength: 'This field must have at least {0} characters',
      maxLength: 'This field must have max {0} characters',
      ...customMessages
    }
    
    this.handleForm = form
    this.errors = []
    this.fields = this._getFields(fields)
    this._addEventChange()
    this._addEventSubmit()
  }


  _handleChange(e) {
    this.validate(e.target)
  }

  _handleSubmit(e) {
    const fieldsNames = Object.keys(this.fields)
    
    fieldsNames.forEach(fieldName => {
      const fieldElement = this.fields[fieldName]['fieldElement']

      this.validate(fieldElement)
    });

    if(this.errors.length > 0) {
      e.preventDefault()

      return false
    }

    return true
  }

  _addEventSubmit() {
    const form = this.handleForm

    form.addEventListener('submit', (e) => this._handleSubmit(e))
  }

  _addEventChange() {
    const fieldsNames = Object.keys(this.fields)
    fieldsNames.forEach(fieldName => {
      const fieldElement = this.fields[fieldName]['fieldElement']

      fieldElement.addEventListener('keyup', (e) => this._handleChange(e))
    });
  }

  _getFields(fieldNames) {
    const fields = {}

    for(var fieldName in fieldNames) {
      fields[fieldName] = {
        rules: fieldNames[fieldName],
        fieldElement: this.handleForm.querySelector(`[name='${ fieldName }']`),
        errors: []
      }      
    }

    return fields;
  }

  validate(field) {
    const fieldElement = field;
    const rulesForThisField = Object.keys(this.fields[fieldElement.getAttribute('name')].rules)
    
    rulesForThisField.forEach((rule) => {
      const ruleParams = this.fields[fieldElement.getAttribute('name')].rules[rule]
      const ruleMethod = this.rules[rule]

      if(!ruleMethod(fieldElement.value, ruleParams)) {
        console.log(this.errorMessages[rule])
        this.errors.push(this.errorMessages[rule])
      } else {
        console.log('nice')
      }
    })
  }
}
