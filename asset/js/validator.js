class Validator {
  constructor(form, settings) {
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

      remote: (value, params) => {
        console.log("remote");
        const body = {};
        body[params.nameData] = value;
        const data = {
          method: params.method,
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json"
          }
        };
        return fetch(params.url, data)
          .then(res => res.json())
          .then(data => {
            if (!data.success) {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          });
      },
      ...settings.customRules
    };

    this.errorMessages = {
      minLength: "This field must have at least {0} characters",
      maxLength: "This field must have max {0} characters",
      required: "This field is required",
      remote: "Invalid value",
      ...settings.customMessages
    };

    this.handleForm = form;
    this.fields = this._getFields(settings.fields);
    this._addEventChange();
    this._addEventSubmit();
  }

  _handleChange(e) {
    this.validate(e.target)
      .then(() => {
        this._hideErrors();
      })
      .catch(() => {
        this._showErrors();
      });
  }

  _handleSubmit(e) {
    const fieldsNames = Object.keys(this.fields);
    const validePromisesFields = [];

    fieldsNames.forEach(fieldName => {
      const fieldElement = this.fields[fieldName]["fieldElement"];

      validePromisesFields.push(this.validate(fieldElement));
    });

    Promise.all(validePromisesFields)
      .then(() => {
        return true;
      })
      .catch(() => {
        e.preventDefault();
        this._showErrors();
        return false;
      });
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
      const fieldElement = field["fieldElement"];

      if (
        !fieldElement.parentNode.getElementsByClassName("validate-error").length
      ) {
        const errorDivNode = document.createElement("div");
        errorDivNode.className = "validate-error";
        fieldElement.parentNode.appendChild(errorDivNode);
      }

      const errorDivNode = fieldElement.parentNode.getElementsByClassName(
        "validate-error"
      )[0];

      if (field.error) {
        errorDivNode.innerHTML = field.error;
      } else {
        errorDivNode.innerHTML = "";
      }
    }
  }

  _hideErrors() {
    const fields = this.fields;

    for (var keyField in fields) {
      const field = fields[keyField];
      const fieldElement = field["fieldElement"];
      const errorDivNode = fieldElement.parentNode.getElementsByClassName(
        "validate-error"
      )[0];

      if (field.error) {
        continue;
      }

      errorDivNode.innerHTML = "";
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

      if (rule === "remote" && !error) {
        validPromises.push(
          ruleMethod(fieldElement.value, ruleParams)
            .then(() => {
              this.fields[fieldElement.getAttribute("name")].error = null;
              return Promise.resolve();
            })
            .catch(() => {
              this.fields[
                fieldElement.getAttribute("name")
              ].error = this.errorMessages[rule];
              error = true;
              return Promise.reject();
            })
        );
      } else {
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
      }
    });

    return validPromises.reduce((promiseChain, currentTask) => {
      return promiseChain.then(() => currentTask.then());
    }, Promise.resolve());
  }
}
