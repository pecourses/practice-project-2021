const yup = require('yup');
const Entity = require('../Entity');

const userScheme = yup.object().shape({
  id: yup.number(), // pk
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  displayName: yup.string().required(),
  password: yup.string().required(), // text
  email: yup.string().required(), // unique
  avatar: yup.string().default('anon.png').required(),
  role: yup.string().oneOf(['customer', 'creator']).required(),
  balance: yup.number().default(0).min(0).required(), // decimal
  accessToken: yup.string().required(), // text
  rating: yup.number().default(0).required(), // float
});

module.exports = (client) => new Entity(client, 'Users', userScheme);
