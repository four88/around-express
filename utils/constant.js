const NOT_FOUND_ERROR_CODE = 404;
const NOT_FOUND_ERROR_MSG = { message: `${Object.values(err.errors)}` };
const ERROR_OCCURED_CODE = 500;
const ERROR_OCCURED_MSG = 'An error occured';
const INVALID_CODE = 400;
const SUCCESS_CODE = 200;
module.exports = {
  NOT_FOUND_ERROR_CODE,
  NOT_FOUND_ERROR_MSG,
  ERROR_OCCURED_CODE,
  ERROR_OCCURED_MSG,
  INVALID_CODE,
  SUCCESS_CODE
};
