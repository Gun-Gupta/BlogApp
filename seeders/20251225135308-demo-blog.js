'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('blogs', [{
      title: 'Seeded Blog',
      content: 'This blog was added via seeder',
      slug: 'seeded-blog',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('blogs', null, {});
  }
};
