const yup = require('yup');
const Entity = require('../Entity');

const ratingScheme = yup.object().shape({
  offerId: yup.number().integer().required(), // pk
  userId: yup.number().integer().required(), // pk
  mark: yup.number().default(0).min(0).max(5).required(),
});

module.exports = (client) =>
  new Entity({
    client,
    modelName: 'Rating',
    tableName: 'Ratings',
    primaryKey: 'offerId',
    yupScheme: ratingScheme,
  });
