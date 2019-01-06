class Validator {
  constructor(form, fields, customRules, customMessages) {
    this.rules = {
      required: (value, params) => {
        console.log("required");
        return value.length !== 0;
      },

      minLength: (value, params) => {
        console.log("minLength");
        console.log(value, params);
        return value.length >= params;
      },

      maxLength: (value, params) => {
        console.log("maxLength");
        return value.length <= params;
      },
      ...customRules
    };

    this.errorMessages = {
      minLength: "This field must have at least {0} characters",
      maxLength: "This field must have max {0} characters",
      required: "This field is required",
      ...customMessages
    };

    this.handleForm = form;
    this.errors = [];
    this.fields = this._getFields(fields);
    this._addEventChange();
    this._addEventSubmit();
  }

  _handleChange(e) {
    this.validate(e.target)
      .then(() => {
        console.log("ready");
        this._hideErrors();
      })
      .catch(() => {
        console.error("error");
        this._showErrors();
      });
  }

  _handleSubmit(e) {
    const fieldsNames = Object.keys(this.fields);

    fieldsNames.forEach(fieldName => {
      const fieldElement = this.fields[fieldName]["fieldElement"];

      this.validate(fieldElement);
    });

    if (this.errors.length > 0) {
      e.preventDefault();

      return false;
    }

    return true;
  }

  _addEventSubmit() {
    const form = this.handleForm;

    form.addEventListener("submit", e => this._handleSubmit(e));
  }

  _addEventChange() {
    const fieldsNames = Object.keys(this.fields);
    fieldsNames.forEach(fieldName => {
      const fieldElement = this.fields[fieldName]["fieldElement"];

      fieldElement.addEventListener("keyup", e => this._handleChange(e));
    });
  }

  _getFields(fieldNames) {
    const fields = {};

    for (var fieldName in fieldNames) {
      fields[fieldName] = {
        rules: fieldNames[fieldName],
        fieldElement: this.handleForm.querySelector(`[name='${fieldName}']`),
        error: null
      };
    }

    return fields;
  }

  _showErrors() {
    const fields = this.fields;

    for (var keyField in fields) {
      const field = fields[keyField];

      if (!field.error) {
        continue;
      }

      const fieldElement = field["fieldElement"];
      const errorDivNode = document.createElement("div");
      const errorTextNode = document.createTextNode(field.error);

      errorDivNode.className = 'validate-error';
      errorDivNode.appendChild(errorTextNode);
      fieldElement.parentNode.appendChild(errorDivNode);
    }
  }

  _hideErrors() {
    const fields = this.fields;

    for (var keyField in fields) {
      const field = fields[keyField];

      if (field.error) {
        continue;
      }

      const fieldElement = field["fieldElement"];
      const errorDivNode = fieldElement.parentNode.getElementsByClassName('validate-error')[0];

      fieldElement.parentNode.removeChild(errorDivNode);
    }
  }

  validate(field) {
    const fieldElement = field;
    const rulesForThisField = Object.keys(
      this.fields[fieldElement.getAttribute("name")].rules
    );
    const fieldName = fieldElement.getAttribute("name");
    const validPromises = [];
    let error = false;

    rulesForThisField.forEach(rule => {
      const ruleParams = this.fields[fieldName].rules[rule];
      const ruleMethod = this.rules[rule];

      validPromises.push(
        new Promise((resolve, reject) => {
          if (error) {
            return reject();
          }

          if (ruleMethod(fieldElement.value, ruleParams)) {
            this.fields[fieldElement.getAttribute("name")].error = null;
            return resolve();
          } else {
            this.fields[
              fieldElement.getAttribute("name")
            ].error = this.errorMessages[rule];
            error = true;
            return reject();
          }
        })
      );
    });

    return validPromises.reduce((promiseChain, currentTask) => {
      return promiseChain.then(() => currentTask.then());
    }, Promise.resolve());
  }
}
