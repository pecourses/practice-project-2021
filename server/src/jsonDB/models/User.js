const yup = require('yup');
const Entity = require('../Entity');

const userScheme = yup.object().shape({
  id: yup.mixed().test('id_type', 'Id value should be a number or a string type', (value) => {
    const isNumber = yup.number().integer().min(0).isValidSync(value);
    const isString = yup.string().trim().min(1).max(36).matches(/^[\w-]*$/i).isValidSync(value);
    return isNumber || isString;
  }), // pk
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  displayName: yup.string().trim().required(),
  password: yup.string().trim().required(),
  email: yup.string().trim().required(), // unique
  avatar: yup.string().trim().default(() => 'anon.png').required(),
  role: yup.string().trim().oneOf(['customer', 'creator']).required(),
  balance: yup.number().default(0).min(0).required(),
  accessToken: yup.string().trim().notRequired().nullable().default(null),
  rating: yup.number().default(0).required(),
});

module.exports = (client) =>
  new Entity({
    client,
    modelName: 'User',
    tableName: 'Users',
    primaryKey: 'id',
    typScheme: userScheme,
  });
