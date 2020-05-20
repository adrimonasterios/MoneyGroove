const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegistration(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.error = "Campo Nombre es requerido";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.error = "Campo Email es requerido";
  } else if (!Validator.isEmail(data.email)) {
    errors.error = "Email invalido";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.error = "Campo Contraseña es requerido";
  }
if (Validator.isEmpty(data.password2)) {
    errors.error = "Confirma tu contraseña";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.error = "Contraseña debe tener al menos 6 caracteres";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.error = "Las contraseñas no coinciden";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
