const yup = require('yup');
const Entity = require('../Entity');

const contestScheme = yup.object().shape({
  id: yup.number().integer().required(), // pk
  orderId: yup.string().required(),
  userId: yup.number().integer().required(), // fk
  status: yup.string().required(),
  prize: yup.number().required(),
  priority: yup.number().integer().min(0).required(),
  contestType: yup.string().oneOf(['name', 'tagline', 'logo']).required(),
  fileName: yup.string().nullable(),
  originalFileName: yup.string().nullable(),
  title: yup.string().nullable(),
  typeOfName: yup.string().nullable(),
  industry: yup.string().nullable(),
  focusOfWork: yup.string().nullable(),
  targetCustomer: yup.string().nullable(),
  styleName: yup.string().nullable(),
  nameVenture: yup.string().nullable(),
  typeOfTagline: yup.string().nullable(),
  brandStyle: yup.string().nullable(),
  createdAt: yup.date().nullable().default(() => Date.now()),
});

module.exports = (client) =>
  new Entity({
    client,
    modelName: 'Contest',
    tableName: 'Contests',
    primaryKey: 'id',
    yupScheme: contestScheme,
  });