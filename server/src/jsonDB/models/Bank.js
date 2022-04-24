const yup = require('yup');
const Entity = require('../Entity');

const bankScheme = yup.object().shape({
  cardNumber: yup.string().trim().required(), // pk,
  name: yup.string().trim().required(),
  expiry: yup.string().trim().required(),
  cvc: yup.string().trim().required(),
  balance: yup.number().default(0).min(0).required(),
});

module.exports = (client) =>
  new Entity({
    client,
    modelName: 'Bank',
    tableName: 'Banks',
    primaryKey: 'cardNumber',
    yupScheme: bankScheme,
  });
