const dbClient = require('../index');

dbClient.Banks.bulkCreate(
  [
    {
      firstName: 'Buyer',
      lastName: 'Buyerovich',
      displayName: 'buyer',
      email: 'buyer@gmail.com', // unique
      role: 'customer',
      password: '$2a$05$1x2rTaNceS3kl1Jih0lLyeybO54.ud5b69E9Ta/kOhnVuwvFlz00G',
    },
    {
      firstName: 'Creative',
      lastName: 'Creativovich',
      displayName: 'creative',
      email: 'creative@gmail.com', // unique
      role: 'creator',
      password: '$2a$05$IsAHsVCjgmjB46UldgNbAe7DhCbsQaWMNXVTRXPnjRN2nAcPizjVi',
    },
  ],
);
