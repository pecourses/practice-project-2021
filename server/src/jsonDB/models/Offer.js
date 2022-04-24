const yup = require('yup');
const Entity = require('../Entity');

const offerScheme = yup.object().shape({
  id: yup.number().integer().required(), // pk
  userId: yup.number().integer().min(0).required(), // fk
  contestId: yup.number().integer().min(0).required(), // fk
  text: yup.string().nullable(),
  fileName: yup.string().nullable(),
  originalFileName: yup.string().nullable(),
  status: yup.string().nullable().default('pending'),
});

module.exports = (client) =>
  new Entity({
    client,
    modelName: 'Offer',
    tableName: 'Offers',
    primaryKey: 'id',
    yupScheme: offerScheme,
  });
