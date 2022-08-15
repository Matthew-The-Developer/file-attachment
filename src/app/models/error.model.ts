interface MatErrors {
  required: (name: string) => string,
  minlength: (name: string) => string,
  maxlength: (name: string) => string,
  pattern: (name: string) => string,
  min: (name: string) => string,
  max: (name: string) => string,
  matDatePickerMax: (name: string) => string,
  incorrectDescription: (name: string) => string,
  email: (name: string) => string,
}

export { MatErrors };