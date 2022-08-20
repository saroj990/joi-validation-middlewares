import {isEmpty} from "lodash";

// schema options
const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const validate = schema => {
  return (req, res, next) => {
    if (!schema) {
      return next(new Error("Schema is empty"));
    }
    const {error, value} = schema.validate(req.body, options);
    if (!isEmpty(error)) {
      const errors = error.details.map(e => e.message).join(", ");
      // return res.status(400).json(errors);
      return next(errors);
    }
    req.body = value;
    return next();
  };
};

export default validate;
