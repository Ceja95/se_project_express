const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be at most 30 characters long",
      "string.empty": "Name is required",
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "Image URL is required",
      "string.uri": "Image URL must be a valid URL",
    }),
  }),
});

module.exports.validateUserBodyCreated = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be at most 30 characters long",
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": "Avatar URL is required",
      "string.uri": "Avatar URL must be a valid URL",
    }),

    email: Joi.string().required().email().messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
    }),

    password: Joi.string().required().messages({
      "string.min": "Password must be at least 6 characters long",
      "string.empty": "Password is required",
    }),
  }),
});

module.exports.validateUserBodyLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
    }),

    password: Joi.string().required().messages({
      "string.empty": "Password is required",
    }),
  }),
});

module.exports.validateUserAndItemsId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).messages({
      "string.length": "User ID must be 24 hexadecimal characters",
      "string.hex": "User ID must contain only hexadecimal characters",
    }),

    itemId: Joi.string().hex().length(24).messages({
      "string.length": "Item ID must be 24 hexadecimal characters",
      "string.hex": "Item ID must contain only hexadecimal characters",
    }),
  }),
});
