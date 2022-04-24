const yup = require('yup');
const Entity = require('../Entity');

const selectScheme = yup.object().shape({
  type: yup.string().required(), // pk
  describe: yup.string().required(), // pk
});

module.exports = (client) =>
  new Entity({
    client,
    modelName: 'Select',
    tableName: 'Selects',
    primaryKey: 'type',
    yupScheme: selectScheme,
  });
