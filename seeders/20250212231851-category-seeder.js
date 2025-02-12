'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('categories', [
    {
      name:'NodeJs'
    },{
      name:'NestJs'
    },
    {
      name:'ReactJs'
    },
    {
      name:'ReactNative'
    },
    {
      name:'NodeJs'
    },
    {
      name:'NestJs'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories',{}, null)
  }
};
