module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Juliana da Silva Castro Moreschi',
          street: 'Rua dos Pinheiros',
          number: '280',
          complement: 'Casa',
          city: 'Maringá',
          state: 'Paraná',
          zip_code: '87060-280',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Odete Isabel Pessini',
          street: 'Rua das Pedras',
          number: '429',
          complement: 'Apto 195 Bl 06',
          city: 'Maringá',
          state: 'Paraná',
          zip_code: '87060-780',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
