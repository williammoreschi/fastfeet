module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'deliveries',
      [
        {
          recipient_id: 1,
          deliveryman_id: 1,
          product: 'Encomenda 1',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 1,
          deliveryman_id: 1,
          product: 'Encomenda 2',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 2,
          deliveryman_id: 1,
          product: 'Encomenda 3',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 1,
          deliveryman_id: 1,
          product: 'Encomenda 4',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 2,
          deliveryman_id: 1,
          product: 'Encomenda 5',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 1,
          deliveryman_id: 2,
          product: 'Encomenda 6',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 2,
          deliveryman_id: 2,
          product: 'Encomenda 7',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 2,
          deliveryman_id: 2,
          product: 'Encomenda 8',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 1,
          deliveryman_id: 2,
          product: 'Encomenda 9',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 2,
          deliveryman_id: 1,
          product: 'Encomenda 10',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
