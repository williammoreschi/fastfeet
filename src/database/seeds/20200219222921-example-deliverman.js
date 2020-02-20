module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'deliverymen',
      [
        {
          name: 'William G. P. Moreschi',
          email: 'will@dev.com',
          avatar_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Thyago G. P. Gallo',
          email: 'thyago@fastfeet.com',
          avatar_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
