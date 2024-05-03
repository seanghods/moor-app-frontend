const validateInput = (input: string, withUnderscoreAndHyphen: boolean) => {
  let validInputRegex;
  if (withUnderscoreAndHyphen) {
    validInputRegex = /^[a-zA-Z0-9-_]+$/;
  } else {
    validInputRegex = /^[a-zA-Z0-9]+$/;
  }
  return validInputRegex.test(input);
};

export default validateInput;
