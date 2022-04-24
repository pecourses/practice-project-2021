const yup = require('yup');
const Entity = require('../Entity');

const selectScheme = yup.object().shape({
  type: yup.string().required().primaryKey(),
  describe: yup.string().required().primaryKey(),
});

module.exports = ({ client, ...db }) =>
  new Entity({
    client,
    modelName: 'Select',
    tableName: 'Selects',
    yupScheme: selectScheme,
  }, db);
