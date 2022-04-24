const yup = require('yup');
const Entity = require('../Entity');

const ratingScheme = yup.object().shape({
  offerId: yup.number().integer().required().primaryKey().foreignKey({ references: { table: 'Offers', key: 'id' } }), // fk
  userId: yup.number().integer().required().primaryKey().foreignKey({ references: { table: 'Users', key: 'id' } }), // fk
  mark: yup.number().default(0).min(0).max(5).required(),
});

module.exports = ({ client, ...db }) =>
  new Entity({
    client,
    modelName: 'Rating',
    tableName: 'Ratings',
    yupScheme: ratingScheme,
  }, db);
